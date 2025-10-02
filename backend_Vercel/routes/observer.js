const express = require('express');
const { param, body } = require('express-validator');
const { getObserverElections, getObserverElectionDetails, checkBlockchainConsistency } = require('../controllers/blockchainController');
const { 
  getObserverElectionsWithBlockchain, 
  verifyElectionBlockchain, 
  getElectionTransactions, 
  getBlockchainNetworkStatus,
  observerLogin,
  observerRegister,
  getObserverProfile
} = require('../controllers/observerController');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

/**
 * Observer Login - Separate from voter/admin login
 * POST /api/observer/login
 */
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], validate(), observerLogin);

/**
 * Observer Registration - Separate from voter/admin registration  
 * POST /api/observer/register
 */
router.post('/register', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('organization')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Organization must be at least 2 characters long')
], validate(), observerRegister);

/**
 * Get Observer Profile - Separate from voter/admin profile
 * GET /api/observer/profile
 */
router.get('/profile', [
  auth,
  authorize('OBSERVER')
], getObserverProfile);

/**
 * Get all elections for observers with blockchain consistency
 * GET /api/observer/elections
 */
router.get('/elections', [
  auth,
  authorize('OBSERVER') // Only approved observers can access
], validate(), getObserverElections);

/**
 * Get elections with enhanced blockchain verification
 * GET /api/observer/elections/blockchain
 */
router.get('/elections/blockchain', [
  auth,
  authorize('OBSERVER') // Only approved observers can access
], validate(), getObserverElectionsWithBlockchain);

/**
 * Verify election blockchain consistency
 * GET /api/observer/elections/:electionId/verify
 */
router.get('/elections/:electionId/verify', [
  auth,
  authorize('OBSERVER'), // Only approved observers can access
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), verifyElectionBlockchain);

/**
 * Get election transactions for blockchain transparency
 * GET /api/observer/elections/:electionId/transactions
 */
router.get('/elections/:electionId/transactions', [
  auth,
  authorize('OBSERVER'), // Only approved observers can access
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), getElectionTransactions);

/**
 * Get blockchain network status
 * GET /api/observer/blockchain/status
 */
router.get('/blockchain/status', [
  auth,
  authorize('OBSERVER') // Only approved observers can access
], validate(), getBlockchainNetworkStatus);

/**
 * Check blockchain consistency for specific election
 * GET /api/observer/blockchain/consistency/:electionId
 */
router.get('/blockchain/consistency/:electionId', [
  auth,
  authorize('OBSERVER'), // Only approved observers can access
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), checkBlockchainConsistency);

/**
 * Get detailed election information for observers
 * GET /api/observer/election/:electionId
 */
router.get('/election/:electionId', [
  auth,
  authorize('OBSERVER'), // Only approved observers can access
  param('electionId').isMongoId().withMessage('Invalid election ID')
], validate(), getObserverElectionDetails);

module.exports = router;