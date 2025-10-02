import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'No authentication token provided' }, { status: 401 })
    }

    const { id } = params
    if (!id) {
      return NextResponse.json({ message: 'Election ID is required' }, { status: 400 })
    }

    // Forward to backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'
    const backendEndpoint = `${backendUrl}/api/admin/elections/${id}`
    const response = await fetch(backendEndpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ 
        message: errorData.message || 'Failed to delete election' 
      }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json({
      message: 'Election deleted successfully',
      ...result
    })

  } catch (error) {
    return NextResponse.json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
