require('dotenv').config();

const networks = {
  hardhat: {
    chainId: 31337,
    url: 'http://localhost:8545',
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
  },
  localhost: {
    chainId: 31337,
    url: 'http://localhost:8545',
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
  },
  sepolia: {
    chainId: 11155111,
    url: process.env.SEPOLIA_RPC_URL || '',
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || ''
      }
    }
  },
  mainnet: {
    chainId: 1,
    url: process.env.MAINNET_RPC_URL || '',
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    verify: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || ''
      }
    }
  }
};

const getNetworkConfig = (network) => {
  if (!networks[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }
  return networks[network];
};

module.exports = {
  networks,
  getNetworkConfig,
  // Contract configuration
  contractConfig: {
    election: {
      name: 'Election',
      constructorArgs: []
    }
  },
  // Gas settings
  gasSettings: {
    gasPrice: 'auto',
    maxFeePerGas: 'auto',
    maxPriorityFeePerGas: 'auto'
  }
};
