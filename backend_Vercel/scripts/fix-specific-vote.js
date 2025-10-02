const { MongoClient, ObjectId } = require('mongodb');

(async () => {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017');
  await client.connect();
  const db = client.db('election_system');
  
  console.log('🔧 Fixing the missing vote position...');
  
  // Fix the specific vote that's missing position
  const voteId = '68c48f3846d22201252a2994';
  const vote = await db.collection('votes').findOne({ _id: new ObjectId(voteId) });
  
  if (vote) {
    console.log('Found vote:', vote.election_id, vote.created_at);
    
    // Calculate correct position for this vote
    const position = await db.collection('votes').countDocuments({
      election_id: vote.election_id,
      created_at: { $lte: vote.created_at }
    });
    
    await db.collection('votes').updateOne(
      { _id: new ObjectId(voteId) },
      { 
        $set: { 
          sequential_position: position,
          vote_timestamp: vote.created_at,
          updated_at: new Date()
        }
      }
    );
    
    console.log(`✅ Fixed vote ${voteId} with position ${position}`);
  } else {
    console.log('❌ Vote not found');
  }
  
  await client.close();
})();
