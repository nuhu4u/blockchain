const crypto = require('crypto');
const logger = require('./logger');

// Configuration
const IV_LENGTH = 16; // For AES, this is always 16
const ALGORITHM = 'aes-256-cbc';

// Get encryption key from environment variables
const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  // Only validate key format if it exists
  if (key && !/^[0-9a-fA-F]{64}$/.test(key)) {
    logger.warn('ENCRYPTION_KEY should be a 64-character hex string');
  }
  return key;
};

// Initialize encryption key
const ENCRYPTION_KEY = getEncryptionKey();

/**
 * Validates that the encryption key is properly configured
 * @throws {Error} If encryption key is not set or invalid
 */
const validateEncryptionKey = () => {
  if (!ENCRYPTION_KEY) {
    throw new Error(
      'ENCRYPTION_KEY is not set in environment variables. ' +
      'Please add it to your .env file and restart the application.'
    );
  }
  if (ENCRYPTION_KEY.length !== 64) {
    logger.warn('ENCRYPTION_KEY should be 64 characters long for AES-256');
  }
};

/**
 * Encrypts text using AES-256-CBC
 * @param {string} text - The text to encrypt
 * @returns {string} Encrypted text in format: iv:encryptedText
 */
const encrypt = (text) => {
  try {
    validateEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}`;
  } catch (error) {
    logger.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

/**
 * Decrypts text using AES-256-CBC
 * @param {string} text - The encrypted text in format: iv:encryptedText
 * @returns {string} Decrypted text
 */
const decrypt = (text) => {
  try {
    validateEncryptionKey();
    const [ivString, encryptedText] = text.split(':');
    if (!ivString || !encryptedText) {
      throw new Error('Invalid encrypted text format');
    }
    
    const iv = Buffer.from(ivString, 'hex');
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    logger.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
};

/**
 * Generates a random encryption key
 * @returns {string} A random 32-byte key in hex format
 */
const generateEncryptionKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Hashes data using SHA-256
 * @param {string} data - The data to hash
 * @returns {string} The SHA-256 hash in hex format
 */
const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

/**
 * Encrypts NIN using three-layer encryption method
 * @param {string} nin - The NIN to encrypt
 * @returns {object} Object containing all encryption layers
 */
const encryptNIN = (nin) => {
  try {
    validateEncryptionKey();
    
    // Layer 1: AES-256-CBC Encryption
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      iv
    );
    
    let encrypted = cipher.update(nin, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Layer 2: SHA-256 Hash
    const hashed = sha256(nin);
    
    // Layer 3: HMAC-SHA256
    const hmacSecret = process.env.HMAC_SECRET || ENCRYPTION_KEY;
    const hmac = crypto.createHmac('sha256', hmacSecret).update(nin).digest('hex');
    
    return {
      encrypted_nin: encrypted,
      hashed_nin: hashed,
      nin_hmac: hmac,
      nin_iv: iv.toString('hex')
    };
  } catch (error) {
    logger.error('NIN encryption error:', error);
    throw new Error('Failed to encrypt NIN data');
  }
};

/**
 * XORs two hexadecimal strings
 * @param {string} a - First hexadecimal string
 * @param {string} b - Second hexadecimal string
 * @returns {string} XORed hexadecimal string
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
 * Decrypts NIN using the stored encryption data
 * @param {string} encryptedNIN - The encrypted NIN
 * @param {string} iv - The initialization vector
 * @returns {string} Decrypted NIN
 */
const decryptNIN = (encryptedNIN, iv) => {
  try {
    validateEncryptionKey();
    
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY, 'hex'),
      Buffer.from(iv, 'hex')
    );
    
    let decrypted = decipher.update(encryptedNIN, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    logger.error('NIN decryption error:', error);
    throw new Error('Failed to decrypt NIN data');
  }
};

/**
 * Verifies NIN integrity using HMAC
 * @param {string} nin - The NIN to verify
 * @param {string} storedHmac - The stored HMAC
 * @returns {boolean} True if HMAC matches
 */
const verifyNINHmac = (nin, storedHmac) => {
  try {
    const hmacSecret = process.env.HMAC_SECRET || ENCRYPTION_KEY;
    const computedHmac = crypto.createHmac('sha256', hmacSecret).update(nin).digest('hex');
    return crypto.timingSafeEqual(
      Buffer.from(computedHmac, 'hex'),
      Buffer.from(storedHmac, 'hex')
    );
  } catch (error) {
    logger.error('NIN HMAC verification error:', error);
    return false;
  }
};

/**
 * Verifies NIN hash
 * @param {string} nin - The NIN to verify
 * @param {string} storedHash - The stored hash
 * @returns {boolean} True if hash matches
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

module.exports = {
  encrypt,
  decrypt,
  generateEncryptionKey,
  sha256,
  encryptNIN,
  decryptNIN,
  verifyNINHmac,
  verifyNINHash
};
