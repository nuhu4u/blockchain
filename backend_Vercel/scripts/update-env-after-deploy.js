const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * Updates the .env file with the deployed contract address
 * @param {string} network - The network name (e.g., 'sepolia', 'mainnet')
 * @param {string} contractAddress - The deployed contract address
 */
function updateEnvFile(network, contractAddress) {
  const envPath = path.join(__dirname, '../.env');
  let envContent = '';
  
  // Read existing .env file if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Update or add CONTRACT_ADDRESS
  if (envContent.includes('CONTRACT_ADDRESS=')) {
    envContent = envContent.replace(
      /CONTRACT_ADDRESS=.*/,
      `CONTRACT_ADDRESS=${contractAddress}`
    );
  } else {
    envContent += `\nCONTRACT_ADDRESS=${contractAddress}\n`;
  }
  
  // Update or add BLOCKCHAIN_NETWORK
  const rpcUrl = getRpcUrl(network);
  if (envContent.includes('BLOCKCHAIN_NETWORK=')) {
    envContent = envContent.replace(
      /BLOCKCHAIN_NETWORK=.*/,
      `BLOCKCHAIN_NETWORK=${rpcUrl}`
    );
  } else {
    envContent += `BLOCKCHAIN_NETWORK=${rpcUrl}\n`;
  }
  
  // Write back to .env file
  fs.writeFileSync(envPath, envContent);
  console.log(`Updated .env file with contract address: ${contractAddress}`);
}

/**
 * Gets the RPC URL for the specified network
 * @param {string} network - The network name
 * @returns {string} The RPC URL
 */
function getRpcUrl(network) {
  const rpcUrls = {
    sepolia: process.env.SEPOLIA_RPC_URL || 'https://sepolia.infura.io/v3/YOUR-INFURA-KEY',
    mainnet: process.env.MAINNET_RPC_URL || 'https://mainnet.infura.io/v3/YOUR-INFURA-KEY',
    localhost: 'http://localhost:8545',
    hardhat: 'http://localhost:8545'
  };
  
  return rpcUrls[network] || rpcUrls.localhost;
}

// Export for testing
module.exports = {
  updateEnvFile,
  getRpcUrl
};

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node update-env-after-deploy.js <network> <contract-address>');
    process.exit(1);
  }
  
  const [network, contractAddress] = args;
  updateEnvFile(network, contractAddress);
}
