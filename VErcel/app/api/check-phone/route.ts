import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Call your backend API to check if phone exists
    // For now, we'll simulate the check
    // In production, this should call your backend service
    
    try {
      const response = await fetch(`${process.env.BACKEND_URL || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001')}/api/auth/check-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ exists: data.exists });
      } else {
        // If backend is not available, return false (assume number is available)
        return NextResponse.json({ exists: false });
      }
    } catch (error) {
      // If backend is not available, return false (assume number is available)
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
