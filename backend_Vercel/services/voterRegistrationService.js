/**
 * Voter Registration Service
 * 
 * This service handles on-chain voter registration for all elections.
 * Ensures every user is registered in every active election contract.
 */

const { MongoClient, ObjectId } = require('mongodb');
const { ethers } = require('ethers');
const blockchainService = require('../blockchain/services/blockchainService');
const walletFundingService = require('./walletFundingService');

class VoterRegistrationService {
  constructor() {
    this.provider = null;
    this.adminWallet = null;
  }

  /**
   * Initialize the service
   */
  async initialize() {
    try {
      // Initialize blockchain provider
      this.provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
      await this.provider.getNetwork();
      console.log('✅ Voter Registration: Provider initialized');

      // Initialize admin wallet
      const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
      if (!adminPrivateKey) {
        throw new Error('ADMIN_PRIVATE_KEY not found in environment variables');
      }

      this.adminWallet = new ethers.Wallet(adminPrivateKey, this.provider);
      console.log('✅ Voter Registration: Admin wallet initialized');

      return true;
    } catch (error) {
      console.error('❌ Voter Registration: Initialization failed:', error.message);
      return false;
    }
  }

  /**
   * Register a single voter in a specific election contract
   */
  async registerVoterInElection(voterAddress, electionId, contractAddress) {
    try {
      if (!this.adminWallet) {
        await this.initialize();
      }

      // Create contract instance
      const contractABI = [
        'function registerVoter(address _voter) external'
      ];
      
      const contract = new ethers.Contract(contractAddress, contractABI, this.adminWallet);

      // Register the voter
      console.log(`👤 Registering voter ${voterAddress} in election ${electionId}...`);
      const registerTx = await contract.registerVoter(voterAddress);
      
      // Wait for confirmation
      const receipt = await registerTx.wait();
      
      if (receipt.status === 1) {
        console.log(`✅ Voter Registered: ${voterAddress} in election ${electionId}`);
        return {
          success: true,
          transactionHash: registerTx.hash,
          electionId: electionId,
          voterAddress: voterAddress
        };
      } else {
        console.log(`❌ Registration Failed: ${voterAddress} in election ${electionId} - Transaction reverted`);
        return {
          success: false,
          error: 'Transaction reverted',
          electionId: electionId,
          voterAddress: voterAddress
        };
      }

    } catch (error) {
      // Check if the error is "Voter already registered" - this is actually success
      if (error.message.includes('Voter already registered') || 
          (error.error && error.error.message && error.error.message.includes('Voter already registered'))) {
        console.log(`✅ Voter Already Registered: ${voterAddress} in election ${electionId}`);
        return {
          success: true,
          transactionHash: 'already-registered',
          electionId: electionId,
          voterAddress: voterAddress,
          alreadyRegistered: true
        };
      }
      
      console.log(`❌ Registration Failed: ${voterAddress} in election ${electionId} - ${error.message}`);
      return {
        success: false,
        error: error.message,
        electionId: electionId,
        voterAddress: voterAddress
      };
    }
  }

