// Geo data configuration
export const GEO_CONFIG = {
  // Set this to the path of your NDJSON file
  // For Windows, use double backslashes or forward slashes
  NDJSON_PATH: process.env.GEODATA_NDJSON_PATH || 
    "C:\\Users\\Dell Latitude 5410\\Blockchain_voting\\backend_Vercel\\geodata_full.ndjson",
  
  // Alternative: use forward slashes (works on Windows too)
  // NDJSON_PATH: process.env.GEODATA_NDJSON_PATH || 
  //   "C:/Users/Dell Latitude 5410/Blockchain_voting/backend_Vercel/geodata_full.ndjson",
};

// Instructions for setting up environment variable:
// 1. Create a .env.local file in the VErcel directory
// 2. Add this line: GEODATA_NDJSON_PATH=C:\\Users\\Dell Latitude 5410\\Blockchain_voting\\backend_Vercel\\geodata_full.ndjson
// 3. Restart your development server
// 4. Or set it as a system environment variable before starting the server
