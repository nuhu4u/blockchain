/**
 * Update Votes Collection for Biometric Verification
 * Adds biometric verification fields to existing votes collection
 */

const { MongoClient } = require('mongodb');

async function updateVotesBiometric() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🗳️ Updating votes collection for biometric verification...');
    
    // Add biometric verification fields to existing votes
    const votesCollection = db.collection('votes');
    
    // Update all existing votes to add biometric fields
    const updateResult = await votesCollection.updateMany(
      {}, // Update all votes
      {
        $set: {
          biometric_verified: false,
          biometric_verification_timestamp: null,
          biometric_fingerprint_hash: null,
          biometric_verification_method: 'none', // none, fingerprint, face_id, touch_id
          biometric_verification_status: 'not_required' // not_required, pending, verified, failed
        }
      }
    );
    
    console.log(`✅ Updated ${updateResult.modifiedCount} votes with biometric fields`);
    
    // Create indexes for biometric fields
    await votesCollection.createIndex({ biometric_verified: 1 });
    await votesCollection.createIndex({ biometric_verification_timestamp: 1 });
    await votesCollection.createIndex({ biometric_fingerprint_hash: 1 });
    await votesCollection.createIndex({ biometric_verification_status: 1 });
    
    console.log('✅ Biometric indexes created for votes collection');
    
    // Verify the update
    const sampleVote = await votesCollection.findOne({}, { 
      projection: { 
        election_id: 1, 
        voter_id: 1, 
        biometric_verified: 1, 
        biometric_verification_status: 1 
      } 
    });
    
    if (sampleVote) {
      console.log('📋 Sample vote biometric fields:');
      console.log(`   - biometric_verified: ${sampleVote.biometric_verified}`);
      console.log(`   - biometric_verification_status: ${sampleVote.biometric_verification_status}`);
    }
    
  } catch (error) {
    console.error('❌ Error updating votes collection:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  updateVotesBiometric()
    .then(() => {
      console.log('🎉 Votes collection updated successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Failed to update votes collection:', error);
      process.exit(1);
    });
}

module.exports = { updateVotesBiometric };
