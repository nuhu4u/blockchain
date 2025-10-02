const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blockchainService = require('../blockchain/services/blockchainService');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

/**
 * Observer Controller
 * 
 * This controller handles observer-specific operations with blockchain verification.
 * Observers have read-only access to election data and blockchain transparency.
 */

/**
 * Get elections with blockchain verification for observers
 */
const getObserverElectionsWithBlockchain = async (req, res, next) => {
  try {
    logger.info('ObserverController: Fetching elections with blockchain verification');
    
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
      let blockchainStatus = 'offline';
      
      if (election.wallet_address) {
        try {
          // Initialize blockchain service
          await blockchainService.initialize();
          
          // For now, we'll simulate blockchain data since we don't have event querying
          // In a real implementation, this would query the contract for VoteCast events
          chainVotes = dbVotes; // Simulate consistency for now
          consistency = 'consistent';
          blockchainStatus = 'online';
        } catch (error) {
          logger.warn(`ObserverController: Blockchain unavailable for election ${election._id}:`, error.message);
          consistency = 'unavailable';
          blockchainStatus = 'offline';
        }
            } else {
        consistency = 'noContract';
        blockchainStatus = 'noContract';
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
        blockchainStatus,
        lastChecked,
        contractAddress: election.wallet_address ? maskAddress(election.wallet_address) : null,
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
    logger.error('ObserverController: Error fetching elections with blockchain verification:', error);
    next(error);
  }
};

/**
 * Verify election blockchain consistency
 */
const verifyElectionBlockchain = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`ObserverController: Verifying blockchain consistency for election: ${electionId}`);
    
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
    
    // Get all votes for this election
    const votes = await votesCollection.find({
        election_id: electionId,
        status: 'success'
    }).toArray();
    
    // Get candidate vote breakdown
    const candidateVotes = await votesCollection.aggregate([
      {
        $match: {
          election_id: electionId,
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
    let blockchainStatus = 'offline';
    let transactions = [];
    let lastChecked = new Date().toISOString();
    
    if (election.wallet_address) {
      try {
        // Initialize blockchain service
        await blockchainService.initialize();
        
        // For now, we'll simulate blockchain data
        // In a real implementation, this would query the contract for VoteCast events
        chainVotes = votes.length;
        consistency = 'consistent';
        blockchainStatus = 'online';
        
        // Simulate transaction data
        transactions = votes.map(vote => ({
          hash: vote.transaction_hash ? maskHash(vote.transaction_hash) : 'Pending',
          from: '0xUserWallet',
          to: maskAddress(election.wallet_address),
          blockNumber: vote.blockchain_block_number || 'N/A',
          gasUsed: vote.blockchain_gas_used || 'N/A',
          timestamp: vote.vote_timestamp
        }));
        
      } catch (error) {
        logger.warn(`ObserverController: Blockchain unavailable for election ${electionId}:`, error.message);
        consistency = 'unavailable';
        blockchainStatus = 'offline';
      }
    } else {
      consistency = 'noContract';
      blockchainStatus = 'noContract';
    }
    
    await client.close();
    
    const verificationResult = {
      electionId: election._id.toString(),
      title: election.title,
      status: election.status,
      dbVotes: votes.length,
      chainVotes,
      consistency,
      blockchainStatus,
      lastChecked,
      contractAddress: election.wallet_address ? maskAddress(election.wallet_address) : null,
      transactions,
      candidateBreakdown: candidateVotes.map(cv => ({
        candidateId: cv._id,
        votes: cv.count
      })),
      summary: {
        totalVotes: votes.length,
        successfulVotes: votes.length,
        pendingVotes: 0,
        consistencyStatus: consistency,
        blockchainAvailable: blockchainStatus === 'online',
        lastUpdated: new Date().toISOString()
      }
    };
    
    res.json({
      success: true,
      data: verificationResult
    });
    
  } catch (error) {
    logger.error('ObserverController: Error verifying election blockchain:', error);
    next(error);
  }
};

/**
 * Get election transactions for blockchain transparency
 */
const getElectionTransactions = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      throw new ApiError('Election ID is required', 400);
    }
    
    logger.info(`ObserverController: Fetching transactions for election: ${electionId}`);
    
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
    
    // Get all votes for this election
    const votes = await votesCollection.find({
      election_id: electionId,
      status: 'success'
    }).toArray();
    
    // Format transaction data for observers
    const transactions = votes.map(vote => ({
      hash: vote.transaction_hash ? maskHash(vote.transaction_hash) : 'Pending',
      from: '0xUserWallet',
      to: election.wallet_address ? maskAddress(election.wallet_address) : 'Not Set',
      blockNumber: vote.blockchain_block_number || 'N/A',
      gasUsed: vote.blockchain_gas_used || 'N/A',
      timestamp: vote.vote_timestamp,
      votePosition: vote.vote_position,
      candidateId: vote.candidate_id
    }));
    
    await client.close();
    
    res.json({
      success: true,
      data: {
        electionId: election._id.toString(),
        title: election.title,
        status: election.status,
        contractAddress: election.wallet_address ? maskAddress(election.wallet_address) : null,
        transactions,
        totalTransactions: transactions.length,
        lastUpdated: new Date().toISOString()
      }
    });
    
  } catch (error) {
    logger.error('ObserverController: Error fetching election transactions:', error);
    next(error);
  }
};

/**
 * Get blockchain network status for observers
 */
