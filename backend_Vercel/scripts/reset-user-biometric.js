/**
 * Reset User Biometric Script
 * Resets user's biometric status so they can register again
 */

const { MongoClient, ObjectId } = require('mongodb');

async function resetUserBiometric() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Resetting user biometric status...');
    
    const userId = '68bd515ae17da688856ddf12';
    
    // Reset user's biometric status
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          biometric_registered: false,
          biometric_registered_at: null,
          biometric_status: 'pending',
          biometric_consent: false,
          biometric_consent_date: null,
          biometric_failed_attempts: 0,
          biometric_last_used: null,
          biometric_locked_until: null,
          updated_at: new Date()
        }
      }
    );
    
    console.log(`✅ Updated user biometric status: ${result.modifiedCount} records`);
    
    // Also clear any existing biometric data for this user
    const biometricResult = await db.collection('biometric_data').deleteMany({
      user_id: new ObjectId(userId)
    });
    
    console.log(`✅ Cleared ${biometricResult.deletedCount} biometric records`);
    
    console.log('🎉 User biometric status reset successfully!');
    
  } catch (error) {
    console.error('❌ Error resetting user biometric:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  resetUserBiometric()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { resetUserBiometric };
