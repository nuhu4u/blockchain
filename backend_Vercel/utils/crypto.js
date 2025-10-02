const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

// Encryption configuration
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // 16 bytes for AES-256-CBC

/**
 * Validates that encryption key is set
 */
const validateEncryptionKey = () => {
  if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not set in environment variables. Please add it to your .env file and restart the application.');
  }
};

/**
 * Encrypts data using AES-256-CBC
 */
const encrypt = (data) => {
  try {
    validateEncryptionKey();
    
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    logger.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts data using AES-256-CBC
 */
const decrypt = (encryptedData) => {
  try {
    validateEncryptionKey();
    
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    logger.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Generates a random encryption key
 */
const generateEncryptionKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Creates SHA-256 hash
 */
const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * XORs two hexadecimal strings (handles different lengths)
 */
const xorHexStrings = (a, b) => {
  // Ensure both strings are the same length by padding with zeros
  const maxLength = Math.max(a.length, b.length);
  const paddedA = a.padStart(maxLength, '0');
  const paddedB = b.padStart(maxLength, '0');
  
  let result = '';
  for (let i = 0; i < maxLength; i++) {
    result += (parseInt(paddedA[i], 16) ^ parseInt(paddedB[i], 16)).toString(16);
  }
  return result;
};

/**
 * Multi-layer NIN encryption that stores only the final encrypted value
 * Process: NIN → AES-256-CBC → SHA-256 → HMAC-SHA256 → Final encrypted value
 */
const encryptNIN = (nin) => {
  try {
    validateEncryptionKey();
    
    // Layer 1: AES-256-CBC Encryption with deterministic IV
    // Use NIN hash to derive IV for consistency
    const ninHash = sha256(nin);
    const iv = crypto.createHash('sha256').update(ninHash + process.env.ENCRYPTION_KEY).digest().slice(0, IV_LENGTH);
    
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    let aesEncrypted = cipher.update(nin, 'utf8', 'hex');
    aesEncrypted += cipher.final('hex');
    
    // Layer 2: SHA-256 Hash of AES encrypted result
    const sha256Hash = sha256(aesEncrypted);
    
    // Layer 3: HMAC-SHA256 of the SHA-256 hash
    const hmacSecret = process.env.HMAC_SECRET || process.env.ENCRYPTION_KEY;
    const finalHmac = crypto.createHmac('sha256', hmacSecret)
      .update(sha256Hash)
      .digest('hex');
    
    // Layer 4: Final cryptographic security - XOR with a derived key
    const derivedKey = crypto.createHmac('sha256', process.env.ENCRYPTION_KEY)
      .update(finalHmac)
      .digest('hex');
    
    // XOR the HMAC with derived key for final encryption
    const finalEncrypted = xorHexStrings(finalHmac, derivedKey);
    
    return {
      encrypted_nin: finalEncrypted,
      nin_iv: iv.toString('hex'),
      // Store AES encrypted data separately for display purposes
      aes_encrypted: aesEncrypted
    };
  } catch (error) {
    logger.error('NIN encryption error:', error);
    throw new Error('Failed to encrypt NIN data');
  }
};

/**
 * Fast verification: Encrypt input NIN through same process and compare results
 */
const verifyNIN = (inputNIN, storedEncryptedNIN, storedIV) => {
  try {
    // Encrypt the input NIN through the same process
    const inputEncryption = encryptNIN(inputNIN);
    
    // Compare the final encrypted values
    return inputEncryption.encrypted_nin === storedEncryptedNIN;
  } catch (error) {
    logger.error('NIN verification error:', error);
    return false;
  }
};

/**
 * Verifies NIN hash
 */
const verifyNINHash = (nin, storedHash) => {
  try {
    const computedHash = sha256(nin);
    return computedHash === storedHash;
  } catch (error) {
    logger.error('NIN hash verification error:', error);
    return false;
  }
};

/**
 * Decrypt NIN for display purposes (profile view)
 * This function decrypts the AES encrypted NIN for display
 */
const decryptNINForDisplay = (aesEncrypted, iv) => {
  try {
    validateEncryptionKey();
    
    if (!aesEncrypted) {
      return {
        decrypted: null,
        hasNIN: false,
        message: 'No NIN data available'
      };
    }
    
    // Decrypt AES directly (Layer 1 reverse)
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      Buffer.from(iv, 'hex')
    );
    
    let decrypted = decipher.update(aesEncrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return {
      decrypted: decrypted,
      hasNIN: true,
      message: 'NIN decrypted successfully'
    };
  } catch (error) {
    logger.error('NIN display decryption error:', error);
    return {
      decrypted: null,
      hasNIN: false,
      message: 'Unable to decrypt NIN'
    };
  }
};

/**
 * Generate JWT token for authentication
 */
const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }
  
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
};

module.exports = {
  encrypt,
  decrypt,
  generateEncryptionKey,
  sha256,
  encryptNIN,
  verifyNIN,
  verifyNINHash,
  decryptNINForDisplay,
  generateToken
};
