const express = require('express');
const positionController = require('../controllers/positionController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get complete position data for an election
router.get('/:electionId/complete', auth, positionController.getCompletePositionData);

// Get refresh data for an election
router.get('/:electionId/refresh', auth, positionController.getRefreshData);

module.exports = router;
