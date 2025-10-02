const { ApiError } = require('../utils/apiError');
const { MongoClient } = require('mongodb');
const ElectionService = require('../services/electionService');

// Register new admin user
const registerAdmin = async (req, res, next) => {
  try {
    console.log('👑 Admin registration requested');
    
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new ApiError('All fields are required', 400);
    }

    if (password.length < 8) {
      throw new ApiError('Password must be at least 8 characters long', 400);
    }

    const registerClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await registerClient.connect();
      const db = registerClient.db('election_system');

      // Check if email already exists in admin collection
      const existingAdmin = await db.collection('admin').findOne({ 
        email: email.toLowerCase() 
      });

      if (existingAdmin) {
        throw new ApiError('Admin email already registered', 409);
      }

      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash(password, 10);

      const adminUserData = {
        first_name: firstName,
        last_name: lastName,
        email: email.toLowerCase(),
        password_hash: hashedPassword,
        role: 'ADMIN',
        nin_verified: false,
        registration_completed: true,
        is_active: true,
        user_unique_id: `ADMIN-${Date.now()}`,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await db.collection('admin').insertOne(adminUserData);
      const adminUser = await db.collection('admin').findOne({ 
        _id: result.insertedId 
      });

      console.log('✅ Admin user created:', { email: adminUser.email, role: adminUser.role });

      const { password_hash, ...userWithoutPassword } = adminUser;

      res.status(201).json({
        success: true,
        message: 'Admin account created successfully',
        user: userWithoutPassword
      });

    } finally {
      await registerClient.close();
    }
  } catch (error) {
    console.error('❌ Admin registration error:', error);
    next(error);
  }
};

// Admin logout
const logoutAdmin = async (req, res, next) => {
  try {
    console.log('👑 Admin logout requested');
    
    // For JWT-based auth, logout is typically handled client-side
    // by removing the token. This endpoint can be used for logging
    // logout events or invalidating tokens if needed.
    
    res.status(200).json({
      success: true,
      message: 'Admin logged out successfully'
    });
  } catch (error) {
    console.error('❌ Admin logout error:', error);
    next(error);
  }
};

// Get admin dashboard data
const getDashboard = async (req, res, next) => {
  try {
    console.log('📊 Admin dashboard requested');
    
    // User is already authenticated by auth middleware
    const adminUser = req.user;
    console.log('✅ Admin user from middleware:', adminUser.email);
    
    const dashboardClient = new MongoClient(process.env.DATABASE_URL);

    try {
      await dashboardClient.connect();
      const db = dashboardClient.db('election_system');

      const observers = await db.collection('users').find({ 
        role: 'OBSERVER' 
      }).sort({ created_at: -1 }).limit(10).toArray();

      let reports = [];
      try {
        reports = await db.collection('observationReport').find({})
          .sort({ created_at: -1 }).limit(10).toArray();
      } catch (error) {
        console.log('⚠️ observationReport collection not found, using empty array');
        reports = [];
      }

      // Get observer stats from observers collection
      const totalObservers = await db.collection('observers').countDocuments();
      const pendingObservers = await db.collection('observers').countDocuments({ status: 'pending' });
      const approvedObservers = await db.collection('observers').countDocuments({ status: 'approved' });
      const rejectedObservers = await db.collection('observers').countDocuments({ status: 'rejected' });
      
      // Get other stats
      const totalVoters = await db.collection('users').countDocuments({ role: 'VOTER' });
      const totalReports = await db.collection('observationReport').countDocuments({});
      
      console.log(`📊 Actual registered voters count from database: ${totalVoters}`);
      
      // Get saved system stats (for editable values like totalRegisteredVoters)
      let savedSystemStats = null;
      try {
        savedSystemStats = await db.collection('system_settings').findOne({});
        console.log('📊 Saved system stats from database:', savedSystemStats);
        console.log('📊 Using totalRegisteredVoters value:', savedSystemStats?.totalRegisteredVoters || 'default (84004084)');
      } catch (error) {
        console.log('⚠️ system_settings collection not found, using defaults');
        savedSystemStats = null;
      }
      
      // Get election stats
      let totalElections = 0;
      let activeElections = 0;
      try {
        totalElections = await db.collection('elections').countDocuments();
        activeElections = await db.collection('elections').countDocuments({ status: 'ONGOING' });
        console.log('📊 Election stats:', { totalElections, activeElections });
        
        // Debug: Get all elections to see their status
        const allElections = await db.collection('elections').find({}).toArray();
        console.log('📄 All elections in database:', allElections.map(e => ({ title: e.title, status: e.status })));
      } catch (error) {
        console.log('Elections collection not found, using defaults');
      }

      await dashboardClient.close();

      const dashboardData = {
        observers: observers,
        reports: reports,
        stats: {
          // Use actual database count of registered voters
          totalVoters: totalVoters,
          // Use correct geodata values: 368 LGAs × 25 polling units per LGA = 9,200
          totalPollingUnits: 9200,
          totalLGAs: 368,
          totalStates: 37,
          // Calculate total wards: 368 LGAs × 5 wards per LGA = 1,840
          totalWards: 1840,
          activeElections: activeElections || 0,
          totalElections: totalElections || 0,
          totalObservers,
          pendingObservers,
          approvedObservers,
          rejectedObservers,
          totalReports
        }
      };

      console.log('✅ Admin dashboard data prepared:', {
        observersCount: observers.length,
        reportsCount: reports.length,
        actualTotalVoters: totalVoters,
        savedSystemStats: savedSystemStats?.totalRegisteredVoters || 'none',
        finalTotalVoters: dashboardData.stats.totalVoters,
        stats: dashboardData.stats
      });

      res.json({
        success: true,
        data: dashboardData,
        message: 'Admin dashboard data retrieved successfully'
      });
    } catch (dbError) {
      await dashboardClient.close();
      throw dbError;
    }
  } catch (error) {
    console.error('❌ Admin dashboard error:', error);
    next(error);
  }
};

// Get observers
const getObservers = async (req, res, next) => {
  try {
    const observersClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await observersClient.connect();
      const db = observersClient.db('election_system');

      const observers = await db.collection('observers').find({}).sort({ created_at: -1 }).toArray();

      // Remove sensitive data and format for frontend
      const formattedObservers = observers.map(observer => ({
        id: observer._id.toString(),
        organization_name: observer.organization_name,
        organization_type: observer.organization_type,
        email: observer.email,
        website: observer.website,
        phone: observer.phone,
        country_code: observer.country_code,
        address: observer.address,
        state: observer.state,
        lga: observer.lga,
        ward: observer.ward,
        polling_unit: observer.polling_unit,
        status: observer.status,
        created_at: observer.created_at,
        updated_at: observer.updated_at,
        approved_by_id: observer.approved_by_id,
        approved_at: observer.approved_at,
        rejection_reason: observer.rejection_reason
      }));

      res.json({
        success: true,
        data: formattedObservers
      });

    } finally {
      await observersClient.close();
    }
  } catch (error) {
    next(error);
  }
};

// Get observation reports
const getObservationReports = async (req, res, next) => {
  try {
    const reportsClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await reportsClient.connect();
      const db = reportsClient.db('election_system');

      let reports = [];
      try {
        reports = await db.collection('observationReport').find({})
          .sort({ created_at: -1 }).limit(10).toArray();
      } catch (error) {
        reports = [];
      }

      res.json({
        success: true,
        data: reports
      });

    } finally {
      await reportsClient.close();
    }
  } catch (error) {
    next(error);
  }
};

