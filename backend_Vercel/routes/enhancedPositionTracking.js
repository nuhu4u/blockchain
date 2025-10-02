const express = require('express');
const { param, query } = require('express-validator');
const { validate } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const { 
  getCompletePositionData, 
  getUserPositionData, 
  getLiveRefreshData 
} = require('../controllers/enhancedPositionController');

const router = express.Router();

// Get complete position data for an election (instant load) - No auth required
router.get('/:electionId/complete', [
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const data = await getCompletePositionData(electionId);
    
    res.json({
      success: true,
      data: data,
      message: 'Complete position data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user's specific position data
router.get('/:electionId/user/:userId', [
  auth,
  param('electionId').isMongoId().withMessage('Invalid election ID'),
  param('userId').isMongoId().withMessage('Invalid user ID')
], validate(), async (req, res, next) => {
  try {
    const { electionId, userId } = req.params;
    const data = await getUserPositionData(electionId, userId);
    
    res.json({
      success: true,
      data: data,
      message: 'User position data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get live refresh data (incremental updates) - No auth required
router.get('/:electionId/refresh', [
  param('electionId').isMongoId().withMessage('Invalid election ID'),
  query('lastUpdate').optional().isISO8601().withMessage('Invalid last update time')
], validate(), async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { lastUpdate } = req.query;
    
    const lastUpdateTime = lastUpdate ? new Date(lastUpdate) : new Date(Date.now() - 24 * 60 * 60 * 1000); // Default to 24 hours ago
    
    const data = await getLiveRefreshData(electionId, lastUpdateTime);
    
    res.json({
      success: true,
      data: data,
      message: 'Live refresh data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get election statistics for admin
router.get('/:electionId/admin-stats', [
  auth,
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const data = await getCompletePositionData(electionId);
    
    // Add admin-specific statistics
    const adminStats = {
      ...data,
      admin_insights: {
        voting_trends: {
          last_hour: data.statistics.recent_activity,
          total_votes: data.statistics.total_votes
        },
        geographic_breakdown: {
          polling_units: Object.keys(data.positions.polling_unit).length,
          wards: Object.keys(data.positions.ward).length,
          lgas: Object.keys(data.positions.lga).length,
          states: Object.keys(data.positions.state).length
        }
      }
    };
    
    res.json({
      success: true,
      data: adminStats,
      message: 'Admin statistics retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
