require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function fixRunningMates() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Define proper running mates for each election
    const runningMatesData = {
      'Presidential Election 2025': [
        'Dr. Fatima Abdullahi',
        'Prof. Amina Hassan', 
        'Mrs. Grace Okafor',
        'Alhaji Suleiman Bello'
      ],
      'Governorship Election 2025': [
        'Dr. Ibrahim Mohammed',
        'Prof. Sarah Johnson',
        'Mrs. Aisha Okafor',
        'Alhaji Musa Bello'
      ],
      'Senatorial Election 2025': [
        'Dr. Fatima Abdullahi',
        'Prof. Amina Hassan',
        'Mrs. Grace Okafor', 
        'Alhaji Suleiman Bello'
      ]
    };
    
    // Get all elections
    const elections = await db.collection('elections').find({}).toArray();
    console.log(`📊 Found ${elections.length} elections`);
    
    for (const election of elections) {
      console.log(`\n🗳️ Processing election: ${election.title}`);
      
      if (runningMatesData[election.title]) {
        const runningMates = runningMatesData[election.title];
        
        // Update contestants with proper running mates
        const updatedContestants = election.contestants.map((contestant, index) => ({
          ...contestant,
          running_mate: runningMates[index] || `Running Mate ${index + 1}`
        }));
        
        // Update the election
        await db.collection('elections').updateOne(
          { _id: election._id },
          { $set: { contestants: updatedContestants } }
        );
        
        console.log(`✅ Updated running mates for ${election.title}:`);
        updatedContestants.forEach((c, i) => {
          console.log(`   ${i+1}. ${c.name} - Running Mate: ${c.running_mate}`);
        });
      } else {
        console.log(`⚠️ No running mates data defined for: ${election.title}`);
      }
    }
    
    console.log('\n🎉 All running mates updated successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

fixRunningMates();
