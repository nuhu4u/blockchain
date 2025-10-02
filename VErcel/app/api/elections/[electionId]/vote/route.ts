import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ electionId: string }> }
) {
  try {
    const { electionId } = await params;
    const { candidate_id } = await request.json();
    
    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    
    try {
      // Forward the vote request to the backend with cookies
      const response = await fetch(`${base}/api/elections/${electionId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': request.headers.get('cookie') || ''
        },
        body: JSON.stringify({ candidate_id })
      });

      const data = await response.json();

      if (response.ok) {
        return NextResponse.json({
          success: true,
          data: data,
          message: 'Vote cast successfully'
        });
      } else {
        return NextResponse.json(data, { status: response.status });
      }
    } catch (fetchError: any) {
      if (fetchError.message.includes('fetch') || fetchError.code === 'ECONNREFUSED') {
        return NextResponse.json(
          {
            success: false,
            error: 'Backend server is not running. Please start the backend server on port 3001.'
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to backend server. Please ensure the backend is running on port 3001.'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
