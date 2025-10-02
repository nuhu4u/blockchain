/**
 * PHASE 11: Wallet Migration Script
 * 
 * This script migrates all users to have blockchain wallet fields:
 * - wallet_address: User's unique Ganache wallet address
 * - encrypted_private_key: Encrypted private key for signing transactions
 * 
 * The script is idempotent and can be run safely multiple times.
 */

const { MongoClient, ObjectId } = require('mongodb');
const crypto = require('crypto');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Import crypto utilities
const { encrypt, decrypt } = require('../utils/crypto');

// Import blockchain service for wallet generation
const blockchainService = require('../blockchain/services/blockchainService');

/**
 * Generate a deterministic wallet for a user based on their unique ID
 * @param {string} userUniqueId - User's unique identifier
 * @returns {Promise<Object>} Wallet data with address and private key
 */
async function generateUserWallet(userUniqueId) {
  try {
    console.log(`🔑 Generating wallet for user: ${userUniqueId}`);
    
    // Use the blockchain service's wallet generation method
    const walletData = await blockchainService.createVoterWallet(userUniqueId);
    
    console.log(`✅ Wallet generated: ${walletData.wallet_address}`);
    return walletData;
    
  } catch (error) {
    console.error(`❌ Failed to generate wallet for user ${userUniqueId}:`, error.message);
    throw error;
  }
}

/**
 * Check if user needs wallet migration
 * @param {Object} user - User document from database
 * @returns {Object} Migration status and required fields
 */
function checkUserMigrationStatus(user) {
  const needsWalletAddress = !user.wallet_address;
  const needsEncryptedKey = !user.encrypted_private_key;
  const needsMigration = needsWalletAddress || needsEncryptedKey;
  
  return {
    needsMigration,
    needsWalletAddress,
    needsEncryptedKey,
    hasBoth: !needsMigration
  };
}

/**
 * Migrate a single user's wallet
 * @param {Object} user - User document
 * @param {Object} usersCollection - MongoDB collection
 * @returns {Promise<Object>} Migration result
 */
async function migrateUserWallet(user, usersCollection) {
  const migrationStatus = checkUserMigrationStatus(user);
  
  if (!migrationStatus.needsMigration) {
    return {
      success: true,
      skipped: true,
      reason: 'User already has complete wallet setup',
      user: user.email
    };
  }
  
  try {
    console.log(`\n🔄 Migrating user: ${user.email}`);
    console.log(`   Current status: wallet=${!!user.wallet_address}, encrypted_key=${!!user.encrypted_private_key}`);
    
    let walletData = null;
    let updateData = {};
    
    // Generate wallet if needed
    if (migrationStatus.needsWalletAddress) {
      console.log(`   📝 Generating new wallet address...`);
      
      // Use user's unique ID or email as seed for deterministic generation
      const userSeed = user.user_unique_id || user.email;
      walletData = await generateUserWallet(userSeed);
      
      updateData.wallet_address = walletData.wallet_address;
      updateData.encrypted_private_key = walletData.encrypted_private_key;
      
      console.log(`   ✅ Generated wallet: ${walletData.wallet_address}`);
    } else if (migrationStatus.needsEncryptedKey && user.wallet_address) {
      console.log(`   📝 User has wallet but missing encrypted private key`);
      console.log(`   🔄 Generating new wallet to ensure complete setup...`);
      
      // Generate a new wallet for this user (they'll need to use the new wallet)
      const userSeed = user.user_unique_id || user.email;
      walletData = await generateUserWallet(userSeed + '_migrated');
      
      updateData.wallet_address = walletData.wallet_address;
      updateData.encrypted_private_key = walletData.encrypted_private_key;
      updateData.old_wallet_address = user.wallet_address; // Keep old wallet for reference
      
      console.log(`   ✅ Generated new wallet: ${walletData.wallet_address}`);
      console.log(`   📝 Old wallet preserved: ${user.wallet_address}`);
    }
    
    // Update user in database
    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      {
        $set: {
          ...updateData,
          wallet_migration_date: new Date(),
          updated_at: new Date()
        }
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      console.log(`   ✅ User migrated successfully`);
      return {
        success: true,
        skipped: false,
        user: user.email,
        wallet_address: updateData.wallet_address || user.wallet_address,
        encrypted_private_key: !!updateData.encrypted_private_key
      };
    } else {
      console.log(`   ⚠️  No changes made to user record`);
      return {
        success: false,
        skipped: false,
        reason: 'No changes made to user record',
        user: user.email
      };
    }
    
  } catch (error) {
    console.error(`   ❌ Migration failed for user ${user.email}:`, error.message);
    return {
      success: false,
      skipped: false,
      reason: error.message,
      user: user.email
    };
  }
}

/**
 * Main migration function
 */
