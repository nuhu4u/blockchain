const express = require('express');
const { body } = require('express-validator');
const { adminController } = require('../controllers');
const { auth, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/crypto');
const { ApiError } = require('../utils/apiError');
const logger = require('../utils/logger');

// JWT startup debug log
if (process.env.DEBUG_AUTH === 'true') {
  console.log('🔐 JWT Configuration:', {
    secretPresent: !!process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
  // Note: Regenerating .env invalidates old tokens
}

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', validate([
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
]), adminController.registerAdmin);

router.post('/logout', adminController.logoutAdmin);

router.post('/login', validate([
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
]), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Debug logging
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔐 ADMIN LOGIN - Request received:', { 
        role: 'ADMIN',
        hasPassword: !!password,
        identityType: 'email',
        email: email ? email.substring(0, 3) + '***' : 'undefined',
        timestamp: new Date().toISOString()
      });
    }
    
    console.log('👑 Admin login attempt:', { email, hasPassword: !!password });

    // Connect to MongoDB
    const client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db('election_system');
    
    // Debug log showing actual database name
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔌 Mongo target DB:', db.databaseName);
    }

    // Sanitize and normalize email input
    const raw = (email || "").toString();
    const normalized = raw.trim().toLowerCase();
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Debug logging for email processing
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔐 ADMIN LOGIN - Email processing:', {
        raw: raw.substring(0, 3) + '***',
        normalized: normalized.substring(0, 3) + '***',
        charCodes: Array.from(normalized).slice(0, 5).map(c => c.charCodeAt(0))
      });
    }
    
    // Search with case-insensitive regex and exact match
    const query = {
      $or: [
        { email: normalized },
        { email: { $regex: `^${esc(normalized)}$`, $options: 'i' } }
      ]
    };
    
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔐 ADMIN LOGIN - Database query:', {
        db: db.databaseName,
        coll: 'admin',
        query: { $or: [{ email: normalized }, { email: { $regex: `^${esc(normalized)}$`, $options: 'i' } }] }
      });
    }

    // Search ONLY in admin collection
    const admin = await db.collection('admin').findOne(query);
    await client.close();

    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔐 ADMIN LOGIN - Database query result:', { 
        found: !!admin,
        role: admin ? admin.role : 'none',
        id: admin ? admin._id.toString() : 'none',
        adminEmail: admin ? admin.email : 'none'
      });
    }

    if (!admin) {
      if (process.env.DEBUG_AUTH === 'true') {
        console.log('❌ ADMIN LOGIN - Admin not found in database');
      }
      throw new ApiError('Invalid credentials - Admin not found', 401);
    }

    // Check if admin is active
    if (!admin.is_active) {
      throw new ApiError('Admin account is deactivated. Please contact support.', 403);
    }

    // Verify password
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔐 ADMIN LOGIN - Checking password:', {
        hasHash: !!admin.password_hash,
        isBcrypt: admin.password_hash ? admin.password_hash.startsWith('$2') : false,
        hashLength: admin.password_hash ? admin.password_hash.length : 0
      });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      if (process.env.DEBUG_AUTH === 'true') {
        console.log('❌ ADMIN LOGIN - Password verification failed');
      }
      throw new ApiError('Invalid credentials - Wrong password', 401);
    }
    
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('✅ ADMIN LOGIN - Password verification successful');
    }

    // Generate JWT token
    const token = generateToken(admin._id.toString());
    
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔐 ADMIN LOGIN - JWT token generated:', {
        tokenLength: token.length,
        adminId: admin._id.toString(),
        jwtSecret: !!process.env.JWT_SECRET,
        jwtExpiresIn: process.env.JWT_EXPIRES_IN
      });
      
      // Decode token to show expiration details
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.decode(token);
        const expRelative = decoded.exp ? new Date(decoded.exp * 1000).toISOString() : 'unknown';
        console.log('🔐 ADMIN LOGIN - Token details:', {
          sub: decoded.userId,
          role: admin.role || 'ADMIN',
          expRelative: expRelative
        });
      } catch (decodeError) {
        console.log('⚠️ ADMIN LOGIN - Could not decode token:', decodeError.message);
      }
    }

    // Update last login
    const updateClient = new MongoClient(process.env.DATABASE_URL);
    try {
      await updateClient.connect();
      const updateDb = updateClient.db('election_system');
      await updateDb.collection('admin').updateOne(
        { _id: admin._id },
        { 
          $set: { 
            last_login: new Date(),
            updated_at: new Date()
          }
        }
      );
      await updateClient.close();
    } catch (updateError) {
      console.error('⚠️ Failed to update last_login, but login continues:', updateError);
    }

    // Prepare admin data (exclude sensitive information)
    const adminData = {
      id: admin._id.toString(),
      email: admin.email,
      role: 'ADMIN',
      first_name: admin.first_name || null,
      last_name: admin.last_name || null,
      permissions: admin.permissions || [],
      created_at: admin.created_at,
      last_login: admin.last_login
    };

    console.log('👑 Admin login successful:', { adminId: adminData.id, email: adminData.email });

    // Set HTTP-only cookie for authentication
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    // Return success response
    res.json({
      success: true,
      message: 'Admin login successful. Welcome to Admin Panel!',
      user: adminData,
      token: token,
      redirectTo: '/admin',
      canAccessDashboard: true
    });

  } catch (error) {
    next(error);
  }
});

// Protected routes (require authentication)
router.use(auth);
router.use(authorize('ADMIN'));

// Admin-specific routes
router.get('/dashboard', adminController.getDashboard);
router.get('/observers', adminController.getObservers);
router.get('/observers/:observerId', adminController.getObserverDetails);
router.post('/observers/:observerId/approve', adminController.approveObserver);
router.post('/observers/:observerId/reject', adminController.rejectObserver);
router.get('/reports', adminController.getObservationReports);
router.get('/me', adminController.getMe);
router.put('/me', adminController.updateProfile);

// Election management routes
router.post('/elections', adminController.createElection);
router.get('/elections', adminController.getElections);
router.delete('/elections/:id', adminController.deleteElection);

// System statistics routes
router.put('/system-stats', validate([
  body('totalVoters').isNumeric().withMessage('Total voters must be a number'),
  body('totalVoters').isInt({ min: 0 }).withMessage('Total voters must be a positive number')
]), adminController.updateSystemStats);

/*
SUGGESTIONS (do not apply, just comments):
- Add emailLower field and unique index { emailLower: 1 } with collation strength 2 for faster case-insensitive lookups
- Add unique index for nin_hmac/hashed_nin if allowed by schema
- Centralize sanitize/escape helpers in utils/crypto.js
- Add automated e2e test for User/Admin/Observer login flows
- Consider adding rate limiting per IP for login attempts
- Add audit logging for successful/failed login attempts
- Consider moving admin login logic to adminController.js for consistency
*/

module.exports = router;
