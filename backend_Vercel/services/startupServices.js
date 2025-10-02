/**
 * PHASE 14: Startup Services
 * 
 * This service initializes and starts all background services required
 * for the voting system to function properly, including vote verification
 * and blockchain synchronization.
 */

const transactionConfirmationService = require('./transactionConfirmationService');
const voteSyncService = require('./voteSyncService');
const logger = require('../utils/logger');

class StartupServices {
  constructor() {
    this.services = [];
    this.isInitialized = false;
  }

  /**
   * Initialize all background services
   */
  async initialize() {
    if (this.isInitialized) {
      logger.warn('StartupServices: Services already initialized');
      return true;
    }

    try {
      logger.info('🚀 StartupServices: Initializing background services...');

      // Start Transaction Confirmation Service
      logger.info('🔄 Starting Transaction Confirmation Service...');
      await transactionConfirmationService.start();
      this.services.push({
        name: 'Transaction Confirmation Service',
        service: transactionConfirmationService,
        status: 'running'
      });
      logger.info('✅ Transaction Confirmation Service started');

      // Start Vote Sync Service (manual trigger for now)
      logger.info('🔄 Initializing Vote Sync Service...');
      // Note: Vote sync service doesn't have a start() method, it's triggered manually
      this.services.push({
        name: 'Vote Sync Service',
        service: voteSyncService,
        status: 'ready'
      });
      logger.info('✅ Vote Sync Service initialized');

      // Set up periodic vote sync (every 2 minutes)
      this.setupPeriodicVoteSync();

      this.isInitialized = true;
      logger.info('🎉 StartupServices: All background services initialized successfully');
      
      return true;

    } catch (error) {
      logger.error('❌ StartupServices: Failed to initialize services:', error);
      return false;
    }
  }

  /**
   * Set up periodic vote synchronization
   */
  setupPeriodicVoteSync() {
    // Run vote sync every 2 minutes
    setInterval(async () => {
      try {
        logger.info('🔄 StartupServices: Running periodic vote sync...');
        const result = await voteSyncService.retryPendingVotes();
        
        if (result.success && result.retried > 0) {
          logger.info(`✅ Vote Sync: Retried ${result.retried} votes, ${result.success} successful, ${result.stillPending} still pending`);
        }
      } catch (error) {
        logger.error('❌ StartupServices: Periodic vote sync failed:', error);
      }
    }, 2 * 60 * 1000); // 2 minutes

    logger.info('⏰ StartupServices: Periodic vote sync scheduled (every 2 minutes)');
  }

  /**
   * Get status of all services
   */
  getServicesStatus() {
    return {
      isInitialized: this.isInitialized,
      services: this.services.map(service => ({
        name: service.name,
        status: service.status,
        details: service.service.getStatus ? service.service.getStatus() : 'No status available'
      }))
    };
  }

  /**
   * Stop all services
   */
  async stop() {
    try {
      logger.info('🛑 StartupServices: Stopping all services...');

      // Stop transaction confirmation service
      if (transactionConfirmationService.stop) {
        transactionConfirmationService.stop();
      }

      // Cleanup transaction confirmation service
      if (transactionConfirmationService.cleanup) {
        await transactionConfirmationService.cleanup();
      }

      this.isInitialized = false;
      logger.info('✅ StartupServices: All services stopped');

    } catch (error) {
      logger.error('❌ StartupServices: Error stopping services:', error);
    }
  }

  /**
   * Manual trigger for vote sync
   */
  async triggerVoteSync() {
    try {
      logger.info('🔄 StartupServices: Manual vote sync triggered');
      const result = await voteSyncService.retryPendingVotes();
      return result;
    } catch (error) {
      logger.error('❌ StartupServices: Manual vote sync failed:', error);
      throw error;
    }
  }

  /**
   * Get vote sync statistics
   */
  async getVoteSyncStats() {
    try {
      return await voteSyncService.getSyncStats();
    } catch (error) {
      logger.error('❌ StartupServices: Failed to get vote sync stats:', error);
      return null;
    }
  }
}

// Create singleton instance
const startupServices = new StartupServices();

module.exports = startupServices;
