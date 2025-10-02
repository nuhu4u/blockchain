const { MongoClient, ObjectId } = require('mongodb');
const { ApiError } = require('../utils/apiError');

/**
 * Position Tracking Controller
 * Handles calculation and management of vote positions across all electoral levels
 */

/**
 * Calculate positions for a new vote
 * @param {Object} db - Database connection
 * @param {string} electionId - Election ID
 * @param {string} voterId - Voter ID
 * @param {Object} voterGeographicData - Voter's geographic information
 * @returns {Object} Calculated positions
 */
async function calculateVotePositions(db, electionId, voterId, voterGeographicData) {
  try {
    console.log(`🎯 Calculating positions for vote: election=${electionId}, voter=${voterId}`);
    
    const votesCollection = db.collection('votes');
    const usersCollection = db.collection('users');
    
    // 1. Calculate sequential position (overall position in this election)
    const totalVotesInElection = await votesCollection.countDocuments({
      election_id: electionId,
      status: 'success'
    });
    const sequentialPosition = totalVotesInElection + 1; // +1 because this vote hasn't been counted yet
    
    console.log(`   📊 Sequential position: ${sequentialPosition} (total votes in election: ${totalVotesInElection})`);
    
    // 2. Get voter's geographic data
    const voter = await usersCollection.findOne({ _id: new ObjectId(voterId) });
    if (!voter) {
      throw new ApiError('Voter not found', 404);
    }
    
    // Use provided geographic data or fallback to voter's stored data
    const geoData = voterGeographicData || {
      polling_unit: voter.polling_unit || null,
      ward: voter.ward || null,
      lga: voter.lga || null,
      state: voter.state || null
    };
    
    console.log(`   🗺️ Voter geographic data:`, geoData);
    
    // 3. Calculate hierarchical positions
    const positions = {
      sequential_position: sequentialPosition,
      polling_unit_position: null,
      ward_position: null,
      lga_position: null,
      state_position: null,
      national_position: sequentialPosition, // Same as sequential for national
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
      console.log(`   🗳️ Polling unit position: ${positions.polling_unit_position} (PU: ${geoData.polling_unit})`);
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
      console.log(`   🏛️ LGA position: ${positions.lga_position} (LGA: ${geoData.lga})`);
    }
    
    // Calculate state position
    if (geoData.state) {
      const stateVotes = await votesCollection.countDocuments({
        election_id: electionId,
        status: 'success',
        'geographic_data.state': geoData.state
      });
      positions.state_position = stateVotes + 1;
      console.log(`   🌍 State position: ${positions.state_position} (State: ${geoData.state})`);
    }
    
    // Add metadata
    positions.position_calculated = true;
    positions.position_updated_at = new Date();
    
    console.log(`   ✅ Position calculation complete:`, positions);
    
    return positions;
    
  } catch (error) {
    console.error('❌ Error calculating vote positions:', error);
    throw error;
  }
}

/**
 * Update vote positions in the vote_positions collection
 * @param {Object} db - Database connection
 * @param {string} electionId - Election ID
 * @param {Object} positions - Calculated positions
 * @param {string} voterId - Voter ID
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
        // Update or create position record for this level
        await votePositionsCollection.updateOne(
          {
            election_id: electionId,
            level: levelData.level,
            level_id: levelData.level_id
          },
          {
            $set: {
              election_id: electionId,
              level: levelData.level,
              level_id: levelData.level_id,
              total_votes: levelData.position, // This will be the total after this vote
              last_updated: now
            },
            $push: {
              positions: {
                voter_id: voterId,
                position: levelData.position,
                timestamp: now
              }
            }
          },
          { upsert: true }
        );
        
        console.log(`   ✅ Updated ${levelData.level} positions (${levelData.level_id}): position ${levelData.position}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error updating vote_positions collection:', error);
    throw error;
  }
}

/**
 * Update position tracking metadata
 * @param {Object} db - Database connection
 * @param {string} electionId - Election ID
 * @param {number} totalVotes - Total votes in election
 */
async function updatePositionMetadata(db, electionId, totalVotes) {
  try {
    console.log(`📊 Updating position metadata for election: ${electionId}`);
    
    const metadataCollection = db.collection('position_tracking_metadata');
    
    await metadataCollection.updateOne(
      { election_id: electionId },
      {
        $set: {
          total_votes_calculated: totalVotes,
          last_calculation: new Date(),
          calculation_status: 'completed',
          updated_at: new Date()
        }
      }
    );
    
    console.log(`   ✅ Updated metadata: ${totalVotes} votes calculated`);
    
  } catch (error) {
    console.error('❌ Error updating position metadata:', error);
    throw error;
  }
}

/**
 * Recalculate all positions for an election (for existing votes)
 * @param {Object} db - Database connection
 * @param {string} electionId - Election ID
 */
