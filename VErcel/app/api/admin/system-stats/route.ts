import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {

    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';

    try {
      // Get authorization header from request
      const authHeader = request.headers.get('authorization');
      if (!authHeader) {
        return NextResponse.json({
          success: false,
          error: 'No authentication token provided'
        }, { status: 401 });
      }

      // Get request body
      const body = await request.json();

      // Fetch system stats update from backend
      const response = await fetch(`${base}/api/admin/system-stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader, // Forward the authorization header
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        return NextResponse.json({
          success: true,
          data: data,
          message: 'System statistics updated successfully'
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
