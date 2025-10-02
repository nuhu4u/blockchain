const { ethers } = require('ethers');
const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');

/**
 * Wallet Migration Service
 * 
 * Handles migration from old_wallet_address to wallet_address
 * Ensures every user has exactly one funded wallet (10 ETH)
 * 
 * Features:
 * - Removes old_wallet_address fields
 * - Verifies wallet_address exists
 * - Generates new wallet if missing
 * - Funds all wallets to 10 ETH
 * - Comprehensive logging with ✅/❌ prefixes
 */

class WalletMigrationService {
  constructor() {
    this.provider = null;
    this.adminWallet = null;
    this.db = null;
    this.minBalanceThreshold = ethers.utils.parseEther('10.0'); // 10 ETH minimum
    this.fundingAmount = ethers.utils.parseEther('10.0'); // 10 ETH funding
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds
  }

  /**
   * Initialize the migration service
   */
  async initialize() {
    try {
      // Initialize blockchain connection
      this.provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
      this.adminWallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
      
      // Initialize database connection
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      this.db = client.db('election_system');
      
      console.log('✅ Wallet Migration: Provider initialized');
      console.log('✅ Wallet Migration: Admin wallet initialized');
      console.log('✅ Wallet Migration: Database connected');
      
      return true;
    } catch (error) {
      console.error('❌ Wallet Migration: Initialization failed:', error.message);
      return false;
    }
  }

  /**
   * Encrypt private key for storage
   */
  encryptPrivateKey(privateKey) {
    // Use simple base64 encoding for now (compatible with existing system)
    const encrypted = Buffer.from(privateKey).toString('base64');
    return {
      encrypted,
      method: 'base64'
    };
  }

  /**
   * Generate new wallet for user
   */
  async generateNewWallet(userId) {
    try {
      console.log(`🔧 Generating new wallet for user ${userId}...`);
      
      // Generate new wallet
      const wallet = ethers.Wallet.createRandom();
      const walletAddress = wallet.address;
      const privateKey = wallet.privateKey;
      
      // Encrypt private key
      const encryptedKey = this.encryptPrivateKey(privateKey);
      
      console.log(`✅ Wallet Generated: ${walletAddress} for user ${userId}`);
      
      return {
        success: true,
        wallet_address: walletAddress,
        encrypted_private_key: encryptedKey
      };
    } catch (error) {
      console.error(`❌ Wallet Generation Failed: User ${userId} - ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Fund wallet to exactly 10 ETH (top-up logic)
   */
  async fundWallet(walletAddress, userId, attempt = 1) {
    try {
      console.log(`💰 Funding wallet ${walletAddress} for user ${userId} (attempt ${attempt})...`);
      
      // Check current balance
      const currentBalance = await this.provider.getBalance(walletAddress);
      const currentBalanceEth = parseFloat(ethers.utils.formatEther(currentBalance));
      
      if (currentBalanceEth >= 10.0) {
        console.log(`✅ Wallet Already Funded: ${walletAddress} has ${currentBalanceEth} ETH`);
        return {
          success: true,
          balance: currentBalanceEth,
          alreadyFunded: true
        };
      }
      
      // Calculate exact amount needed to reach 10 ETH
      const targetBalance = ethers.utils.parseEther('10.0');
      const fundingNeeded = targetBalance.sub(currentBalance);
      const fundingNeededEth = parseFloat(ethers.utils.formatEther(fundingNeeded));
      
      console.log(`🔍 Current balance: ${currentBalanceEth} ETH, need to add: ${fundingNeededEth} ETH`);
      
      // Check admin wallet balance
      const adminBalance = await this.provider.getBalance(this.adminWallet.address);
      const adminBalanceEth = parseFloat(ethers.utils.formatEther(adminBalance));
      
      if (adminBalance.lt(fundingNeeded)) {
        throw new Error(`Insufficient admin balance: ${adminBalanceEth} ETH < ${fundingNeededEth} ETH needed`);
      }
      
      // Send exact funding amount needed
      const tx = await this.adminWallet.sendTransaction({
        to: walletAddress,
        value: fundingNeeded,
        gasLimit: 21000
      });
      
      console.log(`🚀 Funding Transaction: ${tx.hash} for ${walletAddress} (${fundingNeededEth} ETH)`);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log(`✅ Funding Confirmed: Block ${receipt.blockNumber} for ${walletAddress}`);
      
      // Verify final balance
      const finalBalance = await this.provider.getBalance(walletAddress);
      const finalBalanceEth = parseFloat(ethers.utils.formatEther(finalBalance));
      
      if (finalBalanceEth >= 10.0) {
        console.log(`✅ Wallet Funded: ${walletAddress} now has ${finalBalanceEth} ETH`);
        return {
          success: true,
          balance: finalBalanceEth,
          transactionHash: tx.hash,
          fundingAmount: fundingNeededEth
        };
      } else {
        throw new Error(`Funding verification failed: ${finalBalanceEth} ETH < 10.0 ETH`);
      }
      
    } catch (error) {
      console.error(`❌ Funding Error: User ${userId} wallet=${walletAddress} - ${error.message}`);
      
      if (attempt < this.maxRetries) {
        console.log(`🔄 Retrying funding for ${walletAddress} (attempt ${attempt + 1})...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return await this.fundWallet(walletAddress, userId, attempt + 1);
      }
      
      return {
        success: false,
        error: error.message,
        attempts: attempt
      };
    }
  }

