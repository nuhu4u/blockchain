const fs = require('fs');
const path = require('path');

class ControllerHealthService {
  constructor() {
    this.controllersPath = path.join(__dirname, '../controllers');
    this.routesPath = path.join(__dirname, '../routes');
    this.healthStatus = {
      controllers: {},
      routes: {},
      overall: 'healthy'
    };
  }

  /**
   * Check all controllers for health
   */
  async checkControllers() {
    console.log('\n🔍 === CONTROLLER HEALTH CHECK ===');
    
    const controllerFiles = fs.readdirSync(this.controllersPath)
      .filter(file => file.endsWith('.js') && file !== 'index.js');

    for (const file of controllerFiles) {
      const controllerName = file.replace('.js', '');
      const controllerPath = path.join(this.controllersPath, file);
      
      try {
        // Clear require cache to get fresh module
        delete require.cache[require.resolve(controllerPath)];
        const controller = require(controllerPath);
        
        // Get exported functions
        const exportedFunctions = Object.keys(controller);
        
        // Check if all exported functions are actually defined
        const definedFunctions = [];
        const undefinedFunctions = [];
        
        for (const funcName of exportedFunctions) {
          if (typeof controller[funcName] === 'function') {
            definedFunctions.push(funcName);
          } else {
            undefinedFunctions.push(funcName);
          }
        }
        
        this.healthStatus.controllers[controllerName] = {
          status: undefinedFunctions.length === 0 ? 'healthy' : 'unhealthy',
          definedFunctions,
          undefinedFunctions,
          totalExports: exportedFunctions.length,
          totalDefined: definedFunctions.length
        };
        
        if (undefinedFunctions.length === 0) {
          console.log(`✅ Controller Loaded: ${controllerName} (${definedFunctions.length} functions)`);
        } else {
          console.log(`❌ Controller Missing: ${controllerName} - ${undefinedFunctions.length} undefined functions: ${undefinedFunctions.join(', ')}`);
          this.healthStatus.overall = 'unhealthy';
        }
        
      } catch (error) {
        console.log(`❌ Controller Error: ${controllerName} - ${error.message}`);
        this.healthStatus.controllers[controllerName] = {
          status: 'error',
          error: error.message
        };
        this.healthStatus.overall = 'unhealthy';
      }
    }
    
    return this.healthStatus.controllers;
  }

  /**
   * Check all routes for health
   */
  async checkRoutes() {
    console.log('\n🔍 === ROUTE HEALTH CHECK ===');
    
    const routeFiles = fs.readdirSync(this.routesPath)
      .filter(file => file.endsWith('.js'));

    for (const file of routeFiles) {
      const routeName = file.replace('.js', '');
      const routePath = path.join(this.routesPath, file);
      
      try {
        // Read the route file content to analyze
        const routeContent = fs.readFileSync(routePath, 'utf8');
        
        // Extract route definitions and their handlers
        const routeMatches = routeContent.match(/router\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`][^,]*,\s*([^)]+)\)/g);
        
        if (!routeMatches) {
          console.log(`⚠️ Warning: No routes found in ${routeName}`);
          continue;
        }
        
        const routes = [];
        
        for (const match of routeMatches) {
          // Extract route path and handler
          const pathMatch = match.match(/['"`]([^'"`]+)['"`]/);
          const handlerMatch = match.match(/,\s*([^)]+)\)/);
          
          if (pathMatch && handlerMatch) {
            const routePath = pathMatch[1];
            const handler = handlerMatch[1].trim();
            
            // Extract controller and function name
            const controllerMatch = handler.match(/(\w+)\.(\w+)/);
            
            // Skip middleware functions (like upload.single, auth, etc.)
            if (handler.includes('upload.') || handler.includes('auth') || handler.includes('validate') || handler.includes('authorize')) {
              routes.push({
                path: routePath,
                handler: handler,
                controller: 'middleware',
                function: 'middleware',
                status: 'active'
              });
            } else if (controllerMatch) {
              const [, controllerName, functionName] = controllerMatch;
              
              // Check if controller exists and function is defined
              const controllerStatus = this.healthStatus.controllers[controllerName];
              let routeStatus = 'unknown';
              
              if (!controllerStatus) {
                routeStatus = 'missing_controller';
              } else if (controllerStatus.status === 'error') {
                routeStatus = 'controller_error';
              } else if (controllerStatus.undefinedFunctions.includes(functionName)) {
                routeStatus = 'missing_function';
              } else if (controllerStatus.definedFunctions.includes(functionName)) {
                routeStatus = 'active';
              } else {
                routeStatus = 'function_not_exported';
              }
              
              routes.push({
                path: routePath,
                handler: handler,
                controller: controllerName,
                function: functionName,
                status: routeStatus
              });
            }
          }
        }
        
        this.healthStatus.routes[routeName] = {
          status: routes.every(r => r.status === 'active') ? 'healthy' : 'unhealthy',
          routes: routes
        };
        
        // Log route status
        for (const route of routes) {
          if (route.status === 'active') {
            console.log(`✅ Route Active: /api/${routeName}${route.path} → ${route.handler}`);
          } else {
            console.log(`❌ Route Disabled: /api/${routeName}${route.path} → ${route.handler} (${route.status})`);
            this.healthStatus.overall = 'unhealthy';
          }
        }
        
      } catch (error) {
        console.log(`❌ Route Error: ${routeName} - ${error.message}`);
        this.healthStatus.routes[routeName] = {
          status: 'error',
          error: error.message
        };
        this.healthStatus.overall = 'unhealthy';
      }
    }
    
    return this.healthStatus.routes;
  }

  /**
   * Run complete health check
   */
  async runHealthCheck() {
    console.log('🚀 Starting Controller and Route Health Check...\n');
    
    await this.checkControllers();
    await this.checkRoutes();
    
    // Summary
    console.log('\n📊 === HEALTH CHECK SUMMARY ===');
    
    const totalControllers = Object.keys(this.healthStatus.controllers).length;
    const healthyControllers = Object.values(this.healthStatus.controllers)
      .filter(c => c.status === 'healthy').length;
    
    const totalRoutes = Object.values(this.healthStatus.routes)
      .reduce((sum, r) => sum + (r.routes ? r.routes.length : 0), 0);
    const activeRoutes = Object.values(this.healthStatus.routes)
      .reduce((sum, r) => sum + (r.routes ? r.routes.filter(route => route.status === 'active').length : 0), 0);
    
    console.log(`📈 Controllers: ${healthyControllers}/${totalControllers} healthy`);
    console.log(`📈 Routes: ${activeRoutes}/${totalRoutes} active`);
    console.log(`📈 Overall Status: ${this.healthStatus.overall.toUpperCase()}`);
    
    if (this.healthStatus.overall === 'healthy') {
      console.log('✅ All controllers and routes are healthy!');
    } else {
      console.log('⚠️ Some controllers or routes have issues - check logs above');
    }
    
    return this.healthStatus;
  }

  /**
   * Get health status
   */
  getHealthStatus() {
    return this.healthStatus;
  }
}

// Create singleton instance
const controllerHealthService = new ControllerHealthService();

module.exports = controllerHealthService;
