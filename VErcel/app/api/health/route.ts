import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const base = process.env.BACKEND_BASE_URL || 'http://localhost:3001';
    
    try {
      const response = await fetch(`${base}/api/ready`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: 'Backend server is running',
          backendUrl: base
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Backend server responded with error',
          status: response.status,
          backendUrl: base
        }, { status: 503 });
      }
    } catch (fetchError: any) {
      return NextResponse.json({
        success: false,
        message: 'Backend server is not accessible',
        error: fetchError.message,
        backendUrl: base
      }, { status: 503 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Health check failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
