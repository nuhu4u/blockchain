const { ApiError } = require('../utils/apiError');
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

/**
 * Get complete position data for an election
 */
const getCompletePositionData = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const userId = req.user.id;
    
    console.log('📊 getCompletePositionData: Starting request for election:', electionId, 'user:', userId);
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      
      // Get election data
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(electionId) 
      });
      
      if (!election) {
        throw new ApiError('Election not found', 404);
      }
      
      // Get user data
      const user = await db.collection('users').findOne({ 
        _id: new ObjectId(userId) 
      });
      
      if (!user) {
        throw new ApiError('User not found', 404);
      }
      
      // Get votes for this election
      const votes = await db.collection('votes').find({
        election_id: electionId,
        status: 'success'
      }).toArray();
      
      // Calculate basic position data
      const totalVotes = votes.length;
      const userVote = votes.find(vote => vote.voter_id === userId);
      
      // Mock position data for now
      const positionData = {
        election: {
          id: election._id.toString(),
          title: election.title,
          status: election.status,
          total_votes: totalVotes,
          last_vote_time: votes.length > 0 ? votes[votes.length - 1].created_at : null,
          recent_activity: votes.length
        },
        positions: {
          polling_unit: {
            position: 1,
            total: 10,
            level_id: user.polling_unit_id || 'unknown'
          },
          ward: {
            position: 2,
            total: 50,
            level_id: user.ward_id || 'unknown'
          },
          lga: {
            position: 3,
            total: 200,
            level_id: user.lga_id || 'unknown'
          },
          state: {
            position: 4,
            total: 1000,
            level_id: user.state_id || 'unknown'
          },
          national: {
            position: 5,
            total: 5000,
            level_id: 'national'
          }
        },
        statistics: {
          total_votes: totalVotes,
          last_updated: new Date().toISOString(),
          user_has_voted: !!userVote,
          user_vote_time: userVote?.created_at || null
        },
        userPosition: {
          pollingUnitPosition: 1,
          wardPosition: 2,
          lgaPosition: 3,
          statePosition: 4,
          nationalPosition: 5
        },
        recentVotes: votes.slice(-5).map(vote => ({
          id: vote._id.toString(),
          timestamp: vote.created_at,
          pollingUnitName: `Polling Unit ${vote.polling_unit_id || 'Unknown'}`,
          candidateName: vote.candidate_name || 'Unknown Candidate'
        }))
      };
      
      console.log('📊 getCompletePositionData: Returning position data');
      
      res.json({
        success: true,
        data: positionData
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('❌ getCompletePositionData error:', error);
    next(error);
  }
};

/**
 * Get refresh data for an election
 */
const getRefreshData = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const userId = req.user.id;
    
    console.log('📊 getRefreshData: Starting request for election:', electionId, 'user:', userId);
    
    // For now, just return the same data as complete
    return getCompletePositionData(req, res, next);
  } catch (error) {
    console.error('❌ getRefreshData error:', error);
    next(error);
  }
};

module.exports = {
  getCompletePositionData,
  getRefreshData
};
