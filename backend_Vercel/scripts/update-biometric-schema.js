/**
 * Update Biometric Schema Script
 * Updates the biometric_data collection schema to support both GCM and CBC encryption
 */

const { MongoClient } = require('mongodb');

async function updateBiometricSchema() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Updating biometric schema...');
    
    // Drop the existing collection
    try {
      await db.collection('biometric_data').drop();
      console.log('✅ Dropped existing biometric_data collection');
    } catch (error) {
      console.log('⚠️ Collection might not exist:', error.message);
    }
    
    // Create the collection with updated schema
    await db.createCollection('biometric_data', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_id', 'encrypted_aes_key', 'encrypted_fingerprint', 'fingerprint_iv', 'encryption_method', 'created_at'],
          properties: {
            user_id: {
              bsonType: 'objectId',
              description: 'Reference to users collection'
            },
            encrypted_aes_key: {
              bsonType: 'string',
              description: 'RSA-2048 encrypted AES key'
            },
            encrypted_fingerprint: {
              bsonType: 'string',
              description: 'AES encrypted fingerprint data'
            },
            fingerprint_iv: {
              bsonType: 'string',
              description: 'Initialization vector for CBC encryption'
            },
            encryption_method: {
              bsonType: 'string',
              enum: ['RSA-2048 + AES-256-GCM', 'RSA-2048 + AES-256-CBC'],
              description: 'Encryption method used'
            },
            key_version: {
              bsonType: 'string',
              description: 'Version of encryption keys'
            },
            fingerprint_hash: {
              bsonType: 'string',
              description: 'SHA-256 hash for duplicate detection'
            },
            is_active: {
              bsonType: 'bool',
              description: 'Whether biometric is active'
            },
            created_at: {
              bsonType: 'date',
              description: 'Registration timestamp'
            },
            updated_at: {
              bsonType: 'date',
              description: 'Last update timestamp'
            },
            last_used: {
              bsonType: 'date',
              description: 'Last successful authentication'
            }
          }
        }
      }
    });
    
    console.log('✅ Created biometric_data collection with updated schema');
    
    // Create indexes
    await db.collection('biometric_data').createIndex({ user_id: 1 });
    await db.collection('biometric_data').createIndex({ fingerprint_hash: 1 });
    await db.collection('biometric_data').createIndex({ is_active: 1 });
    
    console.log('✅ Created indexes for biometric_data collection');
    
    console.log('🎉 Biometric schema update completed successfully!');
    
  } catch (error) {
    console.error('❌ Error updating biometric schema:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  updateBiometricSchema()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { updateBiometricSchema };