async function migrateWallets() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    console.log('🚀 Starting Phase 11: Wallet Migration...\n');
    
    // Validate environment
    if (!process.env.ENCRYPTION_KEY) {
      throw new Error('ENCRYPTION_KEY is not set in environment variables');
    }
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set in environment variables');
    }
    
    console.log('✅ Environment validation passed');
    
    // Connect to database
    await client.connect();
    const db = client.db('election_system');
    const usersCollection = db.collection('users');
    
    console.log('✅ Connected to MongoDB');
    
    // Initialize blockchain service
    await blockchainService.initialize();
    console.log('✅ Blockchain service initialized');
    
    // Get all users that need migration
    console.log('\n📊 Analyzing users for migration...');
    
    const allUsers = await usersCollection.find({}).toArray();
    console.log(`   Total users in database: ${allUsers.length}`);
    
    const migrationAnalysis = allUsers.map(user => ({
      user,
      status: checkUserMigrationStatus(user)
    }));
    
    const needsMigration = migrationAnalysis.filter(item => item.status.needsMigration);
    const alreadyComplete = migrationAnalysis.filter(item => item.status.hasBoth);
    const needsWalletOnly = migrationAnalysis.filter(item => item.status.needsWalletAddress);
    const needsKeyOnly = migrationAnalysis.filter(item => item.status.needsEncryptedKey);
    
    console.log(`   Users needing migration: ${needsMigration.length}`);
    console.log(`   Users with complete setup: ${alreadyComplete.length}`);
    console.log(`   Users needing wallet address: ${needsWalletOnly.length}`);
    console.log(`   Users needing encrypted key: ${needsKeyOnly.length}`);
    
    if (needsMigration.length === 0) {
      console.log('\n🎉 All users already have complete wallet setup!');
      return;
    }
    
    // Test migration on first user before batch processing
    if (needsMigration.length > 0) {
      console.log('\n🧪 Testing migration on first user...');
      const testUser = needsMigration[0].user;
      const testResult = await migrateUserWallet(testUser, usersCollection);
      
      if (testResult.success && !testResult.skipped) {
        console.log('✅ Test migration successful, proceeding with batch migration');
      } else {
        console.log(`⚠️  Test migration result: ${testResult.reason}`);
      }
    }
    
    // Process all users that need migration
    console.log('\n🔄 Starting batch migration...');
    
    const results = {
      successful: [],
      skipped: [],
      failed: []
    };
    
    for (const item of needsMigration) {
      const result = await migrateUserWallet(item.user, usersCollection);
      
      if (result.success) {
        if (result.skipped) {
          results.skipped.push(result);
        } else {
          results.successful.push(result);
        }
      } else {
        results.failed.push(result);
      }
      
      // Add small delay to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Print migration summary
    console.log('\n📋 Migration Summary:');
    console.log(`   ✅ Successful migrations: ${results.successful.length}`);
    console.log(`   ⏭️  Skipped (already complete): ${results.skipped.length}`);
    console.log(`   ❌ Failed migrations: ${results.failed.length}`);
    
    if (results.successful.length > 0) {
      console.log('\n✅ Successfully migrated users:');
      results.successful.forEach(result => {
        console.log(`   - ${result.user}: ${result.wallet_address}`);
      });
    }
    
    if (results.failed.length > 0) {
      console.log('\n❌ Failed migrations:');
      results.failed.forEach(result => {
        console.log(`   - ${result.user}: ${result.reason}`);
      });
    }
    
    // Verify migration results
    console.log('\n🔍 Verifying migration results...');
    
    const finalUsers = await usersCollection.find({}).toArray();
    const finalAnalysis = finalUsers.map(user => checkUserMigrationStatus(user));
    
    const stillNeedsMigration = finalAnalysis.filter(status => status.needsMigration);
    const nowComplete = finalAnalysis.filter(status => status.hasBoth);
    
    console.log(`   Users with complete setup: ${nowComplete.length}/${finalUsers.length}`);
    console.log(`   Users still needing migration: ${stillNeedsMigration.length}`);
    
    if (stillNeedsMigration.length === 0) {
      console.log('\n🎉 All users now have complete wallet setup!');
    } else {
      console.log('\n⚠️  Some users still need manual intervention');
    }
    
    console.log('\n✅ Phase 11 wallet migration completed!');
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Dry run mode - analyze users without making changes
 */
async function dryRunMigration() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    console.log('🔍 Phase 11: Wallet Migration - DRY RUN\n');
    
    await client.connect();
    const db = client.db('election_system');
    const usersCollection = db.collection('users');
    
    const users = await usersCollection.find({}).toArray();
    console.log(`📊 Found ${users.length} users in database\n`);
    
    users.forEach((user, index) => {
      const status = checkUserMigrationStatus(user);
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Wallet Address: ${user.wallet_address ? '✅ Present' : '❌ Missing'}`);
      console.log(`   Encrypted Key: ${user.encrypted_private_key ? '✅ Present' : '❌ Missing'}`);
      console.log(`   Migration Needed: ${status.needsMigration ? '⚠️  Yes' : '✅ No'}`);
      console.log('');
    });
    
    const needsMigration = users.filter(user => checkUserMigrationStatus(user).needsMigration);
    console.log(`📋 Summary: ${needsMigration.length} users need migration`);
    
  } catch (error) {
    console.error('❌ Dry run failed:', error.message);
  } finally {
    await client.close();
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run') || args.includes('-d');
  
  if (isDryRun) {
    dryRunMigration()
      .then(() => {
        console.log('\n🚀 Dry run completed successfully!');
        process.exit(0);
      })
      .catch((error) => {
        console.error('\n💥 Dry run failed:', error);
        process.exit(1);
      });
  } else {
    migrateWallets()
      .then(() => {
        console.log('\n🚀 Migration completed successfully!');
        process.exit(0);
      })
      .catch((error) => {
        console.error('\n💥 Migration failed:', error);
        process.exit(1);
      });
  }
}

module.exports = { migrateWallets, dryRunMigration, checkUserMigrationStatus };
