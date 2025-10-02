// bootstrap.cjs - Enhanced with permanent server conflict resolution
const path = require('path');
const fs = require('fs');

// Enhanced process lock with auto-cleanup and port checking
const lockFile = path.resolve(__dirname, '.server.lock');
const lockPid = process.pid;

// Function to check if port is actually in use
const isPortInUse = (port) => {
  try {
    const net = require('net');
    const server = net.createServer();
    
    return new Promise((resolve) => {
      server.listen(port, () => {
        server.once('close', () => resolve(false));
        server.close();
      });
      
      server.on('error', () => resolve(true));
    });
  } catch (error) {
    return Promise.resolve(false);
  }
};

// Function to kill process by PID (cross-platform)
const killProcess = async (pid) => {
  try {
    if (process.platform === 'win32') {
      const { execSync } = require('child_process');
      execSync(`taskkill /F /PID ${pid}`, { windowsHide: true, stdio: 'ignore' });
    } else {
      process.kill(pid, 'SIGKILL');
    }
    return true;
  } catch (error) {
    return false;
  }
};

// Function to find and kill processes using a specific port
const killProcessesOnPort = async (port) => {
  try {
    if (process.platform === 'win32') {
      const { execSync } = require('child_process');
      
      // Find processes using the port
      const netstat = execSync(`netstat -ano | findstr :${port}`, { 
        encoding: 'utf8', 
        stdio: 'pipe' 
      });
      
      const lines = netstat.split('\n').filter(line => line.trim());
      let killedCount = 0;
      
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== process.pid.toString() && !isNaN(parseInt(pid))) {
            console.log(`🔄 Attempting to kill conflicting process PID: ${pid}`);
            const killed = await killProcess(parseInt(pid));
            if (killed) {
              killedCount++;
              console.log(`✅ Process ${pid} killed successfully`);
            }
          }
        }
      }
      
      return killedCount;
    }
    return 0;
  } catch (error) {
    console.log('⚠️ Could not automatically kill conflicting processes:', error.message);
    return 0;
  }
};

// Function to clean up stale processes and ports
const cleanupStaleProcesses = async () => {
  try {
    const port = process.env.PORT || 3001;
    const isPortBusy = await isPortInUse(port);
    
    if (isPortBusy) {
      console.log(`🔍 Port ${port} is busy, attempting automatic cleanup...`);
      
      // Try to kill processes using the port
      const killedCount = await killProcessesOnPort(port);
      
      if (killedCount > 0) {
        console.log(`✅ Cleaned up ${killedCount} conflicting process(es)`);
        
        // Wait a moment for ports to be released
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if port is now free
        const portStillBusy = await isPortInUse(port);
        if (!portStillBusy) {
          console.log(`✅ Port ${port} is now available`);
        } else {
          console.log(`⚠️ Port ${port} is still busy after cleanup`);
        }
      } else {
        console.log(`⚠️ No conflicting processes found on port ${port}`);
      }
    } else {
      console.log(`✅ Port ${port} is available`);
    }
  } catch (error) {
    console.log('⚠️ Port cleanup check failed:', error.message);
  }
};

// Enhanced server lock management
const setupServerLock = async () => {
  try {
    // Check if lock file exists and if the process is still running
    if (fs.existsSync(lockFile)) {
      const existingPid = fs.readFileSync(lockFile, 'utf8').trim();
      
      try {
        // Check if the process is actually running
        process.kill(parseInt(existingPid), 0);
        console.log('❌ Another server instance is already running (PID: ' + existingPid + ')');
        console.log('🔄 Attempting to automatically resolve conflict...');
        
        // Try to kill the conflicting process
        const killed = await killProcess(parseInt(existingPid));
        if (killed) {
          console.log('✅ Conflicting process killed successfully');
          fs.unlinkSync(lockFile);
        } else {
          console.log('❌ Could not kill conflicting process automatically');
          console.log('💡 Please manually delete the .server.lock file or restart your terminal');
          process.exit(1);
        }
      } catch (killError) {
        // Process is not running, remove stale lock file
        console.log('🧹 Removing stale lock file from previous session...');
        fs.unlinkSync(lockFile);
      }
    }
    
    // Clean up any stale processes before starting
    await cleanupStaleProcesses();
    
    // Create new lock file
    fs.writeFileSync(lockFile, lockPid.toString());
    console.log('🔒 Server lock created successfully');
    
    // Set up automatic cleanup on exit
    const cleanup = () => {
      try {
        if (fs.existsSync(lockFile)) {
          fs.unlinkSync(lockFile);
          console.log('🧹 Server lock cleaned up');
        }
      } catch (error) {
        // Ignore cleanup errors
      }
    };
    
    // Handle various exit scenarios
    process.on('exit', cleanup);
    process.on('SIGINT', () => {
      console.log('\n🛑 Server shutting down gracefully...');
      cleanup();
      process.exit(0);
    });
    process.on('SIGTERM', () => {
      console.log('\n🛑 Server terminated, cleaning up...');
      cleanup();
      process.exit(0);
    });
    process.on('uncaughtException', (error) => {
      console.error('💥 Uncaught exception:', error);
      cleanup();
      process.exit(1);
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.error('💥 Unhandled rejection at:', promise, 'reason:', reason);
      cleanup();
      process.exit(1);
    });
    
  } catch (error) {
    console.error('❌ Error creating server lock:', error);
    process.exit(1);
  }
};

// Main initialization function
const initialize = async () => {
  try {
    console.log('🚀 Initializing enhanced blockchain voting server...');
    
    // Set up server lock with automatic conflict resolution
    await setupServerLock();
    
    // Load environment variables
    const envPath = path.resolve(__dirname, '.env');
    console.log('🔍 Looking for .env file at:', envPath);
    
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env file not found at:', envPath);
      console.error('💡 Please create a .env file with the required variables');
      process.exit(1);
    }
    
    // Load dotenv with absolute path
    require('dotenv').config({ path: envPath });
    
    // Sanity logs
    console.log('✅ Environment loaded successfully');
    console.log('📁 CWD:', process.cwd());
    console.log('🔑 Has ENCRYPTION_KEY?', !!process.env.ENCRYPTION_KEY);
    console.log('🗄️ Has DATABASE_URL?', !!process.env.DATABASE_URL);
    console.log('🔐 Has JWT_SECRET?', !!process.env.JWT_SECRET);
    
    // PHASE 10: Admin wallet validation
    const adminWalletAddress = process.env.ADMIN_WALLET_ADDRESS;
    const adminPrivateKey = process.env.ADMIN_PRIVATE_KEY;
    
    if (adminWalletAddress && adminPrivateKey) {
      console.log('✅ Admin wallet loaded:', adminWalletAddress);
    } else {
      console.log('❌ Missing admin wallet keys');
      console.log('⚠️  Election creation will fail without admin wallet configuration');
    }
    
    // Validate required envs early
    const required = ['ENCRYPTION_KEY', 'DATABASE_URL', 'JWT_SECRET'];
    const missing = required.filter((k) => !process.env[k]);
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:', missing.join(', '));
      console.error('💡 Please check your .env file');
      process.exit(1);
    }
    
    console.log('🎉 All required environment variables are present!');
    console.log('🚀 Starting server with enhanced conflict resolution...\n');
    
    // Now load the actual server
    require('./server.js');
    
  } catch (error) {
    console.error('💥 Initialization failed:', error);
    process.exit(1);
  }
};

// Start the enhanced initialization
initialize();
