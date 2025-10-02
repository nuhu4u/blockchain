"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { ObserverRouteGuard } from "@/components/ObserverRouteGuard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ArrowLeft,
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Users, 
  Shield,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useObserverAuth } from "@/hooks/useObserverAuth"
import Link from "next/link"
import { getPartyPictureWithFallback } from "@/lib/data/candidates"

interface ElectionDetails {
  electionId: string
  title: string
  description: string
  status: string
  startDate: string
  endDate: string
  electionType: string
  state: string
  lga: string
  ward: string
  pollingUnit: string
  dbVotes: number
  chainVotes: number
  consistency: 'consistent' | 'inconsistent' | 'unavailable' | 'noContract'
  blockchainStatus: 'online' | 'offline' | 'noContract'
  lastChecked: string
  contractAddress: string | null
  candidates: Array<{
    candidateId: string
    name: string
    party: string
    votes: number
    voteDetails: Array<{
      voterId: string
      transactionHash: string
      votePosition: number
      timestamp: string
    }>
  }>
  allVotes: Array<{
    voteId: string
    voterId: string
    voterEmail: string
    walletAddress: string
    candidateId: string
    transactionHash: string
    votePosition: number
    timestamp: string
    blockNumber: string
    gasUsed: string
  }>
  summary: {
    totalVoters: number
    successfulVotes: number
    pendingVotes: number
    consistencyStatus: string
    blockchainAvailable: boolean
    lastUpdated: string
  }
}

export default function ObserverElectionDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user, token, isAuthenticated, isLoading: authLoading } = useObserverAuth()
  const resolvedParams = use(params)
  
  const [election, setElection] = useState<ElectionDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [showVoterDetails, setShowVoterDetails] = useState(false)

  // Load election details
  const loadElectionDetails = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch(`/api/observer/election/${resolvedParams.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setElection(data.data)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to load election details')
      }
    } catch (error) {
      setError('Failed to load election details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Refresh election details
  const handleRefresh = async () => {
    setRefreshing(true)
    await loadElectionDetails()
    setRefreshing(false)
  }

  // Export election details
  const exportElectionDetails = () => {
    if (!election) {
      setError('No election data to export')
      return
    }

    const csvContent = [
      ['Election Title', 'Status', 'DB Votes', 'Blockchain Votes', 'Consistency', 'Contract Address', 'Last Checked'],
      [election.title, election.status, election.dbVotes, election.chainVotes, election.consistency, election.contractAddress || 'Not Set', new Date(election.lastChecked).toLocaleString()],
      [],
      ['Vote Details'],
      ['Vote ID', 'Voter Email', 'Wallet Address', 'Candidate ID', 'Transaction Hash', 'Vote Position', 'Timestamp', 'Block Number', 'Gas Used'],
      ...election.allVotes.map(vote => [
        vote.voteId,
        vote.voterEmail,
        vote.walletAddress,
        vote.candidateId,
        vote.transactionHash,
        vote.votePosition,
        new Date(vote.timestamp).toLocaleString(),
        vote.blockNumber,
        vote.gasUsed
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `election-${election.electionId}-observer-report-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
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
      loadElectionDetails()
    }
  }, [isAuthenticated, token, resolvedParams.id])

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/observer/login')
    }
  }, [isAuthenticated, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading election details...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading election details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  if (!election) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Election Not Found</h3>
            <p className="text-gray-600">The requested election could not be found.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ObserverRouteGuard requireApproval={true}>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/observer">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{election.title}</h1>
                  <p className="text-gray-600">Election Observer Details</p>
                </div>
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
              <Button
                onClick={exportElectionDetails}
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Election Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{election.title}</CardTitle>
                  <CardDescription>{election.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(election.status)}
                  {getConsistencyBadge(election.consistency)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Election Type</p>
                  <p className="text-sm text-gray-900">{election.electionType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">State</p>
                  <p className="text-sm text-gray-900">{election.state || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">LGA</p>
                  <p className="text-sm text-gray-900">{election.lga || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Ward</p>
                  <p className="text-sm text-gray-900">{election.ward || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vote Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">DB Votes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{election.dbVotes}</div>
                <p className="text-xs text-muted-foreground">
                  Database votes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blockchain Votes</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{election.chainVotes}</div>
                <p className="text-xs text-muted-foreground">
                  Blockchain votes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consistency</CardTitle>
                {election.consistency === 'consistent' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{election.consistency}</div>
                <p className="text-xs text-muted-foreground">
                  DB vs Blockchain
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blockchain Status</CardTitle>
                {election.blockchainStatus === 'online' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{election.blockchainStatus}</div>
                <p className="text-xs text-muted-foreground">
                  Network status
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contract Information */}
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Contract Information</CardTitle>
              <CardDescription>
                Smart contract details for this election
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Contract Address</p>
                  <p className="text-sm text-gray-900 font-mono">
                    {election.contractAddress || 'Not Deployed'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Checked</p>
                  <p className="text-sm text-gray-900">
                    {new Date(election.lastChecked).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Candidate Results */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Results</CardTitle>
              <CardDescription>
                Vote breakdown by candidate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {election.candidates
                  .sort((a, b) => b.votes - a.votes) // Sort by votes (highest first)
                  .map((candidate, index) => (
                  <div key={candidate.candidateId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={getPartyPictureWithFallback(candidate.name, candidate.party)} 
                          alt={candidate.party || 'Independent'}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder-user.jpg';
                          }}
                        />
                        <div>
                          <h4 className="font-semibold text-lg text-slate-900">{candidate.name}</h4>
                          <p className="text-sm text-slate-600">{candidate.party}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={candidate.votes > 0 ? "border-green-500 text-green-700" : "border-gray-300 text-gray-600"}>
                        {candidate.votes} votes
                      </Badge>
                        {index === 0 && candidate.votes > 0 && (
                          <div className="text-xs text-yellow-600 font-medium mt-1">Leading</div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 bg-slate-50 rounded p-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Candidate ID:</p>
                          <p className="font-mono text-xs">{candidate.candidateId.substring(0, 12)}...</p>
                        </div>
                        <div>
                          <p className="font-medium">Vote Records:</p>
                          <p>{candidate.voteDetails.length} individual transactions</p>
                        </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vote Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vote Details</CardTitle>
                  <CardDescription>
                    Individual vote records with blockchain verification
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowVoterDetails(!showVoterDetails)}
                  variant="outline"
                  size="sm"
                >
                  {showVoterDetails ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show Details
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showVoterDetails ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {election.allVotes.map((vote, index) => (
                    <div key={vote.voteId} className="border rounded-lg p-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="font-medium text-gray-600">Voter</p>
                          <p className="text-gray-900">{vote.voterEmail}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Wallet</p>
                          <p className="text-gray-900 font-mono">{vote.walletAddress}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Transaction</p>
                          <p className="text-gray-900 font-mono">{vote.transactionHash}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-600">Position</p>
                          <p className="text-gray-900">#{vote.votePosition}</p>
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {new Date(vote.timestamp).toLocaleString()} | Block: {vote.blockNumber} | Gas: {vote.gasUsed}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="h-8 w-8 mx-auto mb-2" />
                  <p>Click "Show Details" to view individual vote records</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </ObserverRouteGuard>
  )
}
