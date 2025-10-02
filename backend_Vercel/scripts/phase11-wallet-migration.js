/**
 * PHASE 11: Voter Wallet Migration Script
 * 
 * This script migrates existing users to have blockchain wallets
 * - Finds users without wallet_address or encrypted_private_key
 * - Creates wallets for them using the blockchain service
 * - Updates their records with wallet data
 */

const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Import blockchain service
const blockchainService = require('../blockchain/services/blockchainService');

async function migrateUserWallets() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    console.log('🚀 Starting Phase 11: Voter Wallet Migration...');
    
    await client.connect();
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Find users without wallet data
    const usersWithoutWallets = await usersCollection.find({
      $or: [
        { wallet_address: { $exists: false } },
        { wallet_address: null },
        { encrypted_private_key: { $exists: false } },
        { encrypted_private_key: null }
      ],
      nin_verified: true // Only migrate verified users
    }).toArray();
    
    console.log(`📊 Found ${usersWithoutWallets.length} users without wallets`);
    
    if (usersWithoutWallets.length === 0) {
      console.log('✅ All users already have wallets. Migration complete!');
      return;
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each user
    for (const user of usersWithoutWallets) {
      try {
        console.log(`\n🔄 Processing user: ${user.email} (${user._id})`);
        
        // Check if user has user_unique_id
        if (!user.user_unique_id) {
          console.log(`⚠️  User ${user.email} missing user_unique_id, generating one...`);
          
          // Generate unique voter ID
          const crypto = require('crypto');
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let voterId = '';
          for (let i = 0; i < 15; i++) {
            voterId += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          
          // Update user with voter ID first
          await usersCollection.updateOne(
            { _id: user._id },
            { $set: { user_unique_id: voterId } }
          );
          
          user.user_unique_id = voterId;
        }
        
        // Create wallet for user
        console.log(`🔑 Creating wallet for user: ${user.user_unique_id}`);
        const walletData = await blockchainService.createVoterWallet(user.user_unique_id);
        
        // Update user with wallet data
        await usersCollection.updateOne(
          { _id: user._id },
          {
            $set: {
              wallet_address: walletData.wallet_address,
              encrypted_private_key: walletData.encrypted_private_key,
              updated_at: new Date()
            }
          }
        );
        
        console.log(`✅ Wallet created: ${walletData.wallet_address}`);
        successCount++;
        
      } catch (error) {
        console.error(`❌ Failed to create wallet for user ${user.email}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\n🎯 Migration Summary:`);
    console.log(`  ✅ Successful: ${successCount}`);
    console.log(`  ❌ Failed: ${errorCount}`);
    console.log(`  📊 Total processed: ${usersWithoutWallets.length}`);
    
    if (errorCount > 0) {
      console.log(`\n⚠️  ${errorCount} users failed wallet creation. You may need to retry manually.`);
    }
    
    console.log('\n✅ Phase 11 wallet migration completed!');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run migration if called directly
if (require.main === module) {
  migrateUserWallets()
    .then(() => {
      console.log('🎉 Migration script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { migrateUserWallets };
