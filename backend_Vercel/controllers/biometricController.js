const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');
const { ApiError } = require('../utils/apiError');
const logger = require('../utils/logger');

/**
 * Biometric Controller
 * Handles biometric registration and verification with two-way encryption
 */

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

// Decrypt data with AES-256-CBC
function decryptWithAES(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Encrypt AES key with RSA
function encryptAESKeyWithRSA(aesKey, publicKey) {
  return crypto.publicEncrypt(publicKey, aesKey);
}

// Decrypt AES key with RSA
function decryptAESKeyWithRSA(encryptedAesKey, privateKey) {
  return crypto.privateDecrypt(privateKey, encryptedAesKey);
}

// Generate fingerprint hash for duplicate detection
function generateFingerprintHash(fingerprintData) {
  return crypto.createHash('sha256').update(fingerprintData).digest('hex');
}

/**
 * Register user's biometric fingerprint
 */
async function registerBiometric(req, res) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    const { fingerprintData, consent } = req.body;
    const userId = req.user.id;
    
    console.log(`🔐 Registering biometric for user: ${userId}`);
    
    // Validate input
    if (!fingerprintData || !consent) {
      throw new ApiError('Fingerprint data and consent are required', 400);
    }
    
    if (!consent) {
      throw new ApiError('User consent is required for biometric registration', 400);
    }
    
    // Check if user already has biometric registered
    const existingBiometric = await db.collection('biometric_data').findOne({ user_id: new ObjectId(userId) });
    if (existingBiometric) {
      throw new ApiError('Biometric already registered for this user', 409);
    }
    
    // Generate fingerprint hash for duplicate detection
    const fingerprintHash = generateFingerprintHash(fingerprintData);
    
    // Debug logging
    console.log(`🔐 DEBUG: Registration attempt for user ${userId}`);
    console.log(`🔐 DEBUG: Received fingerprintData: "${fingerprintData}"`);
    console.log(`🔐 DEBUG: Received fingerprintData type: ${typeof fingerprintData}`);
    console.log(`🔐 DEBUG: Received fingerprintData length: ${fingerprintData?.length}`);
    console.log(`🔐 DEBUG: Generated hash: ${fingerprintHash}`);
    
    // Check for duplicate fingerprints
    const duplicateBiometric = await db.collection('biometric_data').findOne({ fingerprint_hash: fingerprintHash });
    if (duplicateBiometric) {
      throw new ApiError('This fingerprint is already registered by another user', 409);
    }
    
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
      last_used: null // Will be updated when first used
    };
    
    // Store RSA keys separately
    const keyData = {
      key_id: `key_${userId}_${Date.now()}`,
      public_key: publicKey,
      private_key_encrypted: privateKey, // In production, encrypt this with master key
      key_version: 'v1.0',
      is_active: true,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    };
    
    // Insert biometric data and keys
    await db.collection('biometric_data').insertOne(biometricData);
    await db.collection('biometric_keys').insertOne(keyData);
    
    // Update user's biometric status
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          biometric_registered: true,
          biometric_status: 'registered',
          biometric_consent: true,
          biometric_consent_date: new Date(),
          biometric_registered_at: new Date(),
          biometric_failed_attempts: 0
        }
      }
    );
    
    // Log registration
    await db.collection('biometric_verification_logs').insertOne({
      user_id: new ObjectId(userId),
      election_id: null,
      verification_type: 'registration',
      status: 'success',
      fingerprint_hash: fingerprintHash,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      timestamp: new Date()
    });
    
    // Update user's biometric status
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          biometric_registered: true,
          biometric_registered_at: new Date(),
          biometric_status: 'registered',
          biometric_consent: true,
          biometric_consent_date: new Date(),
          updated_at: new Date()
        }
      }
    );
    
    console.log(`✅ Biometric registered successfully for user: ${userId}`);
    
    res.json({
      success: true,
      message: 'Biometric registered successfully',
      data: {
        biometric_registered: true,
        registration_date: new Date(),
        encryption_method: 'RSA-2048 + AES-256-CBC'
      }
    });
    
  } catch (error) {
    console.error('❌ Error registering biometric:', error);
    console.error('❌ Error stack:', error.stack);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      name: error.name
    });
    
    // Log failed registration
    try {
      const db = client.db('election_system');
      await db.collection('biometric_verification_logs').insertOne({
        user_id: new ObjectId(req.user.id),
        election_id: null,
        verification_type: 'registration',
        status: 'failed',
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        error_message: error.message,
        error_stack: error.stack,
        timestamp: new Date()
      });
    } catch (logError) {
      console.error('❌ Error logging failed registration:', logError);
    }
    
    if (error instanceof ApiError) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error during biometric registration',
        error: error.message
      });
    }
  } finally {
    await client.close();
  }
}

/**
 * Verify biometric for voting
 */
