/**
 * PHASE 14: Blockchain Audit & Consistency Reports
 * 
 * This service provides comprehensive audit capabilities to compare
 * MongoDB votes with blockchain data for consistency verification.
 */

const { MongoClient, ObjectId } = require('mongodb');
const blockchainService = require('../blockchain/services/blockchainService');
const logger = require('../utils/logger');

class AuditService {
  constructor() {
    this.isAuditing = false;
  }

  /**
   * Audit a single election for blockchain consistency
   * @param {string} electionId - Election ID to audit
   * @returns {Promise<Object>} Audit results
   */
  async auditElection(electionId) {
    if (this.isAuditing) {
      logger.warn('AuditService: Audit already in progress, skipping');
      return {
        success: false,
        message: 'Audit already in progress',
        electionId
      };
    }

    this.isAuditing = true;
    const startTime = Date.now();

    try {
      logger.info(`AuditService: Starting audit for election ${electionId}`);

      // Connect to database
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');

      // Get election details
      const electionsCollection = db.collection('elections');
      const election = await electionsCollection.findOne({
        _id: new ObjectId(electionId)
      });

      if (!election) {
        await client.close();
        return {
          success: false,
          message: 'Election not found',
          electionId
        };
      }

      // Get all votes from database
      const votesCollection = db.collection('votes');
      const dbVotes = await votesCollection.find({
        election_id: electionId,
        status: 'success' // Only count successful votes
      }).toArray();

      logger.info(`AuditService: Found ${dbVotes.length} successful votes in DB for election ${electionId}`);

      // Calculate DB candidate totals
      const dbCandidateTotals = {};
      const dbTransactionHashes = new Set();
      
      dbVotes.forEach(vote => {
        const candidateId = vote.candidate_id;
        dbCandidateTotals[candidateId] = (dbCandidateTotals[candidateId] || 0) + 1;
        
        if (vote.transaction_hash && vote.transaction_hash !== 'pending...') {
          dbTransactionHashes.add(vote.transaction_hash);
        }
      });

      // Initialize blockchain data
      let chainVotes = [];
      let chainCandidateTotals = {};
      let chainTransactionHashes = new Set();
      let chainStatus = 'unavailable';
      let chainError = null;

      // Try to get blockchain data if contract exists
      if (election.wallet_address) {
        try {
          // Initialize blockchain service
          await blockchainService.initialize();
          
          // Get vote events from blockchain contract
          chainVotes = await this.getBlockchainVoteEvents(election.wallet_address);
          
          if (chainVotes.length > 0) {
            chainStatus = 'available';
            
            // Calculate blockchain candidate totals
            chainVotes.forEach(vote => {
              const candidateId = vote.candidateId;
              chainCandidateTotals[candidateId] = (chainCandidateTotals[candidateId] || 0) + 1;
              chainTransactionHashes.add(vote.transactionHash);
            });
            
            logger.info(`AuditService: Found ${chainVotes.length} votes on blockchain for election ${electionId}`);
          } else {
            chainStatus = 'empty';
            logger.info(`AuditService: No votes found on blockchain for election ${electionId}`);
          }
        } catch (error) {
          chainStatus = 'error';
          chainError = error.message;
          logger.error(`AuditService: Blockchain error for election ${electionId}:`, error);
        }
      } else {
        chainStatus = 'noContract';
        logger.warn(`AuditService: No contract address for election ${electionId}`);
      }

      await client.close();

      // Determine consistency status
      const isConsistent = this.determineConsistency(
        dbVotes.length,
        chainVotes.length,
        dbCandidateTotals,
        chainCandidateTotals,
        dbTransactionHashes,
        chainTransactionHashes,
        chainStatus
      );

      const auditResult = {
        success: true,
        electionId,
        electionTitle: election.title,
        electionStatus: election.status,
        contractAddress: election.wallet_address,
        auditTimestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        
        // Vote counts
        dbVotes: dbVotes.length,
        chainVotes: chainVotes.length,
        
        // Candidate totals
        dbCandidateTotals,
        chainCandidateTotals,
        
        // Transaction hashes
        dbTransactionHashes: Array.from(dbTransactionHashes),
        chainTransactionHashes: Array.from(chainTransactionHashes),
        
        // Status and consistency
        chainStatus,
        chainError,
        isConsistent,
        consistencyStatus: isConsistent ? 'consistent' : 'inconsistent',
        
        // Detailed analysis
        analysis: this.generateAnalysis(
          dbVotes.length,
          chainVotes.length,
          dbCandidateTotals,
          chainCandidateTotals,
          dbTransactionHashes,
          chainTransactionHashes,
          chainStatus
        )
      };

      logger.info(`AuditService: Audit completed for election ${electionId} in ${auditResult.duration}ms`);
      return auditResult;

    } catch (error) {
      logger.error('AuditService: Audit failed:', error);
      return {
        success: false,
        message: `Audit failed: ${error.message}`,
        electionId,
        duration: Date.now() - startTime
      };
    } finally {
      this.isAuditing = false;
    }
  }

