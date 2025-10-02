/**
 * Phase 1 Database Migration Script
 * 
 * This script safely migrates the database for blockchain integration:
 * 1. Renames contract_address to wallet_address in users collection
 * 2. Adds encrypted_private_key field to users collection
 * 3. Ensures transaction_hash field exists in votes collection
 * 4. Creates blockchain_logs collection
 * 
 * ⚠️ IMPORTANT: This script is safe and will not break existing functionality
 */

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

async function runMigration() {
  const client = new MongoClient(DATABASE_URL);
  
  try {
    console.log('🚀 Starting Phase 1 Database Migration...');
    await client.connect();
    const db = client.db();
    
    // Step 1: Rename contract_address to wallet_address in users collection
    console.log('📝 Step 1: Renaming contract_address to wallet_address in users collection...');
    
    const usersCollection = db.collection('users');
    const usersWithContractAddress = await usersCollection.find({ contract_address: { $exists: true } }).toArray();
    
    if (usersWithContractAddress.length > 0) {
      console.log(`   Found ${usersWithContractAddress.length} users with contract_address field`);
      
      // Rename the field for each user
      for (const user of usersWithContractAddress) {
        await usersCollection.updateOne(
          { _id: user._id },
          { 
            $rename: { contract_address: 'wallet_address' },
            $set: { updated_at: new Date() }
          }
        );
        console.log(`   ✅ Renamed contract_address to wallet_address for user ${user._id}`);
      }
    } else {
      console.log('   ℹ️  No users found with contract_address field');
    }
    
    // Step 2: Add encrypted_private_key field to users collection if missing
    console.log('📝 Step 2: Adding encrypted_private_key field to users collection...');
    
    const usersWithoutPrivateKey = await usersCollection.find({ 
      encrypted_private_key: { $exists: false } 
    }).toArray();
    
    if (usersWithoutPrivateKey.length > 0) {
      await usersCollection.updateMany(
        { encrypted_private_key: { $exists: false } },
        { 
          $set: { 
            encrypted_private_key: null,
            updated_at: new Date()
          }
        }
      );
      console.log(`   ✅ Added encrypted_private_key field to ${usersWithoutPrivateKey.length} users`);
    } else {
      console.log('   ℹ️  All users already have encrypted_private_key field');
    }
    
    // Step 3: Ensure transaction_hash field exists in votes collection
    console.log('📝 Step 3: Ensuring transaction_hash field exists in votes collection...');
    
    const votesCollection = db.collection('votes');
    const votesWithoutTransactionHash = await votesCollection.find({ 
      transaction_hash: { $exists: false } 
    }).toArray();
    
    if (votesWithoutTransactionHash.length > 0) {
      await votesCollection.updateMany(
        { transaction_hash: { $exists: false } },
        { 
          $set: { 
            transaction_hash: null,
            updated_at: new Date()
          }
        }
      );
      console.log(`   ✅ Added transaction_hash field to ${votesWithoutTransactionHash.length} votes`);
    } else {
      console.log('   ℹ️  All votes already have transaction_hash field');
    }
    
    // Step 4: Create blockchain_logs collection
    console.log('📝 Step 4: Creating blockchain_logs collection...');
    
    const blockchainLogsCollection = db.collection('blockchain_logs');
    
    // Check if collection already exists
    const collections = await db.listCollections({ name: 'blockchain_logs' }).toArray();
    
    if (collections.length === 0) {
      // Create the collection with an index
      await blockchainLogsCollection.createIndex({ timestamp: 1 });
      await blockchainLogsCollection.createIndex({ wallet_address: 1 });
      await blockchainLogsCollection.createIndex({ action: 1 });
      console.log('   ✅ Created blockchain_logs collection with indexes');
    } else {
      console.log('   ℹ️  blockchain_logs collection already exists');
    }
    
    // Step 5: Verify migration results
    console.log('📝 Step 5: Verifying migration results...');
    
    const usersWithWalletAddress = await usersCollection.find({ wallet_address: { $exists: true } }).toArray();
    const usersWithContractAddressAfter = await usersCollection.find({ contract_address: { $exists: true } }).toArray();
    const usersWithPrivateKey = await usersCollection.find({ encrypted_private_key: { $exists: true } }).toArray();
    const votesWithTransactionHash = await votesCollection.find({ transaction_hash: { $exists: true } }).toArray();
    
    console.log('   📊 Migration Results:');
    console.log(`      - Users with wallet_address: ${usersWithWalletAddress.length}`);
    console.log(`      - Users with contract_address (should be 0): ${usersWithContractAddressAfter.length}`);
    console.log(`      - Users with encrypted_private_key: ${usersWithPrivateKey.length}`);
    console.log(`      - Votes with transaction_hash: ${votesWithTransactionHash.length}`);
    
    if (usersWithContractAddressAfter.length === 0) {
      console.log('   ✅ All contract_address fields successfully renamed to wallet_address');
    } else {
      console.log('   ⚠️  Some contract_address fields still exist - manual review needed');
    }
    
    console.log('🎉 Phase 1 Database Migration completed successfully!');
    console.log('📋 Summary:');
    console.log('   - contract_address → wallet_address (renamed)');
    console.log('   - encrypted_private_key field added to users');
    console.log('   - transaction_hash field ensured in votes');
    console.log('   - blockchain_logs collection created');
    console.log('   - All existing data preserved');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the migration
if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigration };
