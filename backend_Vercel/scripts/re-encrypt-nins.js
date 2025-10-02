const { MongoClient } = require('mongodb');
const { encryptNIN, decryptNIN, verifyNINHmac, verifyNINHash } = require('../utils/crypto');
require('dotenv').config();

/**
 * Script to re-encrypt all existing NINs using the new three-layer encryption system
 * This ensures all NINs follow the proper encryption standards:
 * 1. encrypted_nin: AES-256-CBC encrypted
 * 2. hashed_nin: SHA-256 hash
 * 3. nin_hmac: HMAC-SHA256 for integrity
 * 4. nin_iv: Initialization vector for AES
 */

async function reEncryptNINs() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    console.log('🔐 Starting NIN re-encryption process...');
    await client.connect();
    const db = client.db();
    
    // Process users collection
    console.log('📊 Processing users collection...');
    const usersCollection = db.collection('users');
    const users = await usersCollection.find({ 
      $or: [
        { hashed_nin: { $exists: true } },
        { encrypted_nin: { $exists: true } }
      ]
    }).toArray();
    
    console.log(`Found ${users.length} users with NIN data to re-encrypt`);
    
    let processedCount = 0;
    let errorCount = 0;
    
    for (const user of users) {
      try {
        console.log(`\n🔄 Processing user: ${user.email || user._id}`);
        
        // Check if user already has the new encryption format
        if (user.encrypted_nin && user.hashed_nin && user.nin_hmac && user.nin_iv) {
          console.log('  ✅ User already has new encryption format, skipping...');
          continue;
        }
        
        // If user has old format, we need to decrypt and re-encrypt
        let originalNIN = null;
        
        if (user.encrypted_nin && user.nin_iv) {
          try {
            // Try to decrypt using old format
            originalNIN = decryptNIN(user.encrypted_nin, user.nin_iv);
            console.log('  🔓 Successfully decrypted existing NIN');
          } catch (decryptError) {
            console.log('  ⚠️ Could not decrypt existing NIN, skipping user');
            continue;
          }
        } else if (user.hashed_nin) {
          // If we only have hash, we can't recover the original NIN
          console.log('  ⚠️ User only has hashed NIN, cannot re-encrypt (original NIN lost)');
          continue;
        } else {
          console.log('  ⚠️ User has no NIN data, skipping...');
          continue;
        }
        
        // Re-encrypt using new three-layer system
        const newEncryption = encryptNIN(originalNIN);
        
        // Update user with new encryption
        const updateResult = await usersCollection.updateOne(
          { _id: user._id },
          {
            $set: {
              encrypted_nin: newEncryption.encrypted_nin,
              hashed_nin: newEncryption.hashed_nin,
              nin_hmac: newEncryption.nin_hmac,
              nin_iv: newEncryption.nin_iv,
              updated_at: new Date()
            }
          }
        );
        
        if (updateResult.modifiedCount > 0) {
          console.log('  ✅ Successfully re-encrypted NIN');
          processedCount++;
        } else {
          console.log('  ⚠️ No changes made to user');
        }
        
      } catch (userError) {
        console.error(`  ❌ Error processing user ${user.email || user._id}:`, userError.message);
        errorCount++;
      }
    }
    
    // Process admin collection
    console.log('\n📊 Processing admin collection...');
    const adminCollection = db.collection('admin');
    const admins = await adminCollection.find({ 
      $or: [
        { hashed_nin: { $exists: true } },
        { encrypted_nin: { $exists: true } }
      ]
    }).toArray();
    
    console.log(`Found ${admins.length} admins with NIN data to re-encrypt`);
    
    for (const admin of admins) {
      try {
        console.log(`\n🔄 Processing admin: ${admin.email || admin._id}`);
        
        // Check if admin already has the new encryption format
        if (admin.encrypted_nin && admin.hashed_nin && admin.nin_hmac && admin.nin_iv) {
          console.log('  ✅ Admin already has new encryption format, skipping...');
          continue;
        }
        
        // If admin has old format, we need to decrypt and re-encrypt
        let originalNIN = null;
        
        if (admin.encrypted_nin && admin.nin_iv) {
          try {
            // Try to decrypt using old format
            originalNIN = decryptNIN(admin.encrypted_nin, admin.nin_iv);
            console.log('  🔓 Successfully decrypted existing NIN');
          } catch (decryptError) {
            console.log('  ⚠️ Could not decrypt existing NIN, skipping admin');
            continue;
          }
        } else if (admin.hashed_nin) {
          // If we only have hash, we can't recover the original NIN
          console.log('  ⚠️ Admin only has hashed NIN, cannot re-encrypt (original NIN lost)');
          continue;
        } else {
          console.log('  ⚠️ Admin has no NIN data, skipping...');
          continue;
        }
        
        // Re-encrypt using new three-layer system
        const newEncryption = encryptNIN(originalNIN);
        
        // Update admin with new encryption
        const updateResult = await adminCollection.updateOne(
          { _id: admin._id },
          {
            $set: {
              encrypted_nin: newEncryption.encrypted_nin,
              hashed_nin: newEncryption.hashed_nin,
              nin_hmac: newEncryption.nin_hmac,
              nin_iv: newEncryption.nin_iv,
              updated_at: new Date()
            }
          }
        );
        
        if (updateResult.modifiedCount > 0) {
          console.log('  ✅ Successfully re-encrypted NIN');
          processedCount++;
        } else {
          console.log('  ⚠️ No changes made to admin');
        }
        
      } catch (adminError) {
        console.error(`  ❌ Error processing admin ${admin.email || admin._id}:`, adminError.message);
        errorCount++;
      }
    }
    
    console.log('\n🎉 NIN re-encryption process completed!');
    console.log(`📊 Summary:`);
    console.log(`   ✅ Successfully processed: ${processedCount} users/admins`);
    console.log(`   ❌ Errors encountered: ${errorCount}`);
    console.log(`   🔐 All processed NINs now use three-layer encryption:`);
    console.log(`      1. encrypted_nin: AES-256-CBC encrypted`);
    console.log(`      2. hashed_nin: SHA-256 hash`);
    console.log(`      3. nin_hmac: HMAC-SHA256 for integrity`);
    console.log(`      4. nin_iv: Initialization vector for AES`);
    
  } catch (error) {
    console.error('❌ Fatal error during NIN re-encryption:', error);
  } finally {
    await client.close();
  }
}

