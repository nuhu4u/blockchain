import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ electionId: string; level: string }> }
) {
  try {
    const { electionId, level } = await params;
    const { searchParams } = new URL(request.url);
    const levelId = searchParams.get('levelId');
    
    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    
    // Build URL with optional levelId parameter
    let url = `${base}/api/position-tracking/${electionId}/level/${level}`;
    if (levelId) {
      url += `/${levelId}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': request.headers.get('Authorization') || ''
      }
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error' 
      }, 
      { status: 500 }
    );
  }
}
