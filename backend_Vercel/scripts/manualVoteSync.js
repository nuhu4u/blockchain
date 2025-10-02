/**
 * PHASE 14: Manual Vote Sync Script
 * 
 * This script manually triggers vote sync for all pending votes.
 * Use this to immediately process any hanging votes.
 */

require('dotenv').config();
const voteSyncService = require('../services/voteSyncService');

async function manualVoteSync() {
  console.log('🚀 Starting manual vote sync...\n');

  try {
    // Get initial stats
    console.log('📊 Getting initial statistics...');
    const initialStats = await voteSyncService.getSyncStats();
    console.log('Initial Stats:', JSON.stringify(initialStats, null, 2));

    // Run vote sync
    console.log('\n🔄 Running vote sync...');
    const result = await voteSyncService.retryPendingVotes();
    
    console.log('\n📈 Vote Sync Results:');
    console.log(`✅ Success: ${result.success}`);
    console.log(`📝 Message: ${result.message}`);
    console.log(`🔄 Retried: ${result.retried}`);
    console.log(`✅ Successful: ${result.success}`);
    console.log(`⏳ Still Pending: ${result.stillPending}`);
    console.log(`❌ Errors: ${result.errors.length}`);
    console.log(`⏱️ Duration: ${result.duration}ms`);

    if (result.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      result.errors.forEach((error, index) => {
        console.log(`${index + 1}. Vote ID: ${error.voteId}`);
        console.log(`   Error: ${error.error}`);
        console.log(`   Type: ${error.type}`);
      });
    }

    // Get final stats
    console.log('\n📊 Getting final statistics...');
    const finalStats = await voteSyncService.getSyncStats();
    console.log('Final Stats:', JSON.stringify(finalStats, null, 2));

    console.log('\n✅ Manual vote sync completed!');

  } catch (error) {
    console.error('❌ Manual vote sync failed:', error);
  }
}

// Run the manual sync
manualVoteSync().then(() => {
  console.log('\n🏁 Manual sync script finished');
  process.exit(0);
}).catch(error => {
  console.error('💥 Manual sync script crashed:', error);
  process.exit(1);
});
