/**
 * Create Biometric Tables Script
 * Creates tables for biometric voting feature with two-way encryption
 */

const { MongoClient } = require('mongodb');

async function createBiometricTables() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Creating biometric tables...');
    
    // 1. Create biometric_data collection
    await db.createCollection('biometric_data', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_id', 'encrypted_aes_key', 'encrypted_fingerprint', 'encryption_method', 'created_at'],
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
              description: 'AES-256-GCM encrypted fingerprint data'
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
    
    // 2. Create indexes for biometric_data
    await db.collection('biometric_data').createIndex({ user_id: 1 }, { unique: true });
    await db.collection('biometric_data').createIndex({ fingerprint_hash: 1 }, { unique: true });
    await db.collection('biometric_data').createIndex({ is_active: 1 });
    await db.collection('biometric_data').createIndex({ created_at: 1 });
    
    // 3. Create biometric_verification_logs collection
    await db.createCollection('biometric_verification_logs', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_id', 'election_id', 'verification_type', 'status', 'timestamp'],
          properties: {
            user_id: {
              bsonType: 'objectId',
              description: 'Reference to users collection'
            },
            election_id: {
              bsonType: 'string',
              description: 'Election ID for vote verification'
            },
            verification_type: {
              bsonType: 'string',
              enum: ['registration', 'vote_verification', 'authentication'],
              description: 'Type of biometric verification'
            },
            status: {
              bsonType: 'string',
              enum: ['success', 'failed', 'duplicate', 'invalid', 'expired'],
              description: 'Verification result'
            },
            fingerprint_hash: {
              bsonType: 'string',
              description: 'Hash of fingerprint used for verification'
            },
            ip_address: {
              bsonType: 'string',
              description: 'IP address of verification attempt'
            },
            user_agent: {
              bsonType: 'string',
              description: 'User agent of verification attempt'
            },
            error_message: {
              bsonType: 'string',
              description: 'Error message if verification failed'
            },
            timestamp: {
              bsonType: 'date',
              description: 'Verification timestamp'
            }
          }
        }
      }
    });
    
    // 4. Create indexes for biometric_verification_logs
    await db.collection('biometric_verification_logs').createIndex({ user_id: 1 });
    await db.collection('biometric_verification_logs').createIndex({ election_id: 1 });
    await db.collection('biometric_verification_logs').createIndex({ status: 1 });
    await db.collection('biometric_verification_logs').createIndex({ timestamp: 1 });
    await db.collection('biometric_verification_logs').createIndex({ fingerprint_hash: 1 });
    
    // 5. Create biometric_keys collection for RSA key management
    await db.createCollection('biometric_keys', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['key_id', 'public_key', 'private_key_encrypted', 'key_version', 'created_at'],
          properties: {
            key_id: {
              bsonType: 'string',
              description: 'Unique key identifier'
            },
            public_key: {
              bsonType: 'string',
              description: 'RSA public key in PEM format'
            },
            private_key_encrypted: {
              bsonType: 'string',
              description: 'Encrypted RSA private key'
            },
            key_version: {
              bsonType: 'string',
              description: 'Version of the key pair'
            },
            is_active: {
              bsonType: 'bool',
              description: 'Whether key is currently active'
            },
            created_at: {
              bsonType: 'date',
              description: 'Key creation timestamp'
            },
            expires_at: {
              bsonType: 'date',
              description: 'Key expiration timestamp'
            }
          }
        }
      }
    });
    
    // 6. Create indexes for biometric_keys
    await db.collection('biometric_keys').createIndex({ key_id: 1 }, { unique: true });
    await db.collection('biometric_keys').createIndex({ is_active: 1 });
    await db.collection('biometric_keys').createIndex({ key_version: 1 });
    
    console.log('✅ Biometric tables created successfully!');
    console.log('📊 Created collections:');
    console.log('   - biometric_data');
    console.log('   - biometric_verification_logs');
    console.log('   - biometric_keys');
    
  } catch (error) {
    console.error('❌ Error creating biometric tables:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  createBiometricTables()
    .then(() => {
      console.log('🎉 Biometric tables setup completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Failed to create biometric tables:', error);
      process.exit(1);
    });
}

module.exports = { createBiometricTables };
