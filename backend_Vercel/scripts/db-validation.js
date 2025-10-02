const { MongoClient } = require('mongodb');
require('dotenv').config();

async function validateDatabase() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('=== DATABASE VALIDATION START ===');
    
    // 1. Check collections
    console.log('\n1️⃣ Checking collections...');
    const collections = await db.listCollections().toArray();
    console.log('Collections found:', collections.map(c => c.name));
    
    const candidatesExists = collections.some(c => c.name === 'candidates');
    console.log('Candidates collection exists:', candidatesExists);
    
    if (candidatesExists) {
      const candidatesCount = await db.collection('candidates').countDocuments();
      console.log('Candidates count:', candidatesCount);
      if (candidatesCount === 0) {
        console.log('✅ Candidates collection is empty, can be dropped');
        await db.collection('candidates').drop();
        console.log('✅ Candidates collection dropped');
      } else {
        console.log('⚠️ Candidates collection has data, manual review needed');
      }
    } else {
      console.log('✅ Candidates collection does not exist');
    }
    
    // 2. Validate elections
    console.log('\n2️⃣ Validating elections...');
    const totalElections = await db.collection('elections').countDocuments();
    console.log('Total elections:', totalElections);
    
    const validElections = await db.collection('elections').countDocuments({ 
      contract_address: { $exists: true, $ne: null } 
    });
    console.log('Elections with contract_address:', validElections);
    
    const invalidElections = await db.collection('elections').countDocuments({ 
      contract_address: { $exists: false },
      archived: { $ne: true }
    });
    console.log('Elections missing contract_address:', invalidElections);
    
    const nullContractElections = await db.collection('elections').countDocuments({ 
      contract_address: null,
      archived: { $ne: true }
    });
    console.log('Elections with null contract_address:', nullContractElections);
    
    const archivedElections = await db.collection('elections').countDocuments({
      archived: true
    });
    console.log('Archived elections:', archivedElections);
    
    // 3. Report invalid elections
    if (invalidElections > 0 || nullContractElections > 0) {
      console.log('\n❌ DB Cleanup: Found invalid elections');
      const invalid = await db.collection('elections').find({ 
        $or: [
          { contract_address: { $exists: false } }, 
          { contract_address: null }
        ],
        archived: { $ne: true }
      }).toArray();
      
      invalid.forEach(election => {
        console.log(`❌ DB Cleanup: Election ${election._id} missing contract_address`);
        console.log(`  Title: ${election.title}`);
        console.log(`  Created: ${election.created_at}`);
        console.log(`  Status: ${election.status}`);
      });
    }
    
    // 4. Summary
    console.log('\n=== VALIDATION SUMMARY ===');
    console.log(`✅ DB Validation: ${validElections} valid elections`);
    console.log(`❌ DB Validation: ${invalidElections + nullContractElections} invalid elections`);
    console.log(`📦 DB Validation: ${archivedElections} archived elections`);
    
    if (invalidElections + nullContractElections === 0) {
      console.log('🎉 All active elections have valid contract addresses!');
    } else {
      console.log('⚠️ Some elections need attention - consider archiving or deleting invalid ones');
    }
    
  } catch (error) {
    console.error('❌ Database validation failed:', error);
  } finally {
    await client.close();
  }
}

// Run validation
validateDatabase().catch(console.error);
