const { ApiError } = require('../utils/apiError');
const { MongoClient, ObjectId } = require('mongodb');
const { countVerifiedVoters, countAllVoters } = require('../utils/voterUtils');

/**
 * Get voter dashboard data
 */
const getVoterDashboard = async (req, res, next) => {
  try {
    // Set cache control headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Handle test user case (development only)
      let userId = req.user.id;
      
      // For test token, find the actual user ID in the database
      if (req.user.id === 'test-user-id') {
        const testUser = await db.collection('users').findOne({ email: 'test@example.com' });
        if (testUser) {
          userId = testUser._id.toString();
          console.log('🔍 Dashboard: Found test user ID:', userId);
        } else {
          console.log('❌ Dashboard: Test user not found in database');
          // Fallback: use the first user in the database
          const fallbackUser = await db.collection('users').findOne({});
          if (fallbackUser) {
            userId = fallbackUser._id.toString();
            console.log('🔍 Dashboard: Using fallback user ID:', userId);
          }
        }
      }
      
      
      // Get voter-specific data
      const [
        voterInfo,
        activeElectionsFromElections,
        upcomingElectionsFromElections,
        completedElectionsFromElections,
        myVotes,
        voterStats
      ] = await Promise.all([
        // Voter information with geographic data
        db.collection('users').findOne(
          { _id: new ObjectId(userId) },
          { 
            projection: {
              _id: 1,
              email: 1,
              first_name: 1,
              last_name: 1,
              role: 1,
              nin_verified: 1,
              user_unique_id: 1,
              wallet_address: 1,
              created_at: 1,
              // Geographic fields
              state_of_origin_id: 1,
              lga_of_origin_id: 1,
              state_id: 1,
              lga_id: 1,
              ward_id: 1,
              polling_unit_id: 1
            }
          }
        ),
        
        // Active elections from elections collection (lowercase)
        db.collection('elections').find({
          status: 'ONGOING'
        }).toArray(),
        
        // Upcoming elections from elections collection (lowercase)
        db.collection('elections').find({
          status: 'UPCOMING',
          start_date: { $gte: new Date() }
        }).limit(5).toArray(),
        
        // Completed elections from elections collection (lowercase)
        db.collection('elections').aggregate([
          {
            $match: { 
              status: 'COMPLETED'
            }
          },
          {
            $lookup: {
              from: 'votes',
              localField: '_id',
              foreignField: 'election_id',
              as: 'votes'
            }
          },
          {
            $match: {
              'votes.voter_id': userId === 'test-user-id' ? 'test-user-id' : new ObjectId(userId)
            }
          },
          {
            $limit: 5
          }
        ]).toArray(),
        
        // Voter's voting history
        (async () => {
          console.log('🔍 Dashboard: Fetching votes for user ID:', userId);
          const votes = await db.collection('votes').find({
            voter_id: userId
          }).toArray();
          console.log('🔍 Dashboard: Found votes:', votes.length, votes);
          return votes;
        })(),
        
        // Voter statistics
        db.collection('votes').aggregate([
          {
            $match: { voter_id: userId }
          },
          {
            $group: {
              _id: null,
              totalVotes: { $sum: 1 },
              uniqueElections: { $addToSet: '$election_id' }
            }
          }
        ]).toArray()
      ]);

      // Transform elections to have 'id' field instead of '_id'
      const transformElections = (elections) => {
        return elections.map(election => ({
          ...election,
          id: election._id.toString(),
          _id: election._id // Keep original _id for reference
        }));
      };

      // Transform elections from the elections collection
      const activeElections = transformElections(activeElectionsFromElections);
      const upcomingElections = transformElections(upcomingElectionsFromElections);
      const completedElections = transformElections(completedElectionsFromElections);
      
      // Debug logging for election IDs
      console.log('🔍 Dashboard: Active elections after transformation:', activeElections.map(e => ({ id: e.id, title: e.title })));
      console.log('🔍 Dashboard: Upcoming elections after transformation:', upcomingElections.map(e => ({ id: e.id, title: e.title })));
      console.log('🔍 Dashboard: Completed elections after transformation:', completedElections.map(e => ({ id: e.id, title: e.title })));

      // Load geographic data to resolve IDs to names
      let geoData = null;
      try {
        const fs = require('fs');
        const path = require('path');
        const geoDataPath = path.join(__dirname, '../geodata_full.ndjson');
        if (fs.existsSync(geoDataPath)) {
          const geoDataContent = fs.readFileSync(geoDataPath, 'utf-8');
          geoData = JSON.parse(geoDataContent);
        } else {
          console.log('❌ Geo data file not found at:', geoDataPath);
        }
      } catch (error) {
        console.error('Error loading geo data:', error);
        console.error('Error details:', error.message);
      }

      // Helper function to find location by ID
      const findLocationById = (id, type) => {
        if (!geoData || !id) return null;
        
        if (type === 'state') {
          return geoData.states?.find(state => state.state_id === id);
        } else if (type === 'lga') {
          return geoData.lgas?.find(lga => lga.lga_id === id);
        } else if (type === 'ward') {
          // For wards, extract the ward number from the ID and use template
          // ID format: "WARD-BEN-LGA-01-02" -> extract "02" -> find "Ward 02"
          const wardMatch = id.match(/WARD-.*-(\d+)$/);
          if (wardMatch) {
            const wardNumber = parseInt(wardMatch[1]);
            const templateWard = geoData.templates?.wards?.find(ward => ward.index === wardNumber);
            if (templateWard) {
              return { ward_name: templateWard.ward_name };
            }
          }
          // Fallback: return the original ID as name
          return { ward_name: id };
        } else if (type === 'pollingUnit') {
          // For polling units, extract the PU number from the ID and use template
          // ID format: "PU-WARD-BEN-LGA-01-02-02" -> extract last "02" -> find "PU-002"
          const puMatch = id.match(/PU-.*-(\d+)$/);
          if (puMatch) {
            const puNumber = parseInt(puMatch[1]);
            const templatePU = geoData.templates?.polling_units?.find(pu => 
              pu.code === `PU-${puNumber.toString().padStart(3, '0')}`
            );
            if (templatePU) {
              // Return the address as the polling unit name since that's what should be displayed
              return { 
                polling_unit_name: templatePU.address, 
                code: templatePU.code,
                pu_name: templatePU.pu_name
              };
            }
          }
          // Fallback: return the original ID as name
          return { polling_unit_name: id, code: id };
        }
        return null;
      };

      // Transform data for frontend
      const transformedData = {
        voterInfo: voterInfo ? {
          id: voterInfo._id.toString(),
          email: voterInfo.email,
          first_name: voterInfo.first_name,
          last_name: voterInfo.last_name,
          role: voterInfo.role,
          nin_verified: voterInfo.nin_verified,
          user_unique_id: voterInfo.user_unique_id,
          wallet_address: voterInfo.wallet_address,
          created_at: voterInfo.created_at,
          // Geographic information - resolved to actual names
          geographicData: (() => {
            const stateRes = findLocationById(voterInfo.state_id, 'state');
            const lgaRes = findLocationById(voterInfo.lga_id, 'lga');
            const wardRes = findLocationById(voterInfo.ward_id, 'ward');
            const puRes = findLocationById(voterInfo.polling_unit_id, 'pollingUnit');
            
            const geoDataResult = {
              stateOfOrigin: findLocationById(voterInfo.state_of_origin_id, 'state')?.state_name || voterInfo.state_of_origin_id,
              lgaOfOrigin: findLocationById(voterInfo.lga_of_origin_id, 'lga')?.lga_name || voterInfo.lga_of_origin_id,
              stateOfResidence: stateRes?.state_name || voterInfo.state_id,
              lgaOfResidence: lgaRes?.lga_name || voterInfo.lga_id,
              ward: wardRes?.ward_name || voterInfo.ward_id,
              pollingUnit: puRes?.polling_unit_name || voterInfo.polling_unit_id,
              // Also include the IDs for reference
              stateOfOriginId: voterInfo.state_of_origin_id,
              lgaOfOriginId: voterInfo.lga_of_origin_id,
              stateOfResidenceId: voterInfo.state_id,
              lgaOfResidenceId: voterInfo.lga_id,
              wardId: voterInfo.ward_id,
              pollingUnitId: voterInfo.polling_unit_id
            };
            
            return geoDataResult;
          })()
        } : null,
        activeElections: activeElections || [],
        upcomingElections: upcomingElections || [],
        completedElections: completedElections || [],
        myVotes: myVotes || [],
        voterStats: voterStats[0] || { totalVotes: 0, uniqueElections: [] }
      };
      
      res.json({
        success: true,
        data: transformedData
      });
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    next(error);
  }
};

