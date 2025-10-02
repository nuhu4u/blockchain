import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Path to the geodata_full.ndjson file in the public directory
    const geoDataPath = path.join(process.cwd(), 'public', 'geodata_full.ndjson');
    
    // Check if file exists
    if (!fs.existsSync(geoDataPath)) {
      return NextResponse.json(
        { error: 'Geo data file not found' },
        { status: 404 }
      );
    }

    // Read and parse the NDJSON file
    const fileContent = fs.readFileSync(geoDataPath, 'utf-8');
    
    // Parse the JSON content
    const geoData = JSON.parse(fileContent);
    
    return NextResponse.json(geoData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load geo data' },
      { status: 500 }
    );
  }
}