async function verifyBiometric(req, res) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    const { fingerprintData, electionId } = req.body;
    const userId = req.user.id;
    
    console.log(`🔐 Verifying biometric for user: ${userId}, election: ${electionId}`);
    
    // Validate input
    if (!fingerprintData || !electionId) {
      throw new ApiError('Fingerprint data and election ID are required', 400);
    }
    
    // Check if user has registered biometric
    const biometricData = await db.collection('biometric_data').findOne({ 
      user_id: new ObjectId(userId),
      is_active: true
    });
    
    if (!biometricData) {
      throw new ApiError('No biometric registered for this user', 404);
    }
    
    // Generate fingerprint hash for verification
    const fingerprintHash = generateFingerprintHash(fingerprintData);
    
    // Debug logging
    console.log(`🔐 DEBUG: Verification attempt for user ${userId}`);
    console.log(`🔐 DEBUG: Received fingerprintData: "${fingerprintData}"`);
    console.log(`🔐 DEBUG: Received fingerprintData type: ${typeof fingerprintData}`);
    console.log(`🔐 DEBUG: Received fingerprintData length: ${fingerprintData?.length}`);
    console.log(`🔐 DEBUG: Generated hash: ${fingerprintHash}`);
    console.log(`🔐 DEBUG: Stored hash: ${biometricData.fingerprint_hash}`);
    console.log(`🔐 DEBUG: Hashes match: ${biometricData.fingerprint_hash === fingerprintHash}`);
    
    // Verify fingerprint matches
    if (biometricData.fingerprint_hash !== fingerprintHash) {
      // Log failed verification
      await db.collection('biometric_verification_logs').insertOne({
        user_id: new ObjectId(userId),
        election_id: electionId,
        verification_type: 'vote_verification',
        status: 'failed',
        fingerprint_hash: fingerprintHash,
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        error_message: 'Fingerprint does not match',
        timestamp: new Date()
      });
      
      throw new ApiError('Fingerprint verification failed', 401);
    }
    
    // Check if user has already voted in this election
    const existingVote = await db.collection('votes').findOne({
      election_id: electionId,
      voter_id: userId,
      status: 'success'
    });
    
    if (existingVote) {
      // Log duplicate vote attempt
      await db.collection('biometric_verification_logs').insertOne({
        user_id: new ObjectId(userId),
        election_id: electionId,
        verification_type: 'vote_verification',
        status: 'duplicate',
        fingerprint_hash: fingerprintHash,
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        error_message: 'User has already voted in this election',
        timestamp: new Date()
      });
      
      throw new ApiError('You have already voted in this election', 409);
    }
    
    // Update biometric last used
    await db.collection('biometric_data').updateOne(
      { user_id: new ObjectId(userId) },
      { $set: { last_used: new Date() } }
    );
    
    // Log successful verification
    await db.collection('biometric_verification_logs').insertOne({
      user_id: new ObjectId(userId),
      election_id: electionId,
      verification_type: 'vote_verification',
      status: 'success',
      fingerprint_hash: fingerprintHash,
      ip_address: req.ip,
      user_agent: req.get('User-Agent'),
      timestamp: new Date()
    });
    
    console.log(`✅ Biometric verified successfully for user: ${userId}`);
    
    res.json({
      success: true,
      message: 'Biometric verification successful',
      data: {
        verified: true,
        user_id: userId,
        election_id: electionId,
        verification_timestamp: new Date()
      }
    });
    
  } catch (error) {
    console.error('❌ Error verifying biometric:', error);
    
    if (error instanceof ApiError) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error during biometric verification'
      });
    }
  } finally {
    await client.close();
  }
}

/**
 * Get biometric registration status
 */
async function getBiometricStatus(req, res) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    const userId = req.user.id;
    
    console.log(`🔍 Getting biometric status for user: ${userId}`);
    
    // Get user's biometric status
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(userId) },
      { 
        projection: { 
          biometric_registered: 1, 
          biometric_status: 1, 
          biometric_registered_at: 1,
          biometric_consent: 1,
          biometric_failed_attempts: 1
        } 
      }
    );
    
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    
    res.json({
      success: true,
      data: {
        biometric_registered: user.biometric_registered || false,
        biometric_status: user.biometric_status || 'pending',
        biometric_registered_at: user.biometric_registered_at,
        biometric_consent: user.biometric_consent || false,
        biometric_failed_attempts: user.biometric_failed_attempts || 0
      }
    });
    
  } catch (error) {
    console.error('❌ Error getting biometric status:', error);
    
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error getting biometric status'
      });
    }
  } finally {
    await client.close();
  }
}

/**
 * Check for duplicate fingerprints
 */
async function checkDuplicateFingerprint(req, res) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    const { fingerprintData } = req.body;
    
    if (!fingerprintData) {
      throw new ApiError('Fingerprint data is required', 400);
    }
    
    // Generate fingerprint hash
    const fingerprintHash = generateFingerprintHash(fingerprintData);
    
    // Check for duplicates
    const existingBiometric = await db.collection('biometric_data').findOne({ 
      fingerprint_hash: fingerprintHash 
    });
    
    res.json({
      success: true,
      data: {
        is_duplicate: !!existingBiometric,
        fingerprint_hash: fingerprintHash
      }
    });
    
  } catch (error) {
    console.error('❌ Error checking duplicate fingerprint:', error);
    
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error checking duplicate fingerprint'
      });
    }
  } finally {
    await client.close();
  }
}

module.exports = {
  registerBiometric,
  verifyBiometric,
  getBiometricStatus,
  checkDuplicateFingerprint
};