// Test the encryption system
async function testEncryption() {
  console.log('🧪 Testing NIN encryption system...');
  
  const testNIN = '12345678901';
  console.log(`Test NIN: ${testNIN}`);
  
  try {
    // Test encryption
    const encrypted = encryptNIN(testNIN);
    console.log('✅ Encryption successful:');
    console.log(`  encrypted_nin: ${encrypted.encrypted_nin}`);
    console.log(`  hashed_nin: ${encrypted.hashed_nin}`);
    console.log(`  nin_hmac: ${encrypted.nin_hmac}`);
    console.log(`  nin_iv: ${encrypted.nin_iv}`);
    
    // Test decryption
    const decrypted = decryptNIN(encrypted.encrypted_nin, encrypted.nin_iv);
    console.log(`✅ Decryption successful: ${decrypted}`);
    console.log(`  Original matches decrypted: ${testNIN === decrypted}`);
    
    // Test HMAC verification
    const hmacValid = verifyNINHmac(testNIN, encrypted.nin_hmac);
    console.log(`✅ HMAC verification: ${hmacValid}`);
    
    // Test hash verification
    const hashValid = verifyNINHash(testNIN, encrypted.hashed_nin);
    console.log(`✅ Hash verification: ${hashValid}`);
    
  } catch (error) {
    console.error('❌ Encryption test failed:', error);
  }
}

// Run the script
if (require.main === module) {
  console.log('🚀 NIN Re-encryption Script');
  console.log('============================');
  
  // First test the encryption system
  testEncryption().then(() => {
    console.log('\n' + '='.repeat(50));
    
    // Ask user if they want to proceed with re-encryption
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question('\n⚠️  WARNING: This will re-encrypt all NINs in your database.\nAre you sure you want to proceed? (yes/no): ', (answer) => {
      if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
        console.log('\n🔄 Proceeding with NIN re-encryption...');
        reEncryptNINs();
      } else {
        console.log('\n❌ Operation cancelled by user.');
      }
      rl.close();
    });
  });
}

module.exports = { reEncryptNINs, testEncryption };
