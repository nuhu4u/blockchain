const express = require('express');
const { body, param, query } = require('express-validator');
const { electionController } = require('../controllers');
const { auth, authorize, hasPermission } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { validateElectionResponse } = require('../middleware/electionValidation');

const router = express.Router();

// Validation rules
const createElectionRules = [
  body('title').notEmpty().trim().isLength({ min: 5, max: 200 }),
  body('description').optional().trim(),
  body('start_date').isISO8601().toDate(),
  body('end_date').isISO8601().toDate(),
  body('election_type').isIn(['PRESIDENTIAL', 'GUBERNATORIAL', 'HOUSE_OF_ASSEMBLY', 'SENATORIAL', 'HOUSE_OF_REPS', 'LOCAL_GOVERNMENT']),
  body('state_id').optional().isMongoId(),
  body('lga_id').optional().isMongoId(),
  body('ward_id').optional().isMongoId(),
  body('polling_unit_id').optional().isMongoId(),
  body('status').optional().isIn(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']),
  body('candidates').optional().isArray(),
  body('candidates.*.user_id').isMongoId(),
  body('candidates.*.party_id').isMongoId(),
  body('candidates.*.position').notEmpty().trim(),
  body('candidates.*.manifesto').optional().trim()
];

const updateElectionRules = [
  param('id').isMongoId(),
  body('title').optional().trim().isLength({ min: 5, max: 200 }),
  body('description').optional().trim(),
  body('start_date').optional().isISO8601().toDate(),
  body('end_date').optional().isISO8601().toDate(),
  body('status').optional().isIn(['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED']),
  body('state_id').optional().isMongoId(),
  body('lga_id').optional().isMongoId(),
  body('ward_id').optional().isMongoId(),
  body('polling_unit_id').optional().isMongoId()
];

const addCandidateRules = [
  param('electionId').isMongoId(),
  body('user_id').isMongoId(),
  body('party_id').isMongoId(),
  body('position').notEmpty().trim(),
  body('manifesto').optional().trim()
];

const updateCandidateStatusRules = [
  param('electionId').isMongoId(),
  param('candidateId').isMongoId(),
  body('status').isIn(['APPROVED', 'REJECTED']),
  body('rejection_reason').if(body('status').equals('REJECTED')).notEmpty().trim()
];

// Public routes - simplified without validation for debugging
router.get('/', validateElectionResponse, electionController.getElections);

// Simple test route for debugging
router.get('/test-simple', async (req, res) => {
  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
    
    await client.connect();
    const db = client.db();
    const count = await db.collection('elections').countDocuments();
    await client.close();
    
    res.json({ 
      success: true, 
      message: 'Simple elections test',
      count: count
    });
  } catch (e) {
    res.status(500).json({ 
      error: 'Simple test failed', 
      detail: String(e?.message || e) 
    });
  }
});

router.get('/:id', [
  param('id').isMongoId()
], validate(), validateElectionResponse, electionController.getElectionById);

router.get('/:id/results', [
  param('id').isMongoId()
], validate(), electionController.getElectionResults);

// Get candidates for an election (candidates are now stored within elections)
router.get('/:id/candidates', [
  param('id').isMongoId()
], validate(), (req, res) => {
  res.status(410).json({
    success: false,
    message: 'This endpoint is deprecated. Candidates are now included in election details.',
    redirect: `/api/election/${req.params.id}`
  });
});

// Public votes endpoint - no authentication required
router.get('/:electionId/votes', [
  param('electionId').isMongoId()
], validate(), electionController.getElectionVotes);

// Protected routes (require authentication)
router.use(auth);

// Admin-only routes
router.post('/', [
  authorize('ADMIN'),
  validate(createElectionRules)
], electionController.createElection);

router.put('/:id', [
  authorize('ADMIN'),
  validate(updateElectionRules)
], electionController.updateElection);

router.delete('/:id', [
  authorize('ADMIN'),
  param('id').isMongoId()
], validate(), electionController.deleteElection);

// Candidate management (deprecated - candidates are now stored within elections)
router.post('/:electionId/candidates', [
  authorize('ADMIN'),
  param('electionId').isMongoId()
], validate(), (req, res) => {
  res.status(410).json({
    success: false,
    message: 'This endpoint is deprecated. Candidates are now managed within election creation.',
    redirect: `/api/election/${req.params.electionId}`
  });
});

router.put('/:electionId/candidates/:candidateId/status', [
  authorize('ADMIN'),
  param('electionId').isMongoId(),
  param('candidateId').isMongoId()
], validate(), (req, res) => {
  res.status(410).json({
    success: false,
    message: 'This endpoint is deprecated. Candidates are now managed within election creation.',
    redirect: `/api/election/${req.params.electionId}`
  });
});

router.delete('/:electionId/candidates/:candidateId', [
  authorize('ADMIN'),
  param('electionId').isMongoId(),
  param('candidateId').isMongoId()
], validate(), (req, res) => {
  res.status(410).json({
    success: false,
    message: 'This endpoint is deprecated. Candidates are now managed within election creation.',
    redirect: `/api/election/${req.params.electionId}`
  });
});

// Voter routes
router.post('/:electionId/vote', [
  auth, // Just require authentication, not specific permissions
  param('electionId').isMongoId(),
  body('candidate_id').notEmpty().withMessage('Candidate ID is required')
], validate(), electionController.castVote);

router.post('/:electionId/retry-sync', [
  auth, // Just require authentication, not specific permissions
  param('electionId').isMongoId()
], validate(), electionController.retryBlockchainSync);

router.get('/:electionId/my-vote', [
  hasPermission('view_own_vote'),
  param('electionId').isMongoId()
], validate(), electionController.getMyVote);

// Observer routes
router.get('/:electionId/observer', [
  hasPermission('view_election'),
  param('electionId').isMongoId()
], validate(), electionController.getElectionForObserver);

// Admin routes for vote count management
router.post('/:electionId/recalculate-votes', [
  authorize('ADMIN'),
  param('electionId').isMongoId()
], validate(), electionController.recalculateVoteCounts);

// PHASE 13: Admin retry endpoint for pending_chain votes
router.post('/retry-pending-votes', [
  authorize('ADMIN'),
  body('vote_id').optional().isMongoId(),
  body('election_id').optional().isMongoId()
], validate(), electionController.retryPendingVotes);

// Export the router
module.exports = router;
