"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Users, 
  RefreshCw,
  Loader2,
  Eye,
  ExternalLink,
  Activity
} from "lucide-react"
import { useObserverAuth } from "@/hooks/useObserverAuth"
import Link from "next/link"

interface BlockchainElection {
  electionId: string
  title: string
  status: string
  startDate: string
  endDate: string
  dbVotes: number
  chainVotes: number
  consistency: 'consistent' | 'inconsistent' | 'unavailable' | 'noContract'
  blockchainStatus: 'online' | 'offline' | 'noContract'
  lastChecked: string
  contractAddress: string | null
  candidateVotes: Array<{
    candidateId: string
    votes: number
  }>
}

interface Transaction {
  hash: string
  from: string
  to: string
  blockNumber: string
  gasUsed: string
  timestamp: string
  votePosition: number
  candidateId: string
}

interface BlockchainNetworkStatus {
  isOnline: boolean
  chainId: number | null
  blockNumber: number | null
  gasPrice: string | null
  lastChecked: string
}

export default function ObserverBlockchainPage() {
  const { user, token, isAuthenticated, isLoading: authLoading } = useObserverAuth()
  
  const [elections, setElections] = useState<BlockchainElection[]>([])
  const [selectedElection, setSelectedElection] = useState<BlockchainElection | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [networkStatus, setNetworkStatus] = useState<BlockchainNetworkStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)

  // Load blockchain elections data
  const loadBlockchainElections = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/observer/elections/blockchain', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setElections(data.data.elections || [])
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to load blockchain elections')
      }
    } catch (error) {
      setError('Failed to load blockchain elections. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Load network status
  const loadNetworkStatus = async () => {
    try {
      const response = await fetch('/api/observer/blockchain/status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setNetworkStatus(data.data)
      }
    } catch (error) {
      }
  }

  // Load election transactions
  const loadElectionTransactions = async (electionId: string) => {
    try {
      const response = await fetch(`/api/observer/elections/${electionId}/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.data.transactions || [])
        setShowTransactions(true)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to load transactions')
      }
    } catch (error) {
      setError('Failed to load transactions. Please try again.')
    }
  }

  // Refresh all data
  const handleRefresh = async () => {
    setRefreshing(true)
    await Promise.all([
      loadBlockchainElections(),
      loadNetworkStatus()
    ])
    setRefreshing(false)
  }

  // Get consistency badge
  const getConsistencyBadge = (consistency: string) => {
    switch (consistency) {
      case 'consistent':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Consistent
          </Badge>
        )
      case 'inconsistent':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Inconsistent
          </Badge>
        )
      case 'unavailable':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Unavailable
          </Badge>
        )
      case 'noContract':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <XCircle className="h-3 w-3 mr-1" />
            No Contract
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Unknown
          </Badge>
        )
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case 'COMPLETED':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case 'UPCOMING':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Upcoming
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            {status}
          </Badge>
        )
    }
  }

  // Load data on component mount
  useEffect(() => {
    if (isAuthenticated && token) {
      loadBlockchainElections()
      loadNetworkStatus()
    }
  }, [isAuthenticated, token])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading blockchain transparency dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Blockchain Transparency</h1>
                <p className="text-gray-600">Monitor elections with blockchain verification</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
                size="sm"
              >
                {refreshing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Network Status */}
        {networkStatus && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Blockchain Network Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className={`text-sm font-medium ${networkStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                    {networkStatus.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Chain ID</p>
                  <p className="text-sm text-gray-900">{networkStatus.chainId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Block Number</p>
                  <p className="text-sm text-gray-900">{networkStatus.blockNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Gas Price</p>
                  <p className="text-sm text-gray-900">{networkStatus.gasPrice || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading blockchain elections...</p>
          </div>
        ) : elections.length === 0 ? (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Elections Found</h3>
            <p className="text-gray-600">There are no elections available for blockchain verification at this time.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Elections</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{elections.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Available for verification
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consistent Elections</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {elections.filter(e => e.consistency === 'consistent').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    DB matches blockchain
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inconsistent Elections</CardTitle>
                  <XCircle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {elections.filter(e => e.consistency === 'inconsistent').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    DB differs from blockchain
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {elections.reduce((sum, e) => sum + e.dbVotes, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Across all elections
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Elections List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Elections with Blockchain Verification</h2>
              {elections.map((election) => (
                <Card key={election.electionId} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{election.title}</CardTitle>
                        <CardDescription>
                          {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(election.status)}
                        {getConsistencyBadge(election.consistency)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">DB Votes</p>
                        <p className="text-2xl font-bold">{election.dbVotes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Blockchain Votes</p>
                        <p className="text-2xl font-bold">{election.chainVotes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Contract</p>
                        <p className="text-sm text-gray-900">
                          {election.contractAddress || 'Not Set'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Last Checked</p>
                        <p className="text-sm text-gray-900">
                          {new Date(election.lastChecked).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button
                        onClick={() => loadElectionTransactions(election.electionId)}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Transactions
                      </Button>
                      <Button asChild size="sm">
                        <Link href={`/observer/${election.electionId}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Transactions Modal */}
            {showTransactions && selectedElection && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Blockchain Transactions</CardTitle>
                      <CardDescription>
                        Transaction details for {selectedElection.title}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => setShowTransactions(false)}
                      variant="outline"
                      size="sm"
                    >
                      Close
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {transactions.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {transactions.map((tx, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div>
                              <p className="font-medium text-gray-600">Transaction Hash</p>
                              <p className="text-gray-900 font-mono">{tx.hash}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-600">From</p>
                              <p className="text-gray-900 font-mono">{tx.from}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-600">To</p>
                              <p className="text-gray-900 font-mono">{tx.to}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-600">Block</p>
                              <p className="text-gray-900">{tx.blockNumber}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Position: #{tx.votePosition} | Gas: {tx.gasUsed} | {new Date(tx.timestamp).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Shield className="h-8 w-8 mx-auto mb-2" />
                      <p>No transactions found for this election</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
