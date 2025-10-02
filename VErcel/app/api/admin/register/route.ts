import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
      } catch (parseError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid JSON format in request body'
      }, { status: 400 });
    }

    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 });
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json({
        success: false,
        error: 'Password must be at least 8 characters long'
      }, { status: 400 });
    }

    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    try {
      const response = await fetch(`${base}/api/admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: 'ADMIN'
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return NextResponse.json({
          success: true,
          message: 'Admin account created successfully',
          user: data.user
        });
      } else {
        return NextResponse.json(data, { status: response.status });
      }
    } catch (fetchError: any) {
      if (fetchError.message.includes('fetch') || fetchError.code === 'ECONNREFUSED') {
        return NextResponse.json(
          {
            success: false,
            error: 'Backend server is not running. Please start the backend server on port 3001.'
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Failed to connect to backend server. Please ensure the backend is running on port 3001.'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
