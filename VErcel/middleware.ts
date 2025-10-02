// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/dashboard',
    '/vote-position',
    // add other protected pages here; DO NOT include /api/*
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  // Debug logging can be enabled via environment variable

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
