const express = require('express');
const { query, param } = require('express-validator');
const { dashboardController } = require('../controllers');
const { auth, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// Protected routes (require authentication)
router.use(auth);

// Add cache control headers to all dashboard routes
router.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  next();
});

// Voter dashboard data (for authenticated voters only)
router.get('/voter', authorize('VOTER', 'USER'), dashboardController.getVoterDashboard);

// Admin dashboard stats (admin only)
router.get('/stats', [
  authorize('ADMIN')
], dashboardController.getDashboardStats);

// Election results summary (public but protected)
router.get('/elections/:id/results', [
  param('id').isMongoId(),
  handleValidationErrors
], dashboardController.getElectionResultsSummary);

// Voter analytics (admin only)
router.get('/analytics/voters', [
  authorize('ADMIN'),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  handleValidationErrors
], dashboardController.getVoterAnalytics);

// Test endpoint to list all elections (for debugging)
router.get('/all-elections', dashboardController.getAllElections);

// Vote history endpoint
router.get('/vote-history', dashboardController.getVoteHistory);

// Debug database endpoint
router.get('/debug/database', dashboardController.debugDatabase);

module.exports = router;
