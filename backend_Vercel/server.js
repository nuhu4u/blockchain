// Environment variables are already loaded by bootstrap.cjs
// Server starting

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const { errorHandler, notFound } = require('./middleware/errorHandler');
// const rateLimiter = require('./middleware/rateLimiter'); // DISABLED FOR DEVELOPMENT
const logger = require('./utils/logger');
// Environment variables already loaded by bootstrap.cjs

// Initialize Express app
const app = express();
const httpServer = createServer(app);



// Middleware
// Security middleware with enhanced configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", process.env.CLIENT_URL || ''],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year in seconds
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: { policy: 'same-origin' },
  frameguard: { action: 'deny' },
  xssFilter: true,
  noSniff: true,
  ieNoOpen: true,
  hidePoweredBy: true
})); // Security headers
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'http://localhost:8081',
    'http://127.0.0.1:8081',
    'exp://localhost:8081',
    'exp://127.0.0.1:8081',
    'http://172.20.10.2:3000',
    'http://192.168.56.1:3000',
    'http://192.168.52.2:3000',
    'exp://192.168.56.1:8081',
    'exp://192.168.52.2:8081',
    'exp://172.20.10.2:8081',
    process.env.CLIENT_URL || '*'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting - DISABLED FOR DEVELOPMENT
// app.use(rateLimiter.apiLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
          database: 'MongoDB',
    envLoaded: {
      ENCRYPTION_KEY: !!process.env.ENCRYPTION_KEY,
      DATABASE_URL: !!process.env.DATABASE_URL,
      JWT_SECRET: !!process.env.JWT_SECRET
    }
  });
});

// Readiness check endpoint (tests database connectivity)
app.get('/api/ready', async (req, res) => {
  try {
    // Test MongoDB connection
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
    
    await client.connect();
    const db = client.db();
    await db.admin().ping();
    
    // Debug log showing actual database name
    console.log('🔌 Mongo target DB:', db.databaseName);
    
    // Check collections exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    console.log('📊 Collections found:', collectionNames);
    
    // Ensure required collections exist
    const requiredCollections = ['users', 'admin', 'elections', 'votes', 'vote_positions'];
    const missingCollections = requiredCollections.filter(name => !collectionNames.includes(name));
    
    if (missingCollections.length > 0) {
      console.log('⚠️ Missing collections:', missingCollections);
    }
    
    await client.close();
    
    res.json({ 
      status: 'ready', 
      database: 'MongoDB', 
      dbName: db.databaseName,
      collections: collectionNames,
      missingCollections: missingCollections
    });
  } catch (e) {
    console.error('❌ Database connection failed:', e);
    res.status(503).json({ 
      error: 'Database unavailable', 
      detail: String(e?.message || e) 
    });
  }
});

// Simple test endpoint for elections
app.get('/api/election/test', async (req, res) => {
  try {
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
    
    await client.connect();
    const db = client.db();
    
    // Debug log showing actual database name
    if (process.env.DEBUG_AUTH === 'true') {
      console.log('🔌 Mongo target DB:', db.databaseName);
    }
    
    const count = await db.collection('elections').countDocuments();
    await client.close();
    
    res.json({ 
      success: true, 
      message: 'Elections test successful',
      count: count,
      database: 'MongoDB'
    });
  } catch (e) {
    res.status(500).json({ 
      error: 'Elections test failed', 
      detail: String(e?.message || e) 
    });
  }
});

// Simple elections endpoint for debugging
app.get('/api/elections/simple', async (req, res) => {
  try {
    console.log('🔍 Simple elections endpoint...');
    const { MongoClient } = require('mongodb');
    const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
    
    await client.connect();
    const db = client.db();
    const elections = await db.collection('elections').find({}).limit(5).toArray();
    await client.close();
    
    res.json({
      success: true,
      data: elections,
      count: elections.length
    });
  } catch (error) {
    console.error('❌ Simple elections failed:', error);
    res.status(500).json({
      success: false,
      message: 'Simple elections failed',
      error: error.message
    });
  }
});

