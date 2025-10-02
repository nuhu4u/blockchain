const { MongoClient, ObjectId } = require('mongodb');

const investigateLevelData = async () => {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017');
  await client.connect();
  const db = client.db('election_system');
  
  console.log('🔍 Investigating vote data for level aggregation...');
  
  const electionId = '68c484853bb0cb2f521a88a9';
  
  // Check votes for this election
  const votes = await db.collection('votes').find({
    election_id: electionId,
    status: 'success'
  }).toArray();
  
  console.log('📊 Votes found:', votes.length);
  
  votes.forEach((vote, index) => {
    console.log(`Vote ${index + 1}:`);
    console.log(`  ID: ${vote._id}`);
    console.log(`  Voter ID: ${vote.voter_id}`);
    console.log(`  Status: ${vote.status}`);
    console.log(`  Geographic Data: ${vote.geographic_data ? 'Present' : 'MISSING'}`);
    if (vote.geographic_data) {
      console.log(`    Polling Unit: ${vote.geographic_data.polling_unit || 'MISSING'}`);
    }
    console.log('');
  });
  
  // Check users who voted
  console.log('🔍 Checking users who voted...');
  const userIds = votes.map(v => v.voter_id);
  
  for (const userId of userIds) {
    try {
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      if (user) {
        console.log(`User ${user.email || userId}:`);
        console.log(`  Polling Unit ID: ${user.polling_unit_id || 'MISSING'}`);
        console.log(`  Ward ID: ${user.ward_id || 'MISSING'}`);
        console.log(`  LGA ID: ${user.lga_id || 'MISSING'}`);
        console.log(`  State ID: ${user.state_id || 'MISSING'}`);
        console.log('');
      } else {
        console.log(`User ${userId}: NOT FOUND`);
      }
    } catch (error) {
      console.log(`Error finding user ${userId}:`, error.message);
    }
  }
  
  // Check what the level aggregation logic expects
  console.log('🔍 Testing level aggregation logic...');
  
  const testVotes = await db.collection('votes').aggregate([
    {
      $match: {
        election_id: electionId,
        status: 'success'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'voter_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    }
  ]).toArray();
  
  console.log('📊 Votes with user data:', testVotes.length);
  
  testVotes.forEach((vote, index) => {
    console.log(`Aggregated Vote ${index + 1}:`);
    console.log(`  Voter: ${vote.user.email}`);
    console.log(`  Polling Unit: ${vote.user.polling_unit_id}`);
    console.log(`  Candidate: ${vote.candidate_id}`);
    console.log('');
  });
  
  await client.close();
};

investigateLevelData();
