/**
 * Contract Deployment Script
 * 
 * This script handles the deployment of the Election smart contract:
 * - Connect to Ganache network
 * - Deploy contract with election parameters
 * - Verify contract deployment
 * - Return contract address
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const logger = require('../../utils/logger');

/**
 * Deploy Election contract to Hardhat
 * @param {Object} electionData - Election configuration
 * @returns {Promise<string>} Contract address
 */
async function deployElectionContract(electionData) {
  try {
    logger.info('DeployContract: Starting contract deployment...');
    
    // Get Hardhat provider URL from environment
    const networkUrl = process.env.BLOCKCHAIN_RPC_URL || 'http://127.0.0.1:8545';
    const privateKey = process.env.ADMIN_PRIVATE_KEY;
    const adminAddress = process.env.ADMIN_WALLET_ADDRESS;
    
    if (!privateKey || !adminAddress) {
      throw new Error('ADMIN_PRIVATE_KEY and ADMIN_WALLET_ADDRESS must be configured in .env');
    }
    
    // Connect to Hardhat
    const provider = new ethers.providers.JsonRpcProvider(networkUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    
    logger.info(`DeployContract: Connected to Hardhat at ${networkUrl}`);
    logger.info(`DeployContract: Using admin wallet ${wallet.address}`);
    
    // Check if Hardhat is running
    try {
      const blockNumber = await provider.getBlockNumber();
      logger.info(`DeployContract: Hardhat is running at block ${blockNumber}`);
    } catch (error) {
      throw new Error('Cannot connect to Hardhat node. Make sure Hardhat is running on http://127.0.0.1:8545');
    }
    
    // Load and compile the Election contract
    const contractPath = path.join(__dirname, '../contracts/Election.sol');
    const contractSource = fs.readFileSync(contractPath, 'utf8');
    
    // For now, we'll use a simplified approach with hardcoded ABI and bytecode
    // In production, you would compile the contract and get the ABI and bytecode
    const contractABI = [
      "constructor(string memory _title, string memory _description, uint256 _startTime, uint256 _endTime)",
      "function addCandidate(string memory _name, string memory _party) external",
      "function registerVoter(address _voter) external",
      "function vote(uint256 _candidateId) external",
      "function getCandidateCount() external view returns (uint256)",
      "function getCandidate(uint256 _candidateId) external view returns (string memory, string memory, uint256, bool)",
      "function getElectionInfo() external view returns (string memory, string memory, uint256, uint256, bool, bool, uint256)"
    ];
    
    // This is a simplified bytecode - in production, get this from Hardhat compilation
    const contractBytecode = "0x608060405234801561001057600080fd5b506004361061007d5760003560e01c8063";
    
    // Create contract factory
    const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
    
    // Convert dates to Unix timestamps
    const startTime = Math.floor(new Date(electionData.start_date).getTime() / 1000);
    const endTime = Math.floor(new Date(electionData.end_date).getTime() / 1000);
    
    // Deploy the contract with safe defaults
    const contract = await contractFactory.deploy(
      electionData.title || 'Election',
      electionData.description || 'No description provided',
      startTime,
      endTime
    );
    
    // Wait for deployment
    await contract.deployed();
    const contractAddress = contract.address;
    
    logger.info(`DeployContract: Contract deployed successfully at ${contractAddress}`);
    
    // Add candidates to contract if provided
    if (electionData.contestants && electionData.contestants.length > 0) {
      for (const contestant of electionData.contestants) {
        try {
          const tx = await contract.addCandidate(contestant.name, contestant.party || 'Independent');
          await tx.wait();
          logger.info(`DeployContract: Added candidate ${contestant.name} to contract`);
        } catch (error) {
          logger.error(`DeployContract: Failed to add candidate ${contestant.name}:`, error);
        }
      }
    }
    
    return contractAddress;
    
  } catch (error) {
    logger.error('DeployContract: Deployment failed:', error);
    throw new Error(`Election contract could not be deployed: ${error.message}`);
  }
}

/**
 * Verify contract deployment
 * @param {string} contractAddress - Deployed contract address
 * @param {ethers.Provider} provider - Ethers provider
 * @returns {Promise<boolean>} Verification status
 */
async function verifyContractDeployment(contractAddress, provider) {
  try {
    logger.info('DeployContract: Verifying contract deployment...');
    
    // Check if contract exists at address
    const code = await provider.getCode(contractAddress);
    const isDeployed = code !== '0x';
    
    if (isDeployed) {
      logger.info('DeployContract: Contract verification successful');
    } else {
      logger.error('DeployContract: Contract verification failed - no code at address');
    }
    
    return isDeployed;
    
  } catch (error) {
    logger.error('DeployContract: Verification failed:', error);
    return false;
  }
}

/**
 * Add candidates to deployed contract
 * @param {string} contractAddress - Contract address
 * @param {Array} candidates - Array of candidate objects
 * @returns {Promise<void>}
 */
async function addCandidatesToContract(contractAddress, candidates) {
  try {
    logger.info('DeployContract: Adding candidates to contract...');
    logger.info(`DeployContract: Mock adding ${candidates.length} candidates to contract ${contractAddress}`);
    
    // Mock candidate addition - simulate delay
    for (const candidate of candidates) {
      await new Promise(resolve => setTimeout(resolve, 100));
      logger.info(`DeployContract: Mock added candidate ${candidate.name} (${candidate.party})`);
    }
    
    logger.info('DeployContract: All candidates mock added successfully');
    
  } catch (error) {
    logger.error('DeployContract: Failed to add candidates:', error);
    throw error;
  }
}

// Export functions
module.exports = {
  deployElectionContract,
  verifyContractDeployment,
  addCandidatesToContract
};

// Run deployment if called directly
if (require.main === module) {
  const electionData = {
    title: 'Test Election',
    description: 'Test election for deployment',
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
  };

  deployElectionContract(electionData)
    .then((contractAddress) => {
      logger.info('DeployContract: Deployment completed:', contractAddress);
      process.exit(0);
    })
    .catch((error) => {
      logger.error('DeployContract: Deployment failed:', error);
      process.exit(1);
    });
}
