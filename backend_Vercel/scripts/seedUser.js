require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function seedUser() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const usersCollection = db.collection('User');
    
    // Create a test user
    const testUser = {
      _id: new ObjectId(),
      email: 'test@example.com',
      password_hash: 'hashed-password-123',
      first_name: 'Test',
      last_name: 'User',
      user_unique_id: 'test-user-001',
      is_voter_registered: true,
      blockchain_address: '0x1234567890123456789012345678901234567890',
      hashed_nin: 'hashed-nin-123',
      nin_verified: true,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    // Insert user
    const result = await usersCollection.insertOne(testUser);
    console.log('✅ User created with ID:', result.insertedId);
    
    // Create candidates for the election
    const candidatesCollection = db.collection('Candidate');
    const electionId = new ObjectId('68b90d0671506fce71533009'); // Use the election ID from the frontend
    
    const candidates = [
      {
        _id: new ObjectId(),
        election_id: electionId,
        full_name: 'John Doe',
        party_name: 'All Progressives Congress',
        party_acronym: 'APC',
        candidate_number: 1,
        vote_count: 0,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        _id: new ObjectId(),
        election_id: electionId,
        full_name: 'Jane Smith',
        party_name: 'People\'s Democratic Party',
        party_acronym: 'PDP',
        candidate_number: 2,
        vote_count: 0,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    // Insert candidates
    const candidateResult = await candidatesCollection.insertMany(candidates);
    console.log('✅ Candidates created:', candidateResult.insertedIds);
    
    console.log('🎉 User and candidates seeding completed!');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await client.close();
  }
}

seedUser();
