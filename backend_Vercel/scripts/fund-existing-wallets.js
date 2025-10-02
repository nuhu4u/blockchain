const { MongoClient, ObjectId } = require('mongodb');
const blockchainService = require('../blockchain/services/blockchainService');
require('dotenv').config();

/**
 * Migration Script: Fund Existing User Wallets
 * 
 * This script funds all existing user wallets with 5 ETH if their balance is less than 5 ETH.
 * It's idempotent and safe to run multiple times.
 * 
 * Usage: node scripts/fund-existing-wallets.js
 */

async function fundExistingWallets() {
  console.log('🚀 FUNDING EXISTING WALLETS MIGRATION START\n');
  
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    // Initialize blockchain service
    console.log('🔌 Initializing blockchain connection...');
    const isConnected = await blockchainService.initialize();
    if (!isConnected) {
      throw new Error('Failed to connect to Hardhat. Please ensure Hardhat is running.');
    }
    console.log('✅ Connected to Hardhat successfully\n');
    
    // Get all users with wallet addresses
    console.log('📊 STEP 1: Finding users with wallet addresses...');
    const users = await db.collection('users').find({ 
      wallet_address: { $exists: true, $ne: null } 
    }).toArray();
    
    console.log(`Found ${users.length} users with wallet addresses\n`);
    
    if (users.length === 0) {
      console.log('ℹ️ No users with wallet addresses found. Migration complete.');
      return;
    }
    
    // Check admin balance first
    console.log('📊 STEP 2: Checking admin wallet balance...');
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    const adminWallet = new ethers.Wallet(adminPrivateKey, blockchainService.provider);
    const adminBalance = await blockchainService.provider.getBalance(adminWallet.address);
    const requiredTotal = ethers.utils.parseEther((users.length * 5).toString());
    
    console.log(`Admin wallet: ${adminWallet.address}`);
    console.log(`Admin balance: ${ethers.utils.formatEther(adminBalance)} ETH`);
    console.log(`Required total: ${ethers.utils.formatEther(requiredTotal)} ETH`);
    
    if (adminBalance.lt(requiredTotal)) {
      console.log(`⚠️ WARNING: Admin balance may be insufficient for all users`);
      console.log(`   Required: ${ethers.utils.formatEther(requiredTotal)} ETH`);
      console.log(`   Available: ${ethers.utils.formatEther(adminBalance)} ETH`);
      console.log(`   Proceeding with funding as many users as possible...\n`);
    }
    
    // Process each user
    console.log('📊 STEP 3: Processing user wallets...\n');
    
    const results = {
      total: users.length,
      funded: 0,
      skipped: 0,
      failed: 0,
      errors: []
    };
    
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userNumber = i + 1;
      
      console.log(`👤 User ${userNumber}/${users.length}: ${user.first_name} ${user.last_name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Wallet: ${user.wallet_address}`);
      
      try {
        // Check current balance
        const fundingStatus = await blockchainService.checkWalletFundingStatus(user.wallet_address, 5);
        console.log(`   Current balance: ${fundingStatus.currentBalance} ETH`);
        
        if (!fundingStatus.needsFunding) {
          console.log(`   ✅ Already has sufficient balance (>= 5 ETH), skipping`);
          results.skipped++;
          console.log('');
          continue;
        }
        
        // Fund the wallet with retry logic
        let fundingSuccess = false;
        let lastError = null;
        
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            console.log(`   🚀 Funding attempt ${attempt}/3...`);
            const fundingResult = await blockchainService.fundVoterWallet(user.wallet_address, 5);
            
            console.log(`   ✅ Funding success!`);
            console.log(`   📊 Transaction hash: ${fundingResult.transactionHash}`);
            console.log(`   📊 New balance: ${fundingResult.newBalance} ETH`);
            console.log(`   📊 Block number: ${fundingResult.blockNumber}`);
            
            // Update user record with funding info
            await db.collection('users').updateOne(
              { _id: user._id },
              {
                $set: {
                  wallet_funded: true,
                  wallet_funding_tx_hash: fundingResult.transactionHash,
                  wallet_funding_block: fundingResult.blockNumber,
                  wallet_funding_date: new Date(),
                  updated_at: new Date()
                }
              }
            );
            
            fundingSuccess = true;
            results.funded++;
            break;
            
          } catch (error) {
            lastError = error;
            console.log(`   ❌ Attempt ${attempt} failed: ${error.message}`);
            
            if (attempt < 3) {
              const delay = 2000 * attempt; // 2s, 4s
              console.log(`   ⏳ Retrying in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
        
        if (!fundingSuccess) {
          console.log(`   ❌ All funding attempts failed for this user`);
          results.failed++;
          results.errors.push({
            user: user.email,
            wallet: user.wallet_address,
            error: lastError.message
          });
        }
        
      } catch (error) {
        console.log(`   ❌ Error processing user: ${error.message}`);
        results.failed++;
        results.errors.push({
          user: user.email,
          wallet: user.wallet_address,
          error: error.message
        });
      }
      
      console.log('');
    }
    
    // Final summary
    console.log('📊 MIGRATION SUMMARY');
    console.log('==================');
    console.log(`Total users processed: ${results.total}`);
    console.log(`Successfully funded: ${results.funded}`);
    console.log(`Skipped (sufficient balance): ${results.skipped}`);
    console.log(`Failed: ${results.failed}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.user} (${error.wallet}): ${error.error}`);
      });
    }
    
    // Check final admin balance
    console.log('\n📊 Final admin balance check...');
    const finalAdminBalance = await blockchainService.provider.getBalance(adminWallet.address);
    console.log(`Admin final balance: ${ethers.utils.formatEther(finalAdminBalance)} ETH`);
    
    if (results.funded > 0) {
      console.log('\n✅ Migration completed successfully!');
      console.log(`💰 Funded ${results.funded} user wallets with 5 ETH each`);
    } else if (results.skipped === results.total) {
      console.log('\n✅ All users already have sufficient balance - no funding needed!');
    } else {
      console.log('\n⚠️ Migration completed with some failures. Check errors above.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
  
  console.log('\n🚀 FUNDING EXISTING WALLETS MIGRATION END');
}

// Add ethers import for balance checking
const { ethers } = require('ethers');

// Run the migration
if (require.main === module) {
  fundExistingWallets().catch(console.error);
}

module.exports = { fundExistingWallets };
