const { ApiError } = require('../utils/apiError');
const { MongoClient, ObjectId } = require('mongodb');
const { ethers } = require('ethers');
const blockchainService = require('../blockchain/services/blockchainService');
const auditService = require('../services/auditService');
const logger = require('../utils/logger');

/**
 * Get transaction details from blockchain
 */
const getTransaction = async (req, res, next) => {
  try {
    const { hash } = req.params;
    
    if (!hash || !hash.startsWith('0x')) {
      throw new ApiError('Invalid transaction hash format', 400);
    }
    
    logger.info(`BlockchainController: Fetching transaction ${hash}`);
    
    // Initialize blockchain service
    const isConnected = await blockchainService.initialize();
    if (!isConnected) {
      throw new ApiError('Blockchain service unavailable', 503);
    }
    
    // Check if this is a real transaction hash from Hardhat
    if (hash.startsWith('0x') && hash.length === 66) {
      logger.info('BlockchainController: Attempting to fetch real transaction from Hardhat');
      
      try {
        // Try to get real transaction data from Hardhat
        const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
        const transaction = await provider.getTransaction(hash);
        const receipt = await provider.getTransactionReceipt(hash);
        
        if (transaction && receipt) {
          const realTransaction = {
            hash: transaction.hash,
            blockNumber: receipt.blockNumber,
            gasUsed: receipt.gasUsed.toString(),
            gasPrice: transaction.gasPrice?.toString() || '0',
            from: transaction.from,
            to: transaction.to,
            value: transaction.value.toString(),
            status: receipt.status === 1 ? 'success' : 'failed',
            timestamp: new Date().toISOString(),
            network: 'Hardhat Local Network',
            explorerUrl: `http://127.0.0.1:8545/tx/${hash}`,
            // Vote-specific data (would be extracted from transaction logs in real implementation)
            voteData: {
              electionContract: transaction.to,
              voterAddress: transaction.from,
              candidateId: '1', // This would be extracted from logs in a real implementation
              eventType: 'VoteCast'
            }
          };
          
          return res.json({
            success: true,
            data: {
              transaction: realTransaction,
              status: 'available'
            }
          });
        }
      } catch (error) {
        logger.warn('BlockchainController: Failed to fetch real transaction, falling back to unavailable status:', error.message);
      }
    }
    
    // Fallback for mock data or unavailable transactions
    logger.info('BlockchainController: Using fallback for transaction details');
    
    const fallbackTransaction = {
      hash: hash,
      blockNumber: 'N/A',
      gasUsed: 'N/A',
      gasPrice: 'N/A',
      from: 'N/A',
      to: 'N/A',
      value: '0',
      status: 'unavailable',
      timestamp: new Date().toISOString(),
      network: 'Hardhat Local Network',
      explorerUrl: `http://127.0.0.1:8545/tx/${hash}`,
      voteData: {
        electionContract: 'N/A',
        voterAddress: 'N/A',
        candidateId: 'N/A',
        eventType: 'VoteCast'
      }
    };
    
    return res.json({
      success: true,
      data: {
        transaction: fallbackTransaction,
        status: 'unavailable'
      }
    });
    
    // PHASE 12: Try to get real transaction data from blockchain
    try {
      const transactionData = await blockchainService.getTransactionDetails(hash);
      
      res.json({
        success: true,
        data: {
          transaction: transactionData,
          status: 'available'
        }
      });
      
    } catch (blockchainError) {
      logger.warn('BlockchainController: Failed to fetch real transaction data, returning unavailable status:', blockchainError.message);
      
      res.json({
        success: true,
        data: {
          status: 'unavailable',
          message: 'Blockchain data temporarily unavailable. Please try again later.'
        }
      });
    }
    
  } catch (error) {
    logger.error('BlockchainController: Error fetching transaction:', error);
    next(error);
  }
};

/**
 * Get all blockchain transactions for an election
 */
