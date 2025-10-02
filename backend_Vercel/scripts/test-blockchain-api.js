const { MongoClient } = require('mongodb');

async function testBlockchainAPI() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔍 Testing Blockchain API...');
    
    // First, let's test admin login
    console.log('\n1. Testing Admin Login...');
    const adminLoginResponse = await fetch('http://localhost:3001/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin1@gmail.com',
        password: 'admin123'
      })
    });
    
    if (!adminLoginResponse.ok) {
      console.log('❌ Admin login failed:', adminLoginResponse.status, adminLoginResponse.statusText);
      const errorText = await adminLoginResponse.text();
      console.log('Error details:', errorText);
      return;
    }
    
    const loginData = await adminLoginResponse.json();
    console.log('✅ Admin login successful');
    console.log('User role:', loginData.user?.role);
    console.log('Token length:', loginData.token?.length);
    
    const token = loginData.token;
    
    // Test blockchain sync stats
    console.log('\n2. Testing Blockchain Sync Stats...');
    const syncStatsResponse = await fetch('http://localhost:3001/api/blockchain/sync-stats', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Sync Stats Status:', syncStatsResponse.status);
    if (!syncStatsResponse.ok) {
      const errorText = await syncStatsResponse.text();
      console.log('❌ Sync Stats Error:', errorText);
    } else {
      const syncStatsData = await syncStatsResponse.json();
      console.log('✅ Sync Stats Success:', syncStatsData);
    }
    
    // Test pending votes
    console.log('\n3. Testing Pending Votes...');
    const pendingVotesResponse = await fetch('http://localhost:3001/api/blockchain/pending-votes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Pending Votes Status:', pendingVotesResponse.status);
    if (!pendingVotesResponse.ok) {
      const errorText = await pendingVotesResponse.text();
      console.log('❌ Pending Votes Error:', errorText);
    } else {
      const pendingVotesData = await pendingVotesResponse.json();
      console.log('✅ Pending Votes Success:', pendingVotesData);
    }
    
    // Test retry votes
    console.log('\n4. Testing Retry Votes...');
    const retryVotesResponse = await fetch('http://localhost:3001/api/blockchain/retry-votes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });
    
    console.log('Retry Votes Status:', retryVotesResponse.status);
    if (!retryVotesResponse.ok) {
      const errorText = await retryVotesResponse.text();
      console.log('❌ Retry Votes Error:', errorText);
    } else {
      const retryVotesData = await retryVotesResponse.json();
      console.log('✅ Retry Votes Success:', retryVotesData);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await client.close();
  }
}

// Set environment variables
process.env.DATABASE_URL = 'mongodb://localhost:27017/election_system';

testBlockchainAPI();
