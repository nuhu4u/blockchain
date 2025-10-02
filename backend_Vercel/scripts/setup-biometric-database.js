/**
 * Master Biometric Database Setup Script
 * Runs all biometric database setup scripts in sequence
 */

const { createBiometricTables } = require('./create-biometric-tables');
const { updateUsersBiometric } = require('./update-users-biometric');
const { updateVotesBiometric } = require('./update-votes-biometric');

async function setupBiometricDatabase() {
  console.log('🚀 Starting Biometric Database Setup...');
  console.log('=====================================');
  
  try {
    // Step 1: Create biometric tables
    console.log('\n📊 Step 1: Creating biometric tables...');
    await createBiometricTables();
    
    // Step 2: Update users collection
    console.log('\n👤 Step 2: Updating users collection...');
    await updateUsersBiometric();
    
    // Step 3: Update votes collection
    console.log('\n🗳️ Step 3: Updating votes collection...');
    await updateVotesBiometric();
    
    console.log('\n🎉 Biometric Database Setup Completed Successfully!');
    console.log('==================================================');
    console.log('✅ All biometric tables created');
    console.log('✅ Users collection updated with biometric fields');
    console.log('✅ Votes collection updated with biometric verification fields');
    console.log('✅ All indexes created for optimal performance');
    console.log('\n🔐 Ready for biometric voting feature implementation!');
    
  } catch (error) {
    console.error('\n💥 Biometric Database Setup Failed!');
    console.error('==================================');
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
    throw error;
  }
}

// Run the setup
if (require.main === module) {
  setupBiometricDatabase()
    .then(() => {
      console.log('\n🏁 Setup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💀 Setup failed!');
      process.exit(1);
    });
}

module.exports = { setupBiometricDatabase };
