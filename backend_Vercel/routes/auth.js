const express = require('express');
const { body } = require('express-validator');
const { authController } = require('../controllers');
const { auth, authorize, requireNinVerification, requireRegistrationComplete } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const logger = require('../utils/logger');

const router = express.Router();

// Add cache control headers to all auth routes
router.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  next();
});

// Validation rules
const registerRules = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom((value) => {
      // Additional email validation
      if (value.length > 254) {
        throw new Error('Email address is too long');
      }
      
      const parts = value.split('@');
      if (parts.length !== 2) {
        throw new Error('Invalid email format');
      }
      
      const localPart = parts[0];
      const domain = parts[1];
      
      if (localPart.length === 0 || localPart.length > 64) {
        throw new Error('Invalid email local part');
      }
      
      if (domain.length === 0 || domain.length > 253) {
        throw new Error('Invalid email domain');
      }
      
      if (!domain.includes('.')) {
        throw new Error('Invalid email domain');
      }
      
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('first_name')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('last_name')
    .notEmpty()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('phone_number')
    .notEmpty()
    .trim()
    .custom((value) => {
      // Nigerian phone number validation - accept both original and formatted versions
      const cleanPhone = value.replace(/[^\d+]/g, '');
      const patterns = [
        /^\+234[789]\d{9}$/,     // +234 + 9 digits starting with 7, 8, or 9 (formatted)
        /^234[789]\d{9}$/,       // 234 + 9 digits starting with 7, 8, or 9 (formatted without +)
        /^0[789]\d{9}$/,         // 0 + 9 digits starting with 7, 8, or 9 (11 total - original)
        /^[789]\d{9}$/           // 9 digits starting with 7, 8, or 9 (10 total - original)
      ];
      
      if (!patterns.some(pattern => pattern.test(cleanPhone))) {
        throw new Error('Please enter a valid Nigerian phone number (e.g., 09080018688 or +2349080018688)');
      }
      return true;
    }),
  body('date_of_birth')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Date of birth must be a valid date'),
  body('gender')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Gender must be either male or female'),
  body('address')
    .optional()
    .trim()
    .isLength({ min: 5, max: 500 })
    .withMessage('Address must be between 5 and 500 characters'),
  // State of Origin validation
  body('state_of_origin_id')
    .optional()
    .isString()
    .withMessage('State of origin ID must be a string'),
  body('lga_of_origin_id')
    .optional()
    .isString()
    .withMessage('LGA of origin ID must be a string'),
  // State of Residence validation
  body('state_id')
    .optional()
    .isString()
    .withMessage('State of residence ID must be a string'),
  body('lga_id')
    .optional()
    .isString()
    .withMessage('LGA of residence ID must be a string'),
  body('ward_id')
    .optional()
    .isString()
    .withMessage('Ward ID must be a string'),
  body('polling_unit_id')
    .optional()
    .isString()
    .withMessage('Polling unit ID must be a string')
];

const loginRules = [
  body('emailOrNin')
    .notEmpty()
    .withMessage('Email, NIN, or username is required')
    .custom((value) => {
      // Check if it's an email, NIN, or simple username (for admin)
      const isEmail = value.includes('@');
      const isNIN = /^\d{11}$/.test(value);
      const isSimpleUsername = /^[a-zA-Z0-9_]{3,20}$/.test(value); // Allow simple usernames
      
      if (!isEmail && !isNIN && !isSimpleUsername) {
        throw new Error('Please enter a valid email address, 11-digit NIN, or username');
      }
      return true;
    }),
  body('password').notEmpty().withMessage('Password is required')
];

const ninRules = [
  body('nin').matches(/^\d{11}$/).withMessage('NIN must be 11 digits')
];

const forgotPasswordRules = [
  body('email').isEmail().normalizeEmail()
];

const resetPasswordRules = [
  body('email').isEmail().normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }),
  body('newPassword').isLength({ min: 8 })
];

const changePasswordRules = [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 })
];

const updateProfileRules = [
  body('email').optional().isEmail().normalizeEmail(),
  body('phone_number').optional().trim(),
  body('password').optional().isLength({ min: 8 })
];

// Public routes
router.post('/register', validate(registerRules), authController.register);
router.post('/login', validate(loginRules), authController.login);
router.post('/forgot-password', validate(forgotPasswordRules), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordRules), authController.resetPassword);
router.post('/check-phone', authController.checkPhoneExists);
router.post('/check-email', authController.checkEmailExists);

// Protected routes (require authentication and user role)
router.use(auth);
router.use(authorize('VOTER', 'USER')); // Only allow VOTER and USER roles

// User profile
router.get('/me', authController.getMe);
router.put('/me', validate(updateProfileRules), authController.updateProfile);
router.post('/change-password', validate(changePasswordRules), authController.changePassword);

// NIN verification
router.post('/nin', validate(ninRules), authController.submitNIN);
router.get('/nin/status', authController.checkNINStatus);

// Verify OTP
router.post('/verify-otp', validate(resetPasswordRules), authController.verifyOTP);

// Reset password
router.post('/reset-password', validate(resetPasswordRules), authController.resetPassword);

// Get current user profile
router.get('/profile', authController.getProfile);

// Logout (client-side token removal, but we can log it)
router.post('/logout', async (req, res) => {
  try {
    if (req.user) {
      logger.info(`User logged out: ${req.user.email}`);
    }
    
    res.json({
      success: true,
      message: 'Logged out successfully',
      redirectTo: '/', // Always redirect to homepage after logout
      clearToken: true
    });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      redirectTo: '/' // Still redirect to homepage even on error
    });
  }
});

module.exports = router;
