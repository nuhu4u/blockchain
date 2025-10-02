const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { ApiError } = require('../utils/apiError');
const { MongoClient, ObjectId } = require('mongodb');

// Import JWT token generation from crypto utils
const { generateToken } = require('../utils/crypto');


// Import the comprehensive NIN encryption utility
const { encryptNIN } = require('../utils/crypto');

// Register a new user
const register = async (req, res, next) => {
  try {
    const { 
      email, 
      password, 
      first_name, 
      last_name, 
      phone_number, 
      date_of_birth, 
      gender, 
      address,
      // State of Origin
      state_of_origin_id,
      lga_of_origin_id,
      // State of Residence
      state_id,
      lga_id,
      ward_id,
      polling_unit_id
    } = req.body;

    // Check if user already exists by email in both collections
    const client = new MongoClient(process.env.DATABASE_URL);
    let existingUserByEmail;
    
    try {
      await client.connect();
      const db = client.db();
      
      // Search in admin collection first
      existingUserByEmail = await db.collection('admin').findOne({ email });
      
      // If not found in admin, search in users collection
      if (!existingUserByEmail) {
        existingUserByEmail = await db.collection('users').findOne({ email });
      }
      
      if (existingUserByEmail) {
        await client.close();
        throw new ApiError('Email already in use', 400);
      }

      // Check if phone number already exists in both collections
      if (phone_number) {
        let existingUserByPhone = await db.collection('admin').findOne({ phone_number });
        
        if (!existingUserByPhone) {
          existingUserByPhone = await db.collection('users').findOne({ phone_number });
        }

        if (existingUserByPhone) {
          await client.close();
          throw new ApiError('Phone number already registered', 400);
        }
      }
      
      await client.close();
    } catch (error) {
      if (client) await client.close();
      if (error instanceof ApiError) throw error;
      throw new ApiError('Database connection failed', 500);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user using MongoDB native driver
    const userClient = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await userClient.connect();
      
      const db = userClient.db();
      const usersCollection = db.collection('users');
      
      // User will get unique identifiers after NIN verification
      
      // Set default avatar based on gender
      const defaultAvatar = gender === 'MALE' ? '/avatars/male-avatar.png' : '/avatars/female-avatar.png';
      
      const userData = {
        email,
        password_hash: hashedPassword,
        first_name,
        last_name,
        phone_number,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        gender,
        address,
        // State of Origin
        state_of_origin_id: state_of_origin_id || null,
        lga_of_origin_id: lga_of_origin_id || null,
        // State of Residence
        state_id: state_id || null,
        lga_id: lga_id || null,
        ward_id: ward_id || null,
        polling_unit_id: polling_unit_id || null,
        role: 'VOTER',
        is_active: true,
        registration_completed: false,
        nin_verified: false,
        is_voter_registered: false,
        has_voted: false,
        user_unique_id: null, // Will be generated after NIN verification
        wallet_address: null, // Will be generated after NIN verification
        profile_picture: defaultAvatar,
        has_custom_picture: false,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      const result = await usersCollection.insertOne(userData);
      
      // Create user object for response
      user = {
        id: result.insertedId.toString(),
        email,
        first_name,
        last_name,
        phone_number,
        date_of_birth: userData.date_of_birth,
        gender,
        address,
        role: 'VOTER',
        is_active: true,
        registration_completed: false,
        user_unique_id: null, // Will be generated after NIN verification
        wallet_address: null, // Will be generated after NIN verification
        created_at: userData.created_at
      };
      
      // Close MongoDB connection
      await userClient.close();
    } catch (mongoError) {
      console.error('❌ MongoDB error:', mongoError);
      if (userClient) {
        try {
          await userClient.close();
        } catch (closeError) {
          console.error('❌ Error closing MongoDB connection:', closeError);
        }
      }
      throw new ApiError(`Database operation failed: ${mongoError.message}`, 500);
    }

    // Check if user was created successfully
    if (!user) {
      throw new ApiError('Failed to create user', 500);
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Welcome email disabled to avoid disruptions
    // User created successfully

    res.status(201).json({
      success: true,
      token,
      user,
      message: 'Registration successful! Please complete NIN verification to access your dashboard.',
      redirectTo: '/verify-nin',
      nextStep: 'nin_verification'
    });
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { emailOrNin, password } = req.body;
    
    
    // Determine if input is email, NIN, or username
    const isEmail = emailOrNin.includes('@');
    const isNIN = /^\d{11}$/.test(emailOrNin);
    let user;

    if (isEmail) {
      // Login with email - search ONLY in users collection for regular user login
      const client = new MongoClient(process.env.DATABASE_URL);
      
      try {
        await client.connect();
        const db = client.db();
        
        
        // Sanitize and normalize email input
        const raw = (emailOrNin || "").toString();
        const normalized = raw.trim().toLowerCase();
        const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        
        // Search with case-insensitive regex and exact match
        const query = {
          $or: [
            { email: normalized },
            { email: { $regex: `^${esc(normalized)}$`, $options: 'i' } }
          ]
        };
        
        
        user = await db.collection('users').findOne(query);
        
        if (user) {
          // Allow all users to login through the regular portal
          // Keep their existing role (ADMIN, VOTER, OBSERVER, etc.)
          user.role = user.role || 'VOTER';
          user.id = user._id.toString();
        }
        
        await client.close();
      } catch (error) {
        await client.close();
        throw new ApiError('Database connection failed', 500);
      }
    } else if (isNIN) {
      // Login with NIN - search by encrypted NIN in both collections
      const client = new MongoClient(process.env.DATABASE_URL);
      
      try {
        await client.connect();
        const db = client.db();
        
        // Search in admin collection first
        user = await db.collection('admin').findOne({ encrypted_nin: { $exists: true } });
        
        // If not found in admin, search in users collection
        if (!user) {
          user = await db.collection('users').findOne({ encrypted_nin: { $exists: true } });
        }
        
        // If user found, verify NIN using the new verification method
        if (user) {
          const { verifyNIN } = require('../utils/crypto');
          const isValidNIN = verifyNIN(emailOrNin, user.encrypted_nin, user.nin_iv);
          
          if (!isValidNIN) {
            user = null; // Invalid NIN
          } else {
            user.id = user._id.toString();
          }
        }
        
        await client.close();
      } catch (error) {
        await client.close();
        throw new ApiError('Database connection failed', 500);
      }
    } else {
      // Login with username - search by username in both collections
      const client = new MongoClient(process.env.DATABASE_URL);
      
      try {
        await client.connect();
        const db = client.db();
        
        // Search in admin collection first (for admin usernames)
        user = await db.collection('admin').findOne({ email: emailOrNin });
        
        // If not found in admin, search in users collection
        if (!user) {
          user = await db.collection('users').findOne({ email: emailOrNin });
        }
        
        // Convert MongoDB _id to string id for consistency
        if (user) {
          user.id = user._id.toString();
        }
        
        await client.close();
      } catch (error) {
        await client.close();
        throw new ApiError('Database connection failed', 500);
      }
    }

    if (!user) {
      throw new ApiError('Invalid credentials', 401);
    }

    // Check if user is active
    if (!user.is_active) {
      throw new ApiError('Account is deactivated. Please contact support.', 403);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new ApiError('Invalid credentials', 401);
    }
    

    // Generate JWT token
    const token = generateToken(user.id);
    

    // Update last login using MongoDB native driver to avoid Prisma transaction issues
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      
      // Regular users always update in users collection
      const userCollection = db.collection('users');
      
      // Convert string ID to ObjectId for MongoDB
      let objectId;
      try {
        objectId = new ObjectId(user.id);
      } catch (idError) {
        console.error('⚠️ Invalid user ID format:', user.id);
        // Don't fail the login if ID conversion fails
        await client.close();
        return;
      }
      
      await userCollection.updateOne(
        { _id: objectId },
        { 
          $set: { 
            last_login: new Date(),
            updated_at: new Date()
          }
        }
      );
      
      await client.close();
    } catch (updateError) {
      console.error('⚠️ Failed to update last_login, but login continues:', updateError);
      // Don't fail the login if update fails
    }

    // Prepare user data to return (exclude sensitive data)
    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    };

    // Add role-specific fields
    if (user.role === 'OBSERVER') {
      // Observer-specific fields
      Object.assign(userData, {
        organization_name: user.organization_name || null,
        organization_type: user.organization_type || null,
        website: user.website || null,
        phone: user.phone || null,
        country_code: user.country_code || null,
        address: user.address || null,
        state: user.state || null,
        lga: user.lga || null,
        ward: user.ward || null,
        polling_unit: user.polling_unit || null,
        status: user.status || 'pending'
      });
    } else {
      // Regular user fields
      Object.assign(userData, {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number || null,
        date_of_birth: user.date_of_birth || null,
        gender: user.gender || null,
        address: user.address || null,
        profile_picture: user.profile_picture || null,
        has_custom_picture: user.has_custom_picture || false,
        nin_verified: user.nin_verified || false,
        registration_completed: user.registration_completed || false,
        user_unique_id: user.user_unique_id || null,
        wallet_address: user.wallet_address || null,
        // Include NIN information for profile display (read-only)
        encrypted_nin: user.encrypted_nin || null,
        nin_iv: user.nin_iv || null,
        aes_encrypted: user.aes_encrypted || null
      });
    }


    
    // Regular user login handling (admins and observers use their own endpoints)
    redirectTo = '/verify-nin'; // Default to NIN verification for safety
    message = 'Login successful';
    ninStatus = 'incomplete';
    canAccessDashboard = false;
    
    // Check NIN verification status thoroughly
    if (user.encrypted_nin && user.nin_verified && user.user_unique_id && user.wallet_address) {
      // User has COMPLETELY finished NIN verification with all required data
      redirectTo = '/dashboard';
      message = 'Login successful. Welcome to your dashboard!';
      ninStatus = 'complete';
      canAccessDashboard = true;
    } else if (user.encrypted_nin && user.nin_verified && (!user.user_unique_id || !user.wallet_address)) {
      // User has verified NIN but missing unique IDs (data corruption/incomplete process)
      redirectTo = '/verify-nin';
      message = 'Login successful. Please wait, we are completing your verification process.';
      ninStatus = 'processing';
    } else if (user.encrypted_nin && !user.nin_verified) {
      // User has submitted NIN but verification is still pending
      redirectTo = '/verify-nin';
      message = 'Login successful. Your NIN verification is in progress.';
      ninStatus = 'verifying';
    } else if (!user.encrypted_nin) {
      // User has not submitted NIN at all
      redirectTo = '/verify-nin';
      message = 'Login successful. Please complete your NIN verification to access the dashboard.';
      ninStatus = 'required';
    }

    // Set HTTP-only cookie for authentication
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",  // in production HTTPS: "None" + secure:true
      secure: false,
      path: "/",        // critical so /admin sees the cookie
      maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });

    res.json({
      success: true,
      token,
      user: userData,
      hasSubmittedNin: !!user.encrypted_nin,
      ninStatus: ninStatus,
      canAccessDashboard: canAccessDashboard,
      redirectTo,
      message,
      loginActions: {
        showLogoutButton: redirectTo === '/verify-nin', // Show logout button on NIN verification page
        allowDashboardAccess: canAccessDashboard,
        requiresNinVerification: !canAccessDashboard
      }
    });
  } catch (error) {
    next(error);
  }
};

