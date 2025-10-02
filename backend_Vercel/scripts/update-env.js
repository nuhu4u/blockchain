const fs = require('fs');
const path = require('path');

// Default configuration for local development
const config = {
  BLOCKCHAIN_NETWORK: 'http://localhost:8545',
  // Use the first account from Hardhat's default accounts as the admin
  PRIVATE_KEY: '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  // This will be updated after deployment
  CONTRACT_ADDRESS: '',
};

// Path to .env file
const envPath = path.resolve(__dirname, '../.env');

// Read existing .env file if it exists
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Remove existing blockchain configs if they exist
  envContent = envContent
    .split('\n')
    .filter(line => !line.startsWith('BLOCKCHAIN_NETWORK=') && 
                   !line.startsWith('PRIVATE_KEY=') && 
                   !line.startsWith('CONTRACT_ADDRESS='))
    .join('\n');
}

// Add the blockchain configuration
envContent += `
# Blockchain Configuration
BLOCKCHAIN_NETWORK=${config.BLOCKCHAIN_NETWORK}
PRIVATE_KEY=${config.PRIVATE_KEY}
CONTRACT_ADDRESS=${config.CONTRACT_ADDRESS}
`;

// Write back to .env file
fs.writeFileSync(envPath, envContent.trim() + '\n');

console.log('✅ Updated .env file with blockchain configuration');

// Export the configuration for use in other scripts
module.exports = config;
