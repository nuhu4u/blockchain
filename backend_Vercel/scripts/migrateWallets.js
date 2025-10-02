/**
 * PHASE 11: Wallet Migration Script
 * 
 * This script migrates all existing users to have Hardhat-generated wallets
 * instead of Ganache mock ones. It ensures every user has:
 * - wallet_address: Real Hardhat wallet address
 * - encrypted_private_key: AES-encrypted private key
 * 
 * Usage: node scripts/migrateWallets.js
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');
const blockchainService = require('../blockchain/services/blockchainService');
const logger = require('../utils/logger');

class WalletMigration {
  constructor() {
    this.client = null;
    this.db = null;
    this.usersCollection = null;
    this.stats = {
      total: 0,
      processed: 0,
      updated: 0,
      skipped: 0,
      errors: 0
    };
  }

  /**
   * Initialize database connection
   */
  async initialize() {
    try {
      this.client = new MongoClient(process.env.DATABASE_URL);
      await this.client.connect();
      this.db = this.client.db();
      this.usersCollection = this.db.collection('users');
      
      logger.info('✅ Database connection established');
    } catch (error) {
      logger.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Check if user needs wallet migration
   * @param {Object} user - User document from database
   * @returns {boolean} True if user needs migration
   */
  needsMigration(user) {
    // Check if user has no wallet_address
    if (!user.wallet_address) {
      return true;
    }

    // Check if user has mock/test wallet addresses (Ganache pattern)
    const mockPatterns = [
      /^0x[a-fA-F0-9]{40}$/, // Basic Ethereum address pattern
      /^0x90F8BF60De1EfDb7Ac5C9b4C8D8C9C1C8C9C1C8C9C1$/, // Specific mock pattern
      /^0x0000000000000000000000000000000000000000$/, // Zero address
      /^mock/i, // Mock addresses
      /^test/i  // Test addresses
    ];

    // If wallet_address matches any mock pattern, needs migration
    return mockPatterns.some(pattern => pattern.test(user.wallet_address));
  }

  /**
   * Check if user has valid Hardhat wallet
   * @param {Object} user - User document from database
   * @returns {boolean} True if user has valid wallet
   */
  hasValidWallet(user) {
    return user.wallet_address && 
           user.encrypted_private_key && 
           !this.needsMigration(user);
  }

  /**
   * Generate new Hardhat wallet for user
   * @param {Object} user - User document
   * @returns {Object} Wallet data
   */
  async generateWallet(user) {
    try {
      // Use user_unique_id if available, otherwise use _id
      const userId = user.user_unique_id || user._id.toString();
      
      // Create deterministic wallet based on user ID
      const walletData = await blockchainService.createVoterWallet(userId);
      
      return walletData;
    } catch (error) {
      logger.error(`❌ Failed to generate wallet for user ${user.email}:`, error);
      throw error;
    }
  }

  /**
   * Migrate a single user
   * @param {Object} user - User document
   * @returns {Object} Migration result
   */
  async migrateUser(user) {
    try {
      this.stats.processed++;

      // Check if user already has valid wallet
      if (this.hasValidWallet(user)) {
        logger.info(`⏭️  Skipping user ${user.email} - already has valid Hardhat wallet`);
        this.stats.skipped++;
        return { status: 'skipped', reason: 'valid_wallet_exists' };
      }

      // Generate new Hardhat wallet
      const walletData = await this.generateWallet(user);

      // Update user with new wallet data
      const updateResult = await this.usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            wallet_address: walletData.wallet_address,
            encrypted_private_key: walletData.encrypted_private_key,
            updated_at: new Date()
          }
        }
      );

      if (updateResult.modifiedCount > 0) {
        logger.info(`✅ Updated user ${user.email} with Hardhat wallet: ${walletData.wallet_address}`);
        this.stats.updated++;
        return { 
          status: 'updated', 
          wallet_address: walletData.wallet_address,
          user_email: user.email
        };
      } else {
        logger.warn(`⚠️  No changes made for user ${user.email}`);
        this.stats.skipped++;
        return { status: 'skipped', reason: 'no_changes' };
      }

    } catch (error) {
      logger.error(`❌ Failed to migrate user ${user.email}:`, error);
      this.stats.errors++;
      return { 
        status: 'error', 
        error: error.message,
        user_email: user.email
      };
    }
  }

  /**
   * Run the migration process
   */
  async run() {
    try {
      logger.info('🚀 Starting Hardhat wallet migration...');
      
      // Initialize database connection
      await this.initialize();

      // Get all users that need migration
      const users = await this.usersCollection.find({}).toArray();
      this.stats.total = users.length;

      logger.info(`📊 Found ${this.stats.total} users to process`);

      // Process users in batches to avoid overwhelming the system
      const batchSize = 10;
      const batches = [];
      
      for (let i = 0; i < users.length; i += batchSize) {
        batches.push(users.slice(i, i + batchSize));
      }

      logger.info(`📦 Processing ${batches.length} batches of ${batchSize} users each`);

      // Process each batch
      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        logger.info(`🔄 Processing batch ${i + 1}/${batches.length} (${batch.length} users)`);

        // Process users in parallel within each batch
        const batchPromises = batch.map(user => this.migrateUser(user));
        const batchResults = await Promise.allSettled(batchPromises);

        // Log batch results
        const batchErrors = batchResults.filter(result => 
          result.status === 'rejected' || result.value.status === 'error'
        );
        
        if (batchErrors.length > 0) {
          logger.warn(`⚠️  Batch ${i + 1} had ${batchErrors.length} errors`);
        }

        // Small delay between batches to avoid overwhelming the system
        if (i < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Print final statistics
      this.printStats();

    } catch (error) {
      logger.error('💥 Migration failed:', error);
      throw error;
    } finally {
      // Close database connection
      if (this.client) {
        await this.client.close();
        logger.info('🔌 Database connection closed');
      }
    }
  }

  /**
   * Print migration statistics
   */
  printStats() {
    logger.info('\n📈 Migration Statistics:');
    logger.info(`   Total users: ${this.stats.total}`);
    logger.info(`   Processed: ${this.stats.processed}`);
    logger.info(`   Updated: ${this.stats.updated}`);
    logger.info(`   Skipped: ${this.stats.skipped}`);
    logger.info(`   Errors: ${this.stats.errors}`);
    
    const successRate = this.stats.total > 0 ? 
      ((this.stats.updated + this.stats.skipped) / this.stats.total * 100).toFixed(2) : 0;
    
    logger.info(`   Success rate: ${successRate}%`);
    
    if (this.stats.errors > 0) {
      logger.warn(`⚠️  ${this.stats.errors} users had errors during migration`);
    } else {
      logger.info('✅ All users processed successfully!');
    }
  }

  /**
   * Verify migration results
   */
  async verify() {
    try {
      logger.info('\n🔍 Verifying migration results...');
      
      await this.initialize();
      
      // Count users with valid Hardhat wallets
      const validWalletCount = await this.usersCollection.countDocuments({
        wallet_address: { $exists: true, $ne: null },
        encrypted_private_key: { $exists: true, $ne: null }
      });

      // Count users without wallets
      const noWalletCount = await this.usersCollection.countDocuments({
        $or: [
          { wallet_address: { $exists: false } },
          { wallet_address: null },
          { encrypted_private_key: { $exists: false } },
          { encrypted_private_key: null }
        ]
      });

      logger.info(`✅ Users with valid Hardhat wallets: ${validWalletCount}`);
      logger.info(`❌ Users without wallets: ${noWalletCount}`);

      if (noWalletCount === 0) {
        logger.info('🎉 All users have been successfully migrated to Hardhat wallets!');
      } else {
        logger.warn(`⚠️  ${noWalletCount} users still need wallet migration`);
      }

    } catch (error) {
      logger.error('❌ Verification failed:', error);
      throw error;
    } finally {
      if (this.client) {
        await this.client.close();
      }
    }
  }
}

// Main execution
async function main() {
  const migration = new WalletMigration();
  
  try {
    // Run migration
    await migration.run();
    
    // Verify results
    await migration.verify();
    
    logger.info('\n🎉 Hardhat wallet migration completed successfully!');
    process.exit(0);
    
  } catch (error) {
    logger.error('\n💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = WalletMigration;