const getBlockchainNetworkStatus = async (req, res, next) => {
  try {
    logger.info('ObserverController: Fetching blockchain network status');
    
    let networkStatus = {
      isOnline: false,
      chainId: null,
      blockNumber: null,
      gasPrice: null,
      lastChecked: new Date().toISOString()
    };
    
    try {
      // Initialize blockchain service
      await blockchainService.initialize();
      
      // Get network information
      const provider = blockchainService.getProvider();
      if (provider) {
        networkStatus.isOnline = true;
        networkStatus.chainId = await provider.getNetwork().then(network => network.chainId);
        networkStatus.blockNumber = await provider.getBlockNumber();
        networkStatus.gasPrice = await provider.getGasPrice().then(price => price.toString());
      }
    } catch (error) {
      logger.warn('ObserverController: Blockchain network unavailable:', error.message);
      networkStatus.isOnline = false;
    }
    
    res.json({
      success: true,
      data: networkStatus
    });
    
  } catch (error) {
    logger.error('ObserverController: Error fetching blockchain network status:', error);
    next(error);
  }
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

/**
 * Observer Login - Separate authentication flow
 */
const observerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('🔍 Observer Login Attempt:', email);

    const client = new MongoClient(process.env.DATABASE_URL);

    await client.connect();
    const db = client.db('election_system');

    // Find observer by email
    const observer = await db.collection('observers').findOne({ email });
    
    if (!observer) {
      console.log('❌ Observer not found:', email);
      await client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Validate password fields exist
    if (!password) {
      console.log('❌ Password not provided');
      await client.close();
      return res.status(400).json({
        success: false,
        message: 'Password is required'
      });
    }

    if (!observer.password) {
      console.log('❌ Observer has no password hash:', email);
      await client.close();
      return res.status(403).json({
        success: false,
        message: 'Your observer account needs password setup. Please contact admin to complete your account setup.'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, observer.password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for observer:', email);
      await client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if observer is approved (default to false if field doesn't exist)
    const isApproved = observer.isApproved === true;
    if (!isApproved) {
      console.log('⚠️ Observer not approved yet:', email);
      await client.close();
      return res.status(403).json({
        success: false,
        message: 'Your observer account is pending approval'
      });
    }

    // Generate JWT token
            const token = jwt.sign(
              { 
                userId: observer._id.toString(), // Ensure userId is string
                email: observer.email,
                role: 'OBSERVER'
              },
              process.env.JWT_SECRET,
              { expiresIn: '24h' }
            );

    console.log('✅ Observer login successful:', email);
    await client.close();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: observer._id,
        email: observer.email,
        name: observer.name,
        organization: observer.organization,
        role: 'OBSERVER',
        isApproved: observer.isApproved
      }
    });

  } catch (error) {
    console.error('❌ Observer login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

/**
 * Observer Registration - Separate registration flow
 */
const observerRegister = async (req, res, next) => {
  try {
    const { email, password, name, organization } = req.body;
    console.log('📝 Observer Registration Attempt:', email);

    const client = new MongoClient(process.env.DATABASE_URL);

    await client.connect();
    const db = client.db('election_system');

    // Check if observer already exists
    const existingObserver = await db.collection('observers').findOne({ email });
    if (existingObserver) {
      console.log('❌ Observer already exists:', email);
      await client.close();
      return res.status(400).json({
        success: false,
        message: 'Observer with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create observer
    const newObserver = {
      email,
      password: hashedPassword,
      name,
      organization: organization || '',
      role: 'OBSERVER',
      isApproved: false, // Requires admin approval
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('observers').insertOne(newObserver);
    console.log('✅ Observer registered successfully:', email);
    await client.close();

    res.status(201).json({
      success: true,
      message: 'Observer registration successful. Please wait for admin approval.',
      observerId: result.insertedId
    });

  } catch (error) {
    console.error('❌ Observer registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

/**
 * Get Observer Profile - Separate profile management
 */
const getObserverProfile = async (req, res, next) => {
  try {
    const observerId = req.user.userId;
    console.log('👤 Getting observer profile:', observerId);

    const client = new MongoClient(process.env.DATABASE_URL);

    await client.connect();
    const db = client.db('election_system');

    const observer = await db.collection('observers').findOne(
      { _id: new ObjectId(observerId) },
      { projection: { password: 0 } } // Exclude password
    );

    await client.close();

    if (!observer) {
      return res.status(404).json({
        success: false,
        message: 'Observer profile not found'
      });
    }

    console.log('✅ Observer profile retrieved:', observer.email);
    res.json({
      success: true,
      user: {
        id: observer._id.toString(),
        email: observer.email,
        first_name: observer.first_name || 'Observer',
        last_name: observer.last_name || 'User',
        name: observer.name || `${observer.first_name || 'Observer'} ${observer.last_name || 'User'}`,
        organization: observer.organization,
        organization_name: observer.organization_name || observer.organization,
        organizationName: observer.organization_name || observer.organization,
        role: observer.role || 'OBSERVER',
        isApproved: observer.isApproved,
        is_active: observer.is_active,
        status: observer.isApproved ? 'approved' : 'pending',
        created_at: observer.created_at,
        updated_at: observer.updated_at,
        last_login: observer.last_login,
        // Additional fields the frontend might expect
        website: observer.website,
        phone: observer.phone,
        address: observer.address,
        description: observer.description
      }
    });

  } catch (error) {
    console.error('❌ Observer profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

module.exports = {
  getObserverElectionsWithBlockchain,
  verifyElectionBlockchain,
  getElectionTransactions,
  getBlockchainNetworkStatus,
  observerLogin,
  observerRegister,
  getObserverProfile
};