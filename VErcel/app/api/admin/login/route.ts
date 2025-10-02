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
    
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ 
        success: false,
        error: 'Email and password are required' 
      }, { status: 400 });
    }

    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    
    try {
      // Call the backend admin login endpoint
      const response = await fetch(`${base}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Check if the user is actually an admin
        if (data.user && data.user.role === 'ADMIN') {
          const responseData = {
            success: true,
            token: data.token,
            user: data.user,
            message: 'Admin login successful',
            redirectTo: '/admin'
          };
          
          // Create response with cookie
          const nextResponse = NextResponse.json(responseData);
          
          // Set the token as an HTTP-only cookie
          nextResponse.cookies.set('token', data.token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
          });
          
          return nextResponse;
        } else {
          return NextResponse.json({
            success: false,
            error: 'Access denied. Admin privileges required.'
          }, { status: 403 });
        }
      } else {
        return NextResponse.json(data, { status: response.status });
      }
    } catch (fetchError: any) {
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
