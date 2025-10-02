const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function importGeoData() {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing geo data
    await db.collection('geodata').deleteMany({});
    console.log('Cleared existing geo data');
    
    // Read the NDJSON file
    const filePath = path.join(__dirname, '../geodata_full.ndjson');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse NDJSON (each line is a JSON object)
    const lines = fileContent.trim().split('\n');
    const documents = lines.map(line => JSON.parse(line));
    
    console.log(`Found ${documents.length} documents to import`);
    
    // Insert all documents
    const result = await db.collection('geodata').insertMany(documents);
    console.log(`Successfully imported ${result.insertedCount} documents`);
    
    // Create indexes for fast lookups
    console.log('Creating indexes...');
    
    await db.collection('geodata').createIndex({ type: 1 });
    console.log('✅ Index created: { type: 1 }');
    
    await db.collection('geodata').createIndex({ state_id: 1 });
    console.log('✅ Index created: { state_id: 1 }');
    
    await db.collection('geodata').createIndex({ lga_id: 1 });
    console.log('✅ Index created: { lga_id: 1 }');
    
    await db.collection('geodata').createIndex({ ward_id: 1 });
    console.log('✅ Index created: { ward_id: 1 }');
    
    await db.collection('geodata').createIndex({ pu_id: 1 }, { 
      unique: true, 
      partialFilterExpression: { pu_id: { $exists: true } } 
    });
    console.log('✅ Index created: { pu_id: 1 } (unique, partial)');
    
    console.log('\n🎯 Testing queries...');
    
    // Test the queries
    const states = await db.collection('geodata').find({ type: "state" }, { _id: 0 }).sort({ state_name: 1 }).toArray();
    console.log(`📊 States: ${states.length} found`);
    
    const lagosLgas = await db.collection('geodata').find({ type: "lga", state_id: "LAG" }, { _id: 0 }).sort({ lga_name: 1 }).toArray();
    console.log(`🏘️ Lagos LGAs: ${lagosLgas.length} found`);
    
    const agegeWards = await db.collection('geodata').find({ type: "ward", lga_id: "LAG-LGA-01" }, { _id: 0 }).sort({ ward_name: 1 }).toArray();
    console.log(`🏛️ Agege Wards: ${agegeWards.length} found`);
    
    const ward01PUs = await db.collection('geodata').find({ type: "polling_unit", ward_id: "LAG-LGA-01-W-01" }, { _id: 0 }).sort({ pu_name: 1 }).toArray();
    console.log(`🗳️ Ward 01 Polling Units: ${ward01PUs.length} found`);
    
    console.log('\n✅ Geographic data import completed successfully!');
    console.log(`📈 Total records: ${await db.collection('geodata').countDocuments()}`);
    
    // Show sample data
    console.log('\n📋 Sample Data:');
    console.log('States:', states.slice(0, 5).map(s => s.state_name).join(', '));
    console.log('Lagos LGAs:', lagosLgas.slice(0, 5).map(l => l.lga_name).join(', '));
    console.log('Agege Wards:', agegeWards.map(w => w.ward_name).join(', '));
    console.log('Ward 01 PUs:', ward01PUs.map(p => p.pu_name).join(', '));
    
  } catch (error) {
    console.error('❌ Error importing geo data:', error);
  } finally {
    await client.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the import function
importGeoData();
