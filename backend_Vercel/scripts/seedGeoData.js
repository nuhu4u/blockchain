const { MongoClient } = require('mongodb');

// Nigerian States with their LGAs
const nigerianStates = [
  {
    name: "Abia",
    code: "AB",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Adamawa",
    code: "AD",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Akwa Ibom",
    code: "AK",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Anambra",
    code: "AN",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Bauchi",
    code: "BA",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Bayelsa",
    code: "BY",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Benue",
    code: "BE",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Borno",
    code: "BO",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Cross River",
    code: "CR",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Delta",
    code: "DE",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Ebonyi",
    code: "EB",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Edo",
    code: "ED",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Ekiti",
    code: "EK",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Enugu",
    code: "EN",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Federal Capital Territory",
    code: "FC",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Gombe",
    code: "GO",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Imo",
    code: "IM",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Jigawa",
    code: "JI",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kaduna",
    code: "KD",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kano",
    code: "KN",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Katsina",
    code: "KT",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kebbi",
    code: "KB",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kogi",
    code: "KO",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Kwara",
    code: "KW",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Lagos",
    code: "LA",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Nasarawa",
    code: "NA",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Niger",
    code: "NI",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Ogun",
    code: "OG",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Ondo",
    code: "ON",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Osun",
    code: "OS",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Oyo",
    code: "OY",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Plateau",
    code: "PL",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Rivers",
    code: "RI",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Sokoto",
    code: "SO",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Taraba",
    code: "TA",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Yobe",
    code: "YO",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Zamfara",
    code: "ZA",
    type: "STATE",
    level: 1,
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Sample LGAs for Lagos State (as an example)
const sampleLGAs = [
  {
    name: "Agege",
    code: "AGE",
    type: "LGA",
    level: 2,
    parent_id: null, // Will be set to Lagos state ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Alimosho",
    code: "ALI",
    type: "LGA",
    level: 2,
    parent_id: null, // Will be set to Lagos state ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Amuwo-Odofin",
    code: "AMU",
    type: "LGA",
    level: 2,
    parent_id: null, // Will be set to Lagos state ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Apapa",
    code: "APA",
    type: "LGA",
    level: 2,
    parent_id: null, // Will be set to Lagos state ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Badagry",
    code: "BAD",
    type: "LGA",
    level: 2,
    parent_id: null, // Will be set to Lagos state ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Sample Wards for Agege LGA
const sampleWards = [
  {
    name: "Ward A",
    code: "WA",
    type: "WARD",
    level: 3,
    parent_id: null, // Will be set to Agege LGA ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Ward B",
    code: "WB",
    type: "WARD",
    level: 3,
    parent_id: null, // Will be set to Agege LGA ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Ward C",
    code: "WC",
    type: "WARD",
    level: 3,
    parent_id: null, // Will be set to Agege LGA ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

// Sample Polling Units for Ward A
const samplePollingUnits = [
  {
    name: "Polling Unit 001",
    code: "PU001",
    type: "POLLING_UNIT",
    level: 4,
    parent_id: null, // Will be set to Ward A ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Polling Unit 002",
    code: "PU002",
    type: "POLLING_UNIT",
    level: 4,
    parent_id: null, // Will be set to Ward A ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: "Polling Unit 003",
    code: "PU003",
    type: "POLLING_UNIT",
    level: 4,
    parent_id: null, // Will be set to Ward A ID
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

async function seedGeoData() {
  const client = new MongoClient(process.env.DATABASE_URL || 'mongodb://localhost:27017/election_system');
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db();
    
    // Clear existing geo data
    await db.collection('geoData').deleteMany({});
    console.log('Cleared existing geo data');
    
    // Insert states
    const statesResult = await db.collection('geoData').insertMany(nigerianStates);
    console.log(`Inserted ${statesResult.insertedCount} states`);
    
    // Get Lagos state ID for LGA parent reference
    const lagosState = await db.collection('geoData').findOne({ name: "Lagos" });
    
    // Update LGAs with Lagos state as parent
    const lagosLGAs = sampleLGAs.map(lga => ({
      ...lga,
      parent_id: lagosState._id
    }));
    
    // Insert LGAs
    const lgasResult = await db.collection('geoData').insertMany(lagosLGAs);
    console.log(`Inserted ${lgasResult.insertedCount} LGAs`);
    
    // Get Agege LGA ID for ward parent reference
    const agegeLGA = await db.collection('geoData').findOne({ name: "Agege" });
    
    // Update wards with Agege LGA as parent
    const agegeWards = sampleWards.map(ward => ({
      ...ward,
      parent_id: agegeLGA._id
    }));
    
    // Insert wards
    const wardsResult = await db.collection('geoData').insertMany(agegeWards);
    console.log(`Inserted ${wardsResult.insertedCount} wards`);
    
    // Get Ward A ID for polling unit parent reference
    const wardA = await db.collection('geoData').findOne({ name: "Ward A" });
    
    // Update polling units with Ward A as parent
    const wardAPollingUnits = samplePollingUnits.map(pu => ({
      ...pu,
      parent_id: wardA._id
    }));
    
    // Insert polling units
    const pollingUnitsResult = await db.collection('geoData').insertMany(wardAPollingUnits);
    console.log(`Inserted ${pollingUnitsResult.insertedCount} polling units`);
    
    console.log('✅ Geographic data seeding completed successfully!');
    console.log(`Total records: ${await db.collection('geoData').countDocuments()}`);
    
  } catch (error) {
    console.error('❌ Error seeding geo data:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the seeding function
seedGeoData();
