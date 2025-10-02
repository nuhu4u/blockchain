const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');

/**
 * Public routes - no authentication required
 */

// Get all elections (public)
router.get('/elections', electionController.getElections);

// Get votes for a specific election (public)
router.get('/elections/:electionId/votes', electionController.getElectionById);

module.exports = router;
