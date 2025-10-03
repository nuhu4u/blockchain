/**
 * Core Blockchain Service
 * 
 * This service handles all blockchain interactions including:
 * - Web3 provider connection
 * - Smart contract deployment
 * - Vote submission to blockchain
 * - Vote verification
 * - Transaction monitoring
 */

const { ethers } = require('ethers');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const logger = require('../../utils/logger');
const { deployElectionContract, addCandidatesToContract } = require('../scripts/deploy-contract');

/**
 * Helper function to log provider status for debugging
 */
async function logProviderStatus(provider) {
  try {
    console.log("🔍 Provider Status Check:");
    console.log("  Network:", await provider.getNetwork());
    console.log("  Latest Block:", await provider.getBlockNumber());
    const feeData = await provider.getFeeData();
    console.log("  Gas Price:", feeData.gasPrice ? feeData.gasPrice.toString() : 'N/A');
    console.log("  Max Fee Per Gas:", feeData.maxFeePerGas ? feeData.maxFeePerGas.toString() : 'N/A');
    console.log("  Max Priority Fee Per Gas:", feeData.maxPriorityFeePerGas ? feeData.maxPriorityFeePerGas.toString() : 'N/A');
  } catch (e) {
    console.error("❌ Provider check failed:", e);
  }
}

class BlockchainService {
  constructor() {
    this.provider = null;
    this.isConnected = false;
    this.mockMode = false;
  }

  /**
   * Initialize Web3 provider connection
   * @returns {Promise<boolean>} Connection status
   */
  async initialize() {
    try {
      // Use BLOCKCHAIN_RPC_URL first, fallback to BLOCKCHAIN_NETWORK
      const networkUrl = process.env.BLOCKCHAIN_RPC_URL || process.env.BLOCKCHAIN_NETWORK || 'http://127.0.0.1:8545';
      this.provider = new ethers.providers.JsonRpcProvider(networkUrl);
      
      // Test connection
      const network = await this.provider.getNetwork();
      const blockNumber = await this.provider.getBlockNumber();
      this.isConnected = true;
      this.mockMode = false;
      
      logger.info(`🚀 BlockchainService: Connected to Hardhat at ${networkUrl}`);
      logger.info(`🚀 Network: ${network.name} (chainId: ${network.chainId}), Block: ${blockNumber}`);
      return true;
      
    } catch (error) {
      logger.error('❌ BlockchainService: Hardhat connection failed:', error.message);
      logger.warn('⚠️ BlockchainService: Hardhat unavailable - blockchain operations will fail');
      this.isConnected = false;
      this.mockMode = false; // Don't use mock mode, fail gracefully instead
      return false; // Return false to indicate Hardhat is unavailable
    }
  }

