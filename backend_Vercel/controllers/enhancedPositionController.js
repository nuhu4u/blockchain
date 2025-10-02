const { MongoClient, ObjectId } = require('mongodb');
const { ApiError } = require('../utils/apiError');

/**
 * Enhanced Position Tracking Controller
 * Handles complete position calculation with real geographic data
 */

/**
 * Calculate positions for a new vote using real geographic data
 */
async function calculateVotePositions(db, electionId, voterId, voterGeographicData) {
  try {
    console.log(`🎯 Calculating positions for vote: election=${electionId}, voter=${voterId}`);
    
    const votesCollection = db.collection('votes');
    const usersCollection = db.collection('users');
    
    // Get voter's actual geographic data
    const voter = await usersCollection.findOne({ _id: new ObjectId(voterId) });
    if (!voter) {
      throw new ApiError('Voter not found', 404);
    }
    
    // Use provided geographic data or voter's stored data
    const geoData = voterGeographicData || {
      polling_unit: voter.polling_unit || null,
      ward: voter.ward || null,
      lga: voter.lga || null,
      state: voter.state || null
    };
    
    console.log(`   🗺️ Voter geographic data:`, geoData);
    
    // 1. Calculate sequential position (overall in election)
    const totalVotesInElection = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success'
    });
    const sequentialPosition = totalVotesInElection + 1;
    
    console.log(`   📊 Sequential position: ${sequentialPosition} (total votes: ${totalVotesInElection})`);
    
    // 2. Calculate hierarchical positions
    const positions = {
      sequential_position: sequentialPosition,
      polling_unit_position: null,
      ward_position: null,
      lga_position: null,
      state_position: null,
      national_position: sequentialPosition,
      geographic_data: geoData
    };
    
    // Calculate polling unit position
    if (geoData.polling_unit) {
      const pollingUnitVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success',
        'geographic_data.polling_unit': geoData.polling_unit
      });
      positions.polling_unit_position = pollingUnitVotes + 1;
      console.log(`   🏘️ Polling unit position: ${positions.polling_unit_position} (PU: ${geoData.polling_unit})`);
    }
    
    // Calculate ward position
    if (geoData.ward) {
      const wardVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success',
        'geographic_data.ward': geoData.ward
      });
      positions.ward_position = wardVotes + 1;
      console.log(`   🏘️ Ward position: ${positions.ward_position} (Ward: ${geoData.ward})`);
    }
    
    // Calculate LGA position
    if (geoData.lga) {
      const lgaVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success',
        'geographic_data.lga': geoData.lga
      });
      positions.lga_position = lgaVotes + 1;
      console.log(`   🏘️ LGA position: ${positions.lga_position} (LGA: ${geoData.lga})`);
    }
    
    // Calculate state position
    if (geoData.state) {
      const stateVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success',
        'geographic_data.state': geoData.state
      });
      positions.state_position = stateVotes + 1;
      console.log(`   🏘️ State position: ${positions.state_position} (State: ${geoData.state})`);
    }
    
    console.log(`   ✅ Position calculation complete:`, positions);
    return positions;
    
  } catch (error) {
    console.error('❌ Error calculating vote positions:', error);
    throw error;
  }
}

/**
 * Update vote positions collection with hierarchical data
 */
