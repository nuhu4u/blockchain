const { MongoClient, ObjectId } = require('mongodb');
const { ApiError } = require('../utils/apiError');
const { countVerifiedVoters } = require('../utils/voterUtils');

/**
 * Vote Position Controller
 * Handles vote position data with blockchain integration
 */

/**
 * Get comprehensive vote position data for an election
 */
async function getVotePositionData(electionId) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log(`📊 Getting vote position data for election: ${electionId}`);
    
    const votesCollection = db.collection('votes');
    const electionsCollection = db.collection('elections');
    const usersCollection = db.collection('users');
    
    // Get election info
    const election = await electionsCollection.findOne({ _id: new ObjectId(electionId) });
    if (!election) {
      throw new ApiError('Election not found', 404);
    }
    
    // Get all votes for this election with user and candidate data
    const votes = await votesCollection.find({
      election_id: electionId,
      status: 'success'
    }).sort({ vote_timestamp: -1 }).toArray();
    
    // Get total vote count
    const totalVotes = votes.length;
    
    // Get registered voters count (approximate)
    const registeredVoters = await countVerifiedVoters(db);
    
    // Calculate non-voters
    const nonVoters = Math.max(0, registeredVoters - totalVotes);
    
    // Get recent votes (last 10)
    const recentVotes = votes.slice(0, 10).map(vote => ({
      position: vote.sequential_position || 1,
      timestamp: vote.vote_timestamp,
      voterId: vote.voter_id,
      transactionHash: vote.transaction_hash,
      blockNumber: vote.block_number,
      candidateId: vote.candidate_id
    }));
    
    // Get candidate results
    const candidateResults = {};
    votes.forEach(vote => {
      const candidateId = vote.candidate_id;
      if (!candidateResults[candidateId]) {
        candidateResults[candidateId] = {
          candidateId: candidateId,
          votes: 0,
          percentage: 0
        };
      }
      candidateResults[candidateId].votes++;
    });
    
    // Calculate percentages
    Object.values(candidateResults).forEach(candidate => {
      candidate.percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
    });
    
    // Sort candidates by votes
    const sortedCandidates = Object.values(candidateResults)
      .sort((a, b) => b.votes - a.votes);
    
    // Get leading candidate
    const leadingCandidate = sortedCandidates[0] || null;
    
    // Get last vote time
    const lastVoteTime = votes.length > 0 ? votes[0].vote_timestamp : null;
    
    // Get recent activity (votes in last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentActivity = votes.filter(vote => 
      new Date(vote.vote_timestamp) >= oneHourAgo
    ).length;
    
    const result = {
      election: {
        id: election._id.toString(),
        title: election.title,
        description: election.description,
        status: election.status,
        start_date: election.start_date,
        end_date: election.end_date,
        election_type: election.election_type
      },
      statistics: {
        total_votes: totalVotes,
        registered_voters: registeredVoters,
        non_voters: nonVoters,
        turnout_percentage: registeredVoters > 0 ? (totalVotes / registeredVoters) * 100 : 0,
        last_vote_time: lastVoteTime,
        recent_activity: recentActivity
      },
      candidates: sortedCandidates,
      leading_candidate: leadingCandidate,
      recent_votes: recentVotes,
      blockchain_info: {
        total_transactions: totalVotes,
        last_transaction_hash: votes.length > 0 ? votes[0].transaction_hash : null,
        last_block_number: votes.length > 0 ? votes[0].block_number : null
      }
    };
    
    console.log(`✅ Vote position data retrieved: ${totalVotes} votes, ${registeredVoters} registered voters`);
    return result;
    
  } catch (error) {
    console.error('❌ Error getting vote position data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Get user's specific vote position data
 */
async function getUserVotePositionData(electionId, userId) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log(`👤 Getting user vote position data: election=${electionId}, user=${userId}`);
    
    const votesCollection = db.collection('votes');
    const usersCollection = db.collection('users');
    
    // Get user's vote
    const userVote = await votesCollection.findOne({
      election_id: electionId,
      voter_id: userId,
      status: 'success'
    });
    
    if (!userVote) {
      throw new ApiError('User has not voted in this election', 404);
    }
    
    // Get user info
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    
    // Get user's position in the election
    const userPosition = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success',
      vote_timestamp: { $lte: userVote.vote_timestamp }
    });
    
    // Get total votes
    const totalVotes = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success'
    });
    
    const result = {
      user: {
        id: user._id.toString(),
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        voter_id: user.user_unique_id,
        wallet_address: user.wallet_address,
        polling_unit_id: user.polling_unit_id,
        ward_id: user.ward_id,
        lga_id: user.lga_id,
        state_id: user.state_id
      },
      vote: {
        position: userPosition,
        total_votes: totalVotes,
        timestamp: userVote.vote_timestamp,
        transaction_hash: userVote.transaction_hash,
        block_number: userVote.block_number,
        candidate_id: userVote.candidate_id
      },
      geographic_data: {
        polling_unit: user.polling_unit,
        ward: user.ward,
        lga: user.lga,
        state: user.state
      }
    };
    
    console.log(`✅ User vote position data retrieved: position ${userPosition} of ${totalVotes}`);
    return result;
    
  } catch (error) {
    console.error('❌ Error getting user vote position data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Get vote position data by hierarchy level
 */
async function getVotePositionByLevel(electionId, level) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log(`🏘️ Getting vote position data for level: ${level}, election: ${electionId}`);
    
    const votesCollection = db.collection('votes');
    const electionsCollection = db.collection('elections');
    
    // Get election info
    const election = await electionsCollection.findOne({ _id: new ObjectId(electionId) });
    if (!election) {
      throw new ApiError('Election not found', 404);
    }
    
    // Get votes for this level
    const levelField = level === 'polling_unit' || level === 'pollingUnit' ? 'polling_unit' : 
                      level === 'ward' ? 'ward' : 
                      level === 'lga' ? 'lga' : 
                      level === 'state' ? 'state' : 
                      level === 'national' ? 'state' : null; // For national, we'll group by state
    
    if (!levelField) {
      throw new ApiError('Invalid level specified', 400);
    }
    
    // Get all votes for this election with user geographic data
    const allVotes = await votesCollection.aggregate([
      {
        $match: {
          election_id: electionId,
          status: 'success'
        }
      },
      {
        $addFields: {
          voter_id_obj: { $toObjectId: "$voter_id" }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'voter_id_obj',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $addFields: {
          geographic_data: {
            polling_unit: "$user.polling_unit_id",
            ward: "$user.ward_id", 
            lga: "$user.lga_id",
            state: "$user.state_id"
          }
        }
      }
    ]).toArray();
    
    console.log(`📊 Found ${allVotes.length} votes with geographic data for level aggregation`);
    
    // Group votes by level
    const levelGroups = {};
    allVotes.forEach(vote => {
      const levelValue = vote.geographic_data?.[levelField];
      if (levelValue) {
        if (!levelGroups[levelValue]) {
          levelGroups[levelValue] = [];
        }
        levelGroups[levelValue].push(vote);
      }
    });
    
    // Calculate statistics for each level group
    const levelStats = await Promise.all(Object.entries(levelGroups).map(async ([levelId, votes]) => {
      const totalVotes = votes.length;
      const candidateResults = {};
      
      // Initialize all candidates from election data first
      if (election.contestants && Array.isArray(election.contestants)) {
        election.contestants.forEach(contestant => {
          const contestantId = contestant._id?.toString() || contestant.id?.toString();
          candidateResults[contestantId] = {
            votes: 0,
            candidateId: contestantId,
            candidateName: contestant.name || contestant.candidate_name || 'Unknown Candidate',
            party: contestant.party || contestant.party_name || 'Unknown Party',
            runningMate: contestant.running_mate || contestant.runningMate || 'Not specified'
          };
        });
      }
      
      // Get user contract addresses
      const usersCollection = db.collection('users');
      const voterIds = [...new Set(votes.map(vote => vote.voter_id || vote.user_id))];
      const users = await usersCollection.find({ 
        _id: { $in: voterIds.map(id => new ObjectId(id)) } 
      }).toArray();
      
      const userContractMap = {};
      users.forEach(user => {
        userContractMap[user._id.toString()] = user.wallet_address;
      });
      
      // Count votes for each candidate and collect vote details
      const voteDetails = [];
      votes.forEach(vote => {
        const candidateId = vote.candidate_id;
        if (candidateResults[candidateId]) {
          candidateResults[candidateId].votes++;
          
          const voterId = vote.voter_id || vote.user_id;
          const userContractAddress = userContractMap[voterId] || 'Not available';
          
          // Collect vote details for blockchain verification
          voteDetails.push({
            candidateId: candidateId,
            candidateName: candidateResults[candidateId].candidateName,
            party: candidateResults[candidateId].party,
            runningMate: candidateResults[candidateId].runningMate,
            timestamp: vote.vote_timestamp || vote.timestamp || vote.created_at,
            transactionHash: vote.transaction_hash || vote.transactionHash || vote.tx_hash || 'Not available',
            contractAddress: userContractAddress,
            voterId: voterId,
            geographicData: vote.geographic_data || vote.geographicData
          });
        }
      });
      
      // Calculate percentages
      Object.values(candidateResults).forEach(candidate => {
        candidate.percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
      });
      
      const sortedCandidates = Object.values(candidateResults)
        .sort((a, b) => b.votes - a.votes);
      
      return {
        level_id: levelId,
        total_votes: totalVotes,
        candidates: sortedCandidates,
        leading_candidate: sortedCandidates[0] || null,
        vote_details: voteDetails
      };
    }));
    
    // Calculate aggregated totals for the level
    const totalVotesAcrossAllLevels = levelStats.reduce((sum, stat) => sum + stat.total_votes, 0);
    const aggregatedCandidates = {};
    const allVoteDetails = [];
    
    // Aggregate all candidates across all level groups
    levelStats.forEach(stat => {
      stat.candidates.forEach(candidate => {
        const candidateId = candidate.candidateId;
        if (!aggregatedCandidates[candidateId]) {
          aggregatedCandidates[candidateId] = {
            candidateId: candidate.candidateId,
            candidateName: candidate.candidateName,
            party: candidate.party,
            runningMate: candidate.runningMate,
            votes: 0,
            percentage: 0
          };
        }
        aggregatedCandidates[candidateId].votes += candidate.votes;
      });
      
      // Collect all vote details
      if (stat.vote_details) {
        allVoteDetails.push(...stat.vote_details);
      }
    });
    
    // Calculate percentages for aggregated candidates
    Object.values(aggregatedCandidates).forEach(candidate => {
      candidate.percentage = totalVotesAcrossAllLevels > 0 ? (candidate.votes / totalVotesAcrossAllLevels) * 100 : 0;
    });
    
    const sortedAggregatedCandidates = Object.values(aggregatedCandidates)
      .sort((a, b) => b.votes - a.votes);
    
    const aggregatedLevelStats = {
      level_id: 'All',
      total_votes: totalVotesAcrossAllLevels,
      candidates: sortedAggregatedCandidates,
      leading_candidate: sortedAggregatedCandidates[0] || null,
      vote_details: allVoteDetails
    };

    // Calculate additional statistics
    const totalRegisteredVoters = await countVerifiedVoters(db);
    const nonVoters = totalRegisteredVoters - totalVotesAcrossAllLevels;
    
    // Count unique level groups (e.g., unique polling units, wards, etc.)
    const uniqueLevelGroups = Object.keys(levelGroups).length;
    
    console.log(`📊 Level statistics: ${uniqueLevelGroups} unique ${level} groups, ${nonVoters} non-voters`);

    const result = {
      election: {
        id: election._id.toString(),
        title: election.title,
        status: election.status
      },
      level: level,
      level_stats: [aggregatedLevelStats], // Return aggregated data as single entry
      total_levels: uniqueLevelGroups,
      statistics: {
        total_registered_voters: totalRegisteredVoters,
        total_votes: totalVotesAcrossAllLevels,
        non_voters: nonVoters,
        unique_level_groups: uniqueLevelGroups,
        turnout_percentage: totalRegisteredVoters > 0 ? (totalVotesAcrossAllLevels / totalRegisteredVoters) * 100 : 0
      }
    };
    
    console.log(`✅ Level position data retrieved: ${levelStats.length} ${level} groups`);
    return result;
    
  } catch (error) {
    console.error('❌ Error getting level position data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = {
  getVotePositionData,
  getUserVotePositionData,
  getVotePositionByLevel
};
