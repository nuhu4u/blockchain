// Database Index Creation Script
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function createDatabaseIndexes() {
  console.log('🔍 Creating database indexes for performance...');
  
  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    await client.connect();
    const db = client.db();
    
    // Helper function to create index safely
    const createIndexSafely = async (collection, indexSpec, options = {}) => {
      try {
        await collection.createIndex(indexSpec, options);
        console.log('✅ Created index:', JSON.stringify(indexSpec));
      } catch (error) {
        if (error.code === 11000) {
          console.log('⚠️ Index already exists or duplicate key:', JSON.stringify(indexSpec));
        } else {
          console.log('❌ Error creating index:', JSON.stringify(indexSpec), error.message);
        }
      }
    };
    
    // Users collection indexes
    await createIndexSafely(db.collection('users'), { email: 1 }, { unique: true });
    await createIndexSafely(db.collection('users'), { nin: 1 }, { unique: true, sparse: true });
    await createIndexSafely(db.collection('users'), { role: 1 });
    await createIndexSafely(db.collection('users'), { is_active: 1 });
    
    // Elections collection indexes
    await createIndexSafely(db.collection('elections'), { status: 1 });
    await createIndexSafely(db.collection('elections'), { election_type: 1 });
    await createIndexSafely(db.collection('elections'), { created_at: -1 });
    await createIndexSafely(db.collection('elections'), { state_id: 1, lga_id: 1, ward_id: 1, polling_unit_id: 1 });
    
    // Votes collection indexes
    await createIndexSafely(db.collection('votes'), { election_id: 1, voter_id: 1 }, { unique: true });
    await createIndexSafely(db.collection('votes'), { election_id: 1, candidate_id: 1 });
    await createIndexSafely(db.collection('votes'), { election_id: 1, status: 1 });
    await createIndexSafely(db.collection('votes'), { vote_timestamp: -1 });
    await createIndexSafely(db.collection('votes'), { sequential_position: 1 });
    
    // Vote positions collection indexes
    await createIndexSafely(db.collection('vote_positions'), { election_id: 1, level: 1 });
    await createIndexSafely(db.collection('vote_positions'), { election_id: 1, user_id: 1 });
    
    console.log('✅ Database index creation completed');
  } catch (error) {
    console.error('❌ Error creating indexes:', error);
  } finally {
    await client.close();
  }
}

if (require.main === module) {
  createDatabaseIndexes();
}

module.exports = { createDatabaseIndexes };