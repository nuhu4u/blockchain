/**
 * Disable Logs Validation Script
 * Disables schema validation for biometric_verification_logs collection
 */

const { MongoClient } = require('mongodb');

async function disableLogsValidation() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Disabling logs validation...');
    
    // Run collMod to disable validation
    await db.command({
      collMod: 'biometric_verification_logs',
      validator: {}
    });
    
    console.log('✅ Logs validation disabled successfully!');
    
  } catch (error) {
    console.error('❌ Error disabling logs validation:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  disableLogsValidation()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { disableLogsValidation };
