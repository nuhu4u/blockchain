const express = require('express');
const { voterTrackingController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get voter statistics for a specific election (public endpoint)
router.get('/stats/:electionId', voterTrackingController.getElectionVoterStats);

module.exports = router;
