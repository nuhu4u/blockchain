const { MongoClient } = require('mongodb');

async function checkAdminUsers() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log('🔍 Checking admin users...');
    
    // Check admin collection
    const adminUsers = await db.collection('admin').find({}).toArray();
    console.log(`\n📊 Found ${adminUsers.length} admin users:`);
    
    adminUsers.forEach((user, index) => {
      console.log(`\n${index + 1}. Admin User:`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   Created: ${user.created_at}`);
    });
    
    // Check users collection for admin role
    const userAdmins = await db.collection('users').find({ role: 'ADMIN' }).toArray();
    console.log(`\n📊 Found ${userAdmins.length} users with ADMIN role:`);
    
    userAdmins.forEach((user, index) => {
      console.log(`\n${index + 1}. User Admin:`);
      console.log(`   ID: ${user._id}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.is_active}`);
      console.log(`   Created: ${user.created_at}`);
    });
    
    // Check database name
    console.log(`\n🗄️ Database name: ${db.databaseName}`);
    
  } catch (error) {
    console.error('❌ Error checking admin users:', error);
  } finally {
    await client.close();
  }
}

checkAdminUsers();
