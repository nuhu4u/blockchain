import { NextRequest, NextResponse } from 'next/server'

/**
 * PHASE 12: Blockchain Transaction API
 * 
 * This API endpoint fetches transaction details from the blockchain
 * and returns them in a user-friendly format for the frontend.
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { hash: string } }
) {
  try {
    const transactionHash = params.hash
    
    if (!transactionHash) {
      return NextResponse.json({
        success: false,
        message: 'Transaction hash is required'
      }, { status: 400 })
    }

    // Call backend blockchain service to get transaction details
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001'
    const response = await fetch(`${backendUrl}/api/blockchain/transaction/${transactionHash}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || ''
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
      
      if (response.status === 404) {
        return NextResponse.json({
          success: false,
          message: 'Transaction not found'
        }, { status: 404 })
      }
      
      return NextResponse.json({
        success: false,
        message: errorData.message || 'Failed to fetch transaction data'
      }, { status: response.status })
    }

    const result = await response.json()
    
    if (!result.success) {
      return NextResponse.json({
        success: false,
        message: result.message || 'Failed to fetch transaction data'
      }, { status: 500 })
    }

    // Transform the data for frontend consumption
    const transactionData = {
      transaction: {
        hash: result.data.hash,
        blockNumber: result.data.blockNumber,
        gasUsed: result.data.gasUsed,
        gasPrice: result.data.gasPrice,
        from: result.data.from,
        to: result.data.to,
        value: result.data.value,
        status: result.data.status,
        timestamp: result.data.timestamp,
        network: result.data.network || 'Ganache Local Network',
        explorerUrl: result.data.explorerUrl,
        voteData: {
          electionContract: result.data.electionContract,
          voterAddress: result.data.voterAddress,
          candidateId: result.data.candidateId
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: transactionData
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch transaction data: ' + error.message
    }, { status: 500 })
  }
}