// Public geo-data endpoint (for registration forms)
app.get('/api/geo-data', async (req, res) => {
  try {
    const { type, state_id, lga_id, ward_id, search } = req.query;
    
    // Disable caching for this route
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    
    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Type parameter is required'
      });
    }

    // Validate type parameter
    const validTypes = ['state', 'lga', 'ward', 'polling_unit'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    // Read geo data from the NDJSON file
    const fs = require('fs');
    const path = require('path');
    const geoDataPath = path.join(__dirname, 'geodata_full.ndjson');
    
    if (!fs.existsSync(geoDataPath)) {
      return res.status(500).json({
        success: false,
        message: 'Geographic data file not found'
      });
    }

    const geoDataContent = fs.readFileSync(geoDataPath, 'utf8');
    const geoData = JSON.parse(geoDataContent);

    let result = [];

    if (type === 'state') {
      // Return all states
      result = geoData.states || [];
      
      if (search) {
        result = result.filter(state => 
          state.state_name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Sort by state name
      result.sort((a, b) => a.state_name.localeCompare(b.state_name));
      
    } else if (type === 'lga') {
      // Return LGAs for specific state
      if (!state_id) {
        return res.status(400).json({
          success: false,
          message: 'state_id is required for LGA requests'
        });
      }
      
      result = (geoData.lgas || []).filter(lga => lga.state_id === state_id);
      
      if (search) {
        result = result.filter(lga => 
          lga.lga_name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      // Sort by LGA name
      result.sort((a, b) => a.lga_name.localeCompare(b.lga_name));
      
    } else if (type === 'ward') {
      // Return static ward template (5 wards for all LGAs)
      result = [
        { ward_id: 'WARD-01', ward_name: 'Ward 01', lga_id: lga_id || 'TEMPLATE' },
        { ward_id: 'WARD-02', ward_name: 'Ward 02', lga_id: lga_id || 'TEMPLATE' },
        { ward_id: 'WARD-03', ward_name: 'Ward 03', lga_id: lga_id || 'TEMPLATE' },
        { ward_id: 'WARD-04', ward_name: 'Ward 04', lga_id: lga_id || 'TEMPLATE' },
        { ward_id: 'WARD-05', ward_name: 'Ward 05', lga_id: lga_id || 'TEMPLATE' }
      ];
      
    } else if (type === 'polling_unit') {
      // Return static polling unit template (5 polling units for all wards)
      result = [
        { 
          pu_id: 'PU-001', 
          pu_name: 'Primary School', 
          ward_id: ward_id || 'TEMPLATE',
          address: 'Primary School Building',
          gps_lat: null,
          gps_lng: null
        },
        { 
          pu_id: 'PU-002', 
          pu_name: 'Secondary School', 
          ward_id: ward_id || 'TEMPLATE',
          address: 'Secondary School Building',
          gps_lat: null,
          gps_lng: null
        },
        { 
          pu_id: 'PU-003', 
          pu_name: 'St. Mary\'s Church', 
          ward_id: ward_id || 'TEMPLATE',
          address: 'St. Mary\'s Church',
          gps_lat: null,
          gps_lng: null
        },
        { 
          pu_id: 'PU-004', 
          pu_name: 'Central Mosque', 
          ward_id: ward_id || 'TEMPLATE',
          address: 'Central Mosque',
          gps_lat: null,
          gps_lng: null
        },
        { 
          pu_id: 'PU-005', 
          pu_name: 'Community Health Center', 
          ward_id: ward_id || 'TEMPLATE',
          address: 'Community Health Center',
          gps_lat: null,
          gps_lng: null
        }
      ];
    }

    // Always return consistent JSON format
    res.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('Geo-data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch geographic data'
    });
  }
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/observer', require('./routes/observer'));
app.use('/api/elections', require('./routes/election'));
app.use('/api/blockchain', require('./routes/blockchain'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/voter-tracking', require('./routes/voterTracking'));
app.use('/api/position-tracking', require('./routes/positionTracking'));
app.use('/api/enhanced-position-tracking', require('./routes/enhancedPositionTracking'));
app.use('/api/positions', require('./routes/positions'));
app.use('/api/vote-position', require('./routes/votePosition'));
app.use('/api/vote-sync', require('./routes/voteSync'));
app.use('/api/biometric', require('./routes/biometric'));
app.use('/api/public', require('./routes/public'));

// Serve static files for avatars and uploads
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// 404 Handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Start server with port conflict handling
const PORT = process.env.PORT || 3001;

// Function to find available port
const findAvailablePort = async (startPort) => {
  const net = require('net');
  
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Try next port
        findAvailablePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
};

// Start server with automatic port finding
const startServer = async () => {
  try {
    // Run startup validation
    const StartupValidation = require('./services/startupValidation');
    
    console.log('🚀 Starting server with validation...');
    
    // Validate environment
    const envValidation = await StartupValidation.validateEnvironment();
    if (!envValidation.valid) {
      console.log('❌ Environment validation failed - server will not start');
      process.exit(1);
    }
    
    // Validate database
    const dbValidation = await StartupValidation.validateDatabase();
    if (!dbValidation.valid) {
      console.log('⚠️ Database validation found issues - server will start but some features may not work');
    }

    // Initialize transaction confirmation service
    const transactionConfirmationService = require('./services/transactionConfirmationService');
    await transactionConfirmationService.start();
    console.log('✅ Transaction Confirmation Service started');

    // Initialize vote sync service
    const voteSyncService = require('./services/voteSyncService');
    console.log('✅ Vote Sync Service initialized');
    
    // Set up periodic vote sync (every 2 minutes)
    setInterval(async () => {
      try {
        console.log('🔄 Running periodic vote sync...');
        const result = await voteSyncService.retryPendingVotes();
        
        if (result.success && result.retried > 0) {
          console.log(`✅ Vote Sync: Retried ${result.retried} votes, ${result.success} successful, ${result.stillPending} still pending`);
        }
      } catch (error) {
        console.error('❌ Periodic vote sync failed:', error);
      }
    }, 2 * 60 * 1000); // 2 minutes
    console.log('⏰ Periodic vote sync scheduled (every 2 minutes)');

    // Initialize wallet funding service and check all wallets
    const walletFundingService = require('./services/walletFundingService');
    await walletFundingService.initialize();
    const walletCheck = await walletFundingService.checkAllWallets();
    console.log('✅ Wallet Funding Service initialized');

    // Initialize wallet migration service and run migration
    const walletMigrationService = require('./services/walletMigrationService');
    await walletMigrationService.initialize();
    
    // Check if migration is needed
    const migrationCheck = await walletMigrationService.checkMigrationNeeded();
    if (migrationCheck.needsMigration) {
      console.log('🔧 Wallet migration needed, running migration...');
      const migrationResult = await walletMigrationService.runMigration();
      
      if (migrationResult.success) {
        console.log('✅ Wallet Migration completed successfully');
        console.log(`📊 Wallet Migration Summary:`);
        console.log(`✅ Migrated: ${migrationResult.migratedCount}`);
        console.log(`✅ Funded: ${migrationResult.fundedCount}`);
        console.log(`❌ Errors: ${migrationResult.errorCount}`);
      } else {
        console.error('❌ Wallet Migration failed:', migrationResult.error);
      }
    } else {
      console.log('✅ Wallet Migration: No migration needed');
    }

    // Run controller and route health check
    const controllerHealthService = require('./services/controllerHealthService');
    const healthStatus = await controllerHealthService.runHealthCheck();
    
    if (healthStatus.overall !== 'healthy') {
      console.log('⚠️ Warning: Some controllers or routes have issues - server will start but some features may not work');
    }
    
    const availablePort = await findAvailablePort(PORT);
    const server = httpServer.listen(availablePort, '0.0.0.0', () => {
      logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${availablePort}`);
      logger.info(`Server accessible at: http://localhost:${availablePort}`);
      logger.info(`Server accessible from network at: http://10.226.155.194:${availablePort}`);
      
      // Log database and JWT configuration
      console.log('🔌 DB:', process.env.DATABASE_URL ? process.env.DATABASE_URL.split('/').pop() : 'election_system');
      console.log('🔐 JWT Config:', { 
        secret: !!process.env.JWT_SECRET, 
        exp: process.env.JWT_EXPIRES_IN || '1d' 
      });
      
      // Log validation results
      if (dbValidation.valid) {
        console.log('✅ Database validation passed');
      } else {
        console.log(`⚠️ Database validation found ${dbValidation.invalidCount} invalid elections`);
      }
      
      // Log port change if different from requested
      if (availablePort !== parseInt(PORT)) {
        logger.warn(`Requested port ${PORT} was busy, using port ${availablePort} instead`);
      }
    });
    
    // Make server available globally for shutdown handlers
    global.server = server;
    
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  if (global.server) {
    global.server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  // Close server & exit process
  if (global.server) {
    global.server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully');
  if (global.server) {
    global.server.close(() => {
      logger.info('Process terminated');
    });
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  if (global.server) {
    global.server.close(() => {
      logger.info('Process terminated');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
