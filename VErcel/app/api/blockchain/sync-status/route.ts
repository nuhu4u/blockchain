// app/api/blockchain/sync-status/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
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

    // Forward the request to the backend API
    const upstream = await fetch('http://localhost:3001/api/blockchain/sync-status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
        message: 'Failed to fetch blockchain sync status',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