  /**
   * Migrate single user wallet
   */
  async migrateUserWallet(user) {
    try {
      const userId = user._id.toString();
      const email = user.email;
      
      console.log(`🔍 Migrating user ${userId} (${email})...`);
      
      let walletAddress = user.wallet_address;
      let needsNewWallet = false;
      let needsFunding = false;
      let oldWalletRemoved = false;
      
      // Step 1: Remove old_wallet_address field if present
      if (user.old_wallet_address) {
        console.log(`🗑️ Removing old_wallet_address field for user ${userId}`);
        await this.db.collection('users').updateOne(
          { _id: user._id },
          { $unset: { old_wallet_address: 1 } }
        );
        console.log(`✅ Old Wallet Removed: User ${userId}`);
        oldWalletRemoved = true;
      }
      
      // Step 2: Check if wallet_address exists
      if (!walletAddress) {
        console.log(`⚠️ Missing wallet_address for user ${userId}, generating new wallet...`);
        const walletResult = await this.generateNewWallet(userId);
        
        if (!walletResult.success) {
          throw new Error(`Failed to generate wallet: ${walletResult.error}`);
        }
        
        walletAddress = walletResult.wallet_address;
        needsNewWallet = true;
        
        // Update user with new wallet
        await this.db.collection('users').updateOne(
          { _id: user._id },
          { 
            $set: { 
              wallet_address: walletAddress,
              encrypted_private_key: walletResult.encrypted_private_key
            }
          }
        );
        
        console.log(`✅ Wallet Generated: User ${userId} new wallet=${walletAddress}`);
      }
      
      // Step 3: ALWAYS check and fund wallet (top-up to 10 ETH)
      const balance = await this.provider.getBalance(walletAddress);
      const balanceEth = parseFloat(ethers.utils.formatEther(balance));
      
      if (balanceEth < 10.0) {
        needsFunding = true;
        const fundingResult = await this.fundWallet(walletAddress, userId);
        
        if (!fundingResult.success) {
          throw new Error(`Failed to fund wallet: ${fundingResult.error}`);
        }
        
        console.log(`✅ Wallet Funded: User ${userId} wallet=${walletAddress} balance=${fundingResult.balance} ETH (added ${fundingResult.fundingAmount} ETH)`);
      } else {
        console.log(`✅ Wallet Already Funded: User ${userId} wallet=${walletAddress} balance=${balanceEth} ETH`);
      }
      
      return {
        success: true,
        userId,
        email,
        walletAddress,
        needsNewWallet,
        needsFunding,
        oldWalletRemoved,
        finalBalance: balanceEth
      };
      
    } catch (error) {
      console.error(`❌ Migration Failed: User ${user._id} - ${error.message}`);
      return {
        success: false,
        userId: user._id.toString(),
        email: user.email,
        error: error.message
      };
    }
  }

