const { MongoClient, ObjectId } = require('mongodb');

async function fixPositionData() {
  const client = new MongoClient('mongodb://localhost:27017/election_system');
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('🔧 Starting position data cleanup...');
    
    // 1. Fix votes collection - add proper geographic data
    console.log('📊 Fixing votes collection...');
    const votesCollection = db.collection('votes');
    const usersCollection = db.collection('users');
    
    const votes = await votesCollection.find({}).toArray();
    console.log(`Found ${votes.length} votes to fix`);
    
    for (const vote of votes) {
      // Get user's geographic data
      const user = await usersCollection.findOne({ _id: new ObjectId(vote.voter_id) });
      
      if (user) {
        const geographicData = {
          polling_unit: user.polling_unit || null,
          ward: user.ward || null,
          lga: user.lga || null,
          state: user.state || null
        };
        
        // Update vote with proper geographic data
        await votesCollection.updateOne(
          { _id: vote._id },
          { 
            $set: { 
              geographic_data: geographicData,
              position_calculated: false // Mark for recalculation
            }
          }
        );
        
        console.log(`✅ Updated vote ${vote._id} with geographic data`);
      }
    }
    
    // 2. Clear existing vote_positions collection
    console.log('🗑️ Clearing existing vote_positions...');
    await db.collection('vote_positions').deleteMany({});
    console.log('✅ Cleared vote_positions collection');
    
    // 3. Fix election vote counts
    console.log('📊 Fixing election vote counts...');
    const electionsCollection = db.collection('elections');
    const elections = await electionsCollection.find({}).toArray();
    
    for (const election of elections) {
      const actualVoteCount = await votesCollection.countDocuments({
        election_id: election._id,
        status: 'success'
      });
      
      // Update election with correct vote count
      await electionsCollection.updateOne(
        { _id: election._id },
        { 
          $set: { 
            total_votes: actualVoteCount,
            votesCast: actualVoteCount
          }
        }
      );
      
      console.log(`✅ Updated election ${election.title}: ${actualVoteCount} votes`);
    }
    
    console.log('🎉 Position data cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error fixing position data:', error);
  } finally {
    await client.close();
  }
}

fixPositionData();
