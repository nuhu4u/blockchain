require('dotenv').config();
const { MongoClient } = require('mongodb');
const { ethers } = require('ethers');
const blockchainService = require('../blockchain/services/blockchainService');
const { ApiError } = require('../utils/apiError');

/**
 * Shared election creation service with mandatory blockchain deployment
 * This ensures ALL elections have a deployed smart contract
 */
class ElectionService {
  /**
   * Create election with mandatory blockchain deployment
   * @param {Object} electionData - Election configuration
   * @param {string} createdBy - User ID who created the election
   * @returns {Promise<Object>} Created election with contract_address
   */
  static async createElectionWithContract(electionData, createdBy) {
    const {
      title,
      description = '',
      start_date,
      end_date,
      election_type,
      state_id = null,
      lga_id = null,
      ward_id = null,
      polling_unit_id = null,
      status = 'ONGOING',
      contestants = []
    } = electionData;

    // 1. Validate payload
    console.log('✅ Admin Create: Payload validated');
    
    if (!title || !election_type || !start_date || !end_date) {
      throw new ApiError('Missing required fields: title, election_type, start_date, end_date', 400);
    }

    // Validate contestants
    if (!contestants || !Array.isArray(contestants) || contestants.length === 0) {
      throw new ApiError('At least one contestant is required', 400);
    }

    for (const contestant of contestants) {
      if (!contestant.name || (!contestant.running_mate && !contestant.runningMate)) {
        throw new ApiError('Each contestant must have both name and running mate', 400);
      }
    }

    // 2. Environment validation (HARD STOP)
    const adminWalletAddress = process.env.ADMIN_WALLET_ADDRESS;
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    const rpcUrl = process.env.BLOCKCHAIN_RPC_URL;

    if (!adminWalletAddress || !adminPrivateKey || !rpcUrl) {
      console.log('❌ Admin Create: Env invalid');
      throw new ApiError('Blockchain configuration missing. Check ADMIN_WALLET_ADDRESS, ADMIN_PRIVATE_KEY, and BLOCKCHAIN_RPC_URL in .env', 503);
    }

    // Log environment details (masked for security)
    let maskedRpc = rpcUrl;
    try {
      const url = new URL(rpcUrl);
      maskedRpc = `${url.protocol}//${url.hostname}`;
    } catch (e) {
      maskedRpc = rpcUrl.replace(/:\/\/.*@/, '://***@');
    }
    const maskedWallet = adminWalletAddress.slice(-4);
    console.log(`✅ Admin Create: RPC=${maskedRpc} chainId=checking...`);

    // 3. Validate provider and get chain ID
    let provider;
    let chainId;
    try {
      provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const network = await provider.getNetwork();
      chainId = network.chainId;
      console.log(`✅ Admin Create: RPC=${maskedRpc} chainId=${chainId}`);
      
      if (chainId !== 31337) {
        console.log(`❌ Admin Create: Invalid chainId ${chainId}, expected 31337`);
        throw new ApiError(`Invalid blockchain network. Expected chainId 31337, got ${chainId}`, 503);
      }
    } catch (error) {
      console.log('❌ Admin Create: Env invalid');
      throw new ApiError(`Blockchain provider error: ${error.message}`, 503);
    }

    // 4. Deploy contract (MANDATORY)
    console.log('✅ Admin Create: Deployment started');
    
    let contractAddress;
    try {
      // Validate that we have a valid RPC URL before attempting deployment
      if (!rpcUrl || rpcUrl.trim() === '') {
        throw new Error('BLOCKCHAIN_RPC_URL is not configured');
      }
      // Check if Hardhat is available
      const isHardhatAvailable = await blockchainService.initialize();
      if (!isHardhatAvailable) {
        throw new ApiError('Blockchain unavailable. Please start Hardhat and try again.', 503);
      }

      // Prepare election data for contract deployment
      const contractElectionData = {
        title,
        description,
        start_date,
        end_date,
        election_type,
        contestants: contestants.map((contestant, index) => ({
          name: contestant.name,
          party: contestant.party || 'Independent',
          running_mate: contestant.running_mate || contestant.runningMate || 'No running mate'
        }))
      };

      // Deploy the contract
      contractAddress = await blockchainService.deployElectionContract(contractElectionData);
      
      // Validate contract address was returned
      if (!contractAddress || contractAddress.trim() === '') {
        throw new Error('Contract deployment failed - no address returned');
      }
      
      console.log(`✅ Admin Create: Deployed at ${contractAddress}`);
      
    } catch (deploymentError) {
      console.log('❌ Admin Create: Deployment failed');
      console.error('Deployment error details:', deploymentError);
      
      if (deploymentError.message.includes('Hardhat is unavailable') || 
          deploymentError.message.includes('ECONNREFUSED') ||
          deploymentError.message.includes('Cannot connect to Hardhat')) {
        throw new ApiError('Blockchain unavailable. Please start Hardhat and try again.', 503);
      }
      throw new ApiError(`Election contract could not be deployed: ${deploymentError.message}`, 500);
    }

    // 5. Insert election with contract_address (ATOMIC)
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Convert dates to Date objects
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      // Validate dates
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new ApiError('Invalid date format', 400);
      }

