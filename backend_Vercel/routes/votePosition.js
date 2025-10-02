const express = require('express');
const { param, query } = require('express-validator');
const { validate } = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const { 
  getVotePositionData, 
  getUserVotePositionData, 
  getVotePositionByLevel 
} = require('../controllers/votePositionController');

const router = express.Router();

// Get comprehensive vote position data for an election - No auth required
router.get('/:electionId', [
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const data = await getVotePositionData(electionId);
    
    res.json({
      success: true,
      data: data,
      message: 'Vote position data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user's specific vote position data - No auth required
router.get('/:electionId/user/:userId', [
  param('electionId').isMongoId().withMessage('Invalid election ID'),
  param('userId').isMongoId().withMessage('Invalid user ID')
], validate(), async (req, res, next) => {
  try {
    const { electionId, userId } = req.params;
    const data = await getUserVotePositionData(electionId, userId);
    
    res.json({
      success: true,
      data: data,
      message: 'User vote position data retrieved successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get vote position data by hierarchy level
router.get('/:electionId/level/:level', [
  param('electionId').isMongoId().withMessage('Invalid election ID'),
  param('level').isIn(['polling_unit', 'pollingUnit', 'ward', 'lga', 'state', 'national']).withMessage('Invalid level')
], validate(), async (req, res, next) => {
  try {
    const { electionId, level } = req.params;
    const data = await getVotePositionByLevel(electionId, level);
    
    res.json({
      success: true,
      data: data,
      message: `${level} position data retrieved successfully`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
