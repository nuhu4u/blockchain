const express = require('express');
const { param } = require('express-validator');
const voteSyncService = require('../services/voteSyncService');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { getTransaction, auditElection, auditAllElections, getAuditStatus } = require('../controllers/blockchainController');

const router = express.Router();

/**
 * Get transaction details by hash
 * GET /api/blockchain/transaction/:hash
 */
router.get('/transaction/:hash', [
  auth,
  param('hash').isLength({ min: 66, max: 66 }).withMessage('Invalid transaction hash format')
], validate(), getTransaction);

/**
 * Retry pending blockchain votes
 * POST /api/blockchain/retry-votes
 */
router.post('/retry-votes', [
  auth,
  authorize('ADMIN') // Only admins can trigger retry
], validate(), async (req, res) => {
  try {
    console.log('🔄 Admin triggered pending votes retry...');
    
    const results = await voteSyncService.retryPendingVotes();
    
    console.log(`✅ Retry completed: ${results.success} success, ${results.stillPending} still pending`);
    
    res.json({
      success: true,
      message: 'Vote retry completed',
      data: results
    });
    
  } catch (error) {
    console.error('❌ Vote retry failed:', error);
    res.status(500).json({
      success: false,
      message: 'Vote retry failed',
      error: error.message
    });
  }
});

/**
 * Get sync statistics
 * GET /api/blockchain/sync-stats
 */
router.get('/sync-stats', [
  auth,
  authorize('ADMIN') // Only admins can view sync stats
], validate(), async (req, res) => {
  try {
    const stats = await voteSyncService.getSyncStats();
    
    res.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Failed to get sync stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get sync statistics',
      error: error.message
    });
  }
});

/**
 * Get pending votes details
 * GET /api/blockchain/pending-votes
 */
router.get('/pending-votes', [
  auth,
  authorize('ADMIN') // Only admins can view pending votes
], validate(), async (req, res) => {
  try {
    const pendingVotes = await voteSyncService.getPendingVotesDetails();
    
    res.json({
      success: true,
      data: {
        count: pendingVotes.length,
        votes: pendingVotes
      }
    });
    
  } catch (error) {
    console.error('❌ Failed to get pending votes:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get pending votes',
      error: error.message
    });
  }
});

/**
 * Get sync status
 * GET /api/blockchain/sync-status
 */
router.get('/sync-status', [
  auth,
  authorize('ADMIN') // Only admins can view sync status
], validate(), async (req, res) => {
  try {
    const isRunning = voteSyncService.isSyncRunning();
    const lastResults = voteSyncService.getLastSyncResults();
    
    res.json({
      success: true,
      data: {
        isRunning,
        lastResults
      }
    });
    
  } catch (error) {
    console.error('❌ Failed to get sync status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get sync status',
      error: error.message
    });
  }
});

/**
 * Audit a single election for blockchain consistency
 * GET /api/blockchain/audit/:electionId
 */
router.get('/audit/:electionId', [
  auth,
  authorize('ADMIN') // Only admins can run audits
], validate(), auditElection);

/**
 * Audit all elections for blockchain consistency
 * GET /api/blockchain/audit-all
 */
router.get('/audit-all', [
  auth,
  authorize('ADMIN') // Only admins can run audits
], validate(), auditAllElections);

/**
 * Get audit status
 * GET /api/blockchain/audit-status
 */
router.get('/audit-status', [
  auth,
  authorize('ADMIN') // Only admins can view audit status
], validate(), getAuditStatus);

module.exports = router;