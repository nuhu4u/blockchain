import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No authentication token found' },
        { status: 401 }
      );
    }

    // Forward the request to the backend with credentials
    const backendUrl = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/admin/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, message: errorData.message || 'Verification failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Forward the Set-Cookie header if present
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      const responseHeaders = new Headers();
      responseHeaders.set('set-cookie', setCookie);
      return NextResponse.json(data, { headers: responseHeaders });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
