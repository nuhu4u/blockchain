// app/api/blockchain/retry-votes/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Get the token from cookies
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Authentication required',
          error: 'No authentication token found'
        },
        { status: 401 }
      );
    }

    // Get request body
    const body = await req.json().catch(() => ({}));

    // Forward the request to the backend API
    const upstream = await fetch('http://localhost:3001/api/blockchain/retry-votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await upstream.json().catch(() => ({}));

    return NextResponse.json(data, {
      status: upstream.status,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to retry votes',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