// Submit NIN for verification
const submitNIN = async (req, res, next) => {
  try {
    const { nin } = req.body;
    
    // Validate request body
    if (!nin) {
      throw new ApiError('NIN is required', 400);
    }
    
    // Validate user authentication
    if (!req.user || !req.user.id) {
      throw new ApiError('Authentication required', 401);
    }
    
    const userId = req.user.id;

    // Validate NIN (11 digits)
    if (!/^\d{11}$/.test(nin)) {
      throw new ApiError('Invalid NIN format. Must be 11 digits.', 400);
    }

    // Check if NIN is already in use
    const crypto = require('crypto');
    const hashedNIN = crypto.createHash('sha256').update(nin).digest('hex');
    
    // Check if NIN is already in use in both collections
    const client = new MongoClient(process.env.DATABASE_URL);
    let existingNIN;
    
    try {
      await client.connect();
      const db = client.db();
      
      // Search in admin collection first
      existingNIN = await db.collection('admin').findOne({ 
        hashed_nin: hashedNIN,
        _id: { $ne: new ObjectId(userId) }
      });
      
      // If not found in admin, search in users collection
      if (!existingNIN) {
        existingNIN = await db.collection('users').findOne({ 
          hashed_nin: hashedNIN,
          _id: { $ne: new ObjectId(userId) }
        });
      }
      
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (existingNIN) {
      throw new ApiError('NIN already registered with another account', 400);
    }

    // Encrypt NIN using three-layer encryption
    const ninEncryption = encryptNIN(nin);

    // Update user with NIN data using MongoDB native driver to avoid Prisma transaction issues
    try {
      const client = new MongoClient(process.env.DATABASE_URL);
      
      await client.connect();
      const db = client.db();
      const usersCollection = db.collection('users');
      
      // Convert string ID to ObjectId
      const objectId = new ObjectId(userId);
      
      
      const updateResult = await usersCollection.updateOne(
        { _id: objectId },
        { 
          $set: { 
            encrypted_nin: ninEncryption.encrypted_nin,
            nin_iv: ninEncryption.nin_iv,
            aes_encrypted: ninEncryption.aes_encrypted, // Store AES data for display
            nin_verified: false, // Will be set to true after verification
            updated_at: new Date()
          }
        }
      );
      
      if (updateResult.modifiedCount > 0) {
        // NIN data saved successfully
      } else {
        // No changes made
      }
      
      await client.close();
    } catch (updateError) {
      console.error('⚠️ Failed to update NIN data:', updateError);
      throw new ApiError('Failed to save NIN data', 500);
    }

    // In a real application, you would integrate with a NIN verification service here
    // For demo purposes, we'll simulate verification after a delay
            // Immediate NIN verification - check if NIN is already used
        try {
          // Check if this NIN is already used by another user
          const ninCheckClient = new MongoClient(process.env.DATABASE_URL);
          let existingUserWithNIN;
          
          try {
            await ninCheckClient.connect();
            const db = ninCheckClient.db();
            
            // Search in admin collection first
            existingUserWithNIN = await db.collection('admin').findOne({ 
              hashed_nin: hashedNIN,
              _id: { $ne: new ObjectId(userId) }
            });
            
            // If not found in admin, search in users collection
            if (!existingUserWithNIN) {
              existingUserWithNIN = await db.collection('users').findOne({ 
                hashed_nin: hashedNIN,
                _id: { $ne: new ObjectId(userId) }
              });
            }
            
            await ninCheckClient.close();
          } catch (error) {
            await ninCheckClient.close();
            throw new ApiError('Database connection failed', 500);
          }

          if (existingUserWithNIN) {
            throw new ApiError('This NIN is already registered by another user. Each NIN can only be used once.', 400);
          }

          // PHASE 11: Generate unique voter ID and Hardhat wallet
          const crypto = require('crypto');
          const blockchainService = require('../blockchain/services/blockchainService');
          
          // Generate unique voter ID (15 characters: numbers and letters only)
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
          let voterId = '';
          for (let i = 0; i < 15; i++) {
            voterId += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          
          // PHASE 11: Create Hardhat wallet using blockchain service
          let walletData;
          try {
            walletData = await blockchainService.createVoterWallet(voterId);
            console.log('✅ Hardhat wallet created successfully:', walletData.wallet_address);
          } catch (walletError) {
            console.error('❌ Hardhat wallet creation failed:', walletError);
            throw new ApiError('Unable to generate wallet, please try again.', 500);
          }
          
          // PHASE 12: Auto-fund the new wallet with 10 ETH and verify funding
          try {
            console.log(`🚀 Funding voter wallet ${walletData.wallet_address} with 10 ETH`);
            
            // Use wallet funding service with retry logic
            const walletFundingService = require('../services/walletFundingService');
            await walletFundingService.initialize();
            const fundingResult = await walletFundingService.fundWallet(walletData.wallet_address);
            
            if (!fundingResult.success) {
              console.log(`❌ Funding Error: Wallet ${walletData.wallet_address} funding failed: ${fundingResult.error}`);
              throw new ApiError(`Wallet funding failed: ${fundingResult.error}`, 503);
            }
            
            console.log(`✅ Wallet Funded: Wallet ${walletData.wallet_address} balance=${fundingResult.newBalanceEth} ETH`);
            
            // Register new user in all active elections with funding verification
            console.log(`🔍 Registering new user in all active elections...`);
            const voterRegistrationService = require('../services/voterRegistrationService');
            await voterRegistrationService.initialize();
            
            const registrationResult = await voterRegistrationService.completeUserRegistration(walletData.wallet_address);
            
            if (!registrationResult.success) {
              console.log(`❌ Registration Error: ${registrationResult.error}`);
              
              // Block user registration if election registration fails
              throw new ApiError(`User registration failed: ${registrationResult.error}`, 503);
            } else {
              console.log(`✅ New User Registered: ${walletData.wallet_address} in ${registrationResult.registration.successCount} elections`);
            }
            
          } catch (fundingError) {
            console.error(`❌ Funding Error: ${fundingError.message}`);
            // Rollback wallet creation by throwing error
            throw new ApiError('Blockchain unavailable, please retry', 503);
          }
          
          // Update NIN verification status and add unique identifiers using MongoDB native driver
          const client = new MongoClient(process.env.DATABASE_URL);
          
          await client.connect();
          const db = client.db();
          const usersCollection = db.collection('users');
          
          // Convert string ID to ObjectId
          const objectId = new ObjectId(userId);
          
          const updateResult = await usersCollection.updateOne(
            { _id: objectId },
            { 
              $set: { 
                nin_verified: true,
                registration_completed: true, // Set registration as completed
                user_unique_id: voterId,
                wallet_address: walletData.wallet_address,
                encrypted_private_key: walletData.encrypted_private_key,
                updated_at: new Date()
              }
            }
          );
          
          if (updateResult.modifiedCount > 0) {
            // NIN verification completed successfully
          } else {
            throw new ApiError('Failed to update user verification status', 500);
          }
          
          await client.close();
          
          // Return success with voter details immediately
          res.json({
            success: true,
            message: 'NIN verified successfully! Your voter profile is now active.',
            status: 'verified',
            data: {
              nin_verified: true,
              user_unique_id: voterId,
              wallet_address: walletData.wallet_address,
              can_access_dashboard: true
            },
            redirectTo: '/dashboard'
          });
          
        } catch (error) {
          if (error instanceof ApiError) {
            throw error;
          }
          throw new ApiError('NIN verification failed: ' + error.message, 500);
        }

    
  } catch (error) {
    next(error);
  }
};

// Get current user profile
const getMe = async (req, res, next) => {
  try {
    const client = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await client.connect();
      const db = client.db();
      
      // Search in admin collection first
      user = await db.collection('admin').findOne({ _id: new ObjectId(req.user.id) });
      
      // If not found in admin, search in users collection
      if (!user) {
        user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
      }
      
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // Convert MongoDB _id to string id and select only needed fields
    const userData = {
      id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      role: user.role,
      nin_verified: user.nin_verified,
      registration_completed: user.registration_completed,
      user_unique_id: user.user_unique_id,
      wallet_address: user.wallet_address,
      created_at: user.created_at,
      updated_at: user.updated_at,
      // Include NIN information for frontend NIN verification checks
      encrypted_nin: user.encrypted_nin || null,
      hashed_nin: user.hashed_nin || null,
      nin_iv: user.nin_iv || null,
      aes_encrypted: user.aes_encrypted || null,
      // Additional profile fields
      date_of_birth: user.date_of_birth ? user.date_of_birth.toISOString() : null,
      gender: user.gender || null,
      address: user.address || null,
      contract_address: user.contract_address || null,
      is_active: user.is_active,
      is_verified: user.is_verified
    };

    res.json({
      success: true,
      data: userData
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateProfile = async (req, res, next) => {
  try {
    const { email, phone_number, password } = req.body;

    // Update profile using MongoDB native driver to avoid Prisma transaction issues
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      const usersCollection = db.collection('users');
      
          // Prepare update data
          const updateData = {
            updated_at: new Date()
          };
          
          // Add fields to update if provided
          if (email) {
            // Check if email is already in use by another user
            const existingUser = await usersCollection.findOne({ 
              email, 
              _id: { $ne: new ObjectId(req.user.id) } 
            });
            
            if (existingUser) {
              throw new ApiError('Email already in use by another user', 400);
            }
            updateData.email = email;
          }
          
          if (phone_number) {
            // Check if phone number is already in use by another user
            const existingUser = await usersCollection.findOne({ 
              phone_number, 
              _id: { $ne: new ObjectId(req.user.id) } 
            });
            
            if (existingUser) {
              throw new ApiError('Phone number already in use by another user', 400);
            }
            updateData.phone_number = phone_number;
          }
          
          if (password) {
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password_hash = hashedPassword;
          }
          
          const updateResult = await usersCollection.updateOne(
            { _id: new ObjectId(req.user.id) },
            { $set: updateData }
          );
      
      if (updateResult.matchedCount === 0) {
        throw new ApiError('User not found', 404);
      }
      
      await client.close();
      
      // Get updated user data for response
      const updatedUser = await usersCollection.findOne({ _id: new ObjectId(req.user.id) });
      
      if (!updatedUser) {
        throw new ApiError('User not found', 404);
      }
      
      // Prepare user data for response
      const user = {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        registration_completed: updatedUser.registration_completed,
        user_unique_id: updatedUser.user_unique_id,
        wallet_address: updatedUser.wallet_address,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at
      };

      res.json({
        success: true,
        data: user,
        message: 'Profile updated successfully'
      });
    } catch (mongoError) {
      await client.close();
      throw new ApiError('Failed to update profile', 500);
    }
  } catch (error) {
    next(error);
  }
};

// Change password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Get user from appropriate collection
    const userClient = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await userClient.connect();
      const db = userClient.db();
      
      // Search in admin collection first
      user = await db.collection('admin').findOne({ _id: new ObjectId(userId) });
      
      // If not found in admin, search in users collection
      if (!user) {
        user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
      }
      
      await userClient.close();
    } catch (error) {
      await userClient.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      throw new ApiError('Current password is incorrect', 400);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password using MongoDB native driver to avoid Prisma transaction issues
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      const usersCollection = db.collection('users');
      
      const updateResult = await usersCollection.updateOne(
        { _id: userId },
        { 
          $set: { 
            password_hash: hashedPassword,
            updated_at: new Date()
          }
        }
      );
      
      if (updateResult.matchedCount === 0) {
        throw new ApiError('User not found', 404);
      }
      
      await client.close();
    } catch (updateError) {
      await client.close();
      throw new ApiError('Failed to update password', 500);
    }

    // Password changed email disabled to avoid disruptions

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Request password reset
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Find user by email in both collections
    const userClient = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await userClient.connect();
      const db = userClient.db();
      
      // Search in admin collection first
      user = await db.collection('admin').findOne({ email });
      
      // If not found in admin, search in users collection
      if (!user) {
        user = await db.collection('users').findOne({ email });
      }
      
      await userClient.close();
    } catch (error) {
      await userClient.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!user) {
      // Don't reveal that the email doesn't exist
      return res.json({
        success: true,
        message: 'If your email is registered, you will receive a password reset link.'
      });
    }

    // Generate reset token (6-digit OTP)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Hash the OTP before storing
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Save reset token to database using MongoDB native driver to avoid Prisma transaction issues
    const client = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await client.connect();
      const db = client.db();
      const passwordResetCollection = db.collection('PasswordReset');
      
      // Check if reset record exists
      const existingReset = await passwordResetCollection.findOne({ email });
      
      if (existingReset) {
        // Update existing record
        await passwordResetCollection.updateOne(
          { email },
          { 
            $set: { 
              token: hashedOtp,
              expires_at: expiresAt,
              used: false,
              updated_at: new Date()
            }
          }
        );
      } else {
        // Create new record
        await passwordResetCollection.insertOne({
          email,
          token: hashedOtp,
          expires_at: expiresAt,
          used: false,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
      
      await client.close();
    } catch (dbError) {
      await client.close();
      throw new ApiError('Failed to save reset token', 500);
    }

    // Password reset email disabled to avoid disruptions

    res.json({
      success: true,
      message: 'If your email is registered, you will receive a password reset link.'
    });
  } catch (error) {
    next(error);
  }
};

// Reset password with OTP
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find the reset record using MongoDB native driver
    const resetClient = new MongoClient(process.env.DATABASE_URL);
    let resetRecord;
    
    try {
      await resetClient.connect();
      const db = resetClient.db();
      const passwordResetCollection = db.collection('PasswordReset');
      
      resetRecord = await passwordResetCollection.findOne(
        { 
          email,
          used: false,
          expires_at: { $gt: new Date() }
        },
        { sort: { created_at: -1 } }
      );
      
      await resetClient.close();
    } catch (error) {
      await resetClient.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!resetRecord) {
      throw new ApiError('Invalid or expired OTP', 400);
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, resetRecord.token);
    if (!isMatch) {
      throw new ApiError('Invalid OTP', 400);
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password using MongoDB native driver to avoid Prisma transaction issues
    const userClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await userClient.connect();
      const db = userClient.db();
      const usersCollection = db.collection('users');
      
      const updateResult = await usersCollection.updateOne(
        { email },
        { 
          $set: { 
            password_hash: hashedPassword,
            updated_at: new Date()
          }
        }
      );
      
      if (updateResult.matchedCount === 0) {
        throw new ApiError('User not found', 404);
      }
      
      await userClient.close();
    } catch (updateError) {
      await userClient.close();
      throw new ApiError('Failed to update password', 500);
    }

    // Mark token as used using MongoDB native driver to avoid Prisma transaction issues
    const resetTokenClient = new MongoClient(process.env.DATABASE_URL);
    
    try {
      await resetTokenClient.connect();
      const db = resetTokenClient.db();
      const passwordResetCollection = db.collection('PasswordReset');
      
      await passwordResetCollection.updateOne(
        { _id: resetRecord.id },
        { 
          $set: { 
            used: true,
            updated_at: new Date()
          }
        }
      );
      
      await resetTokenClient.close();
    } catch (updateError) {
      await resetTokenClient.close();
      throw new ApiError('Failed to mark token as used', 500);
    }

    // Get user for email (not needed for now since email is disabled)
    // const user = { first_name: 'User', last_name: 'User' };

    // Password reset confirmation email disabled to avoid disruptions

      res.json({
    success: true,
    message: 'Password has been reset successfully. You can now login with your new password.'
  });
} catch (error) {
  next(error);
}
};

// Get current user profile
const getProfile = async (req, res, next) => {
  try {
    // Get user from appropriate collection
    const client = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await client.connect();
      const db = client.db();
      
      // Search in admin collection first
      user = await db.collection('admin').findOne({ _id: new ObjectId(req.user.id) });
      
      // If not found in admin, search in users collection
      if (!user) {
        user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
      }
      
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // Prepare user data for response
    const userData = {
      id: user._id.toString(),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      date_of_birth: user.date_of_birth ? user.date_of_birth.toISOString() : null,
      gender: user.gender,
      address: user.address,
      role: user.role,
      is_active: user.is_active,
      registration_completed: user.registration_completed,
      nin_verified: user.nin_verified,
      user_unique_id: user.user_unique_id,
      wallet_address: user.wallet_address,
      contract_address: user.contract_address,
      is_verified: user.is_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
      // Include NIN information for frontend NIN verification checks
      encrypted_nin: user.encrypted_nin || null,
      hashed_nin: user.hashed_nin || null,
      nin_iv: user.nin_iv || null,
      aes_encrypted: user.aes_encrypted || null
    };

    res.json({
      success: true,
      data: { user: userData }
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    // Find the reset record using MongoDB native driver
    const resetClient = new MongoClient(process.env.DATABASE_URL);
    let resetRecord;
    
    try {
      await resetClient.connect();
      const db = resetClient.db();
      const passwordResetCollection = db.collection('PasswordReset');
      
      resetRecord = await passwordResetCollection.findOne(
        { 
          email,
          used: false,
          expires_at: { $gt: new Date() }
        },
        { sort: { created_at: -1 } }
      );
      
      await resetClient.close();
    } catch (error) {
      await resetClient.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!resetRecord) {
      throw new ApiError('Invalid or expired OTP', 400);
    }

    // Verify OTP
    const isMatch = await bcrypt.compare(otp, resetRecord.token);
    if (!isMatch) {
      throw new ApiError('Invalid OTP', 400);
    }

    res.json({
      success: true,
      message: 'OTP verified successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Check if phone number already exists
const checkPhoneExists = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      throw new ApiError('Phone number is required', 400);
    }

    // Check if phone number already exists in database using MongoDB native driver
    const client = new MongoClient(process.env.DATABASE_URL);
    let existingUser;
    
    try {
      await client.connect();
      const db = client.db();
      existingUser = await db.collection('users').findOne({ phone_number: phone });
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database connection failed', 500);
    }

    res.json({
      success: true,
      exists: !!existingUser,
      message: existingUser ? 'Phone number already registered' : 'Phone number available'
    });
  } catch (error) {
    next(error);
  }
};

// Check if email already exists
const checkEmailExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError('Email is required', 400);
    }

    // Check if email already exists in database using MongoDB native driver
    const client = new MongoClient(process.env.DATABASE_URL);
    let existingUser;
    
    try {
      await client.connect();
      const db = client.db();
      existingUser = await db.collection('users').findOne({ email });
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database connection failed', 500);
    }

    res.json({
      success: true,
      exists: !!existingUser,
      message: existingUser ? 'Email already registered' : 'Email available'
    });
  } catch (error) {
    next(error);
  }
};

// Check NIN verification status
const checkNINStatus = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      throw new ApiError('Authentication required', 401);
    }

    // Get user from appropriate collection
    const client = new MongoClient(process.env.DATABASE_URL);
    let user;
    
    try {
      await client.connect();
      const db = client.db();
      
      // Search in admin collection first
      user = await db.collection('admin').findOne({ _id: new ObjectId(req.user.id) });
      
      // If not found in admin, search in users collection
      if (!user) {
        user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });
      }
      
      await client.close();
    } catch (error) {
      await client.close();
      throw new ApiError('Database connection failed', 500);
    }

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // Determine verification status
    let status = 'no_nin';
    let message = 'Please submit your NIN for verification';
    
    if (user.hashed_nin && !user.nin_verified) {
      status = 'verifying';
      message = 'Your NIN is being verified. Please wait...';
    } else if (user.nin_verified && user.user_unique_id && user.wallet_address) {
      status = 'verified';
      message = 'NIN verification completed successfully!';
    } else if (user.hashed_nin && user.nin_verified && (!user.user_unique_id || !user.wallet_address)) {
      status = 'processing';
      message = 'Generating unique identifiers...';
    }



    const canAccessDashboard = user.nin_verified && user.user_unique_id && user.wallet_address;
    
    res.json({
      success: true,
      status,
      message,
      data: {
        nin_verified: user.nin_verified,
        has_nin: !!user.hashed_nin,
        user_unique_id: user.user_unique_id,
        wallet_address: user.wallet_address,
        can_access_dashboard: canAccessDashboard
      },
      ui: {
        showLogoutButton: !canAccessDashboard, // Show logout button if can't access dashboard
        showDashboardButton: canAccessDashboard,
        showNinForm: !user.hashed_nin,
        showVerificationSpinner: user.hashed_nin && !user.nin_verified
      }
    });
  } catch (error) {
    next(error);
  }
};

/*
SUGGESTIONS (do not apply, just comments):
- Add emailLower field and unique index { emailLower: 1 } with collation strength 2 for faster case-insensitive lookups
- Add unique index for nin_hmac/hashed_nin if allowed by schema
- Centralize sanitize/escape helpers in utils/crypto.js
- Add automated e2e test for User/Admin/Observer login flows
- Consider adding rate limiting per IP for login attempts
- Add audit logging for successful/failed login attempts
*/

module.exports = {
  register,
  login,
  submitNIN,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  getProfile,
  verifyOTP,
  checkPhoneExists,
  checkEmailExists,
  checkNINStatus
};
