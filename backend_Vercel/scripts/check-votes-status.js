const { MongoClient } = require('mongodb');

(async () => {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017');
  await client.connect();
  const db = client.db('election_system');
  
  console.log('📊 Checking votes collection structure...\n');
  const votes = await db.collection('votes').find({}).toArray();
  
  votes.forEach((vote, index) => {
    console.log(`Vote ${index + 1}:`);
    console.log(`  ID: ${vote._id}`);
    console.log(`  Election ID: ${vote.election_id}`);
    console.log(`  Status: ${vote.status}`);
    console.log(`  Sequential Position: ${vote.sequential_position || 'MISSING'}`);
    console.log(`  Vote Timestamp: ${vote.vote_timestamp || 'MISSING'}`);
    console.log(`  Created At: ${vote.created_at || 'MISSING'}`);
    console.log('');
  });

  console.log(`📊 Summary:`);
  console.log(`  Total votes: ${votes.length}`);
  console.log(`  With sequential_position: ${votes.filter(v => v.sequential_position).length}`);
  console.log(`  With vote_timestamp: ${votes.filter(v => v.vote_timestamp).length}`);
  console.log(`  With success status: ${votes.filter(v => v.status === 'success').length}`);
  
  await client.close();
})();
