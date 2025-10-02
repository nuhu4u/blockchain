const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config();

class SecurityUtils {
  constructor() {
    this.encryptionKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
    this.hmacSecret = process.env.HMAC_SECRET || crypto.randomBytes(32);
    this.algorithm = 'aes-256-gcm';
  }

  // Hash password using bcrypt
  async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password
  async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  // Hash NIN using SHA-256
  hashNIN(nin) {
    return crypto.createHash('sha256').update(nin).digest('hex');
  }

  // Encrypt NIN using AES-256-GCM
  encryptNIN(nin) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher('aes-256-cbc', this.encryptionKey);
    
    let encrypted = cipher.update(nin, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex')
    };
  }

  // Decrypt NIN
  decryptNIN(encryptedData, iv) {
    const decipher = crypto.createDecipher('aes-256-cbc', this.encryptionKey);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  // Generate HMAC for NIN
  generateHMAC(nin) {
    return crypto.createHmac('sha256', this.hmacSecret).update(nin).digest('hex');
  }

  // Verify HMAC
  verifyHMAC(nin, providedHmac) {
    const computedHmac = this.generateHMAC(nin);
    return crypto.timingSafeEqual(Buffer.from(computedHmac), Buffer.from(providedHmac));
  }

  // Validate NIN format (11 digits)
  validateNIN(nin) {
    const ninRegex = /^\d{11}$/;
    return ninRegex.test(nin);
  }

  // Generate unique voter ID
  generateVoterID() {
    return 'VTR' + crypto.randomBytes(8).toString('hex').toUpperCase();
  }

  // Generate blockchain contract address (mock for now)
  generateContractAddress() {
    return '0x' + crypto.randomBytes(20).toString('hex');
  }

  // Generate OTP
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate secure random token
  generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Generate transaction hash for votes
  generateTransactionHash(voterID, electionID, candidateID, timestamp) {
    const data = `${voterID}-${electionID}-${candidateID}-${timestamp}`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

module.exports = new SecurityUtils();