// Update admin profile
const updateProfile = async (req, res, next) => {
  try {
    console.log('👑 Admin profile update requested');
    
    const { first_name, last_name, email } = req.body;
    const adminId = req.user.id;
    
    const updateClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await updateClient.connect();
      const db = updateClient.db('election_system');
      
      const updateData = {};
      if (first_name) updateData.first_name = first_name;
      if (last_name) updateData.last_name = last_name;
      if (email) updateData.email = email.toLowerCase();
      updateData.updated_at = new Date();
      
      const result = await db.collection('admin').updateOne(
        { _id: new (require('mongodb').ObjectId)(adminId) },
        { $set: updateData }
      );
      
      if (result.matchedCount === 0) {
        throw new ApiError('Admin not found', 404);
      }
      
      const updatedAdmin = await db.collection('admin').findOne({ 
        _id: new (require('mongodb').ObjectId)(adminId) 
      });
      
      const { password_hash, ...adminWithoutPassword } = updatedAdmin;
      
      res.status(200).json({
        success: true,
        message: 'Admin profile updated successfully',
        user: adminWithoutPassword
      });
      
    } finally {
      await updateClient.close();
    }
  } catch (error) {
    console.error('❌ Admin profile update error:', error);
    next(error);
  }
};

// Get current admin user info
const getMe = async (req, res, next) => {
  try {
    console.log('🔍 Admin getMe requested');
    
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError('No authentication token provided', 401);
    }

    const token = authHeader.substring(7);
    
    const jwt = require('jsonwebtoken');
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ApiError('Invalid or expired token', 401);
    }

    // Find the user by ID in both admin and users collections
    const meClient = new MongoClient(process.env.DATABASE_URL);
    let user = null;
    
    try {
      await meClient.connect();
      const db = meClient.db('election_system');
      
      user = await db.collection('admin').findOne({ 
        _id: new (require('mongodb').ObjectId)(decoded.userId)
      });
      
      // If not found in admin, search in users collection
      if (!user) {
        user = await db.collection('users').findOne({ 
          _id: new (require('mongodb').ObjectId)(decoded.userId)
        });
      }
      
      if (!user) {
        throw new ApiError('User not found', 404);
      }
      
      // Check if the user has admin role
      if (user.role !== 'ADMIN') {
        throw new ApiError('Access denied. Admin privileges required.', 403);
      }
      
    } finally {
      await meClient.close();
    }

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      is_active: user.is_active,
      created_at: user.created_at
    };

    console.log('✅ Admin getMe successful:', { userId: userData.id, email: userData.email });

    res.json({
      success: true,
      data: userData,
      message: 'Admin user info retrieved successfully'
    });
  } catch (error) {
    console.error('❌ Admin getMe error:', error);
    next(error);
  }
};