  /**
   * Run complete wallet migration
   */
  async runMigration() {
    try {
      console.log('🚀 Starting wallet migration process...');
      
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      
      // Get ALL users from the database
      const users = await this.db.collection('users').find({}).toArray();
      console.log(`📊 Found ${users.length} users to migrate`);
      
      let migratedCount = 0;
      let fundedCount = 0;
      let newWalletCount = 0;
      let oldWalletRemovedCount = 0;
      let errorCount = 0;
      const results = [];
      const fundedUsers = [];
      const errorUsers = [];
      
      // Process each user
      for (const user of users) {
        console.log(`\n👤 Processing user ${user._id} (${user.email})...`);
        const result = await this.migrateUserWallet(user);
        results.push(result);
        
        if (result.success) {
          migratedCount++;
          
          if (result.needsNewWallet) {
            newWalletCount++;
          }
          
          if (result.oldWalletRemoved) {
            oldWalletRemovedCount++;
          }
          
          if (result.needsFunding) {
            fundedCount++;
            fundedUsers.push({
              userId: result.userId,
              email: result.email,
              walletAddress: result.walletAddress,
              finalBalance: result.finalBalance
            });
          }
        } else {
          errorCount++;
          errorUsers.push({
            userId: result.userId,
            email: result.email,
            error: result.error
          });
        }
      }
      
      // Log detailed summary
      console.log('\n📊 Wallet Migration Summary:');
      console.log(`✅ Total Users Processed: ${users.length}`);
      console.log(`✅ Successfully Migrated: ${migratedCount}`);
      console.log(`✅ New Wallets Generated: ${newWalletCount}`);
      console.log(`✅ Old Wallets Removed: ${oldWalletRemovedCount}`);
      console.log(`✅ Wallets Funded: ${fundedCount}`);
      console.log(`❌ Errors: ${errorCount}`);
      
      // Log funded users details
      if (fundedUsers.length > 0) {
        console.log('\n💰 Funded Users Details:');
        fundedUsers.forEach(user => {
          console.log(`✅ ${user.email} (${user.userId}): ${user.walletAddress} - ${user.finalBalance} ETH`);
        });
      }
      
      // Log error users details
      if (errorUsers.length > 0) {
        console.log('\n❌ Error Users Details:');
        errorUsers.forEach(user => {
          console.log(`❌ ${user.email} (${user.userId}): ${user.error}`);
        });
      }
      
      return {
        success: true,
        totalUsers: users.length,
        migratedCount,
        newWalletCount,
        oldWalletRemovedCount,
        fundedCount,
        errorCount,
        fundedUsers,
        errorUsers,
        results
      };
      
    } catch (error) {
      console.error('❌ Migration Failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Check if migration is needed
   */
  async checkMigrationNeeded() {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }
      
      // Check for users with old_wallet_address
      const usersWithOldWallet = await this.db.collection('users').countDocuments({
        old_wallet_address: { $exists: true }
      });
      
      // Check for users without wallet_address
      const usersWithoutWallet = await this.db.collection('users').countDocuments({
        wallet_address: { $exists: false }
      });
      
      const needsMigration = usersWithOldWallet > 0 || usersWithoutWallet > 0;
      
      console.log(`🔍 Migration Check: ${usersWithOldWallet} users with old_wallet_address, ${usersWithoutWallet} users without wallet_address`);
      
      return {
        needsMigration,
        usersWithOldWallet,
        usersWithoutWallet
      };
      
    } catch (error) {
      console.error('❌ Migration Check Failed:', error.message);
      return {
        needsMigration: false,
        error: error.message
      };
    }
  }
}

module.exports = new WalletMigrationService();
