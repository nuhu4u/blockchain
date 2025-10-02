const { MongoClient } = require('mongodb');
const { ethers } = require('ethers');
const crypto = require('crypto');
require('dotenv').config();

class WalletFundingService {
  constructor() {
    this.provider = null;
    this.adminWallet = null;
    this.minBalanceThreshold = ethers.utils.parseEther('10.0'); // 10 ETH minimum
    this.fundingAmount = ethers.utils.parseEther('10.0'); // 10 ETH funding
    this.voteMinBalance = ethers.utils.parseEther('0.001'); // 0.001 ETH for voting
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds
  }

  /**
   * Initialize the service
   */
  async initialize() {
    try {
      // Initialize blockchain provider
      this.provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
      await this.provider.getNetwork();
      console.log('✅ Wallet Funding: Provider initialized');

      // Initialize admin wallet
      const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
      if (!adminPrivateKey) {
        throw new Error('ADMIN_PRIVATE_KEY not found in environment variables');
      }

      this.adminWallet = new ethers.Wallet(adminPrivateKey, this.provider);
      console.log('✅ Wallet Funding: Admin wallet initialized');

      return true;
    } catch (error) {
      console.error('❌ Wallet Funding: Initialization failed:', error.message);
      return false;
    }
  }

  /**
   * Check if a wallet has sufficient balance for funding (10 ETH)
   */
  async checkWalletBalance(walletAddress) {
    try {
      const balance = await this.provider.getBalance(walletAddress);
      const balanceEth = ethers.utils.formatEther(balance);
      
      const isFunded = balance.gte(this.minBalanceThreshold);
      
      console.log(`🔍 Checking balance: ${walletAddress} = ${balanceEth} ETH ${isFunded ? '✅' : '❌'}`);
      
      return {
        address: walletAddress,
        balance: balance,
        balanceEth: balanceEth,
        isFunded: isFunded,
        threshold: this.minBalanceThreshold
      };
    } catch (error) {
      console.error(`❌ Funding Error: Failed to check balance for ${walletAddress}:`, error.message);
      return {
        address: walletAddress,
        balance: ethers.BigNumber.from(0),
        balanceEth: '0.0',
        isFunded: false,
        error: error.message
      };
    }
  }

  /**
   * Check if a wallet has sufficient balance for voting (0.001 ETH)
   */
  async checkVoteBalance(walletAddress) {
    try {
      const balance = await this.provider.getBalance(walletAddress);
      const balanceEth = ethers.utils.formatEther(balance);
      
      const canVote = balance.gte(this.voteMinBalance);
      
      console.log(`🔍 Vote balance check: ${walletAddress} = ${balanceEth} ETH ${canVote ? '✅' : '❌'}`);
      
      return {
        address: walletAddress,
        balance: balance,
        balanceEth: balanceEth,
        canVote: canVote,
        threshold: this.voteMinBalance
      };
    } catch (error) {
      console.error(`❌ Funding Error: Failed to check vote balance for ${walletAddress}:`, error.message);
      return {
        address: walletAddress,
        balance: ethers.BigNumber.from(0),
        balanceEth: '0.0',
        canVote: false,
        error: error.message
      };
    }
  }

