const { MongoClient } = require('mongodb');

async function checkAllUsers() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔍 Comprehensive database check...\n');
    
    // Check all collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    console.log('');
    
    // Check users collection with different queries
    console.log('👥 Users Collection Analysis:');
    console.log('='.repeat(50));
    
    // All users regardless of role
    const allUsers = await db.collection('users').find({}).toArray();
    console.log(`📊 Total users in collection: ${allUsers.length}`);
    
    if (allUsers.length > 0) {
      console.log('\n📋 All Users:');
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}`);
        console.log(`   Name: ${user.first_name} ${user.last_name}`);
        console.log(`   Role: ${user.role || 'Not set'}`);
        console.log(`   NIN Verified: ${user.nin_verified || false}`);
        console.log(`   Registration Completed: ${user.registration_completed || false}`);
        console.log(`   Is Active: ${user.is_active || false}`);
        console.log(`   Created: ${user.created_at || 'Unknown'}`);
        console.log('-'.repeat(30));
      });
      
      // Count by role
      const roleCounts = {};
      allUsers.forEach(user => {
        const role = user.role || 'NO_ROLE';
        roleCounts[role] = (roleCounts[role] || 0) + 1;
      });
      
      console.log('\n📈 Role Distribution:');
      Object.entries(roleCounts).forEach(([role, count]) => {
        console.log(`   ${role}: ${count}`);
      });
    }
    
    // Check if there are users in other collections
    console.log('\n🔍 Checking other collections for users...');
    
    // Check admin collection
    try {
      const adminUsers = await db.collection('admin').find({}).toArray();
      console.log(`👑 Admin collection users: ${adminUsers.length}`);
      if (adminUsers.length > 0) {
        adminUsers.forEach((admin, index) => {
          console.log(`   ${index + 1}. ${admin.email} (${admin.role || 'admin'})`);
        });
      }
    } catch (error) {
      console.log('   Admin collection not found or error:', error.message);
    }
    
    // Check observers collection
    try {
      const observers = await db.collection('observers').find({}).toArray();
      console.log(`👁️ Observers collection users: ${observers.length}`);
      if (observers.length > 0) {
        observers.forEach((obs, index) => {
          console.log(`   ${index + 1}. ${obs.email} (${obs.role || 'observer'})`);
        });
      }
    } catch (error) {
      console.log('   Observers collection not found or error:', error.message);
    }
    
    // Check if there are any other user-like collections
    const userLikeCollections = ['voters', 'registered_users', 'user_accounts'];
    for (const collectionName of userLikeCollections) {
      try {
        const count = await db.collection(collectionName).countDocuments();
        if (count > 0) {
          console.log(`📊 ${collectionName} collection: ${count} documents`);
        }
      } catch (error) {
        // Collection doesn't exist, ignore
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    await client.close();
  }
}

// Run the check
checkAllUsers().catch(console.error);


