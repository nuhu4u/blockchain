const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');
const { MongoClient } = require('mongodb');

/**
 * Middleware to authenticate user using JWT
 */
const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookie
    const authHeader = req.header('Authorization');
    const bearer = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const cookieToken = req.cookies?.token;
    const token = bearer || cookieToken;
    
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🛡️ Backend auth:', { hasBearer: !!bearer, hasCookie: !!cookieToken });
    }
    
    // Vote casting requires proper authentication - no special handling needed
    
    if (!token) {
      throw new ApiError('No authentication token provided', 401);
    }

    // Validate token format (basic check)
    if (typeof token !== 'string' || token.trim().length === 0) {
      throw new ApiError('Invalid token format', 401);
    }

    // Check for test token (development only)
    if (token === 'test-token-for-development' && process.env.NODE_ENV === 'development') {
      // Create a mock user for testing
      req.user = {
        id: 'test-user-id',
        email: 'test@example.com',
        userType: 'voter',
        isAdmin: false
      };
      return next();
    }

    // VERIFY JWT TOKEN - Proper verification with secret
    let decoded;
    try {
      // Verify token with secret to ensure it's valid and not tampered with
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (process.env.DEBUG_AUTH === 'true') {
        console.log('🔓 Token verified successfully:', { userId: decoded?.userId, hasUserId: !!decoded?.userId });
      }
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError.message);
      throw new ApiError('Invalid or expired token', 401);
    }
    
    // Check if decoded token has the expected structure
    if (!decoded || typeof decoded !== 'object') {
      if (process.env.DEBUG_AUTH === 'true') {
        console.log('❌ Invalid token structure:', decoded);
      }
      throw new ApiError('Invalid token structure', 401);
    }
    
    if (!decoded.userId) {
      if (process.env.DEBUG_AUTH === 'true') {
        console.log('❌ Missing userId in token:', decoded);
      }
      throw new ApiError('Invalid token payload: missing userId', 401);
    }
    
    try {
      // Search in both admin and users collections
      const client = new MongoClient(process.env.DATABASE_URL);
      let user;
      
      try {
        await client.connect();
        const db = client.db('election_system');
        
        // Search in admin collection first
        user = await db.collection('admin').findOne(
          { _id: new (require('mongodb').ObjectId)(decoded.userId) },
          { projection: {
            id: '$_id',
            email: 1,
            first_name: 1,
            last_name: 1,
            role: 1,
            is_active: 1,
            nin_verified: 1,
            registration_completed: 1,
            created_at: 1,
            updated_at: 1,
          }}
        );
        
        // If not found in admin, search in users collection
        if (!user) {
          user = await db.collection('users').findOne(
            { _id: new (require('mongodb').ObjectId)(decoded.userId) },
            { projection: {
              id: '$_id',
              email: 1,
              first_name: 1,
              last_name: 1,
              role: 1,
              is_active: 1,
              nin_verified: 1,
              registration_completed: 1,
              created_at: 1,
              updated_at: 1,
            }}
          );
        }
        
        // If not found in users, search in observers collection
        if (!user) {
          console.log('🔍 Searching for observer with userId:', decoded.userId);
          user = await db.collection('observers').findOne(
            { _id: new (require('mongodb').ObjectId)(decoded.userId) },
            { projection: {
              id: '$_id',
              email: 1,
              first_name: 1,
              last_name: 1,
              role: 1,
              is_active: 1,
              organization_name: 1,
              organization_type: 1,
              website: 1,
              phone: 1,
              country_code: 1,
              address: 1,
              status: 1,
              created_at: 1,
              updated_at: 1,
            }}
          );
          if (user) {
            console.log('👁️ Observer found:', {
              id: user.id,
              email: user.email,
              role: user.role,
              is_active: user.is_active,
              status: user.status
            });
          } else {
            console.log('❌ Observer not found in database');
          }
        }
        
        // Convert MongoDB _id to string id for consistency
        if (user) {
          user.id = user._id.toString();
        }
        
        await client.close();
      } catch (error) {
        await client.close();
        throw new ApiError('Database error during authentication', 500);
      }
      
      console.log('🔍 User found:', user ? 'Yes' : 'No');

      if (!user) {
        throw new ApiError('User not found', 404);
      }

      // Check if user is active
      if (!user.is_active) {
        throw new ApiError('User account is deactivated', 403);
      }

      // Attach user and token to request object
      req.user = user;
      req.token = token;
      
      next();
    } catch (dbError) {
      if (dbError instanceof ApiError) {
        throw dbError;
      }
      throw new ApiError('Database error during authentication', 500);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    // Handle any other unexpected errors
    return next(new ApiError('Authentication failed', 401));
  }
};

/**
 * Middleware to check if user has required roles
 * @param {...string} roles - Roles that are allowed to access the route
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError('Authentication required', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

/**
 * Middleware to check if user has required permissions
 * @param {...string} permissions - Permissions required to access the route
 */
