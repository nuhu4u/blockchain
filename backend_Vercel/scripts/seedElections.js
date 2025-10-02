const { MongoClient } = require('mongodb');

async function seedElections() {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    const electionsCollection = db.collection('elections');
    
    // Clear existing elections
    await electionsCollection.deleteMany({});
    console.log('🗑️ Cleared existing elections');
    
    // Create sample elections
    const sampleElections = [
      {
        title: 'Presidential Election 2024',
        description: 'National Presidential Election',
        election_type: 'PRESIDENTIAL',
        status: 'ONGOING',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Governorship Election - Lagos State',
        description: 'Lagos State Governorship Election',
        election_type: 'GUBERNATORIAL',
        status: 'UPCOMING',
        start_date: new Date('2024-06-01'),
        end_date: new Date('2024-06-30'),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Senatorial Election - District 1',
        description: 'Senatorial Election for District 1',
        election_type: 'SENATORIAL',
        status: 'COMPLETED',
        start_date: new Date('2023-01-01'),
        end_date: new Date('2023-01-31'),
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    
    const result = await electionsCollection.insertMany(sampleElections);
    console.log(`✅ Inserted ${result.insertedCount} sample elections`);
    
    // Verify the data
    const count = await electionsCollection.countDocuments();
    console.log(`📊 Total elections in database: ${count}`);
    
    const elections = await electionsCollection.find({}).toArray();
    console.log('📋 Sample elections:');
    elections.forEach(election => {
      console.log(`  - ${election.title} (${election.status})`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding elections:', error);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding
seedElections().then(() => {
  console.log('🎉 Elections seeding completed!');
  process.exit(0);
}).catch(error => {
  console.error('💥 Seeding failed:', error);
  process.exit(1);
});
