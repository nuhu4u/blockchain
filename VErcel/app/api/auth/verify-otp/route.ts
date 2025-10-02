import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    const ac = new AbortController();
    const to = setTimeout(() => ac.abort(), 15000);
    
    try {
      const response = await fetch(`${base}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: ac.signal,
      });

      clearTimeout(to);
      const data = await response.json();

      if (response.ok && data.success) {
        return NextResponse.json(data);
      } else {
        return NextResponse.json(data, { status: response.status });
      }
    } catch (fetchError: any) {
      clearTimeout(to);
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timed out', detail: 'Backend took too long to respond' },
          { status: 408 }
        );
      }
      throw fetchError;
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error', detail: error.message },
      { status: 500 }
    );
  }
}