const hasPermission = (...requiredPermissions) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new ApiError('Authentication required', 401);
      }

      // Handle test user case (development only)
      if (req.user.id === 'test-user-id' && process.env.NODE_ENV === 'development') {
        // Test user has all permissions for development
        return next();
      }

      // Get user with permissions based on role
      const client = new MongoClient(process.env.DATABASE_URL);
      let userWithPermissions;
      
      try {
        await client.connect();
        const db = client.db('election_system');
        
        // Convert string ID to ObjectId
        const userId = new (require('mongodb').ObjectId)(req.user.id);
        
        // Search in both collections
        userWithPermissions = await db.collection('admin').findOne(
          { _id: userId },
          { projection: { role: 1 } }
        );
        
        if (!userWithPermissions) {
          userWithPermissions = await db.collection('users').findOne(
            { _id: userId },
            { projection: { role: 1 } }
          );
        }
        
        await client.close();
      } catch (error) {
        await client.close();
        throw new ApiError('Database error during permission check', 500);
      }

      if (!userWithPermissions) {
        throw new ApiError('User not found', 404);
      }

      // In a real application, you would check the user's permissions here
      // This is a simplified example - you would typically have a more complex permission system
      const userPermissions = [];
      
      // Add role-based permissions
      switch (userWithPermissions.role) {
        case 'ADMIN':
          userPermissions.push('*'); // Admins have all permissions
          break;
        case 'OBSERVER':
          userPermissions.push('view_elections', 'view_results');
          break;
        case 'VOTER':
          userPermissions.push('vote', 'view_own_vote');
          break;
      }

      // Check if user has all required permissions
      const hasAllPermissions = requiredPermissions.every(permission => 
        userPermissions.includes(permission) || userPermissions.includes('*')
      );

      if (!hasAllPermissions) {
        throw new ApiError('Insufficient permissions', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user has verified their NIN
 */
const requireNinVerification = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError('Authentication required', 401));
  }

  if (!req.user.nin_verified) {
    return next(new ApiError('NIN verification required', 403));
  }

  next();
};

/**
 * Middleware to check if user has completed registration
 */
const requireRegistrationComplete = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError('Authentication required', 401));
  }

  if (!req.user.registration_completed) {
    return next(new ApiError('Registration not completed', 403));
  }

  next();
};

/**
 * Middleware to check if user has fully completed NIN verification before accessing protected routes
 */
const requireFullNinVerification = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new ApiError('Authentication required', 401));
    }

    // Get fresh user data to ensure we have latest verification status
    const client = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await client.connect();
      const db = client.db();
      
      // Search in both collections
      user = await db.collection('admin').findOne(
        { _id: new (require('mongodb').ObjectId)(req.user.id) },
        { projection: {
          id: '$_id',
          hashed_nin: 1,
          nin_verified: 1,
          user_unique_id: 1,
          wallet_address: 1,
          registration_completed: 1
        }}
      );
      
      if (!user) {
        user = await db.collection('users').findOne(
          { _id: new (require('mongodb').ObjectId)(req.user.id) },
                  { projection: {
          id: '$_id',
          hashed_nin: 1,
          nin_verified: 1,
          user_unique_id: 1,
          wallet_address: 1,
          registration_completed: 1
        }}
        );
      }
      
      // Convert MongoDB _id to string id for consistency
      if (user) {
        user.id = user._id.toString();
      }
      
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database error during verification check', 500);
    }

    if (!user) {
      return next(new ApiError('User not found', 404));
    }

    // Check if user has FULLY completed NIN verification
    // Also check registration_completed status for consistency
    const hasFullVerification = user.hashed_nin && user.nin_verified && user.user_unique_id && user.wallet_address && user.registration_completed;

    if (!hasFullVerification) {
      console.log('🚫 Access denied - incomplete NIN verification:', {
        userId: user.id,
        hasNin: !!user.hashed_nin,
        ninVerified: user.nin_verified,
        hasVoterId: !!user.user_unique_id,
        hasWalletAddress: !!user.wallet_address,
        registrationCompleted: user.registration_completed
      });

      return res.status(403).json({
        success: false,
        message: 'NIN verification required to access this resource',
        error: 'NIN_VERIFICATION_REQUIRED',
        redirectTo: '/verify-nin',
        verification_status: {
          has_nin: !!user.hashed_nin,
          nin_verified: user.nin_verified,
          has_voter_id: !!user.user_unique_id,
          has_wallet_address: !!user.wallet_address,
          registration_completed: user.registration_completed
        }
      });
    }

    console.log('✅ NIN verification check passed for user:', user.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  auth,
  authorize,
  hasPermission,
  requireNinVerification,
  requireRegistrationComplete,
  requireFullNinVerification
};
