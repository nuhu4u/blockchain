/**
 * Update Users Collection for Biometric Feature
 * Adds biometric-related fields to existing users collection
 */

const { MongoClient } = require('mongodb');

async function updateUsersBiometric() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('👤 Updating users collection for biometric feature...');
    
    // Add biometric fields to existing users
    const usersCollection = db.collection('users');
    
    // Update all users to add biometric fields
    const updateResult = await usersCollection.updateMany(
      {}, // Update all users
      {
        $set: {
          biometric_registered: false,
          biometric_registered_at: null,
          biometric_last_used: null,
          biometric_failed_attempts: 0,
          biometric_locked_until: null,
          biometric_status: 'pending', // pending, registered, locked, disabled
          biometric_consent: false,
          biometric_consent_date: null
        }
      }
    );
    
    console.log(`✅ Updated ${updateResult.modifiedCount} users with biometric fields`);
    
    // Create indexes for biometric fields
    await usersCollection.createIndex({ biometric_registered: 1 });
    await usersCollection.createIndex({ biometric_status: 1 });
    await usersCollection.createIndex({ biometric_registered_at: 1 });
    
    console.log('✅ Biometric indexes created for users collection');
    
    // Verify the update
    const sampleUser = await usersCollection.findOne({}, { 
      projection: { 
        first_name: 1, 
        last_name: 1, 
        biometric_registered: 1, 
        biometric_status: 1 
      } 
    });
    
    if (sampleUser) {
      console.log('📋 Sample user biometric fields:');
      console.log(`   - biometric_registered: ${sampleUser.biometric_registered}`);
      console.log(`   - biometric_status: ${sampleUser.biometric_status}`);
    }
    
  } catch (error) {
    console.error('❌ Error updating users collection:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  updateUsersBiometric()
    .then(() => {
      console.log('🎉 Users collection updated successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Failed to update users collection:', error);
      process.exit(1);
    });
}

module.exports = { updateUsersBiometric };