async function recalculateElectionPositions(db, electionId) {
  try {
    console.log(`🔄 Recalculating all positions for election: ${electionId}`);
    
    const votesCollection = db.collection('votes');
    const usersCollection = db.collection('users');
    
    // Get all votes for this election
    const votes = await votesCollection.find({
      election_id: electionId,
      status: 'success'
    }).sort({ vote_timestamp: 1 }).toArray(); // Sort by vote timestamp for correct sequence
    
    console.log(`   📊 Found ${votes.length} votes to recalculate`);
    
    // Clear existing position data
    await votesCollection.updateMany(
      { election_id: electionId },
      {
        $unset: {
          sequential_position: "",
          polling_unit_position: "",
          ward_position: "",
          lga_position: "",
          state_position: "",
          national_position: "",
          geographic_data: "",
          position_calculated: "",
          position_updated_at: ""
        }
      }
    );
    
    // Clear vote_positions collection for this election
    await db.collection('vote_positions').deleteMany({ election_id: electionId });
    
    // Recalculate positions for each vote
    for (let i = 0; i < votes.length; i++) {
      const vote = votes[i];
      console.log(`   🔄 Recalculating vote ${i + 1}/${votes.length}: ${vote._id}`);
      
      // Get voter's geographic data
      const voter = await usersCollection.findOne({ _id: new ObjectId(vote.voter_id) });
      if (!voter) {
        console.log(`   ⚠️ Voter not found: ${vote.voter_id}`);
        continue;
      }
      
      const geoData = {
        polling_unit: voter.polling_unit || null,
        ward: voter.ward || null,
        lga: voter.lga || null,
        state: voter.state || null
      };
      
      // Calculate positions
      const positions = await calculateVotePositions(db, electionId, vote.voter_id, geoData);
      
      // Update vote with calculated positions
      await votesCollection.updateOne(
        { _id: vote._id },
        { $set: positions }
      );
      
      // Update vote_positions collection
      await updateVotePositionsCollection(db, electionId, positions, vote.voter_id);
    }
    
    // Update metadata
    await updatePositionMetadata(db, electionId, votes.length);
    
    console.log(`   ✅ Recalculation complete for election: ${electionId}`);
    
  } catch (error) {
    console.error('❌ Error recalculating election positions:', error);
    throw error;
  }
}

/**
 * Get position data for a specific election and level
 * @param {Object} db - Database connection
 * @param {string} electionId - Election ID
 * @param {string} level - Level (polling_unit, ward, lga, state, national)
 * @param {string} levelId - Level identifier (optional)
 * @returns {Object} Position data
 */
async function getPositionData(db, electionId, level, levelId = null) {
  try {
    console.log(`📊 Getting position data: election=${electionId}, level=${level}, levelId=${levelId}`);
    
    const votePositionsCollection = db.collection('vote_positions');
    
    const query = {
      election_id: electionId,
      level: level
    };
    
    if (levelId) {
      query.level_id = levelId;
    }
    
    const positionData = await votePositionsCollection.find(query).toArray();
    
    console.log(`   ✅ Found ${positionData.length} position records`);
    
    return positionData;
    
  } catch (error) {
    console.error('❌ Error getting position data:', error);
    throw error;
  }
}

/**
 * Get user's positions across all levels for an election
 * @param {Object} db - Database connection
 * @param {string} electionId - Election ID
 * @param {string} voterId - Voter ID
 * @returns {Object} User's position data
 */
async function getUserPositions(db, electionId, voterId) {
  try {
    console.log(`👤 Getting user positions: election=${electionId}, voter=${voterId}`);
    
    const votesCollection = db.collection('votes');
    
    const vote = await votesCollection.findOne({
      election_id: electionId,
      $or: [
        { voter_id: voterId },
        { userId: voterId }
      ],
      status: 'success'
    });
    
    if (!vote) {
      return null;
    }
    
    const userPositions = {
      election_id: electionId,
      voter_id: voterId,
      vote_timestamp: vote.vote_timestamp,
      transaction_hash: vote.transaction_hash,
      positions: {
        sequential: vote.sequential_position,
        polling_unit: vote.polling_unit_position,
        ward: vote.ward_position,
        lga: vote.lga_position,
        state: vote.state_position,
        national: vote.national_position
      },
      geographic_data: vote.geographic_data,
      position_calculated: vote.position_calculated,
      position_updated_at: vote.position_updated_at
    };
    
    console.log(`   ✅ User positions retrieved:`, userPositions.positions);
    
    return userPositions;
    
  } catch (error) {
    console.error('❌ Error getting user positions:', error);
    throw error;
  }
}

module.exports = {
  calculateVotePositions,
  updateVotePositionsCollection,
  updatePositionMetadata,
  recalculateElectionPositions,
  getPositionData,
  getUserPositions
};
