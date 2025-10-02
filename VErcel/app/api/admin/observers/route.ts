import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No authorization token provided' }, { status: 401 });
    }

    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    
    try {
      const response = await fetch(`${base}/api/admin/observers`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        return NextResponse.json(data);
      } else {
        return NextResponse.json(data, { status: response.status });
      }
    } catch (fetchError: any) {
      return NextResponse.json(
        { error: 'Failed to connect to backend server' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
