// app/api/auth/me/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const jar = await cookies();
  const token = jar.get('token')?.value;


  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const upstream = await fetch('http://localhost:3001/api/auth/me', {
    method: 'GET',
    headers,
    cache: 'no-store',
  });

  const data = await upstream.json().catch(() => ({}));
  
  
  return NextResponse.json(data, { 
    status: upstream.status, 
    headers: { 'Cache-Control': 'no-store' } 
  });
}