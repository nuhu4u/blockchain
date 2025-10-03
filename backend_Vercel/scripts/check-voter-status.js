const { MongoClient } = require('mongodb');

async function checkVoterStatus() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('🔍 Checking voter status in database...\n');
    
    // Get all users with role VOTER
    const allVoters = await db.collection('users').find({ role: 'VOTER' }).toArray();
    
    console.log(`📊 Total users with role 'VOTER': ${allVoters.length}`);
    
    if (allVoters.length > 0) {
      console.log('\n📋 Voter Details:');
      console.log('='.repeat(80));
      
      allVoters.forEach((voter, index) => {
        console.log(`${index + 1}. Email: ${voter.email}`);
        console.log(`   Name: ${voter.first_name} ${voter.last_name}`);
        console.log(`   NIN Verified: ${voter.nin_verified || false}`);
        console.log(`   Registration Completed: ${voter.registration_completed || false}`);
        console.log(`   Is Active: ${voter.is_active || false}`);
        console.log(`   Has Wallet: ${!!voter.wallet_address}`);
        console.log(`   User Unique ID: ${voter.user_unique_id || 'Not set'}`);
        console.log(`   Created: ${voter.created_at || 'Unknown'}`);
        console.log('-'.repeat(40));
      });
      
      // Count by status
      const verifiedCount = allVoters.filter(v => v.nin_verified && v.registration_completed).length;
      const ninVerifiedOnly = allVoters.filter(v => v.nin_verified && !v.registration_completed).length;
      const notVerified = allVoters.filter(v => !v.nin_verified).length;
      
      console.log('\n📈 Status Breakdown:');
      console.log(`   ✅ Fully Verified & Completed: ${verifiedCount}`);
      console.log(`   🔄 NIN Verified Only: ${ninVerifiedOnly}`);
      console.log(`   ⏳ Not Verified: ${notVerified}`);
      
    } else {
      console.log('❌ No voters found in database');
    }
    
    // Also check other roles
    const adminCount = await db.collection('users').countDocuments({ role: 'ADMIN' });
    const observerCount = await db.collection('users').countDocuments({ role: 'OBSERVER' });
    
    console.log('\n👥 All User Roles:');
    console.log(`   VOTER: ${allVoters.length}`);
    console.log(`   ADMIN: ${adminCount}`);
    console.log(`   OBSERVER: ${observerCount}`);
    
  } catch (error) {
    console.error('❌ Error checking voter status:', error);
  } finally {
    await client.close();
  }
}

// Run the check
checkVoterStatus().catch(console.error);


