const { MongoClient } = require('mongodb');

// Nigerian States with their IDs
const nigerianStates = [
  { type: "state", state_id: "ABI", state_name: "Abia" },
  { type: "state", state_id: "ADA", state_name: "Adamawa" },
  { type: "state", state_id: "AKW", state_name: "Akwa Ibom" },
  { type: "state", state_id: "ANA", state_name: "Anambra" },
  { type: "state", state_id: "BAU", state_name: "Bauchi" },
  { type: "state", state_id: "BAY", state_name: "Bayelsa" },
  { type: "state", state_id: "BEN", state_name: "Benue" },
  { type: "state", state_id: "BOR", state_name: "Borno" },
  { type: "state", state_id: "CRO", state_name: "Cross River" },
  { type: "state", state_id: "DEL", state_name: "Delta" },
  { type: "state", state_id: "EBO", state_name: "Ebonyi" },
  { type: "state", state_id: "EDO", state_name: "Edo" },
  { type: "state", state_id: "EKI", state_name: "Ekiti" },
  { type: "state", state_id: "ENU", state_name: "Enugu" },
  { type: "state", state_id: "FCT", state_name: "Federal Capital Territory" },
  { type: "state", state_id: "GOM", state_name: "Gombe" },
  { type: "state", state_id: "IMO", state_name: "Imo" },
  { type: "state", state_id: "JIG", state_name: "Jigawa" },
  { type: "state", state_id: "KAD", state_name: "Kaduna" },
  { type: "state", state_id: "KAN", state_name: "Kano" },
  { type: "state", state_id: "KAT", state_name: "Katsina" },
  { type: "state", state_id: "KEB", state_name: "Kebbi" },
  { type: "state", state_id: "KOG", state_name: "Kogi" },
  { type: "state", state_id: "KWA", state_name: "Kwara" },
  { type: "state", state_id: "LAG", state_name: "Lagos" },
  { type: "state", state_id: "NAS", state_name: "Nasarawa" },
  { type: "state", state_id: "NIG", state_name: "Niger" },
  { type: "state", state_id: "OGU", state_name: "Ogun" },
  { type: "state", state_id: "OND", state_name: "Ondo" },
  { type: "state", state_id: "OSU", state_name: "Osun" },
  { type: "state", state_id: "OYO", state_name: "Oyo" },
  { type: "state", state_id: "PLA", state_name: "Plateau" },
  { type: "state", state_id: "RIV", state_name: "Rivers" },
  { type: "state", state_id: "SOK", state_name: "Sokoto" },
  { type: "state", state_id: "TAR", state_name: "Taraba" },
  { type: "state", state_id: "YOB", state_name: "Yobe" },
  { type: "state", state_id: "ZAM", state_name: "Zamfara" }
];

