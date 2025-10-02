"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Target,
  Users,
  TrendingUp,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  LinkIcon,
  CheckCircle,
  BarChart3,
  Printer,
  ExternalLink,
  Hash,
  Shield,
  Loader2,
  AlertCircle,
  Copy,
  X,
} from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import DashboardButton from "@/components/DashboardButton"

export default function VotePositionLevelPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  
  const level = params.level as string
  const electionId = searchParams.get("election") || ""

  // State management
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [levelData, setLevelData] = useState<any>(null)
  const [userPositionData, setUserPositionData] = useState<any>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [copiedHash, setCopiedHash] = useState(false)

  // Initialize date on client side only to prevent hydration mismatch
  useEffect(() => {
    setLastUpdated(new Date())
  }, [])

  // Authentication guard
  useEffect(() => {
    if (!ready) return
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
  }, [ready, isAuthenticated, router])

  // Load level data when authenticated
  useEffect(() => {
    if (electionId && ready && isAuthenticated && user) {
      loadLevelData()
    }
  }, [electionId, ready, isAuthenticated, user])

  // Load level data from API
  const loadLevelData = async () => {
    if (!electionId || !user) return
    
    setLoading(true)
    setError("")
    
    try {
      // Load level statistics
      const levelResponse = await fetch(`/api/vote-position/${electionId}/level/${level}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!levelResponse.ok) {
        throw new Error(`Failed to load level data: ${levelResponse.status}`)
      }

      const levelResult = await levelResponse.json()
      if (!levelResult.success) {
        throw new Error(levelResult.message || 'Failed to load level data')
      }

      // Load user's specific position
      let userPositionResponse = null
      try {
        const userResponse = await fetch(`/api/vote-position/${electionId}/user/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        })

        if (userResponse.ok) {
          const userResult = await userResponse.json()
          if (userResult.success) {
            userPositionResponse = userResult.data
          }
        }
      } catch (userError) {
        // Don't fail the entire load if user position fails
      }

      setLevelData(levelResult.data)
      setUserPositionData(userPositionResponse)
      setLastUpdated(new Date())
      
    } catch (err: any) {
      setError(err.message || 'Failed to load level data')
    } finally {
      setLoading(false)
    }
  }

  // Helper function to format dates safely for SSR
  const formatDate = (timestamp: string) => {
    if (typeof window === 'undefined') return timestamp
    try {
      const date = new Date(timestamp)
      return {
        time: date.toLocaleTimeString(),
        date: date.toLocaleDateString()
      }
    } catch {
      return { time: timestamp, date: timestamp }
    }
  }

  // Helper function to get party logo
  const getPartyLogo = (party: string) => {
    if (party.includes('APC') || party.includes('All Progressives Congress')) return 'apc.webp'
    if (party.includes('PDP') || party.includes('Peoples Democratic Party')) return 'pdp.webp'
    if (party.includes('LP') || party.includes('Labour Party')) return 'labour-party.jpg'
    if (party.includes('NNPP') || party.includes('New Nigeria Peoples Party')) return 'nnpp.jpg'
    return 'apc.webp' // default fallback
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadLevelData()
    setIsRefreshing(false)
  }

  // Show loading state
  if (authLoading || !ready || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading position data...</p>
      </div>
    </div>
  )
}

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Data</h3>
            <p className="text-slate-600 mb-4">{error}</p>
            <div className="space-x-2">
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button asChild>
                <Link href="/vote-position">Return to Vote Position</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show no data state
  if (!levelData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Data Available</h3>
            <p className="text-slate-600 mb-4">No position data found for this level and election.</p>
            <Button asChild>
              <Link href="/vote-position">Return to Vote Position</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get user's position from API data
  const userPosition = userPositionData?.vote?.position || 0
  const totalVotes = levelData.level_stats?.[0]?.total_votes || 0
  const leadingCandidate = levelData.level_stats?.[0]?.leading_candidate || null
  const candidateResults = levelData.level_stats?.[0]?.candidates || []
  
  // Get vote details for blockchain verification
  const voteDetails = levelData.level_stats?.[0]?.vote_details || []
  const latestVote = voteDetails.length > 0 ? voteDetails[0] : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DashboardButton variant="header" />
              <div className="h-6 w-px bg-slate-300"></div>
              <Button variant="ghost" asChild>
                <Link href="/vote-position">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Overview
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {level === 'polling_unit' ? '🏫' : 
                   level === 'ward' ? '🏘️' : 
                   level === 'lga' ? '🏛️' : 
                   level === 'state' ? '🌍' : 
                   level === 'national' ? '🇳🇬' : '🗳️'}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    {level.charAt(0).toUpperCase() + level.slice(1).replace('_', ' ')} Level
                  </h1>
                  <p className="text-sm text-slate-600">
                    {levelData.election?.title || 'Election Position Data'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Position #{userPosition || 'N/A'}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Level Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Position at {level.charAt(0).toUpperCase() + level.slice(1).replace('_', ' ')} Level</span>
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">#{userPosition || 'N/A'}</Badge>
            </CardTitle>
            <CardDescription>
              Election: {levelData.election?.title} • Last updated: {lastUpdated?.toLocaleString() || 'Loading...'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Your Position</p>
                    <p className="text-2xl font-bold text-blue-900">#{userPosition || 'N/A'}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Total Votes Cast</p>
                    <p className="text-2xl font-bold text-green-900">
                      {totalVotes.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Non-Voters</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {levelData.statistics?.non_voters || 
                       (levelData.statistics?.total_registered_voters || 0) - (levelData.level_stats?.[0]?.total_votes || 0)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-indigo-600 font-medium">Turnout</p>
                    <p className="text-2xl font-bold text-indigo-900">
                      {levelData.statistics?.turnout_percentage?.toFixed(1) || '0.0'}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Election Status</p>
                    <p className="text-2xl font-bold text-purple-900">{levelData.election?.status || 'Unknown'}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blockchain Verification */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-700 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Blockchain Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            {latestVote && (latestVote.transactionHash || latestVote.transaction_hash) ? (
              <div className="bg-slate-50 rounded p-4">
                <div className="text-center space-y-4">
                  {/* Transaction Hash - Centered */}
                  <div>
                    <p className="text-xs text-slate-600 mb-2">Transaction Hash</p>
                    <p className="font-mono text-xs bg-white p-2 rounded border break-all max-w-xl mx-auto">
                      {latestVote.transactionHash || latestVote.transaction_hash || 'N/A'}
                    </p>
                  </div>

                  {/* Contract Address - Centered */}
                  <div>
                    <p className="text-xs text-slate-600 mb-2">Contract Address</p>
                    <p className="font-mono text-xs bg-white p-2 rounded border break-all max-w-xl mx-auto">
                      {latestVote.contractAddress || latestVote.contract_address || 'N/A'}
                    </p>
                  </div>

                  {/* View on Blockchain - Centered */}
                  <div>
                    {(latestVote.transactionHash || latestVote.transaction_hash) ? (
                      <div className="space-y-2">
                        <Button 
                          onClick={() => setShowTransactionModal(true)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Hash className="h-3 w-3 mr-1" />
                          View Transaction Details
                        </Button>
                        <p className="text-xs text-slate-500">Local blockchain transaction</p>
                      </div>
                    ) : (
                      <Button 
                        size="sm"
                        disabled
                        className="bg-gray-400 text-gray-600 cursor-not-allowed"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Transaction Pending
                      </Button>
                    )}
                  </div>

                  {/* Verification Status - Centered */}
                  <div className="p-2 bg-green-50 rounded border border-green-200 max-w-sm mx-auto">
                    <div className="flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                      <p className="text-xs text-green-800">
                        Vote verified on blockchain
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* No blockchain data available */
              <div className="bg-yellow-50 rounded p-4">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-yellow-600 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">No Blockchain Data Available</p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Votes may still be pending blockchain confirmation or this level has no recorded votes yet.
                      </p>
                    </div>
                  </div>
                  
                  {voteDetails.length === 0 && (
                    <div className="text-xs text-yellow-600 mt-2">
                      <p>No votes recorded at this level yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leading Candidate */}
        {leadingCandidate && (
          <Card className="mb-8 border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-800">
                <Target className="h-5 w-5 mr-2" />
                Leading Candidate
              </CardTitle>
              <CardDescription>Current frontrunner at this level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-yellow-800">
                      {leadingCandidate.candidateName?.charAt(0) || leadingCandidate.candidateId?.charAt(0) || 'N'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xl font-bold text-slate-900">{leadingCandidate.candidateName || `Candidate ${leadingCandidate.candidateId}`}</h3>
                      {leadingCandidate.party && (
                        <img 
                          src={`/party-logos/${getPartyLogo(leadingCandidate.party)}`} 
                          alt={leadingCandidate.party}
                          className="w-6 h-6 rounded"
                          onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{leadingCandidate.party || 'Unknown Party'}</p>
                    <p className="text-xs text-slate-500">Running Mate: {leadingCandidate.runningMate || 'Not specified'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-800">
                    {leadingCandidate.votes.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600">votes ({leadingCandidate.percentage.toFixed(1)}%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Candidate Results */}
        {candidateResults.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-slate-600" />
                Candidate Results
              </CardTitle>
              <CardDescription>Vote breakdown by candidate at this level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {candidateResults.map((candidate: any, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {candidate.candidateName?.charAt(0) || candidate.candidateId?.charAt(0) || (index + 1)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-lg">{candidate.candidateName || `Candidate ${candidate.candidateId}`}</p>
                          {candidate.party && (
                            <img 
                              src={`/party-logos/${getPartyLogo(candidate.party)}`} 
                              alt={candidate.party}
                              className="w-5 h-5 rounded"
                              onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{candidate.party || 'Unknown Party'}</p>
                        <p className="text-xs text-slate-500">Running Mate: {candidate.runningMate || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">{candidate.percentage.toFixed(1)}%</p>
                      <p className="text-sm text-slate-600">{candidate.votes.toLocaleString()} votes</p>
                    </div>
                  </div>
                  <Progress value={candidate.percentage} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Navigation Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Navigate Between Levels</CardTitle>
            <CardDescription>Explore your vote position at different electoral levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { level: "pollingUnit", name: "Polling Unit", icon: "🏫", color: "bg-blue-50 border-blue-200 text-blue-800" },
                { level: "ward", name: "Ward", icon: "🏘️", color: "bg-green-50 border-green-200 text-green-800" },
                { level: "lga", name: "LGA", icon: "🏛️", color: "bg-purple-50 border-purple-200 text-purple-800" },
                { level: "state", name: "State", icon: "🌍", color: "bg-orange-50 border-orange-200 text-orange-800" },
                { level: "national", name: "National", icon: "🇳🇬", color: "bg-red-50 border-red-200 text-red-800" },
              ].map((navLevel) => (
                <Link
                  key={navLevel.level}
                  href={`/vote-position/level-detail/${navLevel.level}?election=${electionId}`}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 hover:shadow-md ${
                    level === navLevel.level 
                      ? `${navLevel.color} border-2` 
                      : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="text-2xl mb-2">{navLevel.icon}</div>
                  <div className="font-semibold text-sm">{navLevel.name}</div>
                  {level === navLevel.level && (
                    <div className="text-xs mt-1 font-medium">Current Level</div>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Election</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Data</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Dashboard Button */}
      <DashboardButton variant="floating" />

      {/* Transaction Details Modal */}
      {showTransactionModal && latestVote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <Hash className="h-5 w-5 mr-2" />
                  Transaction Details
                </h2>
                <Button
                  onClick={() => setShowTransactionModal(false)}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Transaction Information */}
              <div className="space-y-6">
                {/* Transaction Hash */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Transaction Hash</label>
                  <div className="flex items-center space-x-2 p-3 bg-slate-50 rounded border">
                    <span className="font-mono text-sm flex-1 break-all">
                      {latestVote.transactionHash || latestVote.transaction_hash}
                    </span>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(latestVote.transactionHash || latestVote.transaction_hash);
                        setCopiedHash(true);
                        setTimeout(() => setCopiedHash(false), 2000);
                      }}
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  {copiedHash && <p className="text-xs text-green-600 mt-1">✓ Copied to clipboard</p>}
                </div>

                {/* Contract Address */}
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Smart Contract Address</label>
                  <div className="p-3 bg-slate-50 rounded border">
                    <span className="font-mono text-sm break-all">
                      {latestVote.contractAddress || latestVote.contract_address}
                    </span>
                  </div>
                </div>

                {/* Vote Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Candidate</label>
                    <div className="p-3 bg-slate-50 rounded border">
                      <span className="text-sm">{latestVote.candidateName}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Timestamp</label>
                    <div className="p-3 bg-slate-50 rounded border">
                      <span className="text-sm">{new Date(latestVote.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Network Information */}
                <div className="p-4 bg-blue-50 rounded border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">Network Information</h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <span className="font-mono">Local Hardhat (Chain ID: 31337)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RPC URL:</span>
                      <span className="font-mono">http://localhost:8545</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Explorer:</span>
                      <span>Local Development Network</span>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
                  <h3 className="font-medium text-yellow-900 mb-2">📝 Development Note</h3>
                  <p className="text-sm text-yellow-800">
                    This transaction exists on your local Hardhat blockchain. In production, 
                    this would link to Etherscan or another blockchain explorer for public verification.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setShowTransactionModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
