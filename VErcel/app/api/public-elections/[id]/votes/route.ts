import { NextRequest, NextResponse } from 'next/server'

// Backend base URL - single source of truth
const BACKEND_URL = 'http://localhost:3001'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const electionId = params.id
    
    // Call the backend API for votes (no auth required)
    const response = await fetch(`${BACKEND_URL}/api/elections/${electionId}/votes`, {
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
          message: `Public votes data retrieved successfully for election ${electionId}`
        })
      } else {
        return NextResponse.json({
          success: true,
          data: [],
          message: `No votes available for election ${electionId}`
        })
      }
    } else {
      const errorText = await response.text()
      
      return NextResponse.json({
        success: false,
        error: `Backend error: ${response.status}`,
        message: `Failed to fetch votes for election ${electionId}`
      }, { status: response.status })
    }
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      message: `Unable to connect to vote service for election ${params.id}`
    }, { status: 500 })
  }
}
