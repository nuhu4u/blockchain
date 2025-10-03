/**
 * Voter Utility Functions
 * Provides consistent voter counting and querying across the application
 */

/**
 * Get the standard voter query for counting verified and completed voters
 * This includes both VOTER and USER roles as they are both valid voter types
 */
const getVoterQuery = () => ({
  $or: [{ role: 'VOTER' }, { role: 'USER' }],
  nin_verified: true,
  registration_completed: true
});

/**
 * Get the standard voter query for counting all voters (verified and unverified)
 * This includes both VOTER and USER roles
 */
const getAllVoterQuery = () => ({
  $or: [{ role: 'VOTER' }, { role: 'USER' }]
});

/**
 * Get the standard voter query for counting voters with additional criteria
 * @param {Object} additionalCriteria - Additional criteria to add to the base query
 */
const getVoterQueryWithCriteria = (additionalCriteria = {}) => ({
  $or: [{ role: 'VOTER' }, { role: 'USER' }],
  nin_verified: true,
  registration_completed: true,
  ...additionalCriteria
});

/**
 * Get the standard voter query for counting all voters with additional criteria
 * @param {Object} additionalCriteria - Additional criteria to add to the base query
 */
const getAllVoterQueryWithCriteria = (additionalCriteria = {}) => ({
  $or: [{ role: 'VOTER' }, { role: 'USER' }],
  ...additionalCriteria
});

/**
 * Count verified and completed voters
 * @param {Object} db - Database connection
 * @param {Object} additionalCriteria - Additional criteria (optional)
 * @returns {Promise<number>} Count of verified voters
 */
const countVerifiedVoters = async (db, additionalCriteria = {}) => {
  const query = Object.keys(additionalCriteria).length > 0 
    ? getVoterQueryWithCriteria(additionalCriteria)
    : getVoterQuery();
  
  return await db.collection('users').countDocuments(query);
};

/**
 * Count all voters (verified and unverified)
 * @param {Object} db - Database connection
 * @param {Object} additionalCriteria - Additional criteria (optional)
 * @returns {Promise<number>} Count of all voters
 */
const countAllVoters = async (db, additionalCriteria = {}) => {
  const query = Object.keys(additionalCriteria).length > 0 
    ? getAllVoterQueryWithCriteria(additionalCriteria)
    : getAllVoterQuery();
  
  return await db.collection('users').countDocuments(query);
};

/**
 * Find voters with the standard query
 * @param {Object} db - Database connection
 * @param {Object} options - Query options (limit, sort, etc.)
 * @param {Object} additionalCriteria - Additional criteria (optional)
 * @returns {Promise<Array>} Array of voters
 */
const findVoters = async (db, options = {}, additionalCriteria = {}) => {
  const query = Object.keys(additionalCriteria).length > 0 
    ? getVoterQueryWithCriteria(additionalCriteria)
    : getVoterQuery();
  
  let cursor = db.collection('users').find(query);
  
  if (options.sort) {
    cursor = cursor.sort(options.sort);
  }
  
  if (options.limit) {
    cursor = cursor.limit(options.limit);
  }
  
  return await cursor.toArray();
};

module.exports = {
  getVoterQuery,
  getAllVoterQuery,
  getVoterQueryWithCriteria,
  getAllVoterQueryWithCriteria,
  countVerifiedVoters,
  countAllVoters,
  findVoters
};