  /**
   * Audit all elections for blockchain consistency
   * @returns {Promise<Object>} Audit results for all elections
   */
  async auditAllElections() {
    if (this.isAuditing) {
      logger.warn('AuditService: Audit already in progress, skipping');
      return {
        success: false,
        message: 'Audit already in progress'
      };
    }

    this.isAuditing = true;
    const startTime = Date.now();

    try {
      logger.info('AuditService: Starting audit for all elections');

      // Connect to database
      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');

      // Get all elections
      const electionsCollection = db.collection('elections');
      const elections = await electionsCollection.find({}).toArray();

      logger.info(`AuditService: Found ${elections.length} elections to audit`);

      const auditResults = [];
      let consistentCount = 0;
      let inconsistentCount = 0;
      let unavailableCount = 0;

      // Audit each election
      for (const election of elections) {
        try {
          const result = await this.auditElection(election._id.toString());
          auditResults.push(result);
          
          if (result.success) {
            if (result.isConsistent) {
              consistentCount++;
            } else {
              inconsistentCount++;
            }
          } else {
            unavailableCount++;
          }
        } catch (error) {
          logger.error(`AuditService: Error auditing election ${election._id}:`, error);
          auditResults.push({
            success: false,
            electionId: election._id.toString(),
            electionTitle: election.title,
            message: error.message
          });
          unavailableCount++;
        }
      }

      await client.close();

      const summary = {
        success: true,
        totalElections: elections.length,
        auditedElections: auditResults.length,
        consistentElections: consistentCount,
        inconsistentElections: inconsistentCount,
        unavailableElections: unavailableCount,
        auditTimestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        results: auditResults
      };

      logger.info(`AuditService: All elections audit completed in ${summary.duration}ms`);
      return summary;

    } catch (error) {
      logger.error('AuditService: All elections audit failed:', error);
      return {
        success: false,
        message: `All elections audit failed: ${error.message}`,
        duration: Date.now() - startTime
      };
    } finally {
      this.isAuditing = false;
    }
  }

  /**
   * Get vote events from blockchain contract
   * @param {string} contractAddress - Contract address
   * @returns {Promise<Array>} Vote events from blockchain
   */
  async getBlockchainVoteEvents(contractAddress) {
    try {
      // This would typically involve querying the blockchain for VoteCast events
      // For now, we'll simulate this based on the current blockchain service capabilities
      
      // In a real implementation, this would query the contract events
      // For now, return empty array as we don't have event querying implemented
      logger.info(`AuditService: Querying blockchain events for contract ${contractAddress}`);
      
      // TODO: Implement actual blockchain event querying
      // This would involve:
      // 1. Getting the contract instance
      // 2. Querying VoteCast events
      // 3. Parsing event data
      // 4. Returning structured vote data
      
      return [];
    } catch (error) {
      logger.error('AuditService: Failed to get blockchain events:', error);
      throw error;
    }
  }