  /**
   * PHASE 11: Create a new voter wallet using Hardhat/ethers random generation
   * @param {string} userUniqueId - Unique user identifier for deterministic wallet generation
   * @returns {Promise<Object>} Wallet data with address and encrypted private key
   */
  async createVoterWallet(userUniqueId) {
    try {
      logger.info(`BlockchainService: Creating Hardhat wallet for user: ${userUniqueId}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }

      // Use deterministic wallet generation based on user ID
      // This ensures the same user always gets the same wallet address
      const seed = crypto.createHash('sha256').update(userUniqueId + process.env.JWT_SECRET).digest('hex');
      
      // Create a deterministic private key from the seed
      const deterministicPrivateKey = '0x' + seed;
      
      // Create wallet from the deterministic private key
      const wallet = new ethers.Wallet(deterministicPrivateKey);
      
      const walletAddress = wallet.address;
      const privateKey = wallet.privateKey;
      
      // Encrypt the private key before storing
      const encryptedPrivateKey = this.encryptPrivateKey(privateKey);
      
      logger.info(`BlockchainService: Hardhat wallet created: ${walletAddress}`);
      
      return {
        wallet_address: walletAddress,
        encrypted_private_key: encryptedPrivateKey,
        private_key: privateKey // Only returned for immediate use, not stored
      };
      
    } catch (error) {
      logger.error('BlockchainService: Hardhat wallet creation failed:', error);
      throw new Error('Unable to generate wallet, please try again.');
    }
  }

  /**
   * PHASE 11: Create a new wallet using ethers.Wallet.createRandom()
   * @returns {Object} Wallet data with address and encrypted private key
   */
  createWallet() {
    try {
      logger.info(`BlockchainService: Creating new Hardhat wallet`);
      
      // Create a random wallet using ethers
      const wallet = ethers.Wallet.createRandom();
      
      const walletAddress = wallet.address;
      const privateKey = wallet.privateKey;
      
      // Encrypt the private key before storing
      const encryptedPrivateKey = this.encryptPrivateKey(privateKey);
      
      logger.info(`BlockchainService: New Hardhat wallet created: ${walletAddress}`);
      
      return {
        wallet_address: walletAddress,
        encrypted_private_key: encryptedPrivateKey
      };
      
    } catch (error) {
      logger.error('BlockchainService: Wallet creation failed:', error);
      throw new Error('Unable to generate wallet, please try again.');
    }
  }

  /**
   * PHASE 11: Encrypt private key for secure storage
   * @param {string} privateKey - Raw private key
   * @returns {string} Encrypted private key
   */
  encryptPrivateKey(privateKey) {
    try {
      const algorithm = 'aes-256-cbc';
      const encryptionKey = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
      const iv = crypto.randomBytes(16);
      
      const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
      
      let encrypted = cipher.update(privateKey, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Combine IV and encrypted data
      const combined = iv.toString('hex') + ':' + encrypted;
      
      return combined;
    } catch (error) {
      logger.error('BlockchainService: Private key encryption failed:', error);
      throw new Error('Failed to encrypt private key');
    }
  }

  /**
   * PHASE 11: Decrypt private key for signing transactions
   * @param {string} encryptedPrivateKey - Encrypted private key from DB
   * @returns {string} Decrypted private key
   */
  decryptPrivateKey(encryptedPrivateKey) {
    try {
      const algorithm = 'aes-256-cbc';
      const encryptionKey = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
      
      const parts = encryptedPrivateKey.split(':');
      const iv = Buffer.from(parts[0], 'hex');
      const encrypted = parts[1];
      
      const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      logger.error('BlockchainService: Private key decryption failed:', error);
      throw new Error('Failed to decrypt private key');
    }
  }

  /**
   * PHASE 13: Sign and send vote transaction using voter's wallet
   * @param {string} contractAddress - Election contract address
   * @param {string} encryptedPrivateKey - Voter's encrypted private key
   * @param {number} candidateIndex - Selected candidate index (zero-based for smart contract)
   * @param {string} voterId - Voter ID for logging
   * @param {string} electionId - Election ID for logging
   * @returns {Promise<Object>} Transaction result
   */
  async signAndSendVote(contractAddress, encryptedPrivateKey, candidateIndex, voterId = 'unknown', electionId = 'unknown') {
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds
    
    console.log(`\n🚀 ===== VOTE TRANSACTION DEBUG START =====`);
    console.log(`📊 Vote Details:`);
    console.log(`  - Candidate Index: ${candidateIndex} (zero-based for smart contract)`);
    console.log(`  - Voter ID: ${voterId}`);
    console.log(`  - Election ID: ${electionId}`);
    console.log(`  - Contract Address: ${contractAddress}`);
    console.log(`  - Encrypted Private Key Present: ${encryptedPrivateKey ? 'YES' : 'NO'}`);
    
    // PHASE 13: Validate candidate index is a finite non-negative integer
    if (!Number.isInteger(candidateIndex) || candidateIndex < 0 || !Number.isFinite(candidateIndex)) {
      throw new Error(`Invalid candidate index: ${candidateIndex}. Must be a non-negative integer.`);
    }
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`\n🔄 Attempt ${attempt}/${maxRetries}:`);
        
        if (!this.isConnected) {
          console.log(`🔌 Initializing blockchain connection...`);
          const connected = await this.initialize();
          if (!connected) {
            throw new Error('Hardhat is unavailable');
          }
        }
        
        // Log provider status
        await logProviderStatus(this.provider);
        
        // Decrypt voter's private key
        console.log(`🔐 Decrypting private key...`);
        const privateKey = this.decryptPrivateKey(encryptedPrivateKey);
        console.log(`  - Private Key Length: ${privateKey.length}`);
        console.log(`  - Private Key Starts with: ${privateKey.substring(0, 10)}...`);
        
        const wallet = new ethers.Wallet(privateKey, this.provider);
        console.log(`  - Wallet Address: ${wallet.address}`);
        console.log(`  - Wallet Balance: ${ethers.utils.formatEther(await this.provider.getBalance(wallet.address))} ETH`);
        
        // Contract ABI for vote function
        const contractABI = [
          'function vote(uint256 _candidateId) external',
          'function registerVoter(address _voter) external'
        ];
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);
        console.log(`📋 Contract created with address: ${contract.address}`);
        
        // First register the voter using admin wallet (only admin can register voters)
        console.log(`👤 Registering voter using admin wallet...`);
        try {
          // Create admin wallet for voter registration
          const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
          const adminWallet = new ethers.Wallet(adminPrivateKey, this.provider);
          const adminContract = new ethers.Contract(contractAddress, contractABI, adminWallet);
          
          const registerTx = await adminContract.registerVoter(wallet.address);
          console.log(`  - Register Tx Hash: ${registerTx.hash}`);
          console.log(`  - Waiting for registration confirmation...`);
          const registerReceipt = await registerTx.wait();
          console.log(`✅ Voter ${wallet.address} registered successfully in block ${registerReceipt.blockNumber}`);
        } catch (error) {
          console.log(`ℹ️ Voter registration skipped (might already exist): ${error.message}`);
        }
        
        // Submit vote using voter's wallet
        console.log(`🗳️ Sending vote transaction...`);
        console.log(`  - Candidate Index: ${candidateIndex}`);
        console.log(`  - Gas Limit: 300000 (estimated)`);
        
        // Get gas price and estimate
        const feeData = await this.provider.getFeeData();
        console.log(`  - Gas Price: ${feeData.gasPrice ? ethers.utils.formatUnits(feeData.gasPrice, 'gwei') + ' gwei' : 'N/A'}`);
        
        const voteTx = await contract.vote(candidateIndex, {
          gasLimit: 300000,
          gasPrice: feeData.gasPrice
        });
        
        console.log(`✅ Vote transaction sent!`);
        console.log(`  - Transaction Hash: ${voteTx.hash}`);
        console.log(`  - Gas Limit: ${voteTx.gasLimit.toString()}`);
        console.log(`  - Gas Price: ${voteTx.gasPrice ? ethers.utils.formatUnits(voteTx.gasPrice, 'gwei') + ' gwei' : 'N/A'}`);
        console.log(`  - From: ${voteTx.from}`);
        console.log(`  - To: ${voteTx.to}`);
        console.log(`  - Value: ${ethers.utils.formatEther(voteTx.value || 0)} ETH`);
        
        console.log(`⏳ Waiting for transaction confirmation...`);
        const receipt = await voteTx.wait();
        
        console.log(`✅ Vote transaction confirmed!`);
        console.log(`  - Block Number: ${receipt.blockNumber}`);
        console.log(`  - Gas Used: ${receipt.gasUsed.toString()}`);
        console.log(`  - Status: ${receipt.status === 1 ? 'SUCCESS' : 'FAILED'}`);
        console.log(`  - Transaction Hash: ${receipt.transactionHash}`);
        
        // Log funding status if wallet balance is low
        const walletBalance = await this.provider.getBalance(wallet.address);
        if (walletBalance.lt(ethers.utils.parseEther('1'))) {
          console.log(`⚠️ Funding Warning: Wallet ${wallet.address} balance is low: ${ethers.utils.formatEther(walletBalance)} ETH`);
        }
        
        console.log(`🚀 ===== VOTE TRANSACTION DEBUG END =====\n`);
        
        return {
          success: true,
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
          status: 'confirmed',
          from: wallet.address
        };
        
      } catch (error) {
        console.error(`❌ Vote transaction attempt ${attempt} failed:`);
        console.error(`  - Error Type: ${error.constructor.name}`);
        console.error(`  - Error Message: ${error.message}`);
        console.error(`  - Error Code: ${error.code || 'N/A'}`);
        console.error(`  - Error Data: ${error.data || 'N/A'}`);
        
        if (error.transaction) {
          console.error(`  - Failed Transaction Hash: ${error.transaction.hash || 'N/A'}`);
        }
        
        if (attempt === maxRetries) {
          console.error(`❌ All ${maxRetries} vote transaction attempts failed`);
          console.log(`🚀 ===== VOTE TRANSACTION DEBUG END (FAILED) =====\n`);
          throw new Error(`Vote transaction failed after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Wait before retry with exponential backoff
        const delay = retryDelay * Math.pow(2, attempt - 1);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Fund a voter wallet with ETH from admin wallet
   * @param {string} voterWalletAddress - Voter's wallet address to fund
   * @param {string} amountInETH - Amount of ETH to send (default: 5)
   * @returns {Promise<Object>} Transaction result with hash and status
   */
  async fundVoterWallet(voterWalletAddress, amountInETH = 5) {
    try {
      logger.info(`🚀 Funding voter wallet ${voterWalletAddress} with ${amountInETH} ETH`);
      
      if (!this.isConnected) {
        const connected = await this.initialize();
        if (!connected) {
          throw new Error('Hardhat is unavailable');
        }
      }
      
      // Get admin wallet
      const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
      const adminWallet = new ethers.Wallet(adminPrivateKey, this.provider);
      
      // Check admin balance
      const adminBalance = await this.provider.getBalance(adminWallet.address);
      const requiredAmount = ethers.utils.parseEther(amountInETH.toString());
      
      if (adminBalance.lt(requiredAmount)) {
        console.log(`❌ Funding Error: Wallet ${voterWalletAddress} not funded - insufficient admin balance`);
        throw new Error(`Insufficient admin balance. Required: ${amountInETH} ETH, Available: ${ethers.utils.formatEther(adminBalance)} ETH`);
      }
      
      // Check current voter balance
      const currentBalance = await this.provider.getBalance(voterWalletAddress);
      logger.info(`📊 Voter current balance: ${ethers.utils.formatEther(currentBalance)} ETH`);
      
      // Send ETH to voter wallet
      const tx = await adminWallet.sendTransaction({
        to: voterWalletAddress,
        value: requiredAmount,
        gasLimit: 21000 // Standard ETH transfer
      });
      
      logger.info(`⏳ Funding transaction sent: ${tx.hash}`);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        const newBalance = await this.provider.getBalance(voterWalletAddress);
        logger.info(`✅ Funding success, tx hash: ${receipt.transactionHash}`);
        logger.info(`📊 Voter new balance: ${ethers.utils.formatEther(newBalance)} ETH`);
        
        return {
          success: true,
          transactionHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber,
          gasUsed: receipt.gasUsed.toString(),
          amountSent: amountInETH,
          newBalance: ethers.utils.formatEther(newBalance)
        };
      } else {
        throw new Error('Transaction failed');
      }
      
    } catch (error) {
      logger.error(`❌ Funding failed: ${error.message}`);
      throw new Error(`Wallet funding failed: ${error.message}`);
    }
  }

  /**
   * Check if a wallet needs funding (balance < required amount)
   * @param {string} walletAddress - Wallet address to check
   * @param {string} requiredAmountInETH - Required minimum balance in ETH
   * @returns {Promise<Object>} Funding status and current balance
   */
  async checkWalletFundingStatus(walletAddress, requiredAmountInETH = 5) {
    try {
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const currentBalance = await this.provider.getBalance(walletAddress);
      const requiredAmount = ethers.utils.parseEther(requiredAmountInETH.toString());
      const needsFunding = currentBalance.lt(requiredAmount);
      
      return {
        walletAddress,
        currentBalance: ethers.utils.formatEther(currentBalance),
        requiredAmount: requiredAmountInETH,
        needsFunding,
        balanceInWei: currentBalance.toString()
      };
      
    } catch (error) {
      logger.error(`❌ Failed to check wallet balance: ${error.message}`);
      throw new Error(`Balance check failed: ${error.message}`);
    }
  }

  /**
   * Deploy Election contract for a new election
   * @param {Object} electionData - Election configuration
   * @returns {Promise<string>} Contract address
   */
  async deployElectionContract(electionData) {
    try {
      logger.info(`BlockchainService: Deploying contract for election: ${electionData.title}`);
      
      // Validate admin wallet configuration
      const adminWalletAddress = process.env.ADMIN_WALLET_ADDRESS;
      const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
      const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
      
      if (!adminWalletAddress || !adminPrivateKey || !rpcUrl) {
        throw new Error('Blockchain configuration missing. Check ADMIN_WALLET_ADDRESS, ADMIN_PRIVATE_KEY, and BLOCKCHAIN_RPC_URL in .env');
      }
      
      logger.info(`BlockchainService: Using admin wallet: ${adminWalletAddress}`);
      logger.info(`BlockchainService: Connecting to Hardhat at: ${rpcUrl}`);
      
      // Connect to Hardhat node
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const wallet = new ethers.Wallet(adminPrivateKey, provider);
      
      // Check if Hardhat is running
      try {
        const blockNumber = await provider.getBlockNumber();
        logger.info(`BlockchainService: Successfully connected to Hardhat node at block ${blockNumber}`);
      } catch (error) {
        throw new Error('Cannot connect to Hardhat node. Make sure Hardhat is running on http://127.0.0.1:8545');
      }
      
      // Load compiled contract artifacts
      const contractPath = path.join(__dirname, '../../artifacts/contracts/Election.sol/Election.json');
      
      if (!fs.existsSync(contractPath)) {
        // If artifacts don't exist, compile the contract first
        logger.info('BlockchainService: Contract artifacts not found, compiling...');
        const { execSync } = require('child_process');
        try {
          execSync('npx hardhat compile', { cwd: path.join(__dirname, '../..'), stdio: 'pipe' });
          logger.info('BlockchainService: Contract compiled successfully');
        } catch (compileError) {
          throw new Error(`Contract compilation failed: ${compileError.message}`);
        }
      }
      
      // Load contract artifacts
      const contractArtifacts = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
      const contractABI = contractArtifacts.abi;
      const contractBytecode = contractArtifacts.bytecode;
      
      logger.info('BlockchainService: Loaded contract artifacts');
      
      // Create contract factory
      const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);
      
      // Convert dates to Unix timestamps
      const startTime = Math.floor(new Date(electionData.start_date).getTime() / 1000);
      const endTime = Math.floor(new Date(electionData.end_date).getTime() / 1000);
      
      logger.info(`BlockchainService: Deploying contract with title: ${electionData.title}`);
      logger.info(`BlockchainService: Start time: ${startTime}, End time: ${endTime}`);
      
      // Deploy the contract
      const contract = await contractFactory.deploy(
        electionData.title || 'Election',
        electionData.description || 'No description provided',
        startTime,
        endTime
      );
      
      // Wait for deployment to complete
      await contract.deployed();
      const contractAddress = contract.address;
      
      logger.info(`✅ Election contract deployed at: ${contractAddress}`);
      
      // Add candidates to contract if provided
      if (electionData.contestants && electionData.contestants.length > 0) {
        logger.info(`🚀 Adding ${electionData.contestants.length} candidates to contract...`);
        
        for (const contestant of electionData.contestants) {
          try {
            const tx = await contract.addCandidate(contestant.name, contestant.party || 'Independent');
            await tx.wait();
            logger.info(`✅ Added candidate ${contestant.name} to contract`);
          } catch (error) {
            logger.error(`❌ Failed to add candidate ${contestant.name}:`, error.message);
            // Continue with other candidates even if one fails
          }
        }
      }
      
      return contractAddress;
      
    } catch (error) {
      logger.error('BlockchainService: Contract deployment failed:', error);
      throw new Error(`Election contract could not be deployed: ${error.message}`);
    }
  }

  /**
   * Cast vote on blockchain (Phase 5 - Voting Flow Integration)
   * @param {string} contractAddress - Election contract address
   * @param {string} voterAddress - Voter's wallet address
   * @param {string} candidateId - Selected candidate ID
   * @returns {Promise<Object>} Transaction result
   */
  async castVoteOnChain(contractAddress, voterAddress, candidateId) {
    try {
      logger.info(`BlockchainService: Casting vote on chain for candidate ${candidateId} by ${voterAddress}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }
      
      // Check if Hardhat is available
      const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;
      if (!rpcUrl) {
        throw new Error('BLOCKCHAIN_RPC_URL not configured in .env');
      }
      
      // Connect to Hardhat node
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      
      try {
        await provider.getBlockNumber();
        logger.info('BlockchainService: Successfully connected to Hardhat node for voting');
      } catch (error) {
        throw new Error('Cannot connect to Hardhat node. Make sure Hardhat is running on http://127.0.0.1:8545');
      }
      
      const privateKey = process.env.ADMIN_PRIVATE_KEY || '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // Contract ABI for vote function
      const contractABI = [
        'function vote(uint256 _candidateId) external',
        'function registerVoter(address _voter) external'
      ];
      
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
      
      // First register the voter using admin wallet (only admin can register voters)
      try {
        const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
        const adminWallet = new ethers.Wallet(adminPrivateKey, this.provider);
        const adminContract = new ethers.Contract(contractAddress, contractABI, adminWallet);
        
        const registerTx = await adminContract.registerVoter(voterAddress);
        await registerTx.wait();
        logger.info(`BlockchainService: Voter ${voterAddress} registered by admin`);
      } catch (error) {
        // Voter might already be registered, continue
        logger.info(`BlockchainService: Voter registration skipped (might already exist)`);
      }
      
      // Submit vote
      const voteTx = await contract.vote(candidateId);
      const receipt = await voteTx.wait();
      
      logger.info(`BlockchainService: Vote cast successfully. TxHash: ${receipt.hash}`);
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: 'confirmed'
      };
      
    } catch (error) {
      logger.error('BlockchainService: Vote casting failed:', error);
      throw new Error(`Vote could not be cast on blockchain: ${error.message}`);
    }
  }

  /**
   * Submit vote to blockchain (legacy method)
   * @param {string} contractAddress - Election contract address
   * @param {string} voterAddress - Voter's wallet address
   * @param {string} candidateId - Selected candidate ID
   * @returns {Promise<Object>} Transaction result
   */
  async submitVote(contractAddress, voterAddress, candidateId) {
    try {
      logger.info(`BlockchainService: Submitting vote for candidate ${candidateId} by ${voterAddress}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const privateKey = process.env.ADMIN_PRIVATE_KEY || '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // Contract ABI for vote function
      const contractABI = [
        'function vote(uint256 _candidateId) external',
        'function registerVoter(address _voter) external'
      ];
      
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
      
      // First register the voter using admin wallet (only admin can register voters)
      try {
        const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
        const adminWallet = new ethers.Wallet(adminPrivateKey, this.provider);
        const adminContract = new ethers.Contract(contractAddress, contractABI, adminWallet);
        
        const registerTx = await adminContract.registerVoter(voterAddress);
        await registerTx.wait();
        logger.info(`BlockchainService: Voter ${voterAddress} registered by admin`);
      } catch (error) {
        // Voter might already be registered, continue
        logger.info(`BlockchainService: Voter registration skipped (might already exist)`);
      }
      
      // Submit vote
      const voteTx = await contract.vote(candidateId);
      const receipt = await voteTx.wait();
      
      logger.info(`BlockchainService: Vote submitted successfully. TxHash: ${receipt.hash}`);
      
      return {
        success: true,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
      
    } catch (error) {
      logger.error('BlockchainService: Vote submission failed:', error);
      throw new Error(`Vote could not be submitted: ${error.message}`);
    }
  }

  /**
   * Verify vote on blockchain
   * @param {string} contractAddress - Election contract address
   * @param {string} transactionHash - Vote transaction hash
   * @returns {Promise<Object>} Verification result
   */
  async verifyVote(contractAddress, transactionHash) {
    try {
      logger.info(`BlockchainService: Verifying vote transaction ${transactionHash}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }
      
      // Get transaction receipt
      const receipt = await this.provider.getTransactionReceipt(transactionHash);
      
      if (!receipt) {
        throw new Error('Transaction not found');
      }
      
      if (receipt.status !== 1) {
        throw new Error('Transaction failed');
      }
      
      logger.info(`BlockchainService: Vote verified successfully`);
      
      return {
        success: true,
        verified: true,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: 'confirmed'
      };
      
    } catch (error) {
      logger.error('BlockchainService: Vote verification failed:', error);
      throw new Error(`Vote verification failed: ${error.message}`);
    }
  }

  /**
   * Get election status from blockchain
   * @param {string} contractAddress - Election contract address
   * @returns {Promise<Object>} Election status
   */
  async getElectionStatus(contractAddress) {
    try {
      logger.info(`BlockchainService: Getting election status for contract ${contractAddress}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }
      
      // Mock mode - return fake data
      if (this.mockMode) {
        logger.info('BlockchainService: Using mock mode for election status');
        return {
          success: true,
          wallet_address: contractAddress,
          title: 'Mock Election',
          description: 'Mock election for testing',
          startTime: Math.floor(Date.now() / 1000).toString(),
          endTime: Math.floor((Date.now() + 86400) / 1000).toString(),
          isActive: true,
          isFinalized: false,
          totalVotes: '0',
          candidateCount: '2',
          results: {
            candidateVotes: ['0', '0'],
            candidateNames: ['Mock Candidate 1', 'Mock Candidate 2'],
            candidateParties: ['Mock Party 1', 'Mock Party 2']
          }
        };
      }
      
      const privateKey = process.env.ADMIN_PRIVATE_KEY || '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // Contract ABI for view functions
      const contractABI = [
        'function getElectionInfo() external view returns (string memory, string memory, uint256, uint256, bool, bool, uint256)',
        'function getCandidateCount() external view returns (uint256)',
        'function getResults() external view returns (uint256[] memory, string[] memory, string[] memory)'
      ];
      
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
      
      // Get election info
      const electionInfo = await contract.getElectionInfo();
      const candidateCount = await contract.getCandidateCount();
      const results = await contract.getResults();
      
      logger.info(`BlockchainService: Election status retrieved successfully`);
      
      return {
        success: true,
        wallet_address: contractAddress,
        title: electionInfo[0],
        description: electionInfo[1],
        startTime: electionInfo[2].toString(),
        endTime: electionInfo[3].toString(),
        isActive: electionInfo[4],
        isFinalized: electionInfo[5],
        totalVotes: electionInfo[6].toString(),
        candidateCount: candidateCount.toString(),
        results: {
          candidateVotes: results[0].map(v => v.toString()),
          candidateNames: results[1],
          candidateParties: results[2]
        }
      };
      
    } catch (error) {
      logger.error('BlockchainService: Failed to get election status:', error);
      throw new Error(`Failed to get election status: ${error.message}`);
    }
  }

  /**
   * Check if voter has voted
   * @param {string} contractAddress - Election contract address
   * @param {string} voterAddress - Voter's wallet address
   * @returns {Promise<boolean>} Vote status
   */
  async hasVoterVoted(contractAddress, voterAddress) {
    try {
      logger.info(`BlockchainService: Checking vote status for ${voterAddress}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }
      
      const privateKey = process.env.ADMIN_PRIVATE_KEY || '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d';
      const wallet = new ethers.Wallet(privateKey, this.provider);
      
      // Contract ABI for voter status
      const contractABI = [
        'function getVoterStatus(address _voter) external view returns (bool, bool)'
      ];
      
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);
      const voterStatus = await contract.getVoterStatus(voterAddress);
      
      return voterStatus[1]; // hasVoted
      
    } catch (error) {
      logger.error('BlockchainService: Failed to check voter status:', error);
      return false;
    }
  }

  /**
   * PHASE 12: Get transaction details from blockchain
   * @param {string} transactionHash - Transaction hash to fetch
   * @returns {Promise<Object>} Transaction details
   */
  async getTransactionDetails(transactionHash) {
    try {
      logger.info(`BlockchainService: Fetching transaction details for ${transactionHash}`);
      
      if (!this.isConnected) {
        await this.initialize();
      }

      // Get transaction details from blockchain
      const transaction = await this.provider.getTransaction(transactionHash);
      const receipt = await this.provider.getTransactionReceipt(transactionHash);
      
      if (!transaction || !receipt) {
        throw new Error('Transaction not found');
      }

      // Get block details for timestamp
      const block = await this.provider.getBlock(receipt.blockNumber);
      
      const transactionData = {
        hash: transaction.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        gasPrice: transaction.gasPrice.toString(),
        from: transaction.from,
        to: transaction.to,
        value: ethers.utils.formatEther(transaction.value),
        status: receipt.status === 1 ? 'success' : 'failed',
        timestamp: new Date(block.timestamp * 1000).toISOString(),
        network: 'Ganache Local Network',
        explorerUrl: `http://localhost:8545/tx/${transactionHash}`,
        // Extract vote data from transaction logs if available
        voteData: {
          electionContract: transaction.to,
          voterAddress: transaction.from,
          candidateId: 'Unknown', // Would need to parse transaction logs
          eventType: 'VoteCast'
        }
      };

      logger.info(`BlockchainService: Transaction details fetched successfully`);
      return transactionData;
      
    } catch (error) {
      logger.error('BlockchainService: Failed to fetch transaction details:', error);
      throw new Error(`Failed to fetch transaction details: ${error.message}`);
    }
  }
}

module.exports = new BlockchainService();
