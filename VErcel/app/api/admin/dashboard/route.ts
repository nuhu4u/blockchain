import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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

      // Fetch dashboard data from backend
      const response = await fetch(`${base}/api/admin/dashboard`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': authHeader, // Forward the authorization header
        },
      });

      const data = await response.json();
      if (response.ok) {
        return NextResponse.json({
          success: true,
          data: data,
          message: 'Admin dashboard data fetched successfully'
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
