const { ApiError } = require('../utils/apiError');
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');
const blockchainService = require('../blockchain/services/blockchainService');
const ElectionService = require('../services/electionService');
const { ethers } = require('ethers');
const { countVerifiedVoters } = require('../utils/voterUtils');

/**
 * Helper function to recalculate vote counts for an election
 */
async function recalculateElectionVoteCounts(db, electionId) {
  try {
    const electionsCollection = db.collection('elections');
    const votesCollection = db.collection('votes');
    
    // Get the election
    const election = await electionsCollection.findOne({ 
      _id: new ObjectId(electionId) 
    });

    if (!election) {
      console.log('❌ Election not found for vote count recalculation');
      return;
    }

    // Get all votes for this election - try both string and ObjectId formats
    const votes = await votesCollection.find({ 
      $or: [
        { election_id: electionId },
        { election_id: new ObjectId(electionId) }
      ],
      status: 'success' // Only count successful votes
    }).toArray();
    
    console.log(`📊 Found ${votes.length} votes for election ${electionId}`);

    // Count votes per candidate
    const voteCounts = {};
    votes.forEach(vote => {
      const candidateId = vote.candidate_id.toString();
      voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
      console.log(`  Vote for candidate ${candidateId}: ${voteCounts[candidateId]}`);
    });
    
    console.log('📊 Vote counts:', voteCounts);

    // Update contestants array with correct vote counts
    const updatedContestants = election.contestants.map(contestant => {
      const contestantId = contestant.id.toString();
      const voteCount = voteCounts[contestantId] || 0;
      
      console.log(`  Contestant ${contestant.name} (${contestantId}): ${voteCount} votes`);
      
      return {
        ...contestant,
        votes: voteCount
      };
    });

    // Calculate total votes
    const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);
    
    console.log(`📊 Total votes calculated: ${totalVotes}`);

    // Update election with recalculated counts
    const updateResult = await electionsCollection.updateOne(
      { _id: new ObjectId(electionId) },
      { 
        $set: { 
          contestants: updatedContestants,
          total_votes: totalVotes
        }
      }
    );
    
    console.log(`✅ Vote counts recalculated for election ${electionId}: ${totalVotes} total votes`);
    console.log(`✅ Update result: ${updateResult.modifiedCount} documents modified`);

  } catch (error) {
    console.error('❌ Error recalculating vote counts:', error);
  }
}

/**
 * Create a new election
 */
