const fs = require('fs');
const path = require('path');

// Method 1: Directly read and parse .env file
console.log('=== Method 1: Direct file read ===');
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
console.log('File exists:', fs.existsSync(envPath));
console.log('File size:', envContent.length);
console.log('First 100 chars:', envContent.substring(0, 100));

// Method 2: Try dotenv
console.log('\n=== Method 2: dotenv ===');
require('dotenv').config({ path: envPath });
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('ENCRYPTION_KEY exists:', !!process.env.ENCRYPTION_KEY);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

// Method 3: Check process.env
console.log('\n=== Method 3: process.env ===');
console.log('All environment variables:');
Object.keys(process.env).filter(k => k.includes('ENV') || k.includes('NODE')).forEach(k => {
  console.log(`${k}=${process.env[k]}`);
});
