// app/api/profile/decrypt-nin/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const jar = await cookies();
    const token = jar.get('token')?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        message: 'Authentication token not found'
      }, { status: 401 });
    }

    const body = await request.json();
    const { aes_encrypted, nin_iv } = body;

    if (!aes_encrypted || !nin_iv) {
      return NextResponse.json({
        success: false,
        message: 'Missing required NIN data'
      }, { status: 400 });
    }

    const headers: Record<string, string> = { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const upstream = await fetch('http://localhost:3001/api/profile/decrypt-nin', {
      method: 'POST',
      headers,
      body: JSON.stringify({ aes_encrypted, nin_iv })
    });

    const data = await upstream.json();
    
    return NextResponse.json(data, { 
      status: upstream.status, 
      headers: { 'Cache-Control': 'no-store' } 
    });
  } catch (error) {
    console.error('Decrypt NIN API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
