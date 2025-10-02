/**
 * PHASE 14: Test Vote Sync Script
 * 
 * This script tests the vote sync functionality and shows
 * the current status of pending votes.
 */

require('dotenv').config();
const voteSyncService = require('../services/voteSyncService');
const transactionConfirmationService = require('../services/transactionConfirmationService');

async function testVoteSync() {
  console.log('🧪 Testing Vote Sync Services...\n');

  try {
    // Test vote sync stats
    console.log('📊 Getting vote sync statistics...');
    const stats = await voteSyncService.getSyncStats();
    console.log('Vote Sync Stats:', JSON.stringify(stats, null, 2));

    // Test pending votes details
    console.log('\n🔍 Getting pending votes details...');
    const pendingVotes = await voteSyncService.getPendingVotesDetails();
    console.log(`Found ${pendingVotes.length} pending votes:`);
    
    pendingVotes.forEach((vote, index) => {
      console.log(`\n${index + 1}. Vote ID: ${vote.voteId}`);
      console.log(`   Election: ${vote.electionTitle}`);
      console.log(`   Voter: ${vote.voterEmail}`);
      console.log(`   Candidate: ${vote.candidateId}`);
      console.log(`   Retry Count: ${vote.retryCount}`);
      console.log(`   Last Attempt: ${vote.lastAttempt}`);
      console.log(`   Last Error: ${vote.lastError}`);
      console.log(`   Has Contract: ${vote.hasContract}`);
      console.log(`   Has Wallet: ${vote.hasWallet}`);
    });

    // Test transaction confirmation service status
    console.log('\n🔄 Getting transaction confirmation service status...');
    const confirmationStatus = transactionConfirmationService.getStatus();
    console.log('Transaction Confirmation Status:', JSON.stringify(confirmationStatus, null, 2));

    // Test manual vote sync
    console.log('\n🚀 Testing manual vote sync...');
    const syncResult = await voteSyncService.retryPendingVotes();
    console.log('Vote Sync Result:', JSON.stringify(syncResult, null, 2));

    console.log('\n✅ Vote sync test completed successfully!');

  } catch (error) {
    console.error('❌ Vote sync test failed:', error);
  }
}

// Run the test
testVoteSync().then(() => {
  console.log('\n🏁 Test script finished');
  process.exit(0);
}).catch(error => {
  console.error('💥 Test script crashed:', error);
  process.exit(1);
});
