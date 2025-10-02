/**
 * Clear Biometric Data Script
 * Clears existing biometric data for testing
 */

const { MongoClient, ObjectId } = require('mongodb');

async function clearBiometricData() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Clearing biometric data...');
    
    // Clear biometric data for the user
    const result = await db.collection('biometric_data').deleteMany({
      user_id: new ObjectId('68bd515ae17da688856ddf12')
    });
    
    console.log(`✅ Cleared ${result.deletedCount} biometric records`);
    
    // Also clear any verification logs
    const logResult = await db.collection('biometric_verification_logs').deleteMany({
      user_id: new ObjectId('68bd515ae17da688856ddf12')
    });
    
    console.log(`✅ Cleared ${logResult.deletedCount} verification log records`);
    
    console.log('🎉 Biometric data cleared successfully!');
    
  } catch (error) {
    console.error('❌ Error clearing biometric data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  clearBiometricData()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { clearBiometricData };