  /**
   * Register all existing users in a new election
   */
  async registerAllUsersInElection(electionId, contractAddress) {
    try {
      // Verify blockchain provider is available
      if (!this.provider) {
        await this.initialize();
      }

      // Test blockchain connection
      try {
        await this.provider.getNetwork();
        console.log('✅ Blockchain provider verified');
      } catch (providerError) {
        console.log('❌ Blockchain provider unavailable:', providerError.message);
        throw new Error(`Blockchain provider unavailable: ${providerError.message}`);
      }

      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');

      console.log(`🔍 Fetching all users for election ${electionId}...`);

      // Get all users with wallets
      const users = await db.collection('users').find({
        wallet_address: { $exists: true, $ne: null },
        role: 'VOTER'
      }).toArray();

      console.log(`📊 Found ${users.length} users to register in election ${electionId}`);

      // If no users, still return success
      if (users.length === 0) {
        console.log('✅ No users to register - election creation can proceed');
        await client.close();
        return {
          success: true,
          totalUsers: 0,
          successCount: 0,
          failureCount: 0,
          failures: []
        };
      }

      let successCount = 0;
      let failureCount = 0;
      const failures = [];

      // Register each user
      for (const user of users) {
        const result = await this.registerVoterInElection(
          user.wallet_address, 
          electionId, 
          contractAddress
        );

        if (result.success) {
          successCount++;
        } else {
          failureCount++;
          failures.push({
            email: user.email,
            wallet: user.wallet_address,
            error: result.error
          });
        }
      }

      // Log summary
      console.log(`📊 Registration Summary: ${successCount} success, ${failureCount} failed`);

      if (failures.length > 0) {
        console.log('❌ Failed registrations:');
        failures.forEach(failure => {
          console.log(`  - ${failure.email} (${failure.wallet}): ${failure.error}`);
        });
      }

      await client.close();

      return {
        success: failureCount === 0,
        totalUsers: users.length,
        successCount,
        failureCount,
        failures
      };

    } catch (error) {
      console.error('❌ Registration Error: Failed to register all users:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Register a new user in all active elections
   */
  async registerNewUserInAllElections(voterAddress) {
    try {
      // Verify blockchain provider is available
      if (!this.provider) {
        await this.initialize();
      }

      // Test blockchain connection
      try {
        await this.provider.getNetwork();
        console.log('✅ Blockchain provider verified');
      } catch (providerError) {
        console.log('❌ Blockchain provider unavailable:', providerError.message);
        throw new Error(`Blockchain provider unavailable: ${providerError.message}`);
      }

      const client = new MongoClient(process.env.DATABASE_URL);
      await client.connect();
      const db = client.db('election_system');

      console.log(`🔍 Fetching active elections for new user ${voterAddress}...`);

      // Get all active elections
      const elections = await db.collection('elections').find({
        status: 'ONGOING',
        contract_address: { $exists: true, $ne: null }
      }).toArray();

      console.log(`📊 Found ${elections.length} active elections for new user registration`);

      // If no active elections, still return success
      if (elections.length === 0) {
        console.log('✅ No active elections - user registration can proceed');
        await client.close();
        return {
          success: true,
          totalElections: 0,
          successCount: 0,
          failureCount: 0,
          failures: []
        };
      }

      let successCount = 0;
      let failureCount = 0;
      const failures = [];

      // Register user in each active election
      for (const election of elections) {
        const result = await this.registerVoterInElection(
          voterAddress,
          election._id.toString(),
          election.contract_address
        );

        if (result.success) {
          successCount++;
        } else {
          failureCount++;
          failures.push({
            electionId: election._id.toString(),
            electionTitle: election.title,
            error: result.error
          });
        }
      }

      // Log summary
      console.log(`📊 New User Registration Summary: ${successCount} success, ${failureCount} failed`);

      if (failures.length > 0) {
        console.log('❌ Failed registrations:');
        failures.forEach(failure => {
          console.log(`  - Election ${failure.electionId} (${failure.electionTitle}): ${failure.error}`);
        });
      }

      await client.close();

      return {
        success: failureCount === 0,
        totalElections: elections.length,
        successCount,
        failureCount,
        failures
      };

    } catch (error) {
      console.error('❌ Registration Error: Failed to register new user in all elections:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Verify wallet funding before registration
   */
  async verifyWalletFunding(voterAddress) {
    try {
      await walletFundingService.initialize();
      const balanceCheck = await walletFundingService.checkWalletBalance(voterAddress);
      
      if (!balanceCheck.isFunded) {
        console.log(`❌ Funding Error: Wallet ${voterAddress} balance too low: ${balanceCheck.balanceEth} ETH < ${ethers.utils.formatEther(balanceCheck.threshold)} ETH`);
        return {
          success: false,
          error: `Wallet ${voterAddress} balance too low: ${balanceCheck.balanceEth} ETH`
        };
      }

      console.log(`✅ Wallet Funded: 10 ETH → ${voterAddress}`);
      return {
        success: true,
        balance: balanceCheck.balanceEth
      };

    } catch (error) {
      console.error(`❌ Funding Error: Failed to verify wallet funding for ${voterAddress}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Complete user registration with funding and election registration
   */
  async completeUserRegistration(voterAddress) {
    try {
      // Step 1: Verify wallet funding
      const fundingCheck = await this.verifyWalletFunding(voterAddress);
      if (!fundingCheck.success) {
        return {
          success: false,
          error: fundingCheck.error,
          step: 'funding'
        };
      }

      // Step 2: Register in all active elections
      const registrationResult = await this.registerNewUserInAllElections(voterAddress);
      if (!registrationResult.success) {
        return {
          success: false,
          error: `Registration failed in ${registrationResult.failureCount} elections`,
          step: 'registration',
          details: registrationResult
        };
      }

      console.log(`✅ New User Registered: ${voterAddress} in ${registrationResult.successCount} elections`);
      return {
        success: true,
        funding: fundingCheck,
        registration: registrationResult
      };

    } catch (error) {
      console.error(`❌ Registration Error: Failed to complete user registration for ${voterAddress}:`, error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      providerConnected: !!this.provider,
      adminWalletAddress: this.adminWallet?.address,
      initialized: !!this.adminWallet
    };
  }
}

// Create singleton instance
const voterRegistrationService = new VoterRegistrationService();

module.exports = voterRegistrationService;
