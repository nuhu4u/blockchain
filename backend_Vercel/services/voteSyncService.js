/**
 * PHASE 13: Vote Sync Service
 * 
 * This service handles retrying pending blockchain votes that failed to sync.
 * It ensures all votes eventually get written to the blockchain while maintaining
 * data integrity and preventing infinite loops.
 */

const { MongoClient, ObjectId } = require('mongodb');
const blockchainService = require('../blockchain/services/blockchainService');
const logger = require('../utils/logger');

class VoteSyncService {
  constructor() {
    this.isRunning = false;
    this.lastSyncResults = null;
  }

  /**
   * Retry all pending blockchain votes
   * @returns {Promise<Object>} Sync results summary
   */
  async retryPendingVotes() {
    if (this.isRunning) {
      logger.warn('VoteSyncService: Sync already in progress, skipping');
      return {
        success: false,
        message: 'Sync already in progress',
        retried: 0,
        success: 0,
        stillPending: 0,
        errors: []
      };
    }

    this.isRunning = true;
    const startTime = Date.now();
    
    try {
      logger.info('VoteSyncService: Starting pending votes retry...');
      
      // Initialize blockchain service
      await blockchainService.initialize();
      
      // Connect to database
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');
      
      // Get all pending votes
      const votesCollection = db.collection('votes');
      const electionsCollection = db.collection('elections');
      const usersCollection = db.collection('users');
      
      const pendingVotes = await votesCollection.find({
        status: 'pending_chain'
      }).toArray();
      
      logger.info(`VoteSyncService: Found ${pendingVotes.length} pending votes to retry`);
      
      if (pendingVotes.length === 0) {
        await client.close();
        this.lastSyncResults = {
          success: true,
          message: 'No pending votes found',
          retried: 0,
          success: 0,
          stillPending: 0,
          errors: [],
          duration: Date.now() - startTime
        };
        return this.lastSyncResults;
      }
      
      const results = {
        retried: 0,
        success: 0,
        stillPending: 0,
        errors: []
      };
      
      // Process each pending vote
      for (const vote of pendingVotes) {
        try {
          results.retried++;
          logger.info(`VoteSyncService: Retrying vote ${vote._id} for election ${vote.election_id}`);
          
          // Get election details
          const election = await electionsCollection.findOne({
            _id: new ObjectId(vote.election_id)
          });
          
          if (!election) {
            logger.error(`VoteSyncService: Election ${vote.election_id} not found for vote ${vote._id}`);
            results.errors.push({
              voteId: vote._id,
              error: 'Election not found',
              type: 'election_missing'
            });
            results.stillPending++;
            continue;
          }
          
          if (!election.wallet_address) {
            logger.error(`VoteSyncService: Election ${vote.election_id} has no contract address for vote ${vote._id}`);
            results.errors.push({
              voteId: vote._id,
              error: 'Election contract address not set',
              type: 'contract_missing'
            });
            results.stillPending++;
            continue;
          }
          
          // Get voter details
          const voter = await usersCollection.findOne({
            _id: new ObjectId(vote.voter_id)
          });
          
          if (!voter) {
            logger.error(`VoteSyncService: Voter ${vote.voter_id} not found for vote ${vote._id}`);
            results.errors.push({
              voteId: vote._id,
              error: 'Voter not found',
              type: 'voter_missing'
            });
            results.stillPending++;
            continue;
          }
          
          if (!voter.wallet_address || !voter.encrypted_private_key) {
            logger.error(`VoteSyncService: Voter ${vote.voter_id} missing wallet data for vote ${vote._id}`);
            results.errors.push({
              voteId: vote._id,
              error: 'Voter wallet not configured',
              type: 'wallet_missing'
            });
            results.stillPending++;
            continue;
          }
          
          // Attempt blockchain transaction
          try {
            const blockchainResult = await blockchainService.signAndSendVote(
              election.wallet_address,
              voter.encrypted_private_key,
              vote.candidate_id
            );
            
            if (blockchainResult.success) {
              // Update vote with success status
              await votesCollection.updateOne(
                { _id: vote._id },
                {
                  $set: {
                    transaction_hash: blockchainResult.transactionHash,
                    status: 'success',
                    blockchain_block_number: blockchainResult.blockNumber,
                    blockchain_gas_used: blockchainResult.gasUsed,
                    blockchain_from_address: blockchainResult.from,
                    sync_retry_count: (vote.sync_retry_count || 0) + 1,
                    last_sync_attempt: new Date(),
                    updated_at: new Date()
                  }
                }
              );
              
              results.success++;
              logger.info(`VoteSyncService: Vote ${vote._id} synced successfully. TxHash: ${blockchainResult.transactionHash}`);
              
            } else {
              throw new Error('Blockchain transaction failed');
            }
            
          } catch (blockchainError) {
            logger.error(`VoteSyncService: Blockchain error for vote ${vote._id}:`, blockchainError.message);
            
            // Update retry count but keep as pending
            await votesCollection.updateOne(
              { _id: vote._id },
              {
                $set: {
                  sync_retry_count: (vote.sync_retry_count || 0) + 1,
                  last_sync_attempt: new Date(),
                  last_sync_error: blockchainError.message,
                  updated_at: new Date()
                }
              }
            );
            
            results.errors.push({
              voteId: vote._id,
              error: blockchainError.message,
              type: 'blockchain_error'
            });
            results.stillPending++;
          }
          
          // Add small delay to avoid overwhelming the system
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          logger.error(`VoteSyncService: Unexpected error processing vote ${vote._id}:`, error);
          results.errors.push({
            voteId: vote._id,
            error: error.message,
            type: 'unexpected_error'
          });
          results.stillPending++;
        }
      }
      
      await client.close();
      
      const duration = Date.now() - startTime;
      this.lastSyncResults = {
        success: true,
        message: `Sync completed in ${duration}ms`,
        retried: results.retried,
        success: results.success,
        stillPending: results.stillPending,
        errors: results.errors,
        duration
      };
      
      logger.info(`VoteSyncService: Sync completed. Retried: ${results.retried}, Success: ${results.success}, Still Pending: ${results.stillPending}`);
      
      return this.lastSyncResults;
      
    } catch (error) {
      logger.error('VoteSyncService: Sync failed:', error);
      this.lastSyncResults = {
        success: false,
        message: `Sync failed: ${error.message}`,
        retried: 0,
        success: 0,
        stillPending: 0,
        errors: [{ error: error.message, type: 'sync_failed' }],
        duration: Date.now() - startTime
      };
      return this.lastSyncResults;
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Get sync statistics
   * @returns {Promise<Object>} Current sync statistics
   */
  async getSyncStats() {
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');
      
      const votesCollection = db.collection('votes');
      
      const stats = await votesCollection.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]).toArray();
      
      const totalVotes = await votesCollection.countDocuments();
      const pendingVotes = await votesCollection.countDocuments({ status: 'pending_chain' });
      const successfulVotes = await votesCollection.countDocuments({ status: 'success' });
      
      await client.close();
      
      return {
        totalVotes,
        successfulVotes,
        pendingVotes,
        successRate: totalVotes > 0 ? ((successfulVotes / totalVotes) * 100).toFixed(2) : 0,
        lastSyncResults: this.lastSyncResults
      };
      
    } catch (error) {
      logger.error('VoteSyncService: Failed to get sync stats:', error);
      return {
        totalVotes: 0,
        successfulVotes: 0,
        pendingVotes: 0,
        successRate: 0,
        lastSyncResults: this.lastSyncResults
      };
    }
  }

  /**
   * Get detailed pending votes information
   * @returns {Promise<Array>} List of pending votes with details
   */
  async getPendingVotesDetails() {
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');
      
      const votesCollection = db.collection('votes');
      const electionsCollection = db.collection('elections');
      const usersCollection = db.collection('users');
      
      const pendingVotes = await votesCollection.find({
        status: 'pending_chain'
      }).toArray();
      
      const detailedVotes = [];
      
      for (const vote of pendingVotes) {
        const election = await electionsCollection.findOne({
          _id: new ObjectId(vote.election_id)
        });
        
        const voter = await usersCollection.findOne({
          _id: new ObjectId(vote.voter_id)
        });
        
        detailedVotes.push({
          voteId: vote._id,
          electionTitle: election?.title || 'Unknown Election',
          voterEmail: voter?.email || 'Unknown Voter',
          candidateId: vote.candidate_id,
          retryCount: vote.sync_retry_count || 0,
          lastAttempt: vote.last_sync_attempt || vote.created_at,
          lastError: vote.last_sync_error || 'No error recorded',
          hasContract: !!election?.wallet_address,
          hasWallet: !!(voter?.wallet_address && voter?.encrypted_private_key)
        });
      }
      
      await client.close();
      
      return detailedVotes;
      
    } catch (error) {
      logger.error('VoteSyncService: Failed to get pending votes details:', error);
      return [];
    }
  }

  /**
   * Check if sync is currently running
   * @returns {boolean} True if sync is running
   */
  isSyncRunning() {
    return this.isRunning;
  }

  /**
   * Get last sync results
   * @returns {Object|null} Last sync results or null
   */
  getLastSyncResults() {
    return this.lastSyncResults;
  }
}

// Create singleton instance
const voteSyncService = new VoteSyncService();

module.exports = voteSyncService;
