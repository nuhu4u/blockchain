const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const { 
  getPositionData, 
  getUserPositions, 
  recalculateElectionPositions 
} = require('../controllers/positionTrackingController');
const { auth } = require('../middleware/auth');

/**
 * GET /api/position-tracking/:electionId/levels
 * Get all position levels for an election
 */
router.get('/:electionId/levels', async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election info
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({ _id: new (require('mongodb').ObjectId)(electionId) });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Get position data for all levels
      const levels = ['polling_unit', 'ward', 'lga', 'state', 'national'];
      const levelData = {};
      
      for (const level of levels) {
        const positionData = await getPositionData(db, electionId, level);
        levelData[level] = positionData;
      }
      
      // Get total votes for the election
      const votesCollection = db.collection('votes');
      const totalVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success'
      });
      
      res.json({
        success: true,
        data: {
          election: {
            id: election._id,
            title: election.title,
            type: election.election_type,
            status: election.status
          },
          totalVotes,
          levels: levelData
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/position-tracking/:electionId/level/:level/:levelId?
 * Get position data for a specific level
 */
router.get('/:electionId/level/:level/:levelId?', async (req, res, next) => {
  try {
    const { electionId, level, levelId } = req.params;
    
    // Validate level
    const validLevels = ['polling_unit', 'ward', 'lga', 'state', 'national'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid level. Must be one of: polling_unit, ward, lga, state, national'
      });
    }
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election info
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({ _id: new (require('mongodb').ObjectId)(electionId) });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Get position data for the specific level
      const positionData = await getPositionData(db, electionId, level, levelId);
      
      // Get total votes for this level
      const votesCollection = db.collection('votes');
      let totalVotes = 0;
      
      if (level === 'national') {
        totalVotes = await votesCollection.countDocuments({
          election_id: electionId,
          status: 'success'
        });
      } else if (levelId) {
        // Count votes for specific level ID
        const query = {
          election_id: electionId,
          status: 'success'
        };
        query[`geographic_data.${level}`] = levelId;
        totalVotes = await votesCollection.countDocuments(query);
      }
      
      res.json({
        success: true,
        data: {
          election: {
            id: election._id,
            title: election.title,
            type: election.election_type
          },
          level,
          levelId: levelId || null,
          totalVotes,
          positions: positionData
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/position-tracking/:electionId/user/:userId
 * Get user's positions across all levels for an election
 */
router.get('/:electionId/user/:userId', auth, async (req, res, next) => {
  try {
    const { electionId, userId } = req.params;
    
    // Check if user is requesting their own data or is admin
    if (req.user.id !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own position data.'
      });
    }
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election info
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({ _id: new (require('mongodb').ObjectId)(electionId) });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Get user's positions
      const userPositions = await getUserPositions(db, electionId, userId);
      
      if (!userPositions) {
        return res.status(404).json({
          success: false,
          message: 'User has not voted in this election'
        });
      }
      
      // Get additional context data
      const votesCollection = db.collection('votes');
      const totalVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success'
      });
      
      // Get user info
      const usersCollection = db.collection('users');
      const user = await usersCollection.findOne({ _id: new (require('mongodb').ObjectId)(userId) });
      
      res.json({
        success: true,
        data: {
          election: {
            id: election._id,
            title: election.title,
            type: election.election_type
          },
          user: {
            id: user._id,
            name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Unknown',
            email: user.email
          },
          totalVotes,
          positions: userPositions
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/position-tracking/:electionId/hierarchy/:userId
 * Get complete hierarchy breakdown for a user's vote
 */
router.get('/:electionId/hierarchy/:userId', auth, async (req, res, next) => {
  try {
    const { electionId, userId } = req.params;
    
    // Check if user is requesting their own data or is admin
    if (req.user.id !== userId && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own position data.'
      });
    }
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election info
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({ _id: new (require('mongodb').ObjectId)(electionId) });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Get user's positions
      const userPositions = await getUserPositions(db, electionId, userId);
      
      if (!userPositions) {
        return res.status(404).json({
          success: false,
          message: 'User has not voted in this election'
        });
      }
      
      // Get hierarchy breakdown
      const hierarchyLevels = [
        {
          id: 'polling_unit',
          name: 'Polling Unit',
          position: userPositions.positions.polling_unit,
          levelId: userPositions.geographic_data.polling_unit
        },
        {
          id: 'ward',
          name: 'Ward',
          position: userPositions.positions.ward,
          levelId: userPositions.geographic_data.ward
        },
        {
          id: 'lga',
          name: 'LGA',
          position: userPositions.positions.lga,
          levelId: userPositions.geographic_data.lga
        },
        {
          id: 'state',
          name: 'State',
          position: userPositions.positions.state,
          levelId: userPositions.geographic_data.state
        },
        {
          id: 'national',
          name: 'National',
          position: userPositions.positions.national,
          levelId: 'NG'
        }
      ];
      
      // Get total votes for each level
      const votesCollection = db.collection('votes');
      const hierarchyData = [];
      
      for (const level of hierarchyLevels) {
        let totalVotes = 0;
        
        if (level.id === 'national') {
          totalVotes = await votesCollection.countDocuments({
            election_id: electionId,
            status: 'success'
          });
        } else if (level.levelId) {
          const query = {
            election_id: electionId,
            status: 'success'
          };
          query[`geographic_data.${level.id}`] = level.levelId;
          totalVotes = await votesCollection.countDocuments(query);
        }
        
        hierarchyData.push({
          ...level,
          totalVotes,
          hasPosition: level.position !== null
        });
      }
      
      res.json({
        success: true,
        data: {
          election: {
            id: election._id,
            title: election.title,
            type: election.election_type
          },
          user: {
            id: userId,
            voteTimestamp: userPositions.vote_timestamp,
            transactionHash: userPositions.transaction_hash
          },
          hierarchy: hierarchyData,
          summary: {
            totalLevels: hierarchyData.length,
            levelsWithPosition: hierarchyData.filter(level => level.hasPosition).length,
            earliestPosition: Math.min(...hierarchyData.filter(level => level.position).map(level => level.position)),
            nationalPosition: userPositions.positions.national
          }
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/position-tracking/:electionId/recalculate
 * Recalculate all positions for an election (Admin only)
 */
router.post('/:electionId/recalculate', auth, async (req, res, next) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin role required.'
      });
    }
    
    const { electionId } = req.params;
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election info
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({ _id: new (require('mongodb').ObjectId)(electionId) });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Recalculate positions
      await recalculateElectionPositions(db, electionId);
      
      // Get updated vote count
      const votesCollection = db.collection('votes');
      const totalVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success'
      });
      
      res.json({
        success: true,
        message: 'Positions recalculated successfully',
        data: {
          election: {
            id: election._id,
            title: election.title
          },
          totalVotes
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/position-tracking/:electionId/stats
 * Get position tracking statistics for an election
 */
router.get('/:electionId/stats', async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election info
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({ _id: new (require('mongodb').ObjectId)(electionId) });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Get position tracking metadata
      const metadataCollection = db.collection('position_tracking_metadata');
      const metadata = await metadataCollection.findOne({ election_id: electionId });
      
      // Get vote statistics
      const votesCollection = db.collection('votes');
      const totalVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success'
      });
      
      const votesWithPositions = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success',
        position_calculated: true
      });
      
      // Get position collection stats
      const votePositionsCollection = db.collection('vote_positions');
      const positionRecords = await votePositionsCollection.countDocuments({
        election_id: electionId
      });
      
      res.json({
        success: true,
        data: {
          election: {
            id: election._id,
            title: election.title,
            type: election.election_type
          },
          statistics: {
            totalVotes,
            votesWithPositions,
            positionRecords,
            calculationStatus: metadata?.calculation_status || 'unknown',
            lastCalculation: metadata?.last_calculation || null
          }
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
