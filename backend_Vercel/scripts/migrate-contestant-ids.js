#!/usr/bin/env node

/**
 * Migration Script: Convert Contestant IDs from ObjectId to String
 * 
 * This script scans all elections and converts contestant IDs from ObjectId format
 * to string format to fix the "Invalid candidate selected" error.
 * 
 * Usage: node scripts/migrate-contestant-ids.js
 */

require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function migrateContestantIds() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    console.log('🚀 Starting contestant ID migration...');
    await client.connect();
    const db = client.db('election_system');
    
    // Get all elections
    const elections = await db.collection('elections').find({}).toArray();
    console.log(`📊 Found ${elections.length} elections to process`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    
    for (const election of elections) {
      try {
        console.log(`\n🔍 Processing election: ${election.title} (${election._id})`);
        
        // Check if contestants have ObjectId IDs that need conversion
        const needsMigration = election.contestants?.some(contestant => 
          contestant.id && typeof contestant.id === 'object' && contestant.id.$oid
        );
        
        if (!needsMigration) {
          console.log(`✅ Migration skipped for "${election.title}" (already strings)`);
          skippedCount++;
          continue;
        }
        
        // Convert contestant IDs to strings
        const updatedContestants = election.contestants.map(contestant => {
          if (contestant.id && typeof contestant.id === 'object' && contestant.id.$oid) {
            // Convert ObjectId to string
            return {
              ...contestant,
              id: contestant.id.$oid
            };
          } else if (contestant.id && typeof contestant.id === 'object') {
            // Handle direct ObjectId
            return {
              ...contestant,
              id: contestant.id.toString()
            };
          }
          // Already a string, keep as is
          return contestant;
        });
        
        // Update the election
        const updateResult = await db.collection('elections').updateOne(
          { _id: election._id },
          { $set: { contestants: updatedContestants } }
        );
        
        if (updateResult.modifiedCount > 0) {
          console.log(`✅ Migrated election "${election.title}", updated ${updatedContestants.length} contestants`);
          migratedCount++;
        } else {
          console.log(`⚠️ No changes made to election "${election.title}"`);
          skippedCount++;
        }
        
      } catch (error) {
        console.error(`❌ Error processing election "${election.title}":`, error.message);
        errorCount++;
      }
    }
    
    console.log('\n🎯 MIGRATION SUMMARY:');
    console.log(`  ✅ Migrated: ${migratedCount} elections`);
    console.log(`  ⏭️ Skipped: ${skippedCount} elections`);
    console.log(`  ❌ Errors: ${errorCount} elections`);
    console.log(`  📊 Total: ${elections.length} elections processed`);
    
    if (migratedCount > 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log('🎉 Contestant IDs are now stored as strings.');
      console.log('🗳️ Voting should now work without "Invalid candidate selected" errors.');
    } else {
      console.log('\n✅ No migration needed - all contestant IDs are already strings.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateContestantIds()
    .then(() => {
      console.log('\n🚀 Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateContestantIds };
