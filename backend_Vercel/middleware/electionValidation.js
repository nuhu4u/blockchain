const { ApiError } = require('../utils/apiError');

/**
 * Middleware to validate that election documents have required fields
 * This ensures no invalid elections are processed by the API
 */
const validateElectionDocument = (req, res, next) => {
  const election = req.body.election || req.election || res.locals.election;
  
  if (!election) {
    return next(); // No election to validate
  }
  
  // Check for missing contract_address
  if (!election.contract_address) {
    console.log(`❌ Invalid election document: ${election._id || 'unknown'} - missing contract_address`);
    return next(new ApiError('Invalid election document: missing contract_address', 400));
  }
  
  // Check for archived elections
  if (election.archived) {
    console.log(`❌ Invalid election document: ${election._id || 'unknown'} - election is archived`);
    return next(new ApiError('Election is archived and cannot be processed', 410));
  }
  
  // Check for required fields
  if (!election.title || !election.election_type) {
    console.log(`❌ Invalid election document: ${election._id || 'unknown'} - missing required fields`);
    return next(new ApiError('Invalid election document: missing required fields', 400));
  }
  
  console.log(`✅ Election document validated: ${election._id || 'unknown'}`);
  next();
};

/**
 * Middleware to validate election responses include contract_address
 */
const validateElectionResponse = (req, res, next) => {
  const originalJson = res.json;
  
  res.json = function(data) {
    // Check if this is an election response
    if (data && (data.election || data.data || Array.isArray(data))) {
      const elections = Array.isArray(data) ? data : 
                      Array.isArray(data.data) ? data.data : 
                      data.election ? [data.election] : 
                      data.data ? [data.data] : [];
      
      elections.forEach(election => {
        if (election && typeof election === 'object' && election.election_type) {
          if (!election.contract_address) {
            console.log(`❌ Election response missing contract_address: ${election._id || election.id || 'unknown'}`);
            // Add a warning but don't fail the request
            election.contract_address = 'MISSING_CONTRACT_ADDRESS';
            election._warnings = election._warnings || [];
            election._warnings.push('Missing contract_address - election may be invalid');
          }
        }
      });
    }
    
    return originalJson.call(this, data);
  };
  
  next();
};

module.exports = {
  validateElectionDocument,
  validateElectionResponse
};
