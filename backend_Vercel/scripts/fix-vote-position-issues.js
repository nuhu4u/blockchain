/**
 * Vote Position Issues Fix Script
 * Fixes all identified issues in vote position tracking workflow
 */

const { MongoClient, ObjectId } = require('mongodb');

const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';

class VotePositionFixer {
  constructor() {
    this.client = null;
    this.db = null;
    this.fixResults = {
      sequential_positions: { status: 'pending', processed: 0, errors: 0 },
      vote_timestamps: { status: 'pending', processed: 0, errors: 0 },
      user_geographic_data: { status: 'pending', processed: 0, errors: 0 },
      position_calculations: { status: 'pending', processed: 0, errors: 0 }
    };
  }

  async initialize() {
    console.log('🔧 Initializing Vote Position Fixer...\n');
    
    this.client = new MongoClient(DB_URL);
    await this.client.connect();
    this.db = this.client.db('election_system');
    
    console.log('✅ Database connected\n');
  }

  async cleanup() {
    if (this.client) {
      await this.client.close();
    }
  }

  async fixSequentialPositions() {
    console.log('🔥 FIXING SEQUENTIAL POSITIONS\n');
    
    try {
      // Get all elections
      const elections = await this.db.collection('elections').find({}).toArray();
      
      let totalProcessed = 0;
      let totalErrors = 0;
      
      for (const election of elections) {
        console.log(`📊 Processing election: ${election.title} (${election._id})`);
        
        // Get all votes for this election, ordered by creation time
        const votes = await this.db.collection('votes').find({
          election_id: election._id.toString(),
          status: 'success'
        }).sort({ created_at: 1, _id: 1 }).toArray();
        
        console.log(`   Found ${votes.length} votes to process`);
        
        // Update each vote with sequential position
        for (let i = 0; i < votes.length; i++) {
          const vote = votes[i];
          const position = i + 1;
          
          try {
            await this.db.collection('votes').updateOne(
              { _id: vote._id },
              { 
                $set: { 
                  sequential_position: position,
                  vote_timestamp: vote.created_at || new Date(),
                  updated_at: new Date()
                }
              }
            );
            
            totalProcessed++;
            
            if (position % 10 === 0 || position === votes.length) {
              console.log(`   ✅ Processed ${position}/${votes.length} votes`);
            }
            
          } catch (error) {
            console.log(`   ❌ Error updating vote ${vote._id}: ${error.message}`);
            totalErrors++;
          }
        }
        
        console.log(`   ✅ Completed election: ${votes.length} votes processed\n`);
      }
      
      this.fixResults.sequential_positions = {
        status: totalErrors === 0 ? 'success' : 'partial',
        processed: totalProcessed,
        errors: totalErrors
      };
      
      console.log(`✅ Sequential positions fix completed: ${totalProcessed} processed, ${totalErrors} errors\n`);
      
    } catch (error) {
      console.log(`❌ Sequential positions fix failed: ${error.message}\n`);
      this.fixResults.sequential_positions = {
        status: 'failed',
        processed: 0,
        errors: 1,
        error: error.message
      };
    }
  }

  async fixVoteTimestamps() {
    console.log('🔥 FIXING VOTE TIMESTAMPS\n');
    
    try {
      // Find votes without vote_timestamp
      const votesWithoutTimestamp = await this.db.collection('votes').find({
        $or: [
          { vote_timestamp: { $exists: false } },
          { vote_timestamp: null }
        ]
      }).toArray();
      
      console.log(`📊 Found ${votesWithoutTimestamp.length} votes without timestamps`);
      
      let processed = 0;
      let errors = 0;
      
      for (const vote of votesWithoutTimestamp) {
        try {
          // Use created_at as vote_timestamp, or current time if not available
          const timestamp = vote.created_at || new Date();
          
          await this.db.collection('votes').updateOne(
            { _id: vote._id },
            { 
              $set: { 
                vote_timestamp: timestamp,
                updated_at: new Date()
              }
            }
          );
          
          processed++;
          
          if (processed % 50 === 0 || processed === votesWithoutTimestamp.length) {
            console.log(`   ✅ Processed ${processed}/${votesWithoutTimestamp.length} votes`);
          }
          
        } catch (error) {
          console.log(`   ❌ Error updating vote ${vote._id}: ${error.message}`);
          errors++;
        }
      }
      
      this.fixResults.vote_timestamps = {
        status: errors === 0 ? 'success' : 'partial',
        processed: processed,
        errors: errors
      };
      
      console.log(`✅ Vote timestamps fix completed: ${processed} processed, ${errors} errors\n`);
      
    } catch (error) {
      console.log(`❌ Vote timestamps fix failed: ${error.message}\n`);
      this.fixResults.vote_timestamps = {
        status: 'failed',
        processed: 0,
        errors: 1,
        error: error.message
      };
    }
  }

