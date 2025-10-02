const crypto = require('crypto');

console.log('🔑 Generating Encryption Keys for NIN System');
console.log('============================================');

// Generate 64-character hex encryption key for AES-256
const encryptionKey = crypto.randomBytes(32).toString('hex');
console.log('\n🔐 ENCRYPTION_KEY (64 characters):');
console.log(encryptionKey);

// Generate HMAC secret (32 bytes = 64 hex characters)
const hmacSecret = crypto.randomBytes(32).toString('hex');
console.log('\n🔒 HMAC_SECRET (64 characters):');
console.log(hmacSecret);

// Generate JWT secret (32 bytes = 64 hex characters)
const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('\n🎫 JWT_SECRET (64 characters):');
console.log(jwtSecret);

console.log('\n📋 Copy these keys to your .env file:');
console.log('=====================================');
console.log(`ENCRYPTION_KEY=${encryptionKey}`);
console.log(`HMAC_SECRET=${hmacSecret}`);
console.log(`JWT_SECRET=${jwtSecret}`);

console.log('\n⚠️  IMPORTANT SECURITY NOTES:');
console.log('============================');
console.log('1. Keep these keys secure and never share them');
console.log('2. Use different keys for production and development');
console.log('3. Store keys in environment variables, not in code');
console.log('4. Backup your keys securely - you cannot decrypt data without them');
console.log('5. Each key is 64 characters long (32 bytes)');

console.log('\n🔐 Key Details:');
console.log('===============');
console.log('ENCRYPTION_KEY: Used for AES-256-CBC encryption of NIN data');
console.log('HMAC_SECRET: Used for HMAC-SHA256 integrity verification');
console.log('JWT_SECRET: Used for JWT token signing and verification');

console.log('\n✅ Keys generated successfully!');
console.log('Copy the above lines to your .env file and restart your application.');