/**
 * Get dashboard statistics
 */
const getDashboardStats = async (req, res, next) => {
  try {
    // Set cache control headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
    // Get total counts
    const [
      totalVoters,
      totalElections,
      totalActiveElections,
      totalVotesCast,
      totalCandidates,
      totalObservers,
      totalParties,
      recentElections,
      upcomingElections,
      electionStatsByType,
      voteTrends,
      topCandidates
    ] = await Promise.all([
        // Total voters (users with verified NIN and completed registration)
        countVerifiedVoters(db),
      
      // Total elections (from both collections)
        db.collection('elections').countDocuments(),
      
      // Total active elections (ONGOING) (from both collections)
        db.collection('elections').countDocuments({ status: 'ONGOING' }),
      
      // Total votes cast
        db.collection('votes').countDocuments(),
      
      // Total candidates
        db.collection('candidates').countDocuments({ status: 'APPROVED' }),
      
      // Total observers
        db.collection('users').countDocuments({ role: 'OBSERVER' }),
      
      // Total political parties
        db.collection('parties').countDocuments(),
      
      // Recent elections (last 5) - from both collections
        db.collection('elections').find({
          status: { $in: ['ONGOING', 'COMPLETED'] }
        }).sort({ created_at: -1 }).limit(5).toArray(),
      
      // Upcoming elections (next 5) - from both collections
        db.collection('elections').find({
          status: 'UPCOMING',
          start_date: { $gte: new Date() }
        }).sort({ start_date: 1 }).limit(5).toArray(),
        
        // Election stats by type - from both collections
        Promise.all([
          db.collection('elections').aggregate([
            {
              $group: {
                _id: '$election_type',
                count: { $sum: 1 }
              }
            }
          ]).toArray(),
          db.collection('elections').aggregate([
            {
              $group: {
                _id: '$election_type',
                count: { $sum: 1 }
              }
            }
          ]).toArray()
        ]).then(([stats1, stats2]) => {
          // Merge and combine stats by type
          const combinedStats = {};
          [...stats1, ...stats2].forEach(stat => {
            const type = stat._id || 'Unknown';
            combinedStats[type] = (combinedStats[type] || 0) + stat.count;
          });
          return Object.entries(combinedStats).map(([type, count]) => ({ _id: type, count })).sort((a, b) => b.count - a.count);
        }),
      
      // Vote trends (last 7 days)
        db.collection('votes').aggregate([
          {
            $match: {
              created_at: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }
          },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m-%d', date: '$created_at' } },
              vote_count: { $sum: 1 }
            }
          },
          {
            $sort: { _id: 1 }
          }
        ]).toArray(),
      
      // Top candidates by votes
        db.collection('candidates').aggregate([
          {
            $match: { status: 'APPROVED' }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          {
            $lookup: {
              from: 'parties',
              localField: 'party_id',
              foreignField: '_id',
              as: 'party'
            }
          },
          {
            $lookup: {
              from: 'elections',
              localField: 'election_id',
              foreignField: '_id',
              as: 'election'
            }
          },
          {
            $lookup: {
              from: 'votes',
              localField: '_id',
              foreignField: 'candidate_id',
              as: 'votes'
            }
          },
          {
            $addFields: {
              vote_count: { $size: '$votes' }
            }
          },
          {
            $sort: { vote_count: -1 }
          },
          {
            $limit: 5
          }
        ]).toArray()
    ]);

    // Calculate voter turnout if we have data
      const activeVoters = await countVerifiedVoters(db, {
        _id: { $in: await db.collection('votes').distinct('user_id') }
      });
    
    const voterTurnout = totalVoters > 0 
      ? Math.round((activeVoters / totalVoters) * 100) 
      : 0;

    // Format the response
    res.json({
      success: true,
      data: {
        summary: {
          total_voters: totalVoters,
          total_elections: totalElections,
          active_elections: totalActiveElections,
          total_votes: totalVotesCast,
          total_candidates: totalCandidates,
          total_observers: totalObservers,
          total_parties: totalParties,
          voter_turnout: voterTurnout,
          active_voters: activeVoters
        },
        recent_elections: recentElections.map(election => ({
            id: election._id.toString(),
          title: election.title,
          status: election.status,
          start_date: election.start_date,
          end_date: election.end_date,
          election_type: election.election_type,
            total_votes: 0, // Will be calculated separately if needed
            total_candidates: 0 // Will be calculated separately if needed
        })),
        upcoming_elections: upcomingElections.map(election => ({
            id: election._id.toString(),
          title: election.title,
          start_date: election.start_date,
          end_date: election.end_date,
          election_type: election.election_type,
            total_candidates: 0 // Will be calculated separately if needed
        })),
        election_stats: electionStatsByType.map(stat => ({
            type: stat._id,
            count: stat.count
        })),
        vote_trends: voteTrends.map(trend => ({
            date: trend._id,
            vote_count: trend.vote_count
        })),
        top_candidates: topCandidates.map(candidate => ({
            id: candidate._id.toString(),
            user: candidate.user[0] || {},
            party: candidate.party[0] || {},
          position: candidate.position,
            election: candidate.election[0] || {},
            vote_count: candidate.vote_count
        }))
      }
    });
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get election results summary
 */
const getElectionResultsSummary = async (req, res, next) => {
  try {
    // Set cache control headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    const { id } = req.params;
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');

    // Get election details from both collections
      let election = await db.collection('elections').findOne(
        { _id: new ObjectId(id) }
      );
      
      if (!election) {
        election = await db.collection('elections').findOne(
          { _id: new ObjectId(id) }
        );
      }

    if (!election) {
      throw new ApiError('Election not found', 404);
    }

    // Only show results if election is completed
    if (election.status !== 'COMPLETED') {
      throw new ApiError('Election results are not yet available', 403);
    }

    // Get all candidates with their vote counts (from elections collection)
    const candidates = election.contestants || [];
    
    // Get vote counts for each candidate
    const voteCounts = await db.collection('votes').aggregate([
      {
        $match: {
          election_id: new ObjectId(id),
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
    
    // Map vote counts to candidates
    const candidatesWithVotes = candidates.map(candidate => {
      const voteData = voteCounts.find(v => v._id === candidate.id);
      return {
        ...candidate,
        vote_count: voteData ? voteData.vote_count : 0
      };
    }).sort((a, b) => b.vote_count - a.vote_count);

    // Calculate total votes
    const totalVotes = candidatesWithVotes.reduce((sum, candidate) => sum + candidate.vote_count, 0);

    // Get vote distribution by state (for national elections)
    let voteDistribution = [];
    if (election.election_type === 'PRESIDENTIAL' || !election.state_id) {
        voteDistribution = await db.collection('votes').aggregate([
          {
            $match: { election_id: new ObjectId(id) }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'voter'
            }
          },
          {
            $lookup: {
              from: 'geoData',
              localField: 'voter.state_id',
              foreignField: '_id',
              as: 'state'
            }
          },
          {
            $group: {
              _id: '$state._id',
              state_name: { $first: '$state.name' },
              vote_count: { $sum: 1 }
            }
          },
          {
            $sort: { vote_count: -1 }
          }
        ]).toArray();
    }

    // Get vote distribution by time
      const voteTimeline = await db.collection('votes').aggregate([
        {
          $match: { election_id: new ObjectId(id) }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d %H:00:00', date: '$created_at' }
            },
            vote_count: { $sum: 1 }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]).toArray();

    // Format the response
    res.json({
      success: true,
      data: {
        election: {
            id: election._id.toString(),
          title: election.title,
          description: election.description,
          election_type: election.election_type,
          start_date: election.start_date,
          end_date: election.end_date,
            total_votes: totalVotes,
            total_candidates: candidatesWithVotes.length
        },
        results: {
          total_votes: totalVotes,
            total_valid_votes: totalVotes,
          total_invalid_votes: 0,
          candidates: candidatesWithVotes.map(candidate => ({
              id: candidate.id,
              name: candidate.name,
              party: candidate.party,
              party_acronym: candidate.party_acronym,
            position: candidate.position,
              vote_count: candidate.vote_count,
            vote_percentage: totalVotes > 0 
                ? Math.round((candidate.vote_count / totalVotes) * 100 * 100) / 100 
              : 0
          })),
          winner: candidatesWithVotes.length > 0 ? {
              id: candidatesWithVotes[0].id,
              name: candidatesWithVotes[0].name,
              party: candidatesWithVotes[0].party,
              party_acronym: candidatesWithVotes[0].party_acronym,
            position: candidatesWithVotes[0].position,
              vote_count: candidatesWithVotes[0].vote_count,
            vote_percentage: totalVotes > 0 
                ? Math.round((candidatesWithVotes[0].vote_count / totalVotes) * 100 * 100) / 100 
              : 0
          } : null
        },
        vote_distribution: voteDistribution.map(item => ({
            state_id: item._id.toString(),
          state_name: item.state_name,
            vote_count: item.vote_count,
          vote_percentage: totalVotes > 0 
              ? Math.round((item.vote_count / totalVotes) * 100 * 100) / 100 
            : 0
        })),
        vote_timeline: voteTimeline.map(item => ({
            hour: item._id,
            vote_count: item.vote_count
        }))
      }
    });
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get voter analytics
 */
const getVoterAnalytics = async (req, res, next) => {
  try {
    // Set cache control headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
    // Get voter demographics
    const [
      totalVoters,
      genderDistribution,
      ageDistribution,
      stateDistribution,
      lgaDistribution,
      voterRegistrationTrend,
      voterTurnoutByElection
    ] = await Promise.all([
      // Total voters
        countVerifiedVoters(db),
      
      // Gender distribution
        db.collection('users').aggregate([
          {
            $match: {
              $or: [{ role: 'VOTER' }, { role: 'USER' }],
              nin_verified: true,
              registration_completed: true,
              gender: { $ne: null }
            }
          },
          {
            $group: {
              _id: '$gender',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ]).toArray(),
      
      // Age distribution
        db.collection('users').aggregate([
          {
            $match: {
              $or: [{ role: 'VOTER' }, { role: 'USER' }],
              nin_verified: true,
              registration_completed: true,
              date_of_birth: { $ne: null }
            }
          },
          {
            $addFields: {
              age: {
                $floor: {
                  $divide: [
                    { $subtract: [new Date(), '$date_of_birth'] },
                    365 * 24 * 60 * 60 * 1000
                  ]
                }
              }
            }
          },
          {
            $addFields: {
              age_group: {
                $multiply: [
                  { $floor: { $divide: ['$age', 10] } },
                  10
                ]
              }
            }
          },
          {
            $group: {
              _id: '$age_group',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { _id: 1 }
          }
        ]).toArray(),
      
      // State distribution
        db.collection('users').aggregate([
          {
            $match: {
              $or: [{ role: 'VOTER' }, { role: 'USER' }],
              nin_verified: true,
              registration_completed: true,
              state_id: { $ne: null }
            }
          },
          {
            $group: {
              _id: '$state_id',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $limit: 10
          }
        ]).toArray(),
      
      // LGA distribution (top 10)
        db.collection('users').aggregate([
          {
            $match: {
              $or: [{ role: 'VOTER' }, { role: 'USER' }],
              nin_verified: true,
              registration_completed: true,
              lga_id: { $ne: null }
            }
          },
          {
            $group: {
              _id: '$lga_id',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          },
          {
            $limit: 10
          }
        ]).toArray(),
      
      // Voter registration trend (last 12 months)
        db.collection('users').aggregate([
          {
            $match: {
              $or: [{ role: 'VOTER' }, { role: 'USER' }],
              created_at: { $gte: new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000) }
            }
          },
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m', date: '$created_at' }
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort: { _id: 1 }
          }
        ]).toArray(),
      
      // Voter turnout by election - from both collections
        Promise.all([
          db.collection('elections').aggregate([
            {
              $match: { status: 'COMPLETED' }
            },
            {
              $lookup: {
                from: 'votes',
                localField: '_id',
                foreignField: 'election_id',
                as: 'votes'
              }
            },
            {
              $addFields: {
                voters_voted: { $size: '$votes' }
              }
            },
            {
              $sort: { end_date: -1 }
            },
            {
              $limit: 5
            }
          ]).toArray(),
          db.collection('elections').aggregate([
            {
              $match: { status: 'COMPLETED' }
            },
            {
              $lookup: {
                from: 'votes',
                localField: '_id',
                foreignField: 'election_id',
                as: 'votes'
              }
            },
            {
              $addFields: {
                voters_voted: { $size: '$votes' }
              }
            },
            {
              $sort: { end_date: -1 }
            },
            {
              $limit: 5
            }
          ]).toArray()
        ]).then(([turnout1, turnout2]) => [...turnout1, ...turnout2].sort((a, b) => new Date(b.end_date) - new Date(a.end_date)).slice(0, 5))
    ]);

    // Since we're no longer using geo_data collection, we'll use the IDs directly
    // The frontend can resolve these IDs using the /api/geo-data endpoint
    const stateMap = {};
    const lgaMap = {};

    // Format the response
    res.json({
      success: true,
      data: {
        total_voters: totalVoters,
        gender_distribution: genderDistribution.map(item => ({
            gender: item._id,
            count: item.count,
            percentage: Math.round((item.count / totalVoters) * 100 * 100) / 100
        })),
        age_distribution: ageDistribution.map(item => ({
            age_group: `${item._id}-${item._id + 9}`, // e.g., 20-29
            count: item.count,
            percentage: Math.round((item.count / totalVoters) * 100 * 100) / 100
        })),
        state_distribution: stateDistribution
            .filter(item => stateMap[item._id.toString()]) // Only include states we found
          .map(item => ({
              state_id: item._id.toString(),
              state_name: stateMap[item._id.toString()],
              count: item.count,
              percentage: Math.round((item.count / totalVoters) * 100 * 100) / 100
          })),
        lga_distribution: lgaDistribution
            .filter(item => lgaMap[item._id.toString()]) // Only include LGAs we found
          .map(item => ({
              lga_id: item._id.toString(),
              lga_name: lgaMap[item._id.toString()],
              count: item.count,
              percentage: Math.round((item.count / totalVoters) * 100 * 100) / 100
          })),
        registration_trend: voterRegistrationTrend.map(item => ({
            month: item._id,
            count: item.count
        })),
        voter_turnout: voterTurnoutByElection.map(item => ({
            election_id: item._id.toString(),
            election_title: item.title,
          election_type: item.election_type,
          start_date: item.start_date,
          end_date: item.end_date,
            voters_voted: item.voters_voted,
            total_voters: totalVoters,
            turnout_percentage: Math.round((item.voters_voted / totalVoters) * 100 * 100) / 100
        }))
      }
    });
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
};

// Test endpoint to list all elections (for debugging)
const getAllElections = async (req, res, next) => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      // Get elections from both collections
      const allElections = await db.collection('elections').find({}).toArray();
      
      res.json({
        success: true,
        data: {
          elections: allElections,
          count: allElections.length
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
};

// Test geodata resolution
const testGeodata = async (req, res, next) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const geoDataPath = path.join(__dirname, '../geodata_full.ndjson');
    
    if (fs.existsSync(geoDataPath)) {
      const geoDataContent = fs.readFileSync(geoDataPath, 'utf-8');
      const geoData = JSON.parse(geoDataContent);
      
      // Test resolution for BEN state and BEN-LGA-01
      const benState = geoData.states?.find(state => state.state_id === 'BEN');
      const benLGA = geoData.lgas?.find(lga => lga.lga_id === 'BEN-LGA-01');
      
      res.json({
        success: true,
        data: {
          geoDataPath,
          fileExists: true,
          statesCount: geoData?.states?.length,
          lgasCount: geoData?.lgas?.length,
          testResults: {
            benState,
            benLGA
          }
        }
      });
    } else {
      res.json({
        success: false,
        data: {
          geoDataPath,
          fileExists: false
        }
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    });
  }
};

// Debug database connection and collections
const debugDatabase = async (req, res, next) => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db('election_system');
      
      console.log('🔍 Debug: Connected to database:', db.databaseName);
      
      // List all collections
      const collections = await db.listCollections().toArray();
      console.log('🔍 Debug: Available collections:', collections.map(c => c.name));
      
      // Check elections collections specifically
      const electionsCount = await db.collection('elections').countDocuments();
      console.log('🔍 Debug: Elections count:', electionsCount);
      
      // Get all elections
      // Get elections from both collections
      const allElections = await db.collection('elections').find({}).toArray();
      console.log('🔍 Debug: All elections:', allElections);
      
      res.json({
        success: true,
        data: {
          databaseName: db.databaseName,
          collections: collections.map(c => c.name),
          electionsCount,
          elections: allElections
        }
      });
      
    } finally {
      await client.close();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's vote history
 */
const getVoteHistory = async (req, res, next) => {
  try {
    // Set cache control headers to prevent caching
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      
      const userId = req.user.id;
      console.log('🔍 Vote History: Fetching votes for user ID:', userId);
      
      // Get user's votes with election details
      const votes = await db.collection('votes').aggregate([
        {
          $match: {
            voter_id: userId,
            status: 'success'
          }
        },
        {
          $addFields: {
            electionObjectId: { $toObjectId: '$election_id' }
          }
        },
        {
          $lookup: {
            from: 'elections',
            localField: 'electionObjectId',
            foreignField: '_id',
            as: 'election'
          }
        },
        {
          $unwind: '$election'
        },
        {
          $project: {
            _id: 1,
            election_id: 1,
            candidate_id: 1,
            sequential_position: 1,
            vote_timestamp: 1,
            status: 1,
            transaction_hash: 1,
            blockchain_block_number: 1,
            blockchain_gas_used: 1,
            election: {
              _id: 1,
              title: 1,
              description: 1,
              election_type: 1,
              status: 1,
              start_date: 1,
              end_date: 1,
              contestants: 1,
              wallet_address: 1
            }
          }
        },
        {
          $sort: { vote_timestamp: -1 }
        }
      ]).toArray();
      
      console.log('🔍 Vote History: Found votes:', votes.length);
      
      // Transform votes to include candidate information
      const transformedVotes = votes.map(vote => {
        const election = vote.election;
        const candidate = election.contestants?.find(c => c.id.toString() === vote.candidate_id.toString());
        
        return {
          id: vote._id.toString(),
          election_id: vote.election_id,
          candidate_id: vote.candidate_id,
          sequential_position: vote.sequential_position,
          vote_position: vote.sequential_position, // Add this for frontend compatibility
          vote_timestamp: vote.vote_timestamp,
          status: vote.status,
          // Blockchain data
          transaction_hash: vote.transaction_hash,
          blockchain_block_number: vote.blockchain_block_number,
          blockchain_gas_used: vote.blockchain_gas_used,
          election: {
            id: election._id.toString(),
            title: election.title,
            description: election.description,
            election_type: election.election_type,
            status: election.status,
            start_date: election.start_date,
            end_date: election.end_date,
            wallet_address: election.wallet_address
          },
          candidate: candidate ? {
            id: candidate.id,
            name: candidate.name,
            party: candidate.party,
            party_acronym: candidate.party_acronym
          } : null
        };
      });
      
      res.json({
        success: true,
        data: {
          votes: transformedVotes,
          totalVotes: transformedVotes.length
        }
      });
      
    } finally {
      await client.close();
    }
    
  } catch (error) {
    console.error('❌ Vote History error:', error);
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getElectionResultsSummary,
  getVoterAnalytics,
  getVoterDashboard,
  getAllElections,
  debugDatabase,
  testGeodata,
  getVoteHistory
};
