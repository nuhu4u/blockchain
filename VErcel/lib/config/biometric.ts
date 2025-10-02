/**
 * Biometric Configuration
 * Determines whether to use real API or mock service
 */

export const biometricConfig = {
  // Set to true to use mock service (when backend is not available)
  useMockService: process.env.NEXT_PUBLIC_USE_MOCK_BIOMETRIC === 'true' || false,
  
  // API endpoint configuration
  apiEndpoint: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // Fallback behavior
  fallbackToMock: true, // Whether to fallback to mock service on API errors
};
