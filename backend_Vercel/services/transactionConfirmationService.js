const { MongoClient } = require('mongodb');
const { ethers } = require('ethers');
require('dotenv').config();

class TransactionConfirmationService {
  constructor() {
    this.isRunning = false;
    this.pollingInterval = 5000; // 5 seconds
    this.maxRetries = 3;
    this.retryDelay = 2000; // 2 seconds
    this.provider = null;
    this.client = null;
  }

  /**
   * Initialize the service
   */
  async initialize() {
    try {
      // Initialize blockchain provider
      this.provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
      await this.provider.getNetwork();
      console.log('✅ Transaction Confirmation: Provider initialized');

      // Initialize MongoDB client
      this.client = new MongoClient(process.env.DATABASE_URL);
      await this.client.connect();
      console.log('✅ Transaction Confirmation: Database connected');

      return true;
    } catch (error) {
      console.error('❌ Transaction Confirmation: Initialization failed:', error.message);
      return false;
    }
  }

  /**
   * Start the polling service
   */
  async start() {
    if (this.isRunning) {
      console.log('⚠️ Transaction Confirmation: Service already running');
      return;
    }

    const initialized = await this.initialize();
    if (!initialized) {
      console.error('❌ Transaction Confirmation: Failed to initialize, service not started');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Transaction Confirmation: Service started, polling every 5s');
    
    this.pollPendingVotes();
  }

  /**
   * Stop the polling service
   */
  stop() {
    this.isRunning = false;
    console.log('🛑 Transaction Confirmation: Service stopped');
  }

  /**
   * Main polling function
   */
  async pollPendingVotes() {
    if (!this.isRunning) return;

    try {
      const db = this.client.db('election_system');
      
      // Find all pending votes
      const pendingVotes = await db.collection('votes').find({
        status: 'pending_chain',
        transaction_hash: { $exists: true, $ne: null }
      }).toArray();

      if (pendingVotes.length === 0) {
        // No pending votes, continue polling
        setTimeout(() => this.pollPendingVotes(), this.pollingInterval);
        return;
      }

      console.log(`🔍 Transaction Confirmation: Checking ${pendingVotes.length} pending votes`);

      // Process each pending vote
      for (const vote of pendingVotes) {
        await this.checkTransactionConfirmation(vote);
      }

    } catch (error) {
      console.error('❌ Transaction Confirmation: Polling error:', error.message);
    }

    // Continue polling
    setTimeout(() => this.pollPendingVotes(), this.pollingInterval);
  }

  /**
   * Check if a specific transaction is confirmed
   */
  async checkTransactionConfirmation(vote) {
    const { transaction_hash, election_id, candidate_id, voter_id } = vote;
    
    try {
      console.log(`🔍 Checking transaction: ${transaction_hash}`);
      
      // Get transaction receipt
      const receipt = await this.getTransactionReceipt(transaction_hash);
      
      if (!receipt) {
        console.log(`⏳ Transaction not yet mined: ${transaction_hash}`);
        return;
      }

      // Check transaction status
      if (receipt.status === 1) {
        // Transaction successful
        await this.updateVoteStatus(vote, 'success', {
          block_number: receipt.blockNumber,
          gas_used: receipt.gasUsed.toString(),
          confirmed_at: new Date()
        });
        
        const candidateIndex = await this.getCandidateIndex(vote);
        console.log(`✅ Vote Confirmed: txHash=${transaction_hash} for election ${election_id}, candidateIndex ${candidateIndex}`);
        
      } else if (receipt.status === 0) {
        // Transaction failed/reverted
        await this.updateVoteStatus(vote, 'failed', {
          block_number: receipt.blockNumber,
          gas_used: receipt.gasUsed.toString(),
          failed_at: new Date(),
          failure_reason: 'Transaction reverted'
        });
        
        console.log(`❌ Vote Failed: txHash=${transaction_hash} reverted for election ${election_id}`);
      }

    } catch (error) {
      console.error(`❌ Transaction Confirmation: Error checking vote ${vote._id}:`, error.message);
      
      // Increment retry count
      const retryCount = (vote.retry_count || 0) + 1;
      
      if (retryCount >= this.maxRetries) {
        // Max retries reached, mark as failed
        await this.updateVoteStatus(vote, 'failed', {
          failed_at: new Date(),
          failure_reason: `Max retries exceeded: ${error.message}`,
          retry_count: retryCount
        });
        
        console.log(`❌ Vote Failed: Max retries exceeded for vote ${vote._id}`);
      } else {
        // Update retry count and continue
        await this.updateVoteRetryCount(vote._id, retryCount);
        console.log(`⚠️ Transaction Confirmation: Retry ${retryCount}/${this.maxRetries} for vote ${vote._id}`);
      }
    }
  }

  /**
   * Get transaction receipt with retry logic
   */
  async getTransactionReceipt(transactionHash, attempt = 1) {
    try {
      const receipt = await this.provider.getTransactionReceipt(transactionHash);
      return receipt;
    } catch (error) {
      if (attempt < this.maxRetries) {
        console.log(`⚠️ Transaction Confirmation: RPC call failed, retrying in ${this.retryDelay}ms (attempt ${attempt})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        return this.getTransactionReceipt(transactionHash, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Update vote status in database
   */
  async updateVoteStatus(vote, status, additionalData = {}) {
    try {
      const db = this.client.db('election_system');
      
      const updateData = {
        status,
        updated_at: new Date(),
        ...additionalData
      };

      await db.collection('votes').updateOne(
        { _id: vote._id },
        { $set: updateData }
      );

      console.log(`✅ Vote Status Updated: ${vote._id} → ${status}`);
      
    } catch (error) {
      console.error(`❌ Transaction Confirmation: Failed to update vote ${vote._id}:`, error.message);
    }
  }

  /**
   * Update retry count for a vote
   */
  async updateVoteRetryCount(voteId, retryCount) {
    try {
      const db = this.client.db('election_system');
      
      await db.collection('votes').updateOne(
        { _id: voteId },
        { 
          $set: { 
            retry_count: retryCount,
            updated_at: new Date()
          }
        }
      );
      
    } catch (error) {
      console.error(`❌ Transaction Confirmation: Failed to update retry count for vote ${voteId}:`, error.message);
    }
  }

  /**
   * Get candidate index from vote data
   */
  async getCandidateIndex(vote) {
    try {
      const db = this.client.db('election_system');
      
      // Get election to find candidate index
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(vote.election_id) 
      });
      
      if (!election || !election.contestants) {
        return 'unknown';
      }
      
      // Find candidate index by matching candidate_id
      const candidateIndex = election.contestants.findIndex(
        contestant => contestant.id === vote.candidate_id
      );
      
      return candidateIndex >= 0 ? candidateIndex : 'unknown';
    } catch (error) {
      console.error('❌ Transaction Confirmation: Failed to get candidate index:', error.message);
      return 'unknown';
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      pollingInterval: this.pollingInterval,
      maxRetries: this.maxRetries,
      providerConnected: !!this.provider,
      databaseConnected: !!this.client
    };
  }

  /**
   * Cleanup resources
   */
  async cleanup() {
    this.stop();
    if (this.client) {
      await this.client.close();
    }
  }
}

// Create singleton instance
const transactionConfirmationService = new TransactionConfirmationService();

module.exports = transactionConfirmationService;
