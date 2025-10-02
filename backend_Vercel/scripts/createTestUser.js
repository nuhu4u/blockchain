require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function createTestUser() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('users');
    
    // Check if test user already exists
    const existingUser = await usersCollection.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('⚠️ Test user already exists, updating password...');
      
      // Update password
      const hashedPassword = await bcrypt.hash('test123', 12);
      await usersCollection.updateOne(
        { email: 'test@example.com' },
        { 
          $set: { 
            password_hash: hashedPassword,
            updated_at: new Date()
          }
        }
      );
      console.log('✅ Test user password updated');
    } else {
      // Create a new test user
      const hashedPassword = await bcrypt.hash('test123', 12);
      
      const testUser = {
        _id: new ObjectId(),
        email: 'test@example.com',
        password_hash: hashedPassword,
        first_name: 'Test',
        last_name: 'User',
        phone_number: '+2348012345678',
        date_of_birth: '1990-01-01',
        gender: 'Male',
        address: '123 Test Street, Lagos',
        role: 'VOTER',
        is_active: true,
        registration_completed: true,
        nin_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      // Insert user
      const result = await usersCollection.insertOne(testUser);
      console.log('✅ Test user created with ID:', result.insertedId);
    }
    
    console.log('🎉 Test user setup completed!');
    console.log('📧 Email: test@example.com');
    console.log('🔑 Password: test123');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await client.close();
  }
}

createTestUser();