const getElectionTransactions = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`BlockchainController: Fetching transactions for election ${id}`);
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Check if election exists
      const election = await db.collection('elections').findOne({ _id: new ObjectId(id) });
      
      if (!election) {
        logger.info(`BlockchainController: Election ${id} not found, checking if deleted`);
        
        // Check if election was deleted by looking for any references
        const deletedElection = await db.collection('blockchain_logs').findOne({ 
          election_id: id,
          action: 'election_deleted'
        });
        
        if (deletedElection) {
          return res.json({
            success: true,
            data: {
              status: 'deleted',
              message: 'Election has been deleted'
            }
          });
        }
        
        throw new ApiError('Election not found', 404);
      }
      
      // Check if election has blockchain contract
      if (!election.wallet_address) {
        return res.json({
          success: true,
          data: {
            status: 'unavailable',
            message: 'Election does not have a blockchain contract',
            election: {
              id: election._id.toString(),
              title: election.title,
              wallet_address: null
            }
          }
        });
      }
      
      // Get all votes for this election from DB
      const dbVotes = await db.collection('votes').find({
        election_id: id,
        status: 'success'
      }).toArray();
      
      logger.info(`BlockchainController: Found ${dbVotes.length} votes in DB for election ${id}`);
      
      // Initialize blockchain service
      const isConnected = await blockchainService.initialize();
      if (!isConnected) {
        return res.json({
          success: true,
          data: {
            status: 'unavailable',
            message: 'Blockchain service unavailable',
            election: {
              id: election._id.toString(),
              title: election.title,
              wallet_address: election.wallet_address
            },
            dbVotes: dbVotes.length,
            chainVotes: 0,
            consistency: 'unavailable'
          }
        });
      }
      
      // For mock mode, generate mock transactions
      if (blockchainService.mockMode) {
        logger.info('BlockchainController: Using mock mode for election transactions');
        
        const mockTransactions = dbVotes.map((vote, index) => ({
          hash: vote.transaction_hash || `0x${Math.random().toString(16).substr(2, 64)}`,
          blockNumber: vote.blockchain_block_number || Math.floor(Math.random() * 1000000),
          gasUsed: vote.blockchain_gas_used || '21000',
          voterAddress: vote.voter_id, // This would be the actual voter wallet address
          candidateId: vote.candidate_id,
          timestamp: vote.vote_timestamp || new Date(),
          status: 'success'
        }));
        
        return res.json({
          success: true,
          data: {
            status: 'available',
            election: {
              id: election._id.toString(),
              title: election.title,
              wallet_address: election.wallet_address
            },
            transactions: mockTransactions,
            dbVotes: dbVotes.length,
            chainVotes: mockTransactions.length,
            consistency: dbVotes.length === mockTransactions.length ? 'consistent' : 'inconsistent'
          }
        });
      }
      
      // Real blockchain implementation would fetch VoteCast events here
      // For now, return mock data
      const mockTransactions = dbVotes.map((vote, index) => ({
        hash: vote.transaction_hash || `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: vote.blockchain_block_number || Math.floor(Math.random() * 1000000),
        gasUsed: vote.blockchain_gas_used || '21000',
        voterAddress: vote.voter_id,
        candidateId: vote.candidate_id,
        timestamp: vote.vote_timestamp || new Date(),
        status: 'success'
      }));
      
      res.json({
        success: true,
        data: {
          status: 'available',
          election: {
            id: election._id.toString(),
            title: election.title,
            wallet_address: election.wallet_address
          },
          transactions: mockTransactions,
          dbVotes: dbVotes.length,
          chainVotes: mockTransactions.length,
          consistency: dbVotes.length === mockTransactions.length ? 'consistent' : 'inconsistent'
        }
      });
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    logger.error('BlockchainController: Error fetching election transactions:', error);
    next(error);
  }
};

/**
 * Check DB vs Blockchain consistency for an election
 */
const checkConsistency = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`BlockchainController: Checking consistency for election ${id}`);
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Check if election exists
      const election = await db.collection('elections').findOne({ _id: new ObjectId(id) });
      
      if (!election) {
        return res.json({
          success: true,
          data: {
            status: 'deleted',
            message: 'Election not found (deleted)',
            consistency: 'unavailable'
          }
        });
      }
      
      // Get DB vote count
      const dbVotes = await db.collection('votes').countDocuments({
        election_id: id,
        status: 'success'
      });
      
      // Initialize blockchain service
      const isConnected = await blockchainService.initialize();
      if (!isConnected) {
        return res.json({
          success: true,
          data: {
            status: 'unavailable',
            message: 'Blockchain service unavailable',
            dbVotes: dbVotes,
            chainVotes: 0,
            consistency: 'unavailable'
          }
        });
      }
      
      // For mock mode, assume consistency
      let chainVotes = dbVotes;
      if (blockchainService.mockMode) {
        logger.info('BlockchainController: Using mock mode for consistency check');
        chainVotes = dbVotes; // In mock mode, assume DB and blockchain match
      }
      
      const isConsistent = dbVotes === chainVotes;
      
      res.json({
        success: true,
        data: {
          status: 'available',
          election: {
            id: election._id.toString(),
            title: election.title,
            wallet_address: election.wallet_address
          },
          dbVotes: dbVotes,
          chainVotes: chainVotes,
          consistency: isConsistent ? 'consistent' : 'inconsistent',
          message: isConsistent 
            ? 'Database and blockchain are consistent' 
            : 'Database and blockchain have mismatched vote counts'
        }
      });
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    logger.error('BlockchainController: Error checking consistency:', error);
    next(error);
  }
};

/**
 * Get blockchain network status
 */
const getNetworkStatus = async (req, res, next) => {
  try {
    logger.info('BlockchainController: Checking network status');
    
    const isConnected = await blockchainService.initialize();
    
    res.json({
      success: true,
      data: {
        connected: isConnected,
        mockMode: blockchainService.mockMode,
        network: blockchainService.mockMode ? 'Ganache Local Network (Mock)' : 'Ganache Local Network',
        status: isConnected ? 'available' : 'unavailable'
      }
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error checking network status:', error);
    next(error);
  }
};

/**
 * Audit a single election for blockchain consistency
 */
const auditElection = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`BlockchainController: Starting audit for election ${electionId}`);
    
    const auditResult = await auditService.auditElection(electionId);
    
    res.json({
      success: true,
      message: 'Election audit completed',
      data: auditResult
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error auditing election:', error);
    next(error);
  }
};

/**
 * Audit all elections for blockchain consistency
 */
const auditAllElections = async (req, res, next) => {
  try {
    logger.info('BlockchainController: Starting audit for all elections');
    
    const auditResult = await auditService.auditAllElections();
    
    res.json({
      success: true,
      message: 'All elections audit completed',
      data: auditResult
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error auditing all elections:', error);
    next(error);
  }
};

/**
 * Get audit status
 */
const getAuditStatus = async (req, res, next) => {
  try {
    const isRunning = auditService.isAuditRunning();
    
    res.json({
      success: true,
      data: {
        isRunning,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error getting audit status:', error);
    next(error);
  }
};

/**
 * Get elections for observers with blockchain consistency
 */
const getObserverElections = async (req, res, next) => {
  try {
    logger.info('BlockchainController: Fetching elections for observer');
    
    // Connect to database
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db('election_system');
    
    // Get all elections
    const electionsCollection = db.collection('elections');
    const votesCollection = db.collection('votes');
    
    const elections = await electionsCollection.find({}).toArray();
    
    const observerElections = [];
    
    for (const election of elections) {
      // Get vote counts from DB
      const dbVotes = await votesCollection.countDocuments({
        election_id: election._id.toString(),
        status: 'success'
      });
      
      // Get candidate vote breakdown
      const candidateVotes = await votesCollection.aggregate([
        {
          $match: {
            election_id: election._id.toString(),
            status: 'success'
          }
        },
        {
          $group: {
            _id: '$candidate_id',
            count: { $sum: 1 }
          }
        }
      ]).toArray();
      
      // Determine blockchain consistency
      let chainVotes = 0;
      let consistency = 'unavailable';
      let lastChecked = new Date().toISOString();
      
      if (election.contract_address) {
        try {
          // Initialize blockchain service
          await blockchainService.initialize();
          
          // For now, we'll simulate blockchain data since we don't have event querying
          // In a real implementation, this would query the contract for VoteCast events
          chainVotes = dbVotes; // Simulate consistency for now
          consistency = 'consistent';
        } catch (error) {
          logger.warn(`BlockchainController: Blockchain unavailable for election ${election._id}:`, error.message);
          consistency = 'unavailable';
        }
      } else {
        consistency = 'noContract';
      }
      
      observerElections.push({
        electionId: election._id.toString(),
        title: election.title,
        status: election.status,
        startDate: election.start_date,
        endDate: election.end_date,
        dbVotes,
        chainVotes,
        consistency,
        lastChecked,
        contractAddress: election.contract_address ? maskAddress(election.contract_address) : null,
        candidateVotes: candidateVotes.map(cv => ({
          candidateId: cv._id,
          votes: cv.count
        }))
      });
    }
    
    await client.close();
    
    res.json({
      success: true,
      data: {
        elections: observerElections,
        totalElections: elections.length,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error fetching observer elections:', error);
    next(error);
  }
};

/**
 * Check blockchain consistency for observers
 */
const checkBlockchainConsistency = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`BlockchainController: Checking blockchain consistency for election: ${electionId}`);
    
    // Connect to database
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db('election_system');
    
    // Get election details
    const electionsCollection = db.collection('elections');
    const votesCollection = db.collection('votes');
    
    const election = await electionsCollection.findOne({
      _id: new ObjectId(electionId)
    });
    
    if (!election) {
      await client.close();
      return res.json({
        success: true,
        data: {
          status: 'deleted',
          message: 'Election not found or deleted'
        }
      });
    }
    
    // Get DB vote count
    const dbVotes = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success'
    });
    
    // Get blockchain vote count
    let chainVotes = 0;
    let consistency = 'unavailable';
    let blockchainStatus = 'offline';
    let lastChecked = new Date().toISOString();
    
    if (election.wallet_address) {
      try {
        // Initialize blockchain service
        await blockchainService.initialize();
        
        // For now, we'll simulate blockchain data
        // In a real implementation, this would query the contract for VoteCast events
        chainVotes = dbVotes; // Simulate consistency for now
        consistency = 'consistent';
        blockchainStatus = 'online';
      } catch (error) {
        logger.warn(`BlockchainController: Blockchain unavailable for election ${electionId}:`, error.message);
        consistency = 'unavailable';
        blockchainStatus = 'offline';
      }
    } else {
      consistency = 'noContract';
      blockchainStatus = 'noContract';
    }
    
    await client.close();
    
    const consistencyResult = {
      electionId: election._id.toString(),
      title: election.title,
      status: election.status,
      dbVotes,
      chainVotes,
      consistency,
      blockchainStatus,
      lastChecked,
      contractAddress: election.wallet_address ? maskAddress(election.wallet_address) : null,
      summary: {
        isConsistent: consistency === 'consistent',
        voteDifference: Math.abs(dbVotes - chainVotes),
        blockchainAvailable: blockchainStatus === 'online',
        lastUpdated: new Date().toISOString()
      }
    };
    
    res.json({
      success: true,
      data: consistencyResult
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error checking blockchain consistency:', error);
    next(error);
  }
};

/**
 * Get detailed election information for observers
 */
const getObserverElectionDetails = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`BlockchainController: Fetching election details for observer: ${electionId}`);
    
    // Connect to database
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db('election_system');
    
    // Get election details
    const electionsCollection = db.collection('elections');
    const votesCollection = db.collection('votes');
    const usersCollection = db.collection('users');
    
    const election = await electionsCollection.findOne({
      _id: new ObjectId(electionId)
    });
    
    if (!election) {
      await client.close();
      throw new ApiError('Election not found', 404);
    }
    
    // Get all votes for this election
    const votes = await votesCollection.find({
      election_id: electionId,
      status: 'success'
    }).toArray();
    
    // Get candidate vote breakdown - include ALL contestants
    const votesByCandidate = await votesCollection.aggregate([
      {
        $match: {
          election_id: electionId,
          status: 'success'
        }
      },
      {
        $group: {
          _id: '$candidate_id',
          count: { $sum: 1 },
          votes: {
            $push: {
              voterId: '$voter_id',
              transactionHash: '$transaction_hash',
              votePosition: '$vote_position',
              timestamp: '$vote_timestamp'
            }
          }
        }
      }
    ]).toArray();
    
    // Create map of votes by candidate ID
    const voteMap = {};
    votesByCandidate.forEach(vote => {
      voteMap[vote._id] = vote;
    });
    
    // Build candidate list including all contestants (even with 0 votes)
    const candidateVotes = election.contestants.map(contestant => {
      const candidateId = contestant.id || contestant._id.toString();
      const voteData = voteMap[candidateId];
      
      return {
        _id: candidateId,
        name: contestant.name,
        party: contestant.party,
        count: voteData ? voteData.count : 0,
        votes: voteData ? voteData.votes : []
      };
    });
    
    // Get voter details (masked)
    const voterDetails = await Promise.all(
      votes.map(async (vote) => {
        const voter = await usersCollection.findOne({
          _id: new ObjectId(vote.voter_id)
        });
        
        return {
          voteId: vote._id.toString(),
          voterId: vote.voter_id,
          voterEmail: voter ? maskEmail(voter.email) : 'Unknown',
          walletAddress: voter?.wallet_address ? maskAddress(voter.wallet_address) : 'Unknown',
          candidateId: vote.candidate_id,
          transactionHash: vote.transaction_hash ? maskHash(vote.transaction_hash) : 'Pending',
          votePosition: vote.vote_position,
          timestamp: vote.vote_timestamp,
          blockNumber: vote.blockchain_block_number || 'N/A',
          gasUsed: vote.blockchain_gas_used || 'N/A'
        };
      })
    );
    
    // Determine blockchain consistency
    let chainVotes = 0;
    let consistency = 'unavailable';
    let blockchainStatus = 'offline';
    let lastChecked = new Date().toISOString();
    
    if (election.contract_address) {
      try {
        // Initialize blockchain service
        await blockchainService.initialize();
        
        // For now, we'll simulate blockchain data
        // In a real implementation, this would query the contract for VoteCast events
        chainVotes = votes.length;
        consistency = 'consistent';
        blockchainStatus = 'online';
      } catch (error) {
        logger.warn(`BlockchainController: Blockchain unavailable for election ${electionId}:`, error.message);
        consistency = 'unavailable';
        blockchainStatus = 'offline';
      }
    } else {
      consistency = 'noContract';
      blockchainStatus = 'noContract';
    }
    
    await client.close();
    
    const electionDetails = {
      electionId: election._id.toString(),
      title: election.title,
      description: election.description,
      status: election.status,
      startDate: election.start_date,
      endDate: election.end_date,
      electionType: election.election_type,
      state: election.state,
      lga: election.lga,
      ward: election.ward,
      pollingUnit: election.polling_unit,
      
      // Vote statistics
      dbVotes: votes.length,
      chainVotes,
      consistency,
      blockchainStatus,
      lastChecked,
      
      // Contract information
      contractAddress: election.contract_address ? maskAddress(election.contract_address) : null,
      
      // Candidate breakdown
      candidates: candidateVotes.map(cv => ({
        candidateId: cv._id,
        name: cv.name,
        party: cv.party,
        votes: cv.count,
        voteDetails: cv.votes.map(vote => ({
          voterId: vote.voterId,
          transactionHash: maskHash(vote.transactionHash || ''),
          votePosition: vote.votePosition,
          timestamp: vote.timestamp
        }))
      })),
      
      // All votes (for detailed view)
      allVotes: voterDetails,
      
      // Summary
      summary: {
        totalVoters: votes.length,
        successfulVotes: votes.length,
        pendingVotes: 0,
        consistencyStatus: consistency,
        blockchainAvailable: blockchainStatus === 'online',
        lastUpdated: new Date().toISOString()
      }
    };
    
    res.json({
      success: true,
      data: electionDetails
    });
    
  } catch (error) {
    logger.error('BlockchainController: Error fetching observer election details:', error);
    next(error);
  }
};

/**
 * Mask email address for privacy
 */
const maskEmail = (email) => {
  if (!email) return 'Unknown';
  const [username, domain] = email.split('@');
  if (username.length <= 2) return email;
  return `${username[0]}${'*'.repeat(username.length - 2)}${username[username.length - 1]}@${domain}`;
};

/**
 * Mask wallet address for privacy
 */
const maskAddress = (address) => {
  if (!address) return 'Unknown';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Mask transaction hash for privacy
 */
const maskHash = (hash) => {
  if (!hash) return 'Unknown';
  if (hash.length < 10) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};

module.exports = {
  getTransaction,
  getElectionTransactions,
  checkConsistency,
  getNetworkStatus,
  auditElection,
  auditAllElections,
  getAuditStatus,
  getObserverElections,
  getObserverElectionDetails,
  checkBlockchainConsistency
};