import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ electionId: string }> }
) {
  try {
    const { electionId } = await params;
    
    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    
    const response = await fetch(`${base}/api/position-tracking/${electionId}/levels`, {
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
