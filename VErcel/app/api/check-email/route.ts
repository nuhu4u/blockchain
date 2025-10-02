import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Call your backend API to check if email exists
    // For now, we'll simulate the check
    // In production, this should call your backend service
    
    try {
      const response = await fetch(`${process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001')}/api/auth/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ exists: data.exists });
      } else {
        // If backend is not available, return false (assume email is available)
        return NextResponse.json({ exists: false });
      }
    } catch (error) {
      // If backend is not available, return false (assume email is available)
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
