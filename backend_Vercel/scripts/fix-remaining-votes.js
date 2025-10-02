const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017');
  await client.connect();
  const db = client.db('election_system');
  
  console.log('🔧 Fixing remaining votes...');
  
  // Get all votes without sequential_position
  const votesWithoutPosition = await db.collection('votes').find({
    $or: [
      { sequential_position: { $exists: false } },
      { sequential_position: null }
    ]
  }).toArray();
  
  console.log(`Found ${votesWithoutPosition.length} votes without sequential positions`);
  
  for (const vote of votesWithoutPosition) {
    // Find position by counting votes in same election created before or at this time
    const position = await db.collection('votes').countDocuments({
      election_id: vote.election_id,
      created_at: { $lte: vote.created_at }
    });
    
    await db.collection('votes').updateOne(
      { _id: vote._id },
      { $set: { sequential_position: position } }
    );
    
    console.log(`Updated vote ${vote._id} with position ${position}`);
  }
  
  console.log('✅ All votes updated');
  await client.close();
})();
