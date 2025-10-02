const backendURL = 'http://localhost:3001';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // API rewrites for backend proxy
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: `${backendURL}/api/admin/:path*`,
      },
      {
        source: '/api/dashboard/:path*',
        destination: `${backendURL}/api/dashboard/:path*`,
      },
      {
        source: '/api/auth/:path*',
        destination: `${backendURL}/api/auth/:path*`,
      },
      {
        source: '/api/elections/:path*',
        destination: `${backendURL}/api/elections/:path*`,
      },
      {
        source: '/api/blockchain/:path*',
        destination: `${backendURL}/api/blockchain/:path*`,
      },
      {
        source: '/api/observer/:path*',
        destination: `${backendURL}/api/observer/:path*`,
      },
      {
        source: '/api/profile/:path*',
        destination: `${backendURL}/api/profile/:path*`,
      },
      {
        source: '/api/vote-position/:path*',
        destination: `${backendURL}/api/vote-position/:path*`,
      },
      {
        source: '/api/position-tracking/:path*',
        destination: `${backendURL}/api/position-tracking/:path*`,
      },
      {
        source: '/api/enhanced-position-tracking/:path*',
        destination: `${backendURL}/api/enhanced-position-tracking/:path*`,
      },
      // Geo-data is handled by backend
      {
        source: '/api/geo-data',
        destination: `${backendURL}/api/geo-data`,
      },
      {
        source: '/avatars/:path*',
        destination: `${backendURL}/avatars/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendURL}/uploads/:path*`,
      },
    ];
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Comprehensive webpack fix for __webpack_require__.n issue
  webpack: (config, { dev, isServer, webpack }) => {
    // Fix for __webpack_require__.n issue - Webpack 5 compatibility
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
    };
    
    // Better module resolution
    config.resolve.modules = ['node_modules', '.'];
    
    // Fix for CommonJS/ES module interop
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.mjs': ['.mjs', '.js', '.ts', '.tsx'],
    };
    
    // Ensure proper module resolution
    config.resolve.mainFields = ['browser', 'module', 'main'];
    
    // Remove problematic ProvidePlugin for browser compatibility
    
    // Add node polyfills
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'global': 'globalThis',
      })
    );
    
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.minimize = true;
    }
    
    return config;
  },
  // Enable compression
  compress: true,
}

export default nextConfig
