import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { electionId: string } }) {
  try {
    const { electionId } = params
    
    if (!electionId) {
      return NextResponse.json({ 
        message: 'Election ID is required' 
      }, { status: 400 })
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'
    const response = await fetch(`${backendUrl}/api/voter-tracking/stats/${electionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ 
        message: errorData.message || 'Failed to fetch election voter statistics' 
      }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)

  } catch (error) {
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}