// Approve observer
const approveObserver = async (req, res, next) => {
  try {
    const { observerId } = req.params;
    const adminId = req.user.id; // From auth middleware

    console.log('👑 Approving observer:', { observerId, adminId });

    const client = new MongoClient(process.env.DATABASE_URL);
    try {
      await client.connect();
      const db = client.db('election_system');

      // Update observer status to approved
      const result = await db.collection('observers').updateOne(
        { _id: new (require('mongodb').ObjectId)(observerId) },
        { 
          $set: { 
            status: 'approved',
            approved_by_id: new (require('mongodb').ObjectId)(adminId),
            approved_at: new Date(),
            updated_at: new Date()
          }
        }
      );

      if (result.modifiedCount === 0) {
        throw new ApiError('Observer not found or already processed', 404);
      }

      // Get updated observer data for email notification
      const updatedObserver = await db.collection('observers').findOne(
        { _id: new (require('mongodb').ObjectId)(observerId) }
      );

      // Send approval email
      try {
        const emailService = require('../utils/email');
        await emailService.sendObserverApprovalEmail(
          updatedObserver.email,
          updatedObserver.organization_name,
          updatedObserver._id.toString(),
          'approved'
        );
        console.log('✅ Observer approval email sent');
      } catch (emailError) {
        console.error('⚠️ Failed to send approval email:', emailError);
        // Don't fail the request if email fails
      }

      console.log('✅ Observer approved successfully:', { observerId });

      res.json({
        success: true,
        message: 'Observer approved successfully',
        data: {
          observerId,
          status: 'approved',
          approvedAt: new Date()
        }
      });

    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('❌ Observer approval error:', error);
    next(error);
  }
};

// Reject observer
const rejectObserver = async (req, res, next) => {
  try {
    const { observerId } = req.params;
    const { rejectionReason } = req.body;
    const adminId = req.user.id; // From auth middleware

    console.log('👑 Rejecting observer:', { observerId, adminId, rejectionReason });

    const client = new MongoClient(process.env.DATABASE_URL);
    try {
      await client.connect();
      const db = client.db('election_system');

      // Update observer status to rejected
      const result = await db.collection('observers').updateOne(
        { _id: new (require('mongodb').ObjectId)(observerId) },
        { 
          $set: { 
            status: 'rejected',
            approved_by_id: new (require('mongodb').ObjectId)(adminId),
            approved_at: new Date(),
            rejection_reason: rejectionReason || 'Application rejected by administrator',
            updated_at: new Date()
          }
        }
      );

      if (result.modifiedCount === 0) {
        throw new ApiError('Observer not found or already processed', 404);
      }

      // Get updated observer data for email notification
      const updatedObserver = await db.collection('observers').findOne(
        { _id: new (require('mongodb').ObjectId)(observerId) }
      );

      // Send rejection email
      try {
        const emailService = require('../utils/email');
        await emailService.sendObserverApprovalEmail(
          updatedObserver.email,
          updatedObserver.organization_name,
          updatedObserver._id.toString(),
          'rejected'
        );
        console.log('✅ Observer rejection email sent');
      } catch (emailError) {
        console.error('⚠️ Failed to send rejection email:', emailError);
        // Don't fail the request if email fails
      }

      console.log('✅ Observer rejected successfully:', { observerId });

      res.json({
        success: true,
        message: 'Observer rejected successfully',
        data: {
          observerId,
          status: 'rejected',
          rejectedAt: new Date(),
          rejectionReason: rejectionReason || 'Application rejected by administrator'
        }
      });

    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('❌ Observer rejection error:', error);
    next(error);
  }
};

// Get observer details for admin review
const getObserverDetails = async (req, res, next) => {
  try {
    const { observerId } = req.params;

    console.log('👑 Getting observer details:', { observerId });

    const client = new MongoClient(process.env.DATABASE_URL);
    try {
      await client.connect();
      const db = client.db('election_system');

      const observer = await db.collection('observers').findOne(
        { _id: new (require('mongodb').ObjectId)(observerId) }
      );

      if (!observer) {
        throw new ApiError('Observer not found', 404);
      }

      // Remove sensitive data
      const { password_hash, ...observerData } = observer;

      console.log('✅ Observer details retrieved:', { observerId });

      res.json({
        success: true,
        message: 'Observer details retrieved successfully',
        data: observerData
      });

    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('❌ Get observer details error:', error);
    next(error);
  }
};

// Create new election with mandatory blockchain deployment
const createElection = async (req, res, next) => {
  try {
    console.log('🗳️ Admin creating new election:', req.body);
    console.log('🔍 Admin user creating election:', req.user.id);
    console.log('🔍 Admin user role:', req.user.role);
    
    const { title, election_type, start_date, end_date, status, contestants, states, lgas, description } = req.body;
    
    console.log('🗳️ Extracted data:', {
      title,
      election_type,
      states,
      lgas,
      contestantsCount: contestants?.length
    });

    // Use shared election service with mandatory blockchain deployment
    const result = await ElectionService.createElectionWithContract({
      title,
      description,
      start_date,
      end_date,
      election_type,
      status,
      contestants,
      states,
      lgas
    }, req.user.id);

    res.status(201).json({
      success: result.success,
      message: result.message,
      election: result.election
    });

  } catch (error) {
    console.error('❌ Error creating election:', error);
    next(error);
  }
};

// Get all elections
const getElections = async (req, res, next) => {
  try {
    console.log('🗳️ Fetching elections with vote data');
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');

      // Get all elections
      const elections = await db.collection('elections').find({}).sort({ created_at: -1 }).toArray();
      
      console.log(`✅ Found ${elections.length} elections`);

      // Enhance each election with vote data
      const electionsWithVotes = await Promise.all(elections.map(async (election) => {
        try {
          // Get total votes for this election
          const votesCollection = db.collection('votes');
          const totalVotes = await votesCollection.countDocuments({ 
            election_id: election._id.toString() 
          });
          
          // Get votes by candidate
          const votesByCandidate = await votesCollection.aggregate([
            { $match: { election_id: election._id.toString() } },
            { $group: { 
              _id: '$candidate_id', 
              voteCount: { $sum: 1 },
              voters: { $push: '$user_id' }
            }},
            { $lookup: {
              from: 'elections',
              localField: '_id',
              foreignField: 'contestants.id',
              as: 'candidate'
            }}
          ]).toArray();

          // Update contestants with actual vote counts
          const updatedContestants = election.contestants?.map(contestant => {
            const voteData = votesByCandidate.find(v => 
              v._id === contestant.id.toString() || 
              v._id === contestant.id
            );
            return {
              ...contestant,
              votes: voteData ? voteData.voteCount : 0,
              voters: voteData ? voteData.voters : []
            };
          }) || [];

          // Get actual total registered voters from database
          const totalRegisteredVoters = await db.collection('users').countDocuments({ 
            role: 'VOTER',
            is_active: true 
          });
          
          console.log(`📊 Election ${election.title}: Total registered voters = ${totalRegisteredVoters}, Votes cast = ${totalVotes}`);
          
          // Calculate election-specific statistics
          const electionNonVoters = Math.max(0, totalRegisteredVoters - totalVotes);
          const electionTurnoutPercentage = totalRegisteredVoters > 0 ? 
            ((totalVotes / totalRegisteredVoters) * 100).toFixed(1) : 0;

          return {
            ...election,
            totalVotes,
            votesCast: totalVotes,
            totalVoters: totalRegisteredVoters,
            turnoutPercentage: parseFloat(electionTurnoutPercentage),
            contestants: updatedContestants,
            // Add election-specific statistics
            electionStats: {
              totalRegisteredVoters,
              totalVotesCast: totalVotes,
              nonVoters: electionNonVoters,
              electionTurnoutPercentage: parseFloat(electionTurnoutPercentage)
            },
            // Add vote statistics
            voteStats: {
              totalVotes,
              totalVoters: totalRegisteredVoters,
              turnoutPercentage: parseFloat(electionTurnoutPercentage),
              votesByCandidate: votesByCandidate.map(v => ({
                candidateId: v._id,
                voteCount: v.voteCount,
                voters: v.voters
              }))
            }
          };
        } catch (error) {
          console.error(`❌ Error processing election ${election._id}:`, error);
          
          // Calculate election-specific voter count even in error case
          let totalVoters = 0;
          try {
            let voterQuery = { role: 'VOTER' };
            
            if (election.states && election.states.length > 0) {
              voterQuery.state = { $in: election.states };
            }
            if (election.lgas && election.lgas.length > 0) {
              voterQuery.lga = { $in: election.lgas };
            }
            if (election.wards && election.wards.length > 0) {
              voterQuery.ward = { $in: election.wards };
            }
            if (election.polling_units && election.polling_units.length > 0) {
              voterQuery.polling_unit = { $in: election.polling_units };
            }
            
            totalVoters = await db.collection('users').countDocuments(voterQuery);
            if (totalVoters === 0) {
              totalVoters = await db.collection('users').countDocuments({ role: 'VOTER' });
            }
          } catch (voterError) {
            console.error('Error counting voters:', voterError);
            totalVoters = 0;
          }
          
          return {
            ...election,
            _id: election._id.toString(),  // Keep original _id
            id: election._id.toString(),   // Add id alias for frontend convenience
            contract_address: election.contract_address || null,  // Include contract address
            totalVotes: 0,
            votesCast: 0,
            totalVoters,
            turnoutPercentage: 0,
            contestants: (election.contestants || []).map(contestant => ({
              id: contestant.id,
              name: contestant.name,
              party: contestant.party,
              party_acronym: contestant.party_acronym,
              picture: contestant.picture,
              position: contestant.position,
              votes: contestant.votes || 0
            })),
            voteStats: {
              totalVotes: 0,
              totalVoters,
              turnoutPercentage: 0,
              votesByCandidate: []
            }
          };
        }
      }));

      console.log(`✅ Enhanced ${electionsWithVotes.length} elections with vote data`);

      res.json({
        success: true,
        elections: electionsWithVotes
      });

    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('❌ Error fetching elections:', error);
    next(error);
  }
};

const deleteElection = async (req, res, next) => {
  try {
    console.log('🗑️ Deleting election:', req.params.id);
    console.log('🗑️ Request params:', req.params);
    console.log('🗑️ Request body:', req.body);
    
    const { id } = req.params;
    
    if (!id) {
      console.log('❌ No election ID provided');
      throw new ApiError('Election ID is required', 400);
    }

    console.log('🗑️ Election ID:', id, 'Type:', typeof id);

    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      console.log('🗑️ Connected to database');
      const db = client.db('election_system');

      // Validate ObjectId format
      let objectId;
      try {
        const { ObjectId } = require('mongodb');
        objectId = new ObjectId(id);
        console.log('🗑️ Valid ObjectId created:', objectId);
      } catch (objectIdError) {
        console.error('❌ Invalid ObjectId format:', objectIdError);
        throw new ApiError('Invalid election ID format', 400);
      }

      // Check if election exists
      console.log('🗑️ Checking if election exists...');
      const election = await db.collection('elections').findOne({ _id: objectId });
      
      if (!election) {
        console.log('❌ Election not found in database');
        throw new ApiError('Election not found', 404);
      }

      console.log('🗑️ Election found:', election.title);

      // Delete the election
      console.log('🗑️ Deleting election from database...');
      const result = await db.collection('elections').deleteOne({ _id: objectId });
      
      console.log('🗑️ Delete result:', result);
      
      if (result.deletedCount === 0) {
        console.log('❌ No documents deleted');
        throw new ApiError('Failed to delete election', 500);
      }
      
      console.log(`✅ Election deleted successfully: ${id}`);

      res.json({
        success: true,
        message: 'Election deleted successfully'
      });

    } finally {
      await client.close();
      console.log('🗑️ Database connection closed');
    }

  } catch (error) {
    console.error('❌ Error deleting election:', error);
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    next(error);
  }
};

// Update system statistics
const updateSystemStats = async (req, res, next) => {
  try {
    console.log('📊 Admin system stats update requested');
    
    const { totalVoters } = req.body;
    const adminUser = req.user;
    console.log('✅ Admin user from middleware:', adminUser.email);
    console.log('📊 New totalVoters value:', totalVoters);
    
    if (typeof totalVoters !== 'number' || totalVoters < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid totalVoters value. Must be a positive number.'
      });
    }
    
    const statsClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await statsClient.connect();
      const db = statsClient.db('election_system');
      
      // Create or update system settings document
      console.log('📊 Updating system_settings collection with totalRegisteredVoters:', totalVoters);
      const result = await db.collection('system_settings').updateOne(
        {}, // Update the first (and only) document
        { 
          $set: { 
            totalRegisteredVoters: totalVoters,
            lastUpdated: new Date(),
            updated_by: adminUser.id
          }
        },
        { upsert: true } // Create if doesn't exist
      );
      
      // Verify the update by reading it back
      const verifyStats = await db.collection('system_settings').findOne({});
      console.log('📊 Verified system_settings after update:', verifyStats);
      
      console.log('✅ System stats updated:', {
        matched: result.matchedCount,
        modified: result.modifiedCount,
        upserted: result.upsertedCount
      });
      
      res.json({
        success: true,
        message: 'System statistics updated successfully',
        data: {
          totalVoters: totalVoters,
          updated_at: new Date()
        }
      });
      
    } finally {
      await statsClient.close();
    }
  } catch (error) {
    console.error('❌ System stats update error:', error);
    next(error);
  }
};

module.exports = {
  registerAdmin,
  logoutAdmin,
  getDashboard,
  getObservers,
  getObservationReports,
  updateProfile,
  getMe,
  approveObserver,
  rejectObserver,
  getObserverDetails,
  createElection,
  getElections,
  deleteElection,
  updateSystemStats
};
