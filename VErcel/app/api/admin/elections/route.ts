import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ message: 'No authentication token provided' }, { status: 401 })
    }

    const body = await request.json()
    // Validate required fields
    const { title, type, electionDate, startTime, endTime, contestants } = body
    
    if (!title || !type || !electionDate || !startTime || !endTime) {
      return NextResponse.json({ 
        message: 'Missing required fields: title, type, electionDate, startTime, endTime' 
      }, { status: 400 })
    }

    if (!contestants || !Array.isArray(contestants) || contestants.length === 0) {
      return NextResponse.json({ 
        message: 'At least one contestant with name and running mate is required' 
      }, { status: 400 })
    }

    // Validate contestants
    for (const contestant of contestants) {
      if (!contestant.name || !contestant.runningMate || !contestant.party) {
        return NextResponse.json({ 
          message: 'Each contestant must have name, running mate, and party' 
        }, { status: 400 })
      }
    }

    // Prepare election data for backend
    const electionData = {
      title,
      election_type: type,
      start_date: `${electionDate}T${startTime}:00.000Z`,
      end_date: `${electionDate}T${endTime}:00.000Z`,
      status: 'ONGOING', // Use 'ONGOING' to match dashboard expectations
      states: body.states || [], // Include states array
      lgas: body.lgas || [], // Include LGAs array
      contestants: contestants.map((contestant, index) => ({
        id: `contestant-${index + 1}`,
        name: contestant.name,
        running_mate: contestant.runningMate,
        party: contestant.party || 'Independent',
        position: (index + 1).toString()
      }))
    }

    // Forward to backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'
    const response = await fetch(`${backendUrl}/api/admin/elections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(electionData)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ 
        message: errorData.message || 'Failed to create election' 
      }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json({
      message: 'Election created successfully',
      election: result
    })

  } catch (error) {
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json({ message: 'No authentication token provided' }, { status: 401 })
    }

    // Forward to backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'
    const response = await fetch(`${backendUrl}/api/admin/elections`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ 
        message: errorData.message || 'Failed to fetch elections' 
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
