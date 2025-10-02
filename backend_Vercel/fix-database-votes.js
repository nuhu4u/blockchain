require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function fixDatabaseVotes() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔍 Fixing database vote counts...');
    
    // Get elections
    const elections = await db.collection('elections').find({}).toArray();
    console.log(`\n📊 Found ${elections.length} elections:`);
    
    for (const election of elections) {
      console.log(`\n🔍 Processing election: ${election.title} (${election._id})`);
      
      // Get votes for this election
      const votes = await db.collection('votes').find({
        $or: [
          { election_id: election._id.toString() },
          { election_id: election._id }
        ],
        status: 'success'
      }).toArray();
      
      console.log(`  Found ${votes.length} votes`);
      
      // Count votes per candidate
      const voteCounts = {};
      votes.forEach(vote => {
        const candidateId = vote.candidate_id.toString();
        voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
        console.log(`    Vote for candidate ${candidateId}: ${voteCounts[candidateId]}`);
      });
      
      console.log('  Vote counts:', voteCounts);
      
      // Update contestants
      const updatedContestants = election.contestants.map(contestant => {
        const contestantId = contestant.id.toString();
        const voteCount = voteCounts[contestantId] || 0;
        
        console.log(`    Contestant ${contestant.name} (${contestantId}): ${voteCount} votes`);
        
        return {
          ...contestant,
          votes: voteCount
        };
      });
      
      // Calculate total votes
      const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
      console.log(`  Total votes: ${totalVotes}`);
      
      // Update election
      const updateResult = await db.collection('elections').updateOne(
        { _id: election._id },
        { 
          $set: { 
            contestants: updatedContestants,
            total_votes: totalVotes
          }
        }
      );
      
      console.log(`  Update result: ${updateResult.modifiedCount} documents modified`);
    }
    
    // Verify the fix
    console.log('\n📊 Verifying fix:');
    const updatedElections = await db.collection('elections').find({}).toArray();
    
    updatedElections.forEach((election, index) => {
      console.log(`\n${index + 1}. ${election.title}`);
      console.log(`   Total Votes: ${election.total_votes || 0}`);
      console.log(`   Contestants:`);
      election.contestants?.forEach((candidate, cIndex) => {
        console.log(`     ${cIndex + 1}. ${candidate.name}: ${candidate.votes || 0} votes`);
      });
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

fixDatabaseVotes();
