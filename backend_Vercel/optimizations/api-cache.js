// API Response Caching Middleware
const NodeCache = require('node-cache');

class ApiCache {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: 300, // 5 minutes default
      checkperiod: 120, // 2 minutes
      useClones: false
    });
  }

  // Cache middleware
  cacheMiddleware(ttl = 300) {
    return (req, res, next) => {
      const key = this.generateCacheKey(req);
      const cached = this.cache.get(key);
      
      if (cached) {
        res.set('X-Cache', 'HIT');
        return res.json(cached);
      }

      // Store original json method
      const originalJson = res.json;
      
      // Override json method to cache response
      res.json = function(data) {
        // Only cache successful responses
        if (res.statusCode >= 200 && res.statusCode < 300) {
          this.cache.set(key, data, ttl);
        }
        res.set('X-Cache', 'MISS');
        return originalJson.call(this, data);
      }.bind(this);

      next();
    };
  }

  generateCacheKey(req) {
    const { method, url, query, body } = req;
    const key = method + ':' + url + ':' + JSON.stringify(query) + ':' + JSON.stringify(body);
    return Buffer.from(key).toString('base64');
  }

  // Clear cache by pattern
  clearCache(pattern) {
    const keys = this.cache.keys();
    keys.forEach(key => {
      if (key.includes(pattern)) {
        this.cache.del(key);
      }
    });
  }

  // Clear all cache
  clearAllCache() {
    this.cache.flushAll();
  }
}

module.exports = ApiCache;