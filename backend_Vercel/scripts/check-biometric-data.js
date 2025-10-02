/**
 * Check Biometric Data Script
 * Shows what's stored in the biometric_data collection
 */

const { MongoClient, ObjectId } = require('mongodb');

async function checkBiometricData() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Checking biometric data...');
    
    const biometricData = await db.collection('biometric_data').find({}).toArray();
    
    console.log(`📊 Found ${biometricData.length} biometric records:`);
    
    biometricData.forEach((record, index) => {
      console.log(`\n${index + 1}. User ID: ${record.user_id}`);
      console.log(`   Encryption Method: ${record.encryption_method}`);
      console.log(`   Key Version: ${record.key_version}`);
      console.log(`   Fingerprint Hash: ${record.fingerprint_hash}`);
      console.log(`   Encrypted AES Key: ${record.encrypted_aes_key.substring(0, 50)}...`);
      console.log(`   Encrypted Fingerprint: ${record.encrypted_fingerprint.substring(0, 50)}...`);
      console.log(`   Fingerprint IV: ${record.fingerprint_iv}`);
      console.log(`   Is Active: ${record.is_active}`);
      console.log(`   Created At: ${record.created_at}`);
      console.log(`   Last Used: ${record.last_used}`);
    });
    
  } catch (error) {
    console.error('❌ Error checking biometric data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  checkBiometricData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { checkBiometricData };
