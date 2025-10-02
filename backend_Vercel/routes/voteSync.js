/**
 * PHASE 14: Vote Sync Routes
 * 
 * API endpoints for managing vote synchronization and monitoring
 * pending blockchain votes.
 */

const express = require('express');
const router = express.Router();
const voteSyncService = require('../services/voteSyncService');
const transactionConfirmationService = require('../services/transactionConfirmationService');
const logger = require('../utils/logger');

/**
 * GET /api/vote-sync/status
 * Get current vote sync status and statistics
 */
router.get('/status', async (req, res) => {
  try {
    const stats = await voteSyncService.getSyncStats();
    const confirmationStatus = transactionConfirmationService.getStatus();
    
    res.json({
      success: true,
      data: {
        voteSync: stats,
        transactionConfirmation: confirmationStatus,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('VoteSync Routes: Error getting status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get vote sync status',
      message: error.message
    });
  }
});

/**
 * POST /api/vote-sync/retry
 * Manually trigger vote sync for pending votes
 */
router.post('/retry', async (req, res) => {
  try {
    logger.info('VoteSync Routes: Manual vote sync triggered');
    const result = await voteSyncService.retryPendingVotes();
    
    res.json({
      success: true,
      data: result,
      message: 'Vote sync completed'
    });
  } catch (error) {
    logger.error('VoteSync Routes: Error during manual sync:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sync votes',
      message: error.message
    });
  }
});

/**
 * GET /api/vote-sync/pending
 * Get detailed information about pending votes
 */
router.get('/pending', async (req, res) => {
  try {
    const pendingVotes = await voteSyncService.getPendingVotesDetails();
    
    res.json({
      success: true,
      data: {
        pendingVotes,
        count: pendingVotes.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('VoteSync Routes: Error getting pending votes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get pending votes',
      message: error.message
    });
  }
});

/**
 * GET /api/vote-sync/health
 * Health check for vote sync services
 */
router.get('/health', async (req, res) => {
  try {
    const confirmationStatus = transactionConfirmationService.getStatus();
    const isSyncRunning = voteSyncService.isSyncRunning();
    
    res.json({
      success: true,
      data: {
        transactionConfirmation: {
          isRunning: confirmationStatus.isRunning,
          providerConnected: confirmationStatus.providerConnected,
          databaseConnected: confirmationStatus.databaseConnected
        },
        voteSync: {
          isRunning: isSyncRunning,
          lastResults: voteSyncService.getLastSyncResults()
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('VoteSync Routes: Error in health check:', error);
    res.status(500).json({
      success: false,
      error: 'Health check failed',
      message: error.message
    });
  }
});

module.exports = router;