  async fixUserGeographicData() {
    console.log('🔥 FIXING USER GEOGRAPHIC DATA\n');
    
    try {
      // Find users without complete geographic data
      const usersWithoutGeoData = await this.db.collection('users').find({
        role: 'VOTER',
        $or: [
          { polling_unit_id: { $exists: false } },
          { ward_id: { $exists: false } },
          { lga_id: { $exists: false } },
          { state_id: { $exists: false } },
          { polling_unit_id: null },
          { ward_id: null },
          { lga_id: null },
          { state_id: null }
        ]
      }).toArray();
      
      console.log(`📊 Found ${usersWithoutGeoData.length} users with incomplete geographic data`);
      
      let processed = 0;
      let errors = 0;
      
      for (const user of usersWithoutGeoData) {
        try {
          // Set default geographic data if missing
          const updates = {};
          
          if (!user.polling_unit_id) {
            updates.polling_unit_id = `PU-DEFAULT-${user._id.toString().slice(-6)}`;
            updates.polling_unit = 'Default Polling Unit';
          }
          
          if (!user.ward_id) {
            updates.ward_id = `WARD-DEFAULT-${user._id.toString().slice(-6)}`;
            updates.ward = 'Default Ward';
          }
          
          if (!user.lga_id) {
            updates.lga_id = `LGA-DEFAULT-${user._id.toString().slice(-6)}`;
            updates.lga = 'Default LGA';
          }
          
          if (!user.state_id) {
            updates.state_id = 'DEFAULT-STATE';
            updates.state = 'Default State';
          }
          
          if (Object.keys(updates).length > 0) {
            updates.updated_at = new Date();
            
            await this.db.collection('users').updateOne(
              { _id: user._id },
              { $set: updates }
            );
            
            processed++;
            console.log(`   ✅ Updated user ${user.email || user._id} with ${Object.keys(updates).length} fields`);
          }
          
        } catch (error) {
          console.log(`   ❌ Error updating user ${user._id}: ${error.message}`);
          errors++;
        }
      }
      
      this.fixResults.user_geographic_data = {
        status: errors === 0 ? 'success' : 'partial',
        processed: processed,
        errors: errors
      };
      
      console.log(`✅ User geographic data fix completed: ${processed} processed, ${errors} errors\n`);
      
    } catch (error) {
      console.log(`❌ User geographic data fix failed: ${error.message}\n`);
      this.fixResults.user_geographic_data = {
        status: 'failed',
        processed: 0,
        errors: 1,
        error: error.message
      };
    }
  }

  async calculateHierarchicalPositions() {
    console.log('🔥 CALCULATING HIERARCHICAL POSITIONS\n');
    
    try {
      // Clear existing vote_positions collection
      await this.db.collection('vote_positions').deleteMany({});
      console.log('🗑️ Cleared existing vote_positions collection');
      
      // Get all elections
      const elections = await this.db.collection('elections').find({}).toArray();
      
      let totalProcessed = 0;
      let totalErrors = 0;
      
      for (const election of elections) {
        console.log(`📊 Processing election: ${election.title} (${election._id})`);
        
        // Get all votes for this election with user data
        const votes = await this.db.collection('votes').aggregate([
          {
            $match: {
              election_id: election._id.toString(),
              status: 'success'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'voter_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $unwind: '$user'
          },
          {
            $sort: { vote_timestamp: 1, created_at: 1, _id: 1 }
          }
        ]).toArray();
        
        console.log(`   Found ${votes.length} votes with user data`);
        
        // Calculate positions at each level
        const levelPositions = {
          polling_unit: {},
          ward: {},
          lga: {},
          state: {},
          national: 0
        };
        
        for (let i = 0; i < votes.length; i++) {
          const vote = votes[i];
          const user = vote.user;
          
          try {
            // Calculate national position
            levelPositions.national++;
            
            // Calculate level-specific positions
            const levels = {
              polling_unit: user.polling_unit_id,
              ward: user.ward_id,
              lga: user.lga_id,
              state: user.state_id
            };
            
            const positions = { national: levelPositions.national };
            
            Object.entries(levels).forEach(([level, levelId]) => {
              if (levelId) {
                if (!levelPositions[level][levelId]) {
                  levelPositions[level][levelId] = 0;
                }
                levelPositions[level][levelId]++;
                positions[level] = levelPositions[level][levelId];
              }
            });
            
            // Insert position record
            await this.db.collection('vote_positions').insertOne({
              election_id: election._id.toString(),
              user_id: user._id.toString(),
              vote_id: vote._id.toString(),
              sequential_position: vote.sequential_position || (i + 1),
              positions: positions,
              geographic_data: {
                polling_unit_id: user.polling_unit_id,
                polling_unit: user.polling_unit,
                ward_id: user.ward_id,
                ward: user.ward,
                lga_id: user.lga_id,
                lga: user.lga,
                state_id: user.state_id,
                state: user.state
              },
              timestamp: vote.vote_timestamp || vote.created_at,
              created_at: new Date()
            });
            
            totalProcessed++;
            
            if ((i + 1) % 25 === 0 || (i + 1) === votes.length) {
              console.log(`   ✅ Processed ${i + 1}/${votes.length} position records`);
            }
            
          } catch (error) {
            console.log(`   ❌ Error calculating position for vote ${vote._id}: ${error.message}`);
            totalErrors++;
          }
        }
        
        console.log(`   ✅ Completed election: ${votes.length} position records calculated\n`);
      }
      
      this.fixResults.position_calculations = {
        status: totalErrors === 0 ? 'success' : 'partial',
        processed: totalProcessed,
        errors: totalErrors
      };
      
      console.log(`✅ Hierarchical position calculations completed: ${totalProcessed} processed, ${totalErrors} errors\n`);
      
    } catch (error) {
      console.log(`❌ Hierarchical position calculations failed: ${error.message}\n`);
      this.fixResults.position_calculations = {
        status: 'failed',
        processed: 0,
        errors: 1,
        error: error.message
      };
    }
  }

  async generateFixReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 VOTE POSITION FIXES REPORT');
    console.log('='.repeat(80));
    
    Object.entries(this.fixResults).forEach(([fix, result]) => {
      const status = result.status === 'success' ? '✅' : 
                     result.status === 'partial' ? '⚠️' : 
                     result.status === 'pending' ? '⏳' : '❌';
      
      console.log(`\n🔧 ${fix.toUpperCase().replace(/_/g, ' ')}:`);
      console.log(`  ${status} Status: ${result.status}`);
      console.log(`  📊 Processed: ${result.processed}`);
      console.log(`  ❌ Errors: ${result.errors}`);
      
      if (result.error) {
        console.log(`  🚨 Error Details: ${result.error}`);
      }
    });
    
    // Overall status
    const allSuccessful = Object.values(this.fixResults).every(r => r.status === 'success');
    const anyFailed = Object.values(this.fixResults).some(r => r.status === 'failed');
    
    console.log(`\n🎯 OVERALL STATUS: ${allSuccessful ? '✅ ALL FIXES SUCCESSFUL' : anyFailed ? '❌ SOME FIXES FAILED' : '⚠️ PARTIAL SUCCESS'}`);
    
    const totalProcessed = Object.values(this.fixResults).reduce((sum, r) => sum + r.processed, 0);
    const totalErrors = Object.values(this.fixResults).reduce((sum, r) => sum + r.errors, 0);
    
    console.log(`📊 TOTALS: ${totalProcessed} records processed, ${totalErrors} errors`);
    
    console.log('\n' + '='.repeat(80));
    
    if (allSuccessful) {
      console.log('\n🎉 All vote position issues have been fixed!');
      console.log('   You can now test the vote position workflow again.');
    } else if (anyFailed) {
      console.log('\n🚨 Some fixes failed. Please review the errors above.');
      console.log('   You may need to run the fixes again or address issues manually.');
    } else {
      console.log('\n⚠️ Fixes completed with some issues. Review the partial results.');
    }
  }

  async runAllFixes() {
    try {
      await this.initialize();
      
      console.log('🚀 Starting comprehensive vote position fixes...\n');
      
      await this.fixSequentialPositions();
      await this.fixVoteTimestamps();
      await this.fixUserGeographicData();
      await this.calculateHierarchicalPositions();
      
      await this.generateFixReport();
      
    } catch (error) {
      console.error('❌ Fix execution failed:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the fixes
if (require.main === module) {
  const fixer = new VotePositionFixer();
  fixer.runAllFixes().catch(console.error);
}

module.exports = VotePositionFixer;
