import { NextRequest, NextResponse } from 'next/server'

// Backend base URL - single source of truth
const BACKEND_URL = 'http://localhost:3001'

export async function GET(request: NextRequest) {
  try {
    // Call the backend API for elections (no auth required)
    const response = await fetch(`${BACKEND_URL}/api/elections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      
      if (data.success && data.data) {
        // Return the data as-is (no filtering for public access)
        return NextResponse.json({
          success: true,
          data: data.data,
          message: 'Public elections data retrieved successfully'
        })
      } else {
        return NextResponse.json({
          success: true,
          data: [],
          message: 'No elections available'
        })
      }
    } else {
      const errorText = await response.text()
      
      return NextResponse.json({
        success: false,
        error: `Backend error: ${response.status}`,
        message: 'Failed to fetch elections from backend'
      }, { status: response.status })
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      message: 'Unable to connect to election service'
    }, { status: 500 })
  }
}