async function updateVotePositionsCollection(db, electionId, positions, voterId) {
  try {
    console.log(`🔄 Updating vote_positions collection for election: ${electionId}`);
    
    const votePositionsCollection = db.collection('vote_positions');
    const now = new Date();
    
    // Update positions for each level
    const levels = [
      { level: 'polling_unit', level_id: positions.geographic_data.polling_unit, position: positions.polling_unit_position },
      { level: 'ward', level_id: positions.geographic_data.ward, position: positions.ward_position },
      { level: 'lga', level_id: positions.geographic_data.lga, position: positions.lga_position },
      { level: 'state', level_id: positions.geographic_data.state, position: positions.state_position },
      { level: 'national', level_id: 'NG', position: positions.national_position }
    ];
    
    for (const levelData of levels) {
      if (levelData.level_id && levelData.position) {
        // Update or insert position data
        await votePositionsCollection.updateOne(
          {
            election_id: new ObjectId(electionId),
            level: levelData.level,
            level_id: levelData.level_id
          },
          {
            $push: {
              positions: {
                voter_id: new ObjectId(voterId),
                position: levelData.position,
                timestamp: now
              }
            },
            $set: {
              last_updated: now,
              total_votes: levelData.position
            }
          },
          { upsert: true }
        );
        
        console.log(`   ✅ Updated ${levelData.level} positions (${levelData.level_id}): position ${levelData.position}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating vote positions collection:', error);
    throw error;
  }
}

/**
 * Get complete position data for an election
 */
async function getCompletePositionData(electionId) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log(`📊 Getting complete position data for election: ${electionId}`);
    
    const votesCollection = db.collection('votes');
    const electionsCollection = db.collection('elections');
    const votePositionsCollection = db.collection('vote_positions');
    
    // Get election info
    const election = await electionsCollection.findOne({ _id: new ObjectId(electionId) });
    if (!election) {
      throw new ApiError('Election not found', 404);
    }
    
    // Get total vote count
    const totalVotes = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success'
    });
    
    // Get last vote time
    const lastVote = await votesCollection.findOne(
      { election_id: electionId, status: 'success' },
      { sort: { vote_timestamp: -1 } }
    );
    
    // Get recent activity (votes in last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentVotes = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success',
      vote_timestamp: { $gte: oneHourAgo }
    });
    
    // Get all position data
    const positionData = await votePositionsCollection.find({
      election_id: new ObjectId(electionId)
    }).toArray();
    
    // Organize position data by level
    const positionsByLevel = {
      polling_unit: {},
      ward: {},
      lga: {},
      state: {},
      national: {}
    };
    
    positionData.forEach(pos => {
      positionsByLevel[pos.level][pos.level_id] = {
        total_votes: pos.total_votes,
        last_updated: pos.last_updated,
        positions: pos.positions
      };
    });
    
    const result = {
      election: {
        id: election._id,
        title: election.title,
        status: election.status,
        total_votes: totalVotes,
        last_vote_time: lastVote?.vote_timestamp || null,
        recent_activity: recentVotes
      },
      positions: positionsByLevel,
      statistics: {
        total_votes: totalVotes,
        last_updated: new Date(),
        recent_activity: recentVotes
      }
    };
    
    console.log(`✅ Complete position data retrieved: ${totalVotes} total votes`);
    return result;
    
  } catch (error) {
    console.error('❌ Error getting complete position data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Get user's specific position data
 */
async function getUserPositionData(electionId, userId) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log(`👤 Getting user position data: election=${electionId}, user=${userId}`);
    
    const votesCollection = db.collection('votes');
    const votePositionsCollection = db.collection('vote_positions');
    
    // Get user's vote
    const userVote = await votesCollection.findOne({
      election_id: electionId,
      voter_id: userId,
      status: 'success'
    });
    
    if (!userVote) {
      throw new ApiError('User has not voted in this election', 404);
    }
    
    // Get user's positions from vote_positions collection
    const userPositions = await votePositionsCollection.find({
      election_id: new ObjectId(electionId),
      'positions.voter_id': new ObjectId(userId)
    }).toArray();
    
    // Organize user's positions
    const positions = {
      polling_unit: null,
      ward: null,
      lga: null,
      state: null,
      national: null
    };
    
    userPositions.forEach(pos => {
      const userPos = pos.positions.find(p => p.voter_id.toString() === userId);
      if (userPos) {
        positions[pos.level] = {
          position: userPos.position,
          total: pos.total_votes,
          level_id: pos.level_id
        };
      }
    });
    
    const result = {
      user_id: userId,
      election_id: electionId,
      positions: positions,
      geographic_data: userVote.geographic_data,
      vote_timestamp: userVote.vote_timestamp
    };
    
    console.log(`✅ User position data retrieved:`, positions);
    return result;
    
  } catch (error) {
    console.error('❌ Error getting user position data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Get live refresh data (incremental updates)
 */
async function getLiveRefreshData(electionId, lastUpdateTime) {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db();
    
    console.log(`🔄 Getting live refresh data for election: ${electionId}`);
    
    const votesCollection = db.collection('votes');
    
    // Get new votes since last update
    const newVotes = await votesCollection.find({
      election_id: electionId,
      status: 'success',
      vote_timestamp: { $gt: lastUpdateTime }
    }).sort({ vote_timestamp: -1 }).toArray();
    
    // Get updated vote count
    const totalVotes = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success'
    });
    
    // Get recent activity (votes in last 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentActivity = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success',
      vote_timestamp: { $gte: tenMinutesAgo }
    });
    
    const result = {
      new_votes: newVotes.length,
      total_votes: totalVotes,
      recent_activity: recentActivity,
      last_updated: new Date(),
      new_votes_data: newVotes.map(vote => ({
        voter_id: vote.voter_id,
        timestamp: vote.vote_timestamp,
        geographic_data: vote.geographic_data
      }))
    };
    
    console.log(`✅ Live refresh data: ${newVotes.length} new votes, ${totalVotes} total`);
    return result;
    
  } catch (error) {
    console.error('❌ Error getting live refresh data:', error);
    throw error;
  } finally {
    await client.close();
  }
}

/**
 * Update position tracking metadata
 */
async function updatePositionMetadata(db, electionId, totalVotes) {
  try {
    console.log(`📊 Updating position metadata for election: ${electionId}, total votes: ${totalVotes}`);
    
    const positionMetadataCollection = db.collection('position_metadata');
    const now = new Date();
    
    // Update or insert position metadata
    await positionMetadataCollection.updateOne(
      { election_id: new ObjectId(electionId) },
      {
        $set: {
          election_id: new ObjectId(electionId),
          total_votes: totalVotes,
          last_updated: now,
          last_vote_time: now
        }
      },
      { upsert: true }
    );
    
    console.log(`   ✅ Position metadata updated: ${totalVotes} total votes`);
    
  } catch (error) {
    console.error('❌ Error updating position metadata:', error);
    throw error;
  }
}

module.exports = {
  calculateVotePositions,
  updateVotePositionsCollection,
  updatePositionMetadata,
  getCompletePositionData,
  getUserPositionData,
  getLiveRefreshData
};
