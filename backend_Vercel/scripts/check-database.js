require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkDatabase() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('🔍 Checking database state...');
    
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log('📊 Total users in database:', userCount);
    
    const usersWithNIN = await usersCollection.countDocuments({ encrypted_nin: { $exists: true } });
    const usersWithOldNIN = await usersCollection.countDocuments({ hashed_nin: { $exists: true } });
    
    console.log('🔐 Users with new NIN encryption:', usersWithNIN);
    console.log('⚠️  Users with old NIN format:', usersWithOldNIN);
    
    if (usersWithOldNIN > 0) {
      console.log('\n📋 Sample old NIN user:');
      const oldUser = await usersCollection.findOne(
        { hashed_nin: { $exists: true } },
        { projection: { email: 1, hashed_nin: 1, nin_hmac: 1, nin_iv: 1 } }
      );
      console.log('  Email:', oldUser.email);
      console.log('  hashed_nin:', oldUser.hashed_nin ? '✅' : '❌');
      console.log('  nin_hmac:', oldUser.nin_hmac ? '✅' : '❌');
      console.log('  nin_iv:', oldUser.nin_iv ? '✅' : '❌');
    }
    
    if (usersWithNIN > 0) {
      console.log('\n📋 Sample new NIN user:');
      const newUser = await usersCollection.findOne(
        { encrypted_nin: { $exists: true } },
        { projection: { email: 1, encrypted_nin: 1, nin_iv: 1, aes_encrypted: 1, nin_verified: 1 } }
      );
      console.log('  Email:', newUser.email);
      console.log('  encrypted_nin:', newUser.encrypted_nin ? '✅' : '❌');
      console.log('  nin_iv:', newUser.nin_iv ? '✅' : '❌');
      console.log('  aes_encrypted:', newUser.aes_encrypted ? '✅' : '❌');
      console.log('  nin_verified:', newUser.nin_verified);
    }
    
    // Check if there are any users without NIN at all
    const usersWithoutNIN = await usersCollection.countDocuments({
      $and: [
        { encrypted_nin: { $exists: false } },
        { hashed_nin: { $exists: false } }
      ]
    });
    console.log('❓ Users without any NIN:', usersWithoutNIN);
    
    // Show all users and their NIN status
    if (userCount > 0) {
      console.log('\n📋 All users and their NIN status:');
      const allUsers = await usersCollection.find({}, { projection: { email: 1, encrypted_nin: 1, hashed_nin: 1, nin_verified: 1 } }).toArray();
      allUsers.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.email}:`);
        console.log(`     - encrypted_nin: ${user.encrypted_nin ? '✅' : '❌'}`);
        console.log(`     - hashed_nin: ${user.hashed_nin ? '✅' : '❌'}`);
        console.log(`     - nin_verified: ${user.nin_verified ? '✅' : '❌'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  } finally {
    await client.close();
  }
}

checkDatabase();