const createElection = async (req, res, next) => {
  try {
    const {
      title,
      description,
      start_date,
      end_date,
      election_type,
      state_id,
      lga_id,
      ward_id,
      polling_unit_id,
      status = 'UPCOMING',
      candidates = []
    } = req.body;

    // Use shared election service with mandatory blockchain deployment
    const result = await ElectionService.createElectionWithContract({
      title,
      description,
      start_date,
      end_date,
      election_type,
      state_id,
      lga_id,
      ward_id,
      polling_unit_id,
      status,
      contestants: candidates
    }, req.user.id);

    res.status(201).json({
      success: result.success,
      data: result.election,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all elections with filtering and pagination
 */
const getElections = async (req, res, next) => {
  try {
    console.log('📊 getElections: Starting request');

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      console.log('📊 getElections: Connecting to database');
      await client.connect();
      const db = client.db('election_system');
      
      console.log('📊 getElections: Getting elections');
      // Get all elections without any filtering for now
      const elections = await db.collection('elections')
        .find({})
        .sort({ created_at: -1 })
        .toArray();
      
      console.log(`📊 getElections: Found ${elections.length} elections`);

      // Recalculate vote counts for each election to ensure fresh data
      console.log('📊 getElections: Recalculating vote counts for fresh data');
      for (const election of elections) {
        try {
          await recalculateElectionVoteCounts(db, election._id.toString());
          console.log(`✅ Recalculated votes for election: ${election.title}`);
        } catch (error) {
          console.error(`❌ Failed to recalculate votes for election ${election._id}:`, error.message);
        }
      }

      // Fetch updated elections with fresh vote counts
      const updatedElections = await db.collection('elections')
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      console.log('📊 getElections: Returning elections with fresh vote counts');

      // Return election data with snake_case fields for frontend compatibility
      const electionsWithVotes = updatedElections.map(election => ({
        _id: election._id.toString(),  // Keep original _id
        id: election._id.toString(),   // Add id alias for frontend convenience
        title: election.title,
        description: election.description,
        election_type: election.election_type,
        start_date: election.start_date,
        end_date: election.end_date,
        status: election.status,
        state_id: election.state_id,
        lga_id: election.lga_id,
        ward_id: election.ward_id,
        polling_unit_id: election.polling_unit_id,
        created_by: election.created_by,
        created_at: election.created_at,
        updated_at: election.updated_at,
        contract_address: election.contract_address || null,  // Include contract address
        total_votes: election.total_votes || 0,  // snake_case for frontend
        votesCast: election.total_votes || 0,
        contestants: (election.contestants || []).map(contestant => ({
          id: contestant.id,
          name: contestant.name,
          party: contestant.party,
          party_acronym: contestant.party_acronym,
          picture: contestant.picture,
          position: contestant.position,
          votes: contestant.votes || 0  // snake_case for frontend
        })),
        electionStats: {
          totalRegisteredVoters: 0,
          totalVotesCast: election.total_votes || 0,
          nonVoters: 0,
          electionTurnoutPercentage: 0
        },
        computed_at: new Date().toISOString(),
        source: 'recalculated'
      }));

      console.log('📊 getElections: Returning elections data');

      // Set cache control headers to prevent caching
      res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      
      res.json({
        success: true,
        data: electionsWithVotes,
        pagination: {
          total: elections.length,
          page: 1,
          limit: elections.length,
          totalPages: 1
        }
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('❌ getElections error:', error);
    next(error);
  }
};

/**
 * Get a single election by ID
 */
const getElectionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      
      const election = await db.collection('elections').findOne({ _id: new ObjectId(id) });

      if (!election) {
        throw new ApiError('Election not found', 404);
      }

      // Convert MongoDB _id to string and ensure both _id and id are present
      const electionData = {
        ...election,
        _id: election._id.toString(),  // Keep original _id
        id: election._id.toString(),   // Add id alias for frontend convenience
        contract_address: election.contract_address || null,  // Ensure contract_address is included
        contestants: (election.contestants || []).map(contestant => ({
          id: contestant.id,
          name: contestant.name,
          party: contestant.party,
          party_acronym: contestant.party_acronym,
          picture: contestant.picture,
          position: contestant.position,
          votes: contestant.votes || 0
        }))
      };

      res.json({
        success: true,
        data: electionData
      });
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Update an election
 */
const updateElection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      start_date,
      end_date,
      status,
      state_id,
      lga_id,
      ward_id,
      polling_unit_id
    } = req.body;

    // Check if election exists
    const existingElection = await prisma.election.findUnique({
      where: { id }
    });

    if (!existingElection) {
      throw new ApiError('Election not found', 404);
    }

    // Prevent updating certain fields if election is in progress or completed
    if (existingElection.status !== 'UPCOMING') {
      if (status && status !== existingElection.status) {
        throw new ApiError('Cannot change status of an ongoing or completed election', 400);
      }
      
      if (start_date && new Date(start_date).getTime() !== existingElection.start_date.getTime()) {
        throw new ApiError('Cannot change start date of an ongoing or completed election', 400);
      }
    }

    // Prepare update data
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (start_date) updateData.start_date = new Date(start_date);
    if (end_date) updateData.end_date = new Date(end_date);
    if (status) updateData.status = status;
    if (state_id !== undefined) updateData.state_id = state_id || null;
    if (lga_id !== undefined) updateData.lga_id = lga_id || null;
    if (ward_id !== undefined) updateData.ward_id = ward_id || null;
    if (polling_unit_id !== undefined) updateData.polling_unit_id = polling_unit_id || null;

    // Update the election using MongoDB native driver to avoid Prisma transaction issues
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      const electionsCollection = db.collection('elections');
      
      // Add updated_at timestamp
      updateData.updated_at = new Date();
      
      const updateResult = await electionsCollection.updateOne(
        { _id: id },
        { $set: updateData }
      );
      
      if (updateResult.matchedCount === 0) {
        throw new ApiError('Election not found', 404);
      }
      
      await client.close();
      
      // Fetch the updated election data with relations using Prisma (read-only operations are safe)
      const updatedElection = await prisma.election.findUnique({
        where: { id },
        include: {
          state: true,
          lga: true,
          ward: true,
          pollingUnit: true,
          candidates: {
            include: {
              user: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true
                }
              },
              party: true
            }
          }
        }
      });
    } catch (mongoError) {
      await client.close();
      throw new ApiError('Failed to update election', 500);
    }

    res.json({
      success: true,
      data: updatedElection,
      message: 'Election updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete an election and ALL related data A-Z
 */
const deleteElection = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      
      // Check if election exists
      const existingElection = await db.collection('elections').findOne({ 
        _id: new ObjectId(id) 
      });

      if (!existingElection) {
        throw new ApiError('Election not found', 404);
      }

      console.log(`🗑️ COMPLETE DELETION: ${existingElection.title} (${existingElection.status})`);
      
      // COMPREHENSIVE CASCADING DELETE OPERATIONS
      const deletionResults = {
        election: 0,
        candidates: 0,
        votes: 0,
        userVoteHistory: 0,
        observerRecords: 0,
        adminLogs: 0,
        otherReferences: 0
      };
      
      // 1. Delete all candidates for this election
      const candidateDeleteResult = await db.collection('candidates').deleteMany({ 
        election_id: new ObjectId(id) 
      });
      deletionResults.candidates = candidateDeleteResult.deletedCount;
      console.log(`✅ Deleted ${candidateDeleteResult.deletedCount} candidates`);

      // 2. Delete all votes for this election (both string and ObjectId formats)
      const voteDeleteResult = await db.collection('votes').deleteMany({ 
        $or: [
          { election_id: id.toString() },
          { election_id: new ObjectId(id) }
        ]
      });
      deletionResults.votes = voteDeleteResult.deletedCount;
      console.log(`✅ Deleted ${voteDeleteResult.deletedCount} votes`);

      // 3. Clean up user vote history (remove election references from user documents)
      const userVoteHistoryResult = await db.collection('users').updateMany(
        { 'vote_history.election_id': id.toString() },
        { $pull: { vote_history: { election_id: id.toString() } } }
      );
      deletionResults.userVoteHistory = userVoteHistoryResult.modifiedCount;
      console.log(`✅ Updated ${userVoteHistoryResult.modifiedCount} user vote histories`);

      // 4. Clean up observer records
      const observerRecordsResult = await db.collection('observers').updateMany(
        { 'assigned_elections': id.toString() },
        { $pull: { assigned_elections: id.toString() } }
      );
      deletionResults.observerRecords = observerRecordsResult.modifiedCount;
      console.log(`✅ Updated ${observerRecordsResult.modifiedCount} observer records`);

      // 5. Clean up admin logs (if they exist)
      const adminLogsResult = await db.collection('admin_logs').deleteMany({
        'election_id': id.toString()
      });
      deletionResults.adminLogs = adminLogsResult.deletedCount;
      console.log(`✅ Deleted ${adminLogsResult.deletedCount} admin log entries`);

      // 6. Clean up any other collections that might reference this election
      const collections = await db.listCollections().toArray();
      let otherReferencesDeleted = 0;
      
      for (const collection of collections) {
        const collectionName = collection.name;
        if (['elections', 'votes', 'users', 'observers', 'admin_logs'].includes(collectionName)) continue;
        
        try {
          // Check for documents with election_id field
          const electionRefs = await db.collection(collectionName).find({
            $or: [
              { election_id: id.toString() },
              { election_id: new ObjectId(id) },
              { 'election.id': id.toString() },
              { 'election._id': new ObjectId(id) }
            ]
          }).toArray();
          
          if (electionRefs.length > 0) {
            const deleteResult = await db.collection(collectionName).deleteMany({
              $or: [
                { election_id: id.toString() },
                { election_id: new ObjectId(id) },
                { 'election.id': id.toString() },
                { 'election._id': new ObjectId(id) }
              ]
            });
            otherReferencesDeleted += deleteResult.deletedCount;
            console.log(`✅ Deleted ${deleteResult.deletedCount} references from ${collectionName}`);
          }
        } catch (error) {
          console.log(`⚠️  Error cleaning ${collectionName}: ${error.message}`);
        }
      }
      deletionResults.otherReferences = otherReferencesDeleted;

      // 7. Finally, delete the election itself
      const electionDeleteResult = await db.collection('elections').deleteOne({ 
        _id: new ObjectId(id) 
      });
      
      if (electionDeleteResult.deletedCount === 0) {
        throw new ApiError('Election not found', 404);
      }
      
      deletionResults.election = 1;
      console.log(`✅ Deleted election: ${existingElection.title}`);
      
      await client.close();
      
      console.log(`\n🎯 COMPLETE DELETION SUMMARY:`);
      console.log(`  Election: ${deletionResults.election}`);
      console.log(`  Candidates: ${deletionResults.candidates}`);
      console.log(`  Votes: ${deletionResults.votes}`);
      console.log(`  User Vote Histories: ${deletionResults.userVoteHistory}`);
      console.log(`  Observer Records: ${deletionResults.observerRecords}`);
      console.log(`  Admin Logs: ${deletionResults.adminLogs}`);
      console.log(`  Other References: ${deletionResults.otherReferences}`);
      
    } catch (mongoError) {
      await client.close();
      throw new ApiError('Failed to delete election', 500);
    }

    res.json({
      success: true,
      message: 'Election and ALL related data deleted successfully (A-Z)',
      deleted: deletionResults
    });
  } catch (error) {
    next(error);
  }
};

// addCandidate function removed - candidates are now stored within elections collection



// updateCandidateStatus function removed - candidates are now stored within elections collection



// removeCandidate function removed - candidates are now stored within elections collection



// getElectionCandidates function removed - candidates are now stored within elections collection

/**
 * Get election results
 */
const getElectionResults = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Results Request: Starting aggregation for election ${id}`);

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      console.log(`❌ Results Error: Invalid election ID ${id}`);
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      console.log(`✅ Results: Database connected for election ${id}`);
      
      // Get election details
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(id) 
      });

      if (!election) {
        console.log(`❌ Results Error: Election ${id} not found`);
        throw new ApiError('Election not found', 404);
      }

      console.log(`✅ Results: Found election "${election.title}" (${election.status})`);

      // Get vote counts for each candidate - support both string and ObjectId election_id formats
      const voteCounts = await db.collection('votes').aggregate([
        {
          $match: {
            $or: [
              { election_id: id },
              { election_id: new ObjectId(id) }
            ],
            status: 'success'
          }
        },
        {
          $group: {
            _id: '$candidate_id',
            vote_count: { $sum: 1 }
          }
        }
      ]).toArray();

      console.log(`📊 Results: Found ${voteCounts.length} candidate groups with votes`);

      // Map vote counts to candidates using string comparison
      const updatedContestants = election.contestants.map(contestant => {
        const voteData = voteCounts.find(vc => vc._id.toString() === contestant.id.toString());
        const voteCount = voteData ? voteData.vote_count : 0;
        
        console.log(`📊 Results Updated: Candidate ${contestant.name} votes=${voteCount}`);
        
        return {
          ...contestant,
          votes: voteCount,
          vote_count: voteCount // For backward compatibility
        };
      });

      // Calculate total votes
      const totalVotes = voteCounts.reduce((sum, vc) => sum + vc.vote_count, 0);
      console.log(`📊 Total Votes Cast: ${totalVotes}`);

      // Log warning if no votes found
      if (totalVotes === 0) {
        console.log(`⚠️ Results Aggregation Error: no votes found for election ${id}`);
      }

      // TASK 2: DATABASE CONSISTENCY - Persist changes back to elections collection
      console.log(`🔄 Results: Updating election document with aggregated vote counts`);
      
      const updateResult = await db.collection('elections').updateOne(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            contestants: updatedContestants,
            total_votes: totalVotes,
            last_updated: new Date()
          }
        }
      );

      if (updateResult.modifiedCount > 0) {
        console.log(`✅ Results: Election document updated successfully`);
      } else {
        console.log(`⚠️ Results: No changes made to election document`);
      }

      // Calculate percentages for each candidate
      const resultsWithPercentages = updatedContestants.map(contestant => {
        const percentage = totalVotes > 0 ? Math.round((contestant.votes / totalVotes) * 100) : 0;
        
        return {
          candidate_id: contestant.id,
          name: contestant.name,
          running_mate: contestant.running_mate,
          party: contestant.party,
          party_acronym: contestant.party_acronym,
          votes: contestant.votes,
          vote_count: contestant.votes, // For backward compatibility
          percentage: percentage
        };
      });

      console.log(`✅ Results Aggregated Successfully: ${updatedContestants.length} candidates processed`);

      // Return updated election data with real-time results
      res.json({
        success: true,
        data: {
          election_id: election._id,
          id: election._id.toString(), // For frontend compatibility
          title: election.title,
          description: election.description,
          election_type: election.election_type,
          status: election.status,
          start_date: election.start_date,
          end_date: election.end_date,
          total_votes: totalVotes,
          contestants: resultsWithPercentages,
          contract_address: election.contract_address,
          last_updated: new Date().toISOString(),
          computed_at: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error(`❌ Vote Aggregation Failed: ${error.message}`);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error(`❌ Results Error: ${error.message}`);
    next(error);
  }
};

/**
 * Cast a vote for a candidate in an election
 */
const castVote = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const { candidate_id, fingerprintData } = req.body;
    const voter_id = req.user.id;

    console.log(`🗳️ Vote Request: User ${voter_id} voting for candidate ${candidate_id} in election ${electionId}`);

    // Validate required fields
    if (!fingerprintData) {
      throw new ApiError('Fingerprint verification required to cast vote', 400);
    }

    // Validate ObjectId
    if (!ObjectId.isValid(electionId)) {
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election details
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(electionId) 
      });

      if (!election) {
        throw new ApiError('Election not found', 404);
      }

      // Check if election is active
      if (election.status !== 'ONGOING') {
        throw new ApiError('Election is not currently active', 400);
      }

      // Check if user has biometric registered
      const user = await db.collection('users').findOne({ _id: new ObjectId(voter_id) });
      if (!user || !user.biometric_registered) {
        throw new ApiError('Biometric registration required to vote', 403);
      }

      // Check if user has already voted
      const existingVote = await db.collection('votes').findOne({
        election_id: electionId,
        voter_id: voter_id,
        status: 'success'
      });

      if (existingVote) {
        throw new ApiError('You have already voted in this election', 400);
      }

      // Pre-vote balance verification
      if (!user.wallet_address) {
        throw new ApiError('User wallet not found', 400);
      }

      // Verify biometric fingerprint
      console.log(`🔐 Verifying biometric for voting: User ${voter_id}, Election ${electionId}`);
      
      const biometricData = await db.collection('biometric_data').findOne({ 
        user_id: new ObjectId(voter_id),
        is_active: true
      });
      
      if (!biometricData) {
        throw new ApiError('No biometric registered for this user', 404);
      }
      
      // Generate fingerprint hash for verification
      const crypto = require('crypto');
      const fingerprintHash = crypto.createHash('sha256').update(fingerprintData).digest('hex');
      
      // Verify fingerprint matches
      if (biometricData.fingerprint_hash !== fingerprintHash) {
        // Log failed verification
        await db.collection('biometric_verification_logs').insertOne({
          user_id: new ObjectId(voter_id),
          election_id: electionId,
          verification_type: 'vote_verification',
          status: 'failed',
          fingerprint_hash: fingerprintHash,
          ip_address: req.ip,
          user_agent: req.get('User-Agent'),
          error_message: 'Fingerprint does not match',
          timestamp: new Date()
        });
        
        throw new ApiError('Fingerprint verification failed', 401);
      }
      
      // Update biometric last used
      await db.collection('biometric_data').updateOne(
        { user_id: new ObjectId(voter_id) },
        { $set: { last_used: new Date() } }
      );
      
      console.log(`✅ Biometric verified successfully for voting: User ${voter_id}`);

      // Check wallet balance before voting
      const walletFundingService = require('../services/walletFundingService');
      await walletFundingService.initialize();
      const balanceCheck = await walletFundingService.checkVoteBalance(user.wallet_address);
      
      if (!balanceCheck.canVote) {
        console.log(`❌ Vote blocked: Wallet ${user.wallet_address} has insufficient funds: ${balanceCheck.balanceEth} ETH < ${ethers.utils.formatEther(balanceCheck.threshold)} ETH`);
        throw new ApiError('Your wallet has insufficient funds. Please contact admin.', 400);
      }

      console.log(`✅ Vote balance verified: Wallet ${user.wallet_address} balance=${balanceCheck.balanceEth} ETH`);

      // Find candidate index using string comparison
      const candidateIndex = election.contestants.findIndex(
        contestant => contestant.id.toString() === candidate_id.toString()
      );

      if (candidateIndex === -1) {
        // Log available candidate IDs for debugging
        const availableIds = election.contestants.map(c => c.id.toString());
        console.log(`❌ Vote Error: candidateId ${candidate_id} not found. Available=[${availableIds.join(', ')}]`);
        throw new ApiError('Invalid candidate selected', 400);
      }

      console.log(`✅ Vote Mapped: candidateId=${candidate_id} → index=${candidateIndex}`);

      // Get user's wallet details
      if (!user || !user.wallet_address || !user.encrypted_private_key) {
        throw new ApiError('User wallet not found or not properly configured', 400);
      }

      // Calculate sequential position (vote order in this election)
      const voteCount = await db.collection('votes').countDocuments({
        election_id: electionId
      });
      const sequentialPosition = voteCount + 1;

      console.log(`📊 Vote: Calculated sequential position ${sequentialPosition} for election ${electionId}`);

      // Create vote record with biometric verification
      const voteData = {
        voter_id: voter_id,
        election_id: electionId,
        candidate_id: candidate_id.toString(), // Ensure candidate_id is stored as string
        sequential_position: sequentialPosition,
        vote_timestamp: new Date(),
        status: 'pending_chain',
        biometric_verified: true,
        biometric_verification_timestamp: new Date(),
        biometric_verification_method: 'fingerprint',
        biometric_verification_status: 'verified',
        created_at: new Date(),
        updated_at: new Date()
      };

      const voteResult = await db.collection('votes').insertOne(voteData);
      const voteId = voteResult.insertedId;

      console.log(`✅ Vote: Vote record created with ID ${voteId}`);

      // Log successful biometric verification for voting
      await db.collection('biometric_verification_logs').insertOne({
        user_id: new ObjectId(voter_id),
        election_id: electionId,
        verification_type: 'vote_verification',
        status: 'success',
        fingerprint_hash: fingerprintHash,
        ip_address: req.ip,
        user_agent: req.get('User-Agent'),
        timestamp: new Date()
      });

      // Try to send to blockchain
      let transactionHash = null;
      let blockchainStatus = 'pending_chain';

      try {
        const blockchainService = require('../blockchain/services/blockchainService');
        
        const blockchainResult = await blockchainService.signAndSendVote(
          election.contract_address,
          user.encrypted_private_key,
          candidateIndex,
          voter_id,
          electionId
        );

        if (blockchainResult.success) {
          transactionHash = blockchainResult.transactionHash;
          blockchainStatus = 'pending_chain'; // Will be updated by confirmation service
          
          // Update vote with transaction hash
          await db.collection('votes').updateOne(
            { _id: voteId },
            {
              $set: {
                transaction_hash: transactionHash,
                updated_at: new Date()
              }
            }
          );

          console.log(`✅ Vote: Contract call submitted, txHash=${transactionHash}`);
        } else {
          console.log(`⚠️ Vote: Blockchain call failed, keeping as pending_chain`);
        }

      } catch (blockchainError) {
        console.log(`⚠️ Vote: Blockchain error, keeping as pending_chain: ${blockchainError.message}`);
      }

      // Return success response
      res.status(200).json({
        success: true,
        message: 'Vote cast successfully',
        data: {
          vote_id: voteId,
          election_id: electionId,
          candidate_id: candidate_id,
          sequential_position: sequentialPosition,
          vote_position: sequentialPosition, // For frontend compatibility
          vote_timestamp: voteData.vote_timestamp,
          status: blockchainStatus,
          transaction_hash: transactionHash,
          message: transactionHash ? 'Vote submitted to blockchain' : 'Vote pending blockchain confirmation'
        }
      });

    } catch (error) {
      console.error('❌ Vote Error:', error.message);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Get current user's vote for a specific election
 */
const getMyVote = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    const voter_id = req.user.id;

    console.log(`🔍 getMyVote: Checking votes for voter ${voter_id} in election ${electionId}`);

    // Validate ObjectId
    if (!ObjectId.isValid(electionId)) {
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get user's vote for this election
      const vote = await db.collection('votes').findOne({
        election_id: electionId,
        voter_id: voter_id
      });

      if (!vote) {
        console.log(`✅ getMyVote: Found 0 votes for voter ${voter_id}`);
        return res.json({
          success: true,
          data: {
            has_voted: false,
            vote: null
          }
        });
      }

      // Get election details to find candidate info
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(electionId) 
      });

      if (!election) {
        throw new ApiError('Election not found', 404);
      }

      // Find candidate details using string comparison
      const candidate = election.contestants.find(c => c.id.toString() === vote.candidate_id.toString());

      console.log(`✅ getMyVote: Found 1 vote for voter ${voter_id}`);

      res.json({
        success: true,
        data: {
          has_voted: true,
          vote: {
            vote_id: vote._id,
            candidate_id: vote.candidate_id,
            candidate_name: candidate ? candidate.name : 'Unknown',
            candidate_party: candidate ? candidate.party : 'Unknown',
            status: vote.status,
            transaction_hash: vote.transaction_hash,
            created_at: vote.created_at,
            confirmed_at: vote.confirmed_at
          }
        }
      });

    } catch (error) {
      console.error('❌ getMyVote Error:', error.message);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Get election details for observer
 */
const getElectionForObserver = async (req, res, next) => {
  try {
    const { electionId } = req.params;

    console.log(`👁️ getElectionForObserver: Fetching election ${electionId} for observer`);

    // Validate ObjectId
    if (!ObjectId.isValid(electionId)) {
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get election details
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(electionId) 
      });

      if (!election) {
        throw new ApiError('Election not found', 404);
      }

      // Get vote counts for each candidate
      const voteCounts = await db.collection('votes').aggregate([
        {
          $match: {
            election_id: electionId,
            status: 'success'
          }
        },
        {
          $group: {
            _id: '$candidate_id',
            vote_count: { $sum: 1 }
          }
        }
      ]).toArray();

      // Map vote counts to candidates using string comparison
      const contestants = election.contestants.map(contestant => {
        const voteData = voteCounts.find(vc => vc._id.toString() === contestant.id.toString());
        return {
          candidate_id: contestant.id,
          name: contestant.name,
          running_mate: contestant.running_mate,
          party: contestant.party,
          party_acronym: contestant.party_acronym,
          vote_count: voteData ? voteData.vote_count : 0
        };
      });

      // Calculate total votes
      const totalVotes = voteCounts.reduce((sum, vc) => sum + vc.vote_count, 0);

      console.log(`✅ getElectionForObserver: Election ${electionId} has ${totalVotes} total votes`);

      res.json({
        success: true,
        data: {
          election_id: election._id,
          title: election.title,
          description: election.description,
          status: election.status,
          start_date: election.start_date,
          end_date: election.end_date,
          election_type: election.election_type,
          total_votes: totalVotes,
          contestants: contestants,
          contract_address: election.contract_address,
          created_at: election.created_at
        }
      });

    } catch (error) {
      console.error('❌ getElectionForObserver Error:', error.message);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Recalculate vote counts for an election
 */
const recalculateVoteCounts = async (req, res, next) => {
  try {
    const { electionId } = req.params;

    console.log(`🔄 recalculateVoteCounts: Recalculating votes for election ${electionId}`);

    // Validate ObjectId
    if (!ObjectId.isValid(electionId)) {
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Recalculate vote counts
      await recalculateElectionVoteCounts(db, electionId);

      console.log(`✅ recalculateVoteCounts: Vote counts recalculated for election ${electionId}`);

      res.json({
        success: true,
        message: 'Vote counts recalculated successfully'
      });

    } catch (error) {
      console.error('❌ recalculateVoteCounts Error:', error.message);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Retry blockchain sync for an election
 */
const retryBlockchainSync = async (req, res, next) => {
  try {
    const { electionId } = req.params;

    console.log(`🔄 retryBlockchainSync: Retrying blockchain sync for election ${electionId}`);

    // Validate ObjectId
    if (!ObjectId.isValid(electionId)) {
      throw new ApiError('Invalid election ID', 400);
    }

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get pending votes for this election
      const pendingVotes = await db.collection('votes').find({
        election_id: electionId,
        status: 'pending_chain'
      }).toArray();

      console.log(`📊 retryBlockchainSync: Found ${pendingVotes.length} pending votes for election ${electionId}`);

      // Trigger transaction confirmation service
      const transactionConfirmationService = require('../services/transactionConfirmationService');
      await transactionConfirmationService.pollPendingVotes();

      res.json({
        success: true,
        message: `Retry initiated for ${pendingVotes.length} pending votes`,
        pending_count: pendingVotes.length
      });

    } catch (error) {
      console.error('❌ retryBlockchainSync Error:', error.message);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Retry pending votes (admin endpoint)
 */
const retryPendingVotes = async (req, res, next) => {
  try {
    const { vote_id, election_id } = req.body;

    console.log(`🔄 retryPendingVotes: Admin retry request for vote ${vote_id || 'all'} in election ${election_id || 'all'}`);

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Build query for pending votes
      const query = { status: 'pending_chain' };
      if (vote_id) query._id = new ObjectId(vote_id);
      if (election_id) query.election_id = election_id;

      const pendingVotes = await db.collection('votes').find(query).toArray();

      console.log(`📊 retryPendingVotes: Found ${pendingVotes.length} pending votes to retry`);

      // Trigger transaction confirmation service
      const transactionConfirmationService = require('../services/transactionConfirmationService');
      await transactionConfirmationService.pollPendingVotes();

      res.json({
        success: true,
        message: `Retry initiated for ${pendingVotes.length} pending votes`,
        retried_count: pendingVotes.length
      });

    } catch (error) {
      console.error('❌ retryPendingVotes Error:', error.message);
      throw error;
    } finally {
      await client.close();
    }

  } catch (error) {
    next(error);
  }
};

/**
 * Get votes for a specific election (public endpoint)
 */
const getElectionVotes = async (req, res, next) => {
  try {
    const { electionId } = req.params;
    
    if (!electionId) {
      throw new ApiError('Election ID is required', 400);
    }
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Check if election exists
      const election = await db.collection('elections').findOne({ 
        _id: new ObjectId(electionId) 
      });
      
      if (!election) {
        return res.status(404).json({
          success: false,
          message: 'Election not found'
        });
      }
      
      // Get all votes for this election
      const votes = await db.collection('votes').find({
        $or: [
          { election_id: electionId },
          { election_id: new ObjectId(electionId) }
        ],
        status: 'success'
      }).toArray();
      
      // Return votes data with voter information for public viewing
      const votesData = votes.map(vote => ({
        _id: vote._id,
        election_id: vote.election_id,
        candidate_id: vote.candidate_id,
        voter_id: vote.voter_id,
        voter_name: vote.voter_name,
        voter_email: vote.voter_email,
        transaction_hash: vote.transaction_hash,
        block_number: vote.block_number,
        timestamp: vote.timestamp,
        status: vote.status,
        created_at: vote.created_at
      }));
      
      res.json({
        success: true,
        data: votesData,
        message: `Retrieved ${votesData.length} votes for election ${electionId}`
      });
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createElection,
  getElections,
  getElectionById,
  updateElection,
  deleteElection,
  getElectionResults,
  castVote,
  getMyVote,
  getElectionForObserver,
  getElectionVotes,
  recalculateVoteCounts,
  retryBlockchainSync,
  retryPendingVotes
};
