const axios = require('axios');

async function verifyBlockchainSection() {
  console.log('🔍 Verifying Blockchain Verification Section...\n');
  
  try {
    // Test the API endpoint
    const response = await axios.get('http://localhost:3001/api/vote-position/68c484853bb0cb2f521a88a9/level/pollingUnit');
    
    if (response.status !== 200) {
      console.log('❌ API Error: Status', response.status);
      return;
    }
    
    const data = response.data.data;
    console.log('✅ API Response: Success');
    console.log('📊 Election:', data.election?.title);
    console.log('📊 Level:', data.level);
    
    // Check vote details
    const voteDetails = data.level_stats?.[0]?.vote_details || [];
    console.log('📊 Vote Details Count:', voteDetails.length);
    
    if (voteDetails.length > 0) {
      const latestVote = voteDetails[0];
      
      console.log('\n🔗 Blockchain Verification Data:');
      console.log('  Transaction Hash:', latestVote.transactionHash ? '✅ Available' : '❌ Missing');
      console.log('  Contract Address:', latestVote.contractAddress ? '✅ Available' : '❌ Missing');
      console.log('  Candidate Name:', latestVote.candidateName ? '✅ Available' : '❌ Missing');
      console.log('  Timestamp:', latestVote.timestamp ? '✅ Available' : '❌ Missing');
      
      // Test Etherscan URL
      if (latestVote.transactionHash) {
        const etherscanUrl = `https://etherscan.io/tx/${latestVote.transactionHash}`;
        console.log('\n🌐 Etherscan Integration:');
        console.log('  URL:', etherscanUrl);
        console.log('  Valid Format:', latestVote.transactionHash.startsWith('0x') && latestVote.transactionHash.length === 66 ? '✅ Yes' : '⚠️ Check');
      }
      
      // Frontend compatibility check
      console.log('\n🎯 Frontend Compatibility:');
      const hasTransactionHash = !!(latestVote.transactionHash || latestVote.transaction_hash);
      const hasContractAddress = !!(latestVote.contractAddress || latestVote.contract_address);
      
      console.log('  Transaction Hash Field:', hasTransactionHash ? '✅ Found' : '❌ Missing');
      console.log('  Contract Address Field:', hasContractAddress ? '✅ Found' : '❌ Missing');
      console.log('  Will Show Green Section:', hasTransactionHash && hasContractAddress ? '✅ Yes' : '❌ No, will show fallback');
      
      // Test what the frontend condition will evaluate to
      const willShowBlockchainData = latestVote && (latestVote.transactionHash || latestVote.transaction_hash);
      console.log('  Frontend Condition Result:', willShowBlockchainData ? '✅ Show Blockchain Data' : '⚠️ Show Fallback UI');
      
    } else {
      console.log('\n⚠️ No vote details found - Frontend will show fallback UI');
    }
    
    console.log('\n📝 Summary:');
    if (voteDetails.length > 0 && voteDetails[0].transactionHash) {
      console.log('  ✅ Blockchain Verification Section: WORKING');
      console.log('  ✅ Transaction Hash: Available for Etherscan');
      console.log('  ✅ Contract Address: Available for verification');
      console.log('  ✅ User Experience: Green verification section with working "View on Etherscan" button');
    } else {
      console.log('  ⚠️ Blockchain Verification Section: Shows fallback UI');
      console.log('  ⚠️ Reason: No blockchain data available at this level');
      console.log('  ✅ Fallback: Yellow warning section explaining the situation');
    }
    
  } catch (error) {
    console.error('❌ Verification Failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solution: Make sure the backend server is running on port 3001');
      console.log('   Command: npm start or node server.js');
    }
  }
}

verifyBlockchainSection().catch(console.error);