      if (startDate >= endDate) {
        throw new ApiError('End date must be after start date', 400);
      }

      // Validate contract address before creating election document
      if (!contractAddress || contractAddress.trim() === '') {
        throw new ApiError('Cannot create election without valid contract address', 500);
      }
      
      // Create election document with contract_address
      const electionDoc = {
        title,
        description,
        election_type,
        start_date: startDate,
        end_date: endDate,
        status,
        state_id,
        lga_id,
        ward_id,
        polling_unit_id,
        created_by: createdBy,
        contract_address: contractAddress, // MANDATORY: Contract address from deployment
        total_votes: 0,
        contestants: contestants.map((contestant, index) => {
          // Determine party picture based on party name
          let partyPicture = '/party-logos/placeholder-user.jpg';
          
          if (contestant.party) {
            const partyLower = contestant.party.toLowerCase();
            if (partyLower.includes('apc')) {
              partyPicture = '/party-logos/apc.webp';
            } else if (partyLower.includes('pdp')) {
              partyPicture = '/party-logos/pdp.webp';
            } else if (partyLower.includes('labour')) {
              partyPicture = '/party-logos/labour-party.jpg';
            } else if (partyLower.includes('nnpp')) {
              partyPicture = '/party-logos/nnpp.jpg';
            }
          }
          
          // CRITICAL FIX: Store contestant ID as string, not ObjectId
          const contestantId = new (require('mongodb').ObjectId)().toString();
          
          return {
            id: contestantId, // Store as string
            name: contestant.name,
            running_mate: contestant.running_mate || contestant.runningMate,
            party: contestant.party || 'Independent',
            position: contestant.position || index + 1,
            votes: 0,
            partyPicture: partyPicture,
            age: contestant.age || 50,
            qualification: contestant.qualification || 'Political candidate with extensive experience',
            manifesto: contestant.manifesto || 'Committed to serving the people',
            experience: contestant.experience || 'Experienced political leader',
            education: contestant.education || 'University graduate'
          };
        }),
        states: electionData.states || [],
        lgas: electionData.lgas || [],
        created_at: new Date(),
        updated_at: new Date()
      };

      // Insert election into database
      const result = await db.collection('elections').insertOne(electionDoc);
      console.log(`✅ Election Created: Contestant IDs stored as strings`);

      // Register all existing users in the new election
      console.log(`🔍 Registering all existing users in new election...`);
      const voterRegistrationService = require('./voterRegistrationService');
      await voterRegistrationService.initialize();
      
      const registrationResult = await voterRegistrationService.registerAllUsersInElection(
        result.insertedId.toString(),
        contractAddress
      );

      if (!registrationResult.success) {
        // If registration fails, we must delete the election and fail the creation
        console.log(`❌ Registration Error: Failed to register users in election ${result.insertedId}`);
        console.log(`📊 Registration Summary: ${registrationResult.successCount} success, ${registrationResult.failureCount} failed`);
        
        // Delete the election since registration failed
        await db.collection('elections').deleteOne({ _id: result.insertedId });
        console.log(`🗑️ Election deleted due to registration failure`);
        
        throw new ApiError(`Election creation failed: Could not register all users. ${registrationResult.failureCount} users failed to register.`, 500);
      } else {
        console.log(`✅ All users successfully registered in election ${result.insertedId}`);
      }

      // Return the created election
      const createdElection = await db.collection('elections').findOne({ _id: result.insertedId });
      
      return {
        success: true,
        election: createdElection,
        message: 'Election created successfully with blockchain contract',
        registration: registrationResult
      };

    } catch (dbError) {
      console.error('❌ Admin Create: Database error:', dbError);
      throw new ApiError(`Failed to create election: ${dbError.message}`, 500);
    } finally {
      await client.close();
    }
  }
}

module.exports = ElectionService;