// Sample LGAs for Lagos State
const lagosLGAs = [
  { type: "lga", lga_id: "LAG-LGA-01", lga_name: "Agege", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-02", lga_name: "Alimosho", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-03", lga_name: "Amuwo-Odofin", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-04", lga_name: "Apapa", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-05", lga_name: "Badagry", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-06", lga_name: "Epe", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-07", lga_name: "Eti-Osa", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-08", lga_name: "Ibeju-Lekki", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-09", lga_name: "Ifako-Ijaiye", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-10", lga_name: "Ikeja", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-11", lga_name: "Ikorodu", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-12", lga_name: "Kosofe", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-13", lga_name: "Lagos Island", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-14", lga_name: "Lagos Mainland", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-15", lga_name: "Mushin", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-16", lga_name: "Ojo", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-17", lga_name: "Oshodi-Isolo", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-18", lga_name: "Shomolu", state_id: "LAG" },
  { type: "lga", lga_id: "LAG-LGA-19", lga_name: "Surulere", state_id: "LAG" }
];

// Sample Wards for Agege LGA
const agegeWards = [
  { type: "ward", ward_id: "LAG-LGA-01-W-01", ward_name: "Ward 01", lga_id: "LAG-LGA-01" },
  { type: "ward", ward_id: "LAG-LGA-01-W-02", ward_name: "Ward 02", lga_id: "LAG-LGA-01" },
  { type: "ward", ward_id: "LAG-LGA-01-W-03", ward_name: "Ward 03", lga_id: "LAG-LGA-01" },
  { type: "ward", ward_id: "LAG-LGA-01-W-04", ward_name: "Ward 04", lga_id: "LAG-LGA-01" },
  { type: "ward", ward_id: "LAG-LGA-01-W-05", ward_name: "Ward 05", lga_id: "LAG-LGA-01" }
];

// Sample Polling Units for Ward 01
const ward01PollingUnits = [
  {
    type: "polling_unit",
    pu_id: "LAG-LGA-01-W-01-PU-001",
    pu_name: "PU 001",
    ward_id: "LAG-LGA-01-W-01",
    address: "Primary School A",
    gps_lat: null,
    gps_lng: null
  },
  {
    type: "polling_unit",
    pu_id: "LAG-LGA-01-W-01-PU-002",
    pu_name: "PU 002",
    ward_id: "LAG-LGA-01-W-01",
    address: "Community Hall",
    gps_lat: null,
    gps_lng: null
  },
  {
    type: "polling_unit",
    pu_id: "LAG-LGA-01-W-01-PU-003",
    pu_name: "PU 003",
    ward_id: "LAG-LGA-01-W-01",
    address: "Market Square",
    gps_lat: null,
    gps_lng: null
  }
];

async function seedGeoData() {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing geo data
    await db.collection('geodata').deleteMany({});
    console.log('Cleared existing geo data');
    
    // Insert states
    const statesResult = await db.collection('geodata').insertMany(nigerianStates);
    console.log(`Inserted ${statesResult.insertedCount} states`);
    
    // Insert LGAs
    const lgasResult = await db.collection('geodata').insertMany(lagosLGAs);
    console.log(`Inserted ${lgasResult.insertedCount} LGAs`);
    
    // Insert wards
    const wardsResult = await db.collection('geodata').insertMany(agegeWards);
    console.log(`Inserted ${wardsResult.insertedCount} wards`);
    
    // Insert polling units
    const pollingUnitsResult = await db.collection('geodata').insertMany(ward01PollingUnits);
    console.log(`Inserted ${pollingUnitsResult.insertedCount} polling units`);
    
    // Create indexes for fast lookups
    await db.collection('geodata').createIndex({ type: 1 });
    await db.collection('geodata').createIndex({ state_id: 1 });
    await db.collection('geodata').createIndex({ lga_id: 1 });
    await db.collection('geodata').createIndex({ ward_id: 1 });
    await db.collection('geodata').createIndex({ pu_id: 1 }, { unique: true, sparse: true });
    console.log('Created indexes for fast lookups');
    
    console.log('✅ Geographic data seeding completed successfully!');
    console.log(`Total records: ${await db.collection('geodata').countDocuments()}`);
    
    // Test queries
    console.log('\n🧪 Testing queries:');
    
    const states = await db.collection('geodata').find({ type: "state" }, { _id: 0 }).sort({ state_name: 1 }).toArray();
    console.log(`States: ${states.length} found`);
    
    const lagosLgas = await db.collection('geodata').find({ type: "lga", state_id: "LAG" }, { _id: 0 }).sort({ lga_name: 1 }).toArray();
    console.log(`Lagos LGAs: ${lagosLgas.length} found`);
    
    const agegeWardsTest = await db.collection('geodata').find({ type: "ward", lga_id: "LAG-LGA-01" }, { _id: 0 }).sort({ ward_name: 1 }).toArray();
    console.log(`Agege Wards: ${agegeWardsTest.length} found`);
    
    const ward01PUsTest = await db.collection('geodata').find({ type: "polling_unit", ward_id: "LAG-LGA-01-W-01" }, { _id: 0 }).sort({ pu_name: 1 }).toArray();
    console.log(`Ward 01 Polling Units: ${ward01PUsTest.length} found`);
    
  } catch (error) {
    console.error('❌ Error seeding geo data:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedGeoData();
