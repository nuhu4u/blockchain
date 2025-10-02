/**
 * List Collections Script
 * Lists all collections in the database
 */

const { MongoClient } = require('mongodb');

async function listCollections() {
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db('election_system');
    
    console.log('📋 Listing all collections...');
    
    const collections = await db.listCollections().toArray();
    
    console.log('\n📊 Current Collections:');
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });
    
    console.log(`\n📈 Total Collections: ${collections.length}`);
    
  } catch (error) {
    console.error('❌ Error listing collections:', error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the script
if (require.main === module) {
  listCollections()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = { listCollections };
