require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function fixCandidates() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    console.log('🔍 Checking candidates...');
    const candidates = await db.collection('candidates').find({}).toArray();
    console.log('👥 Found', candidates.length, 'candidates');
    
    // Update candidates with proper names
    const candidateUpdates = [
      { _id: candidates[0]?._id, full_name: 'John Doe', party_name: 'All Progressives Congress', party_acronym: 'APC' },
      { _id: candidates[1]?._id, full_name: 'Jane Smith', party_name: 'People\'s Democratic Party', party_acronym: 'PDP' },
      { _id: candidates[2]?._id, full_name: 'Mike Johnson', party_name: 'Labour Party', party_acronym: 'LP' },
      { _id: candidates[3]?._id, full_name: 'Sarah Wilson', party_name: 'New Nigeria People\'s Party', party_acronym: 'NNPP' }
    ];
    
    for (const update of candidateUpdates) {
      if (update._id) {
        await db.collection('candidates').updateOne(
          { _id: update._id },
          { 
            $set: { 
              full_name: update.full_name,
              party_name: update.party_name,
              party_acronym: update.party_acronym,
              updated_at: new Date()
            }
          }
        );
        console.log(`✅ Updated candidate: ${update.full_name} (${update.party_acronym})`);
      }
    }
    
    console.log('🎉 Candidate data fixed!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

fixCandidates();
