/**
 * Test Biometric API Endpoints
 * Tests all biometric API endpoints to ensure they work correctly
 */

const fetch = require('node-fetch');

const API_BASE_URL = 'http://172.20.10.2:3001/api';

// Mock authentication token (replace with real token for testing)
const AUTH_TOKEN = 'your-auth-token-here';

async function testBiometricAPI() {
  console.log('🧪 Testing Biometric API Endpoints...');
  console.log('=====================================');
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AUTH_TOKEN}`,
  };
  
  try {
    // Test 1: Get biometric status
    console.log('\n📊 Test 1: Getting biometric status...');
    try {
      const response = await fetch(`${API_BASE_URL}/biometric/status`, {
        method: 'GET',
        headers,
      });
      
      const result = await response.json();
      console.log('✅ Status endpoint response:', result);
    } catch (error) {
      console.log('❌ Status endpoint error:', error.message);
    }
    
    // Test 2: Check duplicate fingerprint
    console.log('\n🔍 Test 2: Checking duplicate fingerprint...');
    try {
      const response = await fetch(`${API_BASE_URL}/biometric/check-duplicate`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fingerprintData: 'test-fingerprint-data-123'
        }),
      });
      
      const result = await response.json();
      console.log('✅ Duplicate check response:', result);
    } catch (error) {
      console.log('❌ Duplicate check error:', error.message);
    }
    
    // Test 3: Register biometric (will fail without valid auth)
    console.log('\n🔐 Test 3: Registering biometric...');
    try {
      const response = await fetch(`${API_BASE_URL}/biometric/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fingerprintData: 'test-fingerprint-data-123',
          consent: true
        }),
      });
      
      const result = await response.json();
      console.log('✅ Registration response:', result);
    } catch (error) {
      console.log('❌ Registration error:', error.message);
    }
    
    // Test 4: Verify biometric (will fail without valid auth)
    console.log('\n✅ Test 4: Verifying biometric...');
    try {
      const response = await fetch(`${API_BASE_URL}/biometric/verify`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fingerprintData: 'test-fingerprint-data-123',
          electionId: 'test-election-123'
        }),
      });
      
      const result = await response.json();
      console.log('✅ Verification response:', result);
    } catch (error) {
      console.log('❌ Verification error:', error.message);
    }
    
    console.log('\n🎉 Biometric API testing completed!');
    console.log('=====================================');
    console.log('📝 Note: Some tests may fail due to authentication requirements');
    console.log('💡 Use valid authentication tokens for full testing');
    
  } catch (error) {
    console.error('💥 Test suite failed:', error);
  }
}

// Run the tests
if (require.main === module) {
  testBiometricAPI()
    .then(() => {
      console.log('\n🏁 Test suite completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💀 Test suite failed!');
      process.exit(1);
    });
}

module.exports = { testBiometricAPI };
