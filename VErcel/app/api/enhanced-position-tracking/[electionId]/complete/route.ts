export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ electionId: string }> }
) {
  const { electionId } = await params;
  const jar = await cookies();
  const token = jar.get('token')?.value;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
    }

  const upstream = await fetch(`http://localhost:3001/api/enhanced-position-tracking/${electionId}/complete`, {
    method: 'GET',
    headers,
    cache: 'no-store',
  });

  const data = await upstream.json().catch(() => ({}));
  return NextResponse.json(data, { status: upstream.status, headers: { 'Cache-Control': 'no-store' } });
}
