const { MongoClient } = require('mongodb');
require('dotenv').config();

async function cleanupDatabase() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('=== DATABASE CLEANUP START ===');
    
    // 1. Find invalid elections
    const invalidElections = await db.collection('elections').find({ 
      $or: [
        { contract_address: { $exists: false } }, 
        { contract_address: null }
      ] 
    }).toArray();
    
    console.log(`Found ${invalidElections.length} invalid elections`);
    
    if (invalidElections.length === 0) {
      console.log('✅ No invalid elections found, database is clean');
      return;
    }
    
    // 2. Archive invalid elections instead of deleting them
    console.log('\n📦 Archiving invalid elections...');
    
    for (const election of invalidElections) {
      console.log(`❌ DB Cleanup: Election ${election._id} missing contract_address`);
      console.log(`  Title: ${election.title}`);
      console.log(`  Created: ${election.created_at}`);
      
      // Archive the election by updating its status and adding a cleanup flag
      await db.collection('elections').updateOne(
        { _id: election._id },
        {
          $set: {
            status: 'ARCHIVED_INVALID',
            cleanup_reason: 'Missing contract_address - created before blockchain integration',
            cleanup_date: new Date(),
            archived: true
          }
        }
      );
      
      console.log(`✅ Archived election ${election._id}`);
    }
    
    // 3. Clean up any votes associated with invalid elections
    console.log('\n🗑️ Cleaning up votes for invalid elections...');
    const invalidElectionIds = invalidElections.map(e => e._id);
    
    const votesToClean = await db.collection('votes').find({
      election_id: { $in: invalidElectionIds }
    }).toArray();
    
    if (votesToClean.length > 0) {
      console.log(`Found ${votesToClean.length} votes for invalid elections`);
      
      // Archive votes instead of deleting them
      await db.collection('votes').updateMany(
        { election_id: { $in: invalidElectionIds } },
        {
          $set: {
            status: 'ARCHIVED_INVALID_ELECTION',
            cleanup_reason: 'Associated election missing contract_address',
            cleanup_date: new Date(),
            archived: true
          }
        }
      );
      
      console.log(`✅ Archived ${votesToClean.length} votes`);
    }
    
    // 4. Final validation
    console.log('\n🔍 Final validation...');
    const remainingInvalid = await db.collection('elections').countDocuments({ 
      $or: [
        { contract_address: { $exists: false } }, 
        { contract_address: null }
      ] 
    });
    
    const validElections = await db.collection('elections').countDocuments({ 
      contract_address: { $exists: true, $ne: null } 
    });
    
    console.log(`✅ DB Cleanup: ${validElections} valid elections`);
    console.log(`❌ DB Cleanup: ${remainingInvalid} invalid elections remaining`);
    
    if (remainingInvalid === 0) {
      console.log('🎉 Database cleanup completed successfully!');
    } else {
      console.log('⚠️ Some invalid elections still remain - manual review needed');
    }
    
  } catch (error) {
    console.error('❌ Database cleanup failed:', error);
  } finally {
    await client.close();
  }
}

// Run cleanup
cleanupDatabase().catch(console.error);
