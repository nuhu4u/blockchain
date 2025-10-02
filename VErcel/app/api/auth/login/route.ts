// app/api/auth/login/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const upstream = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
    redirect: 'manual',
  });

  const data = await upstream.json().catch(() => ({}));

  const res = NextResponse.json(data, {
    status: upstream.status,
    headers: { 'Cache-Control': 'no-store' },
  });

  if (upstream.ok && data?.token) {
    if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
      }
    res.cookies.set('token', data.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });
    if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
      }
  } else {
    if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
      }
  }
  
  return res;
}