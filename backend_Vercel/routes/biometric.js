const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  registerBiometric,
  verifyBiometric,
  getBiometricStatus,
  checkDuplicateFingerprint
} = require('../controllers/biometricController');

/**
 * Biometric Routes
 * All routes require authentication
 */

// Register biometric fingerprint
router.post('/register', auth, registerBiometric);

// Verify biometric for voting
router.post('/verify', auth, verifyBiometric);

// Get biometric registration status
router.get('/status', auth, getBiometricStatus);

// Check for duplicate fingerprints
router.post('/check-duplicate', auth, checkDuplicateFingerprint);

module.exports = router;
