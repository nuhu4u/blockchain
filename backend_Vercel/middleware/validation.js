const { body, validationResult } = require('express-validator');
const securityUtils = require('../utils/security');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Generic validate function that can be used with any validation rules
const validate = (validationRules) => {
  // If no validation rules provided, return just the error handler
  if (!validationRules || !Array.isArray(validationRules)) {
    return [handleValidationErrors];
  }
  // Return validation rules with error handler
  return [...validationRules, handleValidationErrors];
};

// User registration validation
const validateUserRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('first_name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('last_name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  handleValidationErrors
];

// NIN validation
const validateNIN = [
  body('nin')
    .custom((value) => {
      if (!securityUtils.validateNIN(value)) {
        throw new Error('NIN must be exactly 11 digits');
      }
      return true;
    }),
  handleValidationErrors
];

// Login validation
const validateLogin = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or NIN is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Password reset request validation
const validatePasswordResetRequest = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or NIN is required'),
  handleValidationErrors
];

// OTP verification validation
const validateOTPVerification = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or NIN is required'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be exactly 6 digits'),
  handleValidationErrors
];

// Password reset validation
const validatePasswordReset = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or NIN is required'),
  body('otp')
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be exactly 6 digits'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  handleValidationErrors
];

// Election creation validation
const validateElectionCreation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Election title must be between 5 and 200 characters'),
  body('election_type')
    .isIn(['presidential', 'gubernatorial', 'senatorial', 'house_of_reps', 'state_assembly', 'local_government'])
    .withMessage('Invalid election type'),
  body('start_date')
    .isISO8601()
    .toDate()
    .withMessage('Valid start date is required'),
  body('end_date')
    .isISO8601()
    .toDate()
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.start_date)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  handleValidationErrors
];

// Vote validation
const validateVote = [
  body('election_id')
    .isUUID()
    .withMessage('Valid election ID is required'),
  body('candidate_id')
    .isUUID()
    .withMessage('Valid candidate ID is required'),
  handleValidationErrors
];

// Observer application validation
const validateObserverApplication = [
  body('full_name')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Full name must be between 5 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('phone_number')
    .isMobilePhone()
    .withMessage('Valid phone number is required'),
  body('organization_type')
    .isIn(['ngo', 'media', 'international', 'academic', 'civil_society', 'other'])
    .withMessage('Invalid organization type'),
  body('identification_type')
    .isIn(['nin', 'passport', 'drivers_license', 'voters_card'])
    .withMessage('Invalid identification type'),
  body('identification_number')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Identification number must be between 5 and 50 characters'),
  body('reason_for_observation')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Reason for observation must be between 50 and 1000 characters'),
  handleValidationErrors
];

// Observer registration validation
const validateObserverRegistration = [
  body('organizationName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Organization name must be between 2 and 100 characters'),
  
  body('organizationType')
    .isIn(['ngo', 'cso', 'academic', 'international', 'media', 'other'])
    .withMessage('Invalid organization type'),
  
  body('contactPerson')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Contact person name must be between 2 and 100 characters'),
  
  body('position')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Position must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .matches(/^\d{10,11}$/)
    .withMessage('Phone number must be 10-11 digits'),
  
  body('address')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Address must be between 10 and 500 characters'),
  
  body('website')
    .optional()
    .custom((value) => {
      if (!value) return true; // Website is optional
      // Accept both full URLs (https://example.com) and domain names (example.com)
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
      if (!urlRegex.test(value)) {
        throw new Error('Please provide a valid website URL or domain name (e.g., example.com or https://example.com)');
      }
      return true;
    }),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validate,
  validateUserRegistration,
  validateNIN,
  validateLogin,
  validatePasswordResetRequest,
  validateOTPVerification,
  validatePasswordReset,
  validateElectionCreation,
  validateVote,
  validateObserverApplication,
  validateObserverRegistration
};
