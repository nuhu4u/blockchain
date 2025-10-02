export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const jar = await cookies();
  const token = jar.get('token')?.value || null;
  return NextResponse.json({ ok: true, hasToken: !!token }, { headers: { 'Cache-Control': 'no-store' } });
}
