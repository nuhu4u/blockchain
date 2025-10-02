require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function createTestUsers() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Create test admin user
    const adminCollection = db.collection('admin');
    const adminPassword = await bcrypt.hash('admin123', 12);
    
    const existingAdmin = await adminCollection.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists, updating password...');
      await adminCollection.updateOne(
        { email: 'admin@example.com' },
        { 
          $set: { 
            password_hash: adminPassword,
            updated_at: new Date()
          }
        }
      );
    } else {
      const testAdmin = {
        _id: new ObjectId(),
        email: 'admin@example.com',
        password_hash: adminPassword,
        first_name: 'Admin',
        last_name: 'User',
        role: 'ADMIN',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      await adminCollection.insertOne(testAdmin);
      console.log('✅ Admin user created');
    }
    
    // Create test observer user
    const observerCollection = db.collection('observers');
    const observerPassword = await bcrypt.hash('observer123', 12);
    
    const existingObserver = await observerCollection.findOne({ email: 'observer@example.com' });
    if (existingObserver) {
      console.log('⚠️ Observer user already exists, updating password...');
      await observerCollection.updateOne(
        { email: 'observer@example.com' },
        { 
          $set: { 
            password_hash: observerPassword,
            updated_at: new Date()
          }
        }
      );
    } else {
      const testObserver = {
        _id: new ObjectId(),
        email: 'observer@example.com',
        password_hash: observerPassword,
        organization_name: 'Test Observer Organization',
        organization_type: 'NGO',
        contact_person: 'Test Observer',
        position: 'Election Observer',
        phone: '+2348012345679',
        address: '456 Observer Street, Abuja',
        state: 'FCT',
        lga: 'Abuja Municipal',
        ward: 'Central Ward',
        polling_unit: 'PU001',
        status: 'approved',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      await observerCollection.insertOne(testObserver);
      console.log('✅ Observer user created');
    }
    
    console.log('🎉 All test users created successfully!');
    console.log('👤 User Login: test@example.com / test123');
    console.log('👨‍💼 Admin Login: admin@example.com / admin123');
    console.log('👁️ Observer Login: observer@example.com / observer123');
    
  } catch (error) {
    console.error('❌ Error creating test users:', error);
  } finally {
    await client.close();
  }
}

createTestUsers();