  /**
   * Fund a wallet from admin wallet with 10 ETH
   */
  async fundWallet(walletAddress, amount = null, attempt = 1) {
    try {
      if (!this.adminWallet) {
        await this.initialize();
      }

      const fundingAmount = amount || this.fundingAmount;
      const adminBalance = await this.provider.getBalance(this.adminWallet.address);
      
      if (adminBalance.lt(fundingAmount)) {
        const error = `Insufficient admin balance: ${ethers.utils.formatEther(adminBalance)} ETH < ${ethers.utils.formatEther(fundingAmount)} ETH`;
        console.log(`❌ Funding Error: ${error}`);
        return { success: false, error };
      }

      console.log(`🚀 Funding wallet ${walletAddress} with ${ethers.utils.formatEther(fundingAmount)} ETH... (attempt ${attempt})`);

      // Send transaction
      const tx = await this.adminWallet.sendTransaction({
        to: walletAddress,
        value: fundingAmount,
        gasLimit: 21000
      });

      console.log(`📋 Funding transaction sent: ${tx.hash}`);

      // Wait for confirmation
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        // Verify balance on-chain after transfer
        const newBalance = await this.provider.getBalance(walletAddress);
        const newBalanceEth = ethers.utils.formatEther(newBalance);
        
        if (newBalance.gte(this.minBalanceThreshold)) {
          console.log(`✅ Wallet Funded: Wallet ${walletAddress} balance=${newBalanceEth} ETH`);
          return {
            success: true,
            transactionHash: tx.hash,
            newBalance: newBalance,
            newBalanceEth: newBalanceEth
          };
        } else {
          const error = `Wallet ${walletAddress} balance too low after funding: ${newBalanceEth} ETH < ${ethers.utils.formatEther(this.minBalanceThreshold)} ETH`;
          console.log(`❌ Funding Error: ${error}`);
          
          // Retry if we haven't exceeded max attempts
          if (attempt < this.maxRetries) {
            console.log(`🔄 Retrying funding for ${walletAddress} (attempt ${attempt + 1})...`);
            await new Promise(resolve => setTimeout(resolve, this.retryDelay));
            return await this.fundWallet(walletAddress, amount, attempt + 1);
          }
          
          return { success: false, error };
        }
      } else {
        const error = 'Funding transaction reverted';
        console.log(`❌ Funding Error: ${error}`);
        
        // Retry if we haven't exceeded max attempts
        if (attempt < this.maxRetries) {
          console.log(`🔄 Retrying funding for ${walletAddress} (attempt ${attempt + 1})...`);
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
          return await this.fundWallet(walletAddress, amount, attempt + 1);
        }
        
        return { success: false, error };
      }

    } catch (error) {
      console.error(`❌ Funding Error: Failed to fund wallet ${walletAddress} (attempt ${attempt}):`, error.message);
      
      // Retry if we haven't exceeded max attempts
      if (attempt < this.maxRetries) {
        console.log(`🔄 Retrying funding for ${walletAddress} (attempt ${attempt + 1})...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return await this.fundWallet(walletAddress, amount, attempt + 1);
      }
      
      return { success: false, error: error.message, attempts: attempt };
    }
  }

  /**
   * Verify and fund a wallet if needed (10 ETH)
   */
  async verifyAndFundWallet(walletAddress) {
    try {
      const balanceCheck = await this.checkWalletBalance(walletAddress);
      
      if (balanceCheck.isFunded) {
        console.log(`✅ Wallet Check: ${walletAddress} balance=${balanceCheck.balanceEth} ETH`);
        return { success: true, alreadyFunded: true, balance: balanceCheck };
      }

      // Wallet needs funding
      console.log(`🚀 Funding wallet ${walletAddress} with 10 ETH...`);
      
      const fundingResult = await this.fundWallet(walletAddress);
      
      if (fundingResult.success) {
        console.log(`✅ Wallet Funded: Wallet ${walletAddress} balance=${fundingResult.newBalanceEth} ETH`);
        return { success: true, alreadyFunded: false, funding: fundingResult };
      } else {
        console.log(`❌ Funding Error: Wallet ${walletAddress} funding failed: ${fundingResult.error}`);
        return { success: false, error: fundingResult.error };
      }

    } catch (error) {
      console.error(`❌ Funding Error: Error verifying wallet ${walletAddress}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Check all user wallets on startup and auto-fund to 10 ETH
   */
  async checkAllWallets() {
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');

      console.log('🔍 Wallet Check: Scanning all user wallets...');

      const users = await db.collection('users').find({
        wallet_address: { $exists: true, $ne: null },
        role: 'VOTER'
      }).toArray();

      console.log(`📊 Wallet Check: Found ${users.length} users with wallets`);

      let fundedCount = 0;
      let unfundedCount = 0;
      const unfundedWallets = [];

      for (const user of users) {
        const balanceCheck = await this.checkWalletBalance(user.wallet_address);
        
        if (balanceCheck.isFunded) {
          fundedCount++;
          console.log(`✅ Wallet Check: ${user.wallet_address} balance=${balanceCheck.balanceEth} ETH`);
        } else {
          unfundedCount++;
          unfundedWallets.push({
            userId: user._id,
            email: user.email,
            walletAddress: user.wallet_address,
            balance: balanceCheck.balanceEth
          });
        }
      }

      console.log(`✅ Wallet Check: ${fundedCount} wallets ≥10 ETH`);
      console.log(`❌ Wallet Check: ${unfundedCount} wallets <10 ETH`);

      if (unfundedWallets.length > 0) {
        console.log('🚀 Auto-funding unfunded wallets to 10 ETH...');
        
        for (const wallet of unfundedWallets) {
          const fundingResult = await this.fundWallet(wallet.walletAddress);
          if (fundingResult.success) {
            console.log(`✅ Auto-funded: ${wallet.email} (${wallet.walletAddress}) balance=${fundingResult.newBalanceEth} ETH`);
            fundedCount++;
            unfundedCount--;
          } else {
            console.log(`❌ Funding Error: ${wallet.email} - ${fundingResult.error}`);
          }
        }
      }

      await client.close();
      
      return {
        totalUsers: users.length,
        fundedCount,
        unfundedCount,
        unfundedWallets
      };

    } catch (error) {
      console.error('❌ Funding Error: Failed to check all wallets:', error.message);
      return { error: error.message };
    }
  }

  /**
   * Create and fund a new wallet for user registration with 10 ETH
   */
  async createAndFundWallet(userId) {
    try {
      // Generate new wallet
      const wallet = ethers.Wallet.createRandom();
      
      // Encrypt private key
      const encryptedPrivateKey = this.encryptPrivateKey(wallet.privateKey);
      
      // Fund the wallet with 10 ETH
      console.log(`🚀 Funding wallet ${wallet.address} with 10 ETH for user ${userId}...`);
      const fundingResult = await this.fundWallet(wallet.address);
      
      if (!fundingResult.success) {
        throw new Error(`Failed to fund wallet: ${fundingResult.error}`);
      }

      console.log(`✅ Wallet Funded: Wallet ${wallet.address} balance=${fundingResult.newBalanceEth} ETH`);

      return {
        success: true,
        walletAddress: wallet.address,
        encryptedPrivateKey: encryptedPrivateKey,
        funding: fundingResult
      };

    } catch (error) {
      console.error(`❌ Funding Error: Failed to create wallet for user ${userId}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Encrypt private key
   */
  encryptPrivateKey(privateKey) {
    try {
      const algorithm = 'aes-256-cbc';
      const key = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      
      let encrypted = cipher.update(privateKey, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
      console.error('❌ Wallet Funding: Failed to encrypt private key:', error.message);
      throw error;
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      providerConnected: !!this.provider,
      adminWalletAddress: this.adminWallet?.address,
      minBalanceThreshold: ethers.utils.formatEther(this.minBalanceThreshold),
      fundingAmount: ethers.utils.formatEther(this.fundingAmount),
      voteMinBalance: ethers.utils.formatEther(this.voteMinBalance)
    };
  }
}

// Create singleton instance
const walletFundingService = new WalletFundingService();

module.exports = walletFundingService;
