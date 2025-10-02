/**
 * Check User Status Script
 * Shows current user biometric status
 */

const { MongoClient, ObjectId } = require('mongodb');

async function checkUserStatus() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Checking user biometric status...');
    
    const userId = '68bd515ae17da688856ddf12';
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    
    if (user) {
      console.log('📊 User Biometric Status:');
      console.log(`   biometric_registered: ${user.biometric_registered}`);
      console.log(`   biometric_status: ${user.biometric_status}`);
      console.log(`   biometric_consent: ${user.biometric_consent}`);
      console.log(`   biometric_registered_at: ${user.biometric_registered_at}`);
      console.log(`   biometric_consent_date: ${user.biometric_consent_date}`);
      console.log(`   biometric_failed_attempts: ${user.biometric_failed_attempts}`);
      console.log(`   biometric_last_used: ${user.biometric_last_used}`);
      console.log(`   biometric_locked_until: ${user.biometric_locked_until}`);
    } else {
      console.log('❌ User not found');
    }
    
  } catch (error) {
    console.error('❌ Error checking user status:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  checkUserStatus()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { checkUserStatus };
