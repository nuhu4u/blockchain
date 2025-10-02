/**
 * Disable Biometric Validation Script
 * Temporarily disables schema validation for biometric_data collection
 */

const { MongoClient } = require('mongodb');

async function disableBiometricValidation() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Disabling biometric validation...');
    
    // Run collMod to disable validation
    await db.command({
      collMod: 'biometric_data',
      validator: {}
    });
    
    console.log('✅ Biometric validation disabled successfully!');
    
  } catch (error) {
    console.error('❌ Error disabling biometric validation:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  disableBiometricValidation()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { disableBiometricValidation };
