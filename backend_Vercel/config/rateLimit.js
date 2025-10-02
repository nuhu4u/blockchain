/**
 * Rate limiting configuration
 * These values can be overridden by environment variables
 */

module.exports = {
  // Default rate limiting window in milliseconds (15 minutes)
  windowMs: process.env.RATE_LIMIT_WINDOW_MS 
    ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) 
    : 15 * 60 * 1000,
    
  // Maximum number of requests per windowMs
  maxRequests: process.env.RATE_LIMIT_MAX_REQUESTS 
    ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) 
    : 100,
    
  // Skip rate limiting for these paths (exact match)
  skipPaths: [
    '/api/health',
    '/favicon.ico',
    '/api/profile/decrypt-nin' // Skip rate limiting for NIN decryption to avoid blocking profile access
  ],
  
  // Skip rate limiting for these IP addresses
  trustedIps: process.env.TRUSTED_IPS 
    ? process.env.TRUSTED_IPS.split(',').map(ip => ip.trim()) 
    : [],
    
  // Enable/disable rate limiting
  enabled: process.env.RATE_LIMIT_ENABLED !== 'false' && false, // Temporarily disabled for development
  
  // Trust proxy headers for rate limiting
  trustProxy: process.env.TRUST_PROXY === 'true',
  
  // Rate limiting for specific routes
  routes: {
    // Authentication routes
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs (increased from 20)
      keyGenerator: (req) => {
        // Use email in the body if available, otherwise use IP
        return req.body.email ? `auth-${req.body.email}` : req.ip;
      }
    },
    
    // Password reset routes
    passwordReset: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // Limit each IP to 5 requests per windowMs
      keyGenerator: (req) => {
        // Use email in the body if available, otherwise use IP
        return req.body.email ? `reset-${req.body.email}` : req.ip;
      }
    },
    
    // OTP verification routes
    otp: {
      windowMs: 5 * 60 * 1000, // 5 minutes
      max: 5, // Limit each IP to 5 requests per windowMs
      keyGenerator: (req) => {
        // Use email or phone in the body if available, otherwise use IP
        return req.body.identifier ? `otp-${req.body.identifier}` : req.ip;
      }
    },
    
    // Admin routes
    admin: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 200, // Limit each IP to 200 requests per hour
      keyGenerator: (req) => {
        // Use user ID as key if authenticated, otherwise use IP
        return req.user ? `admin-${req.user.id}` : `ip-${req.ip}`;
      }
    },
    
    // Public API routes
    publicApi: {
      windowMs: 60 * 60 * 1000, // 1 hour
      max: 1000, // Limit each IP to 1000 requests per hour
      keyGenerator: (req) => `public-${req.ip}`
    },
    
    // Default rate limiting for all other routes
    default: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200, // Limit each IP to 200 requests per windowMs (increased from 100)
      keyGenerator: (req) => `default-${req.ip}`
    }
  }
};

// Helper function to get rate limit config for a specific route
module.exports.getConfigForRoute = (routeName) => {
  return this.routes[routeName] || this.routes.default;
};

// Helper function to check if a path should be excluded from rate limiting
module.exports.shouldSkipRateLimit = (path) => {
  return this.skipPaths.includes(path);
};

// Helper function to check if an IP is trusted
module.exports.isTrustedIp = (ip) => {
  return this.trustedIps.includes(ip);
};
