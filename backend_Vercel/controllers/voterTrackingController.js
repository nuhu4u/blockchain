const { ApiError } = require('../utils/apiError');
const { MongoClient } = require('mongodb');

/**
 * Get voter statistics for a specific election
 */
const getElectionVoterStats = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      return res.status(400).json({
        success: false,
        message: 'Election ID is required'
      });
    }
    
    const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get total registered voters from system settings
      const systemSettingsCollection = db.collection('system_settings');
      const systemSettings = await systemSettingsCollection.findOne({});
      
      const totalRegisteredVoters = systemSettings?.totalRegisteredVoters || 0;
      
      // Get total votes cast for this specific election
      const votesCollection = db.collection('votes');
      const totalVotesCast = await votesCollection.countDocuments({ 
        election_id: electionId 
      });
      
      // Calculate non-voters for this election
      const nonVoters = Math.max(0, totalRegisteredVoters - totalVotesCast);
      
      // Calculate turnout percentage for this election
      const turnoutPercentage = totalRegisteredVoters > 0 ? 
        ((totalVotesCast / totalRegisteredVoters) * 100).toFixed(1) : 0;
      
      res.json({
        success: true,
        data: {
          electionId,
          totalRegisteredVoters,
          totalVotesCast,
          nonVoters,
          turnoutPercentage: parseFloat(turnoutPercentage)
        },
        message: 'Election voter statistics retrieved successfully'
      });
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    console.error('❌ Error getting election voter stats:', error);
    next(error);
  }
};

/**
 * Update election voter statistics when a vote is cast
 */
const updateElectionVoterStats = async (db, electionId) => {
  try {
    // Get total registered voters from system settings
    const systemSettingsCollection = db.collection('system_settings');
    const systemSettings = await systemSettingsCollection.findOne({});
    
    const totalRegisteredVoters = systemSettings?.totalRegisteredVoters || 0;
    
    // Get total votes cast for this specific election
    const votesCollection = db.collection('votes');
    const totalVotesCast = await votesCollection.countDocuments({ 
      election_id: electionId 
    });
    
    // Calculate non-voters for this election
    const nonVoters = Math.max(0, totalRegisteredVoters - totalVotesCast);
    
    // Calculate turnout percentage for this election
    const turnoutPercentage = totalRegisteredVoters > 0 ? 
      ((totalVotesCast / totalRegisteredVoters) * 100).toFixed(1) : 0;
    
    console.log(`✅ Election ${electionId} voter stats: ${totalVotesCast} votes cast, ${nonVoters} non-voters`);
    
  } catch (error) {
    console.error('❌ Error updating election voter stats:', error);
  }
};

module.exports = {
  getElectionVoterStats,
  updateElectionVoterStats
};
