const { MongoClient } = require('mongodb');
require('dotenv').config();

class StartupValidation {
  static async validateDatabase() {
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      console.log('\n🔍 === STARTUP DATABASE VALIDATION ===');
      
      // 1. Check collections
      const collections = await db.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);
      
      console.log('📋 Collections found:', collectionNames);
      
      // Check for candidates collection (should not exist)
      if (collectionNames.includes('candidates')) {
        console.log('❌ Startup Validation: Found unused candidates collection');
        const candidatesCount = await db.collection('candidates').countDocuments();
        if (candidatesCount === 0) {
          await db.collection('candidates').drop();
          console.log('✅ Startup Validation: Dropped empty candidates collection');
        } else {
          console.log(`⚠️ Startup Validation: Candidates collection has ${candidatesCount} documents - manual review needed`);
        }
      } else {
        console.log('✅ Startup Validation: No candidates collection found');
      }
      
      // 2. Validate elections
      const totalElections = await db.collection('elections').countDocuments();
      const validElections = await db.collection('elections').countDocuments({ 
        contract_address: { $exists: true, $ne: null },
        archived: { $ne: true }
      });
      const invalidElections = await db.collection('elections').countDocuments({ 
        $or: [
          { contract_address: { $exists: false } }, 
          { contract_address: null }
        ],
        archived: { $ne: true }
      });
      const archivedElections = await db.collection('elections').countDocuments({
        archived: true
      });
      
      console.log(`\n📊 Elections Summary:`);
      console.log(`  Total elections: ${totalElections}`);
      console.log(`  Valid elections: ${validElections}`);
      console.log(`  Invalid elections: ${invalidElections}`);
      console.log(`  Archived elections: ${archivedElections}`);
      
      // 3. Report invalid elections
      if (invalidElections > 0) {
        console.log('\n❌ Startup Validation: Found invalid elections');
        const invalid = await db.collection('elections').find({ 
          $or: [
            { contract_address: { $exists: false } }, 
            { contract_address: null }
          ],
          archived: { $ne: true }
        }).toArray();
        
        invalid.forEach(election => {
          console.log(`  ❌ Election ${election._id}: ${election.title} - missing contract_address`);
        });
        
        console.log('\n⚠️ Startup Validation: Invalid elections detected - consider running cleanup script');
      }
      
      // 4. Check votes for invalid elections
      if (invalidElections > 0) {
        const invalidElectionIds = await db.collection('elections').find({ 
          $or: [
            { contract_address: { $exists: false } }, 
            { contract_address: null }
          ],
          archived: { $ne: true }
        }).map(e => e._id).toArray();
        
        const invalidVotes = await db.collection('votes').countDocuments({
          election_id: { $in: invalidElectionIds }
        });
        
        if (invalidVotes > 0) {
          console.log(`⚠️ Startup Validation: Found ${invalidVotes} votes for invalid elections`);
        }
      }
      
      // 5. Final summary
      console.log('\n=== STARTUP VALIDATION SUMMARY ===');
      console.log(`✅ DB Validation: ${validElections} valid elections`);
      console.log(`❌ DB Validation: ${invalidElections} invalid elections`);
      console.log(`📦 DB Validation: ${archivedElections} archived elections`);
      
      if (invalidElections === 0) {
        console.log('🎉 All active elections have valid contract addresses!');
        return { valid: true, invalidCount: 0 };
      } else {
        console.log('⚠️ Some elections need attention - consider running cleanup script');
        return { valid: false, invalidCount: invalidElections };
      }
      
    } catch (error) {
      console.error('❌ Startup Validation failed:', error);
      return { valid: false, error: error.message };
    } finally {
      await client.close();
    }
  }
  
  static async validateEnvironment() {
    console.log('\n🔧 === STARTUP ENVIRONMENT VALIDATION ===');
    
    const requiredEnvVars = [
      'DATABASE_URL',
      'JWT_SECRET',
      'BLOCKCHAIN_RPC_URL',
      'ADMIN_WALLET_ADDRESS',
      'ADMIN_PRIVATE_KEY',
      'ENCRYPTION_KEY'
    ];
    
    let allValid = true;
    
    requiredEnvVars.forEach(envVar => {
      if (!process.env[envVar]) {
        console.log(`❌ Environment Validation: Missing ${envVar}`);
        allValid = false;
      } else {
        console.log(`✅ Environment Validation: ${envVar} is set`);
      }
    });
    
    if (allValid) {
      console.log('🎉 All required environment variables are set!');
    } else {
      console.log('⚠️ Some environment variables are missing - check .env file');
    }
    
    return { valid: allValid };
  }
}

module.exports = StartupValidation;
