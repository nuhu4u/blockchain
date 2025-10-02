/**
 * Debug Validation Script
 * Gets detailed validation error information
 */

const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');

// Generate RSA key pair for encryption
function generateRSAKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });
  
  return { publicKey, privateKey };
}

// Generate AES key for fingerprint encryption
function generateAESKey() {
  return crypto.randomBytes(32); // 256-bit key
}

// Encrypt data with AES-256-CBC
function encryptWithAES(data, key) {
  const iv = crypto.randomBytes(16); // 128-bit IV for CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    encrypted,
    iv: iv.toString('hex')
  };
}

// Generate fingerprint hash for duplicate detection
function generateFingerprintHash(fingerprintData) {
  return crypto.createHash('sha256').update(fingerprintData).digest('hex');
}

// Encrypt AES key with RSA
function encryptAESKeyWithRSA(aesKey, publicKey) {
  return crypto.publicEncrypt(publicKey, aesKey);
}

async function debugValidation() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔐 Debugging validation...');
    
    const userId = '68bd515ae17da688856ddf12';
    const fingerprintData = 'test123';
    
    // Generate fingerprint hash for duplicate detection
    const fingerprintHash = generateFingerprintHash(fingerprintData);
    
    // Generate encryption keys
    const { publicKey, privateKey } = generateRSAKeyPair();
    const aesKey = generateAESKey();
    
    // Encrypt fingerprint data with AES
    const encryptedFingerprint = encryptWithAES(fingerprintData, aesKey);
    
    // Encrypt AES key with RSA
    const encryptedAesKey = encryptAESKeyWithRSA(aesKey, publicKey);
    
    // Store biometric data
    const biometricData = {
      user_id: new ObjectId(userId),
      encrypted_aes_key: encryptedAesKey.toString('hex'),
      encrypted_fingerprint: encryptedFingerprint.encrypted,
      fingerprint_iv: encryptedFingerprint.iv,
      encryption_method: 'RSA-2048 + AES-256-CBC',
      key_version: 'v1.0',
      fingerprint_hash: fingerprintHash,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      last_used: null
    };
    
    console.log('📝 Document to validate:');
    console.log(JSON.stringify(biometricData, null, 2));
    
    // Try to validate the document
    try {
      await db.collection('biometric_data').insertOne(biometricData);
      console.log('✅ Document is valid!');
    } catch (error) {
      console.log('❌ Validation failed:');
      console.log('Error:', error.message);
      console.log('Error Response:', JSON.stringify(error.errorResponse, null, 2));
      
      if (error.errorResponse && error.errorResponse.errInfo && error.errorResponse.errInfo.details) {
        console.log('Validation Details:', JSON.stringify(error.errorResponse.errInfo.details, null, 2));
      }
    }
    
  } catch (error) {
    console.error('❌ Error debugging validation:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  debugValidation()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { debugValidation };