  /**
   * Determine if DB and blockchain data are consistent
   * @param {number} dbVoteCount - Number of votes in DB
   * @param {number} chainVoteCount - Number of votes on blockchain
   * @param {Object} dbCandidateTotals - DB candidate vote totals
   * @param {Object} chainCandidateTotals - Blockchain candidate vote totals
   * @param {Set} dbTransactionHashes - DB transaction hashes
   * @param {Set} chainTransactionHashes - Blockchain transaction hashes
   * @param {string} chainStatus - Blockchain status
   * @returns {boolean} True if consistent
   */
  determineConsistency(dbVoteCount, chainVoteCount, dbCandidateTotals, chainCandidateTotals, dbTransactionHashes, chainTransactionHashes, chainStatus) {
    // If blockchain is unavailable, we can't verify consistency
    if (chainStatus === 'unavailable' || chainStatus === 'noContract' || chainStatus === 'error') {
      return false;
    }

    // If blockchain is empty but DB has votes, it might be a reset
    if (chainStatus === 'empty' && dbVoteCount > 0) {
      return false;
    }

    // Compare vote counts
    if (dbVoteCount !== chainVoteCount) {
      return false;
    }

    // Compare candidate totals
    const dbCandidates = Object.keys(dbCandidateTotals);
    const chainCandidates = Object.keys(chainCandidateTotals);
    
    if (dbCandidates.length !== chainCandidates.length) {
      return false;
    }

    for (const candidate of dbCandidates) {
      if (dbCandidateTotals[candidate] !== chainCandidateTotals[candidate]) {
        return false;
      }
    }

    // Compare transaction hashes (if available)
    if (dbTransactionHashes.size > 0 && chainTransactionHashes.size > 0) {
      if (dbTransactionHashes.size !== chainTransactionHashes.size) {
        return false;
      }
      
      for (const hash of dbTransactionHashes) {
        if (!chainTransactionHashes.has(hash)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Generate detailed analysis of audit results
   * @param {number} dbVoteCount - Number of votes in DB
   * @param {number} chainVoteCount - Number of votes on blockchain
   * @param {Object} dbCandidateTotals - DB candidate vote totals
   * @param {Object} chainCandidateTotals - Blockchain candidate vote totals
   * @param {Set} dbTransactionHashes - DB transaction hashes
   * @param {Set} chainTransactionHashes - Blockchain transaction hashes
   * @param {string} chainStatus - Blockchain status
   * @returns {Object} Analysis details
   */
  generateAnalysis(dbVoteCount, chainVoteCount, dbCandidateTotals, chainCandidateTotals, dbTransactionHashes, chainTransactionHashes, chainStatus) {
    const analysis = {
      voteCountDifference: dbVoteCount - chainVoteCount,
      candidateDifferences: {},
      transactionHashDifferences: {
        dbOnly: [],
        chainOnly: [],
        common: []
      },
      issues: [],
      recommendations: []
    };

    // Analyze vote count differences
    if (dbVoteCount !== chainVoteCount) {
      analysis.issues.push(`Vote count mismatch: DB has ${dbVoteCount}, blockchain has ${chainVoteCount}`);
    }

    // Analyze candidate differences
    const allCandidates = new Set([...Object.keys(dbCandidateTotals), ...Object.keys(chainCandidateTotals)]);
    for (const candidate of allCandidates) {
      const dbCount = dbCandidateTotals[candidate] || 0;
      const chainCount = chainCandidateTotals[candidate] || 0;
      const difference = dbCount - chainCount;
      
      if (difference !== 0) {
        analysis.candidateDifferences[candidate] = {
          db: dbCount,
          chain: chainCount,
          difference
        };
        analysis.issues.push(`Candidate ${candidate} vote difference: DB ${dbCount}, blockchain ${chainCount}`);
      }
    }

    // Analyze transaction hash differences
    for (const hash of dbTransactionHashes) {
      if (chainTransactionHashes.has(hash)) {
        analysis.transactionHashDifferences.common.push(hash);
      } else {
        analysis.transactionHashDifferences.dbOnly.push(hash);
      }
    }

    for (const hash of chainTransactionHashes) {
      if (!dbTransactionHashes.has(hash)) {
        analysis.transactionHashDifferences.chainOnly.push(hash);
      }
    }

    // Generate recommendations
    if (chainStatus === 'unavailable' || chainStatus === 'noContract') {
      analysis.recommendations.push('Blockchain contract not available - check contract deployment');
    } else if (chainStatus === 'empty' && dbVoteCount > 0) {
      analysis.recommendations.push('Blockchain appears to have been reset - votes may need to be re-synced');
    } else if (analysis.voteCountDifference !== 0) {
      analysis.recommendations.push('Run vote sync service to retry failed blockchain transactions');
    }

    return analysis;
  }

  /**
   * Check if audit is currently running
   * @returns {boolean} True if audit is running
   */
  isAuditRunning() {
    return this.isAuditing;
  }
}

// Create singleton instance
const auditService = new AuditService();

module.exports = auditService;
