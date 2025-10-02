/**
 * Enable Biometric Validation Script
 * Re-enables proper schema validation for biometric_data collection
 */

const { MongoClient } = require('mongodb');

async function enableBiometricValidation() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Enabling biometric validation...');
    
    // Run collMod to enable validation with proper schema
    await db.command({
      collMod: 'biometric_data',
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
              enum: ['RSA-2048 + AES-256-CBC'],
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
              bsonType: ['date', 'null'],
              description: 'Last successful authentication'
            }
          }
        }
      }
    });
    
    console.log('✅ Biometric validation enabled with proper schema!');
    
  } catch (error) {
    console.error('❌ Error enabling biometric validation:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  enableBiometricValidation()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { enableBiometricValidation };
