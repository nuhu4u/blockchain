"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Target, MapPin, Clock, TrendingUp, ChevronRight, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import { positionTrackingService, type HierarchyData, type UserPositionData } from "@/lib/services/positionTrackingService"
import { EnhancedPositionService, type CompletePositionData, type PositionData } from "@/lib/services/enhancedPositionService"
import { ElectionService } from "@/lib/services/electionService"
import { pollingService } from "@/lib/services/pollingService"

export default function VotePositionPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  const [selectedElection, setSelectedElection] = useState<string>("")
  const [elections, setElections] = useState<any[]>([])
  const [hierarchyData, setHierarchyData] = useState<HierarchyData | null>(null)
  const [userPositionData, setUserPositionData] = useState<UserPositionData | null>(null)
  const [completePositionData, setCompletePositionData] = useState<CompletePositionData | null>(null)
  const [userPositions, setUserPositions] = useState<PositionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string>("")
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Client-side auth guard - wait for ready before deciding
  useEffect(() => {
    if (!ready) return;               // wait for the server-verified check
    if (!isAuthenticated) {
      if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
        }
      router.replace('/login');
    }
  }, [ready, isAuthenticated, router]);

  // Show loading while checking session
  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Checking session...</p>
        </div>
      </div>
    );
  }

  // Will redirect if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Debug authentication state (only when debug flag is enabled)
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
      }
  }, [authLoading, isAuthenticated, user, ready]);

  // Check server session instead of client-side auth
  useEffect(() => {
    const checkServerSession = async () => {
      try {
        const response = await fetch('/api/auth/me', { 
          method: 'GET', 
          cache: 'no-store' 
        });
        
        if (response.ok) {
          const data = await response.json();
          // Don't redirect - server session is valid
        } else {
          const errorData = await response.json().catch(() => ({}));
          window.location.href = '/login';
        }
      } catch (error) {
        window.location.href = '/login';
      }
    };

    checkServerSession();
  }, [])

  // Polling state
  const [isPolling, setIsPolling] = useState(false)
  const [pollingStatus, setPollingStatus] = useState<any>(null)

  // Load elections and user data
  useEffect(() => {
    if (!authLoading && user && isAuthenticated) {
      loadElections()
    } else {
      }
  }, [authLoading, user, isAuthenticated])

  // Load position data when election changes
  useEffect(() => {
    if (selectedElection && user) {
      loadPositionData()
    }
  }, [selectedElection, user])

  // Set up polling for real-time updates (disabled by default to prevent auth issues)
  useEffect(() => {
    // Only start polling if explicitly enabled
    // if (selectedElection && user) {
    //   startPolling()
    // }
    
    return () => {
      stopPolling()
    }
  }, [selectedElection, user])

  const loadElections = async () => {
    try {
      setLoading(true)
      const response = await ElectionService.getElections()
      if (response.success && response.data) {
        // Filter elections where user has voted
        const votedElections = response.data.filter((election: any) => 
          election.votesCast && election.votesCast > 0
        )
        setElections(votedElections)
        if (votedElections.length > 0 && !selectedElection) {
          setSelectedElection(votedElections[0]._id || '')
        }
      }
    } catch (error) {
      setError('Failed to load elections')
    } finally {
      setLoading(false)
    }
  }

  const loadPositionData = async () => {
    if (!selectedElection || !user) return

    try {
      setLoading(true)
      setError("")
      
      // Load hierarchy data
      const hierarchyResponse = await positionTrackingService.getUserHierarchy(selectedElection, user.id)
      if (hierarchyResponse.success) {
        setHierarchyData(hierarchyResponse.data || null)
      } else {
        // Don't redirect on polling errors - just log them
        if (hierarchyResponse.message?.includes('Authentication required') ||
            hierarchyResponse.message?.includes('401')) {
          stopPolling()
          return
        }
        setError(hierarchyResponse.message || 'Failed to load position data')
      }

      // Load user position data
      const positionResponse = await positionTrackingService.getUserPositions(selectedElection, user.id)
      if (positionResponse.success) {
        setUserPositionData(positionResponse.data || null)
      } else {
        // Don't redirect on polling errors - just log them
        if (positionResponse.message?.includes('Authentication required') ||
            positionResponse.message?.includes('401')) {
          stopPolling()
          return
        }
        // Don't set error here as hierarchy might still work
      }
    } catch (error) {
      setError('Failed to load position data')
    } finally {
      setLoading(false)
    }
  }

  // Polling functions using polling service
  const startPolling = () => {
    if (!selectedElection || !user) return
    
    const pollKey = `vote-position-${selectedElection}-${user.id}`
    
    // Stop existing polling
    pollingService.stopPolling(pollKey)
    
    // Start new polling
    pollingService.startPolling(
      pollKey,
      async () => {
        // Refresh both position data and elections
        await Promise.all([
          loadPositionData(),
          loadElections()
        ])
        return { success: true }
      },
      {
        interval: 3000, // Poll every 3 seconds
        enabled: true,
        onUpdate: (data) => {
          setLastUpdate(new Date())
          setIsPolling(true)
          setPollingStatus(pollingService.getStatus(pollKey))
        },
        onError: (error) => {
          setError('Failed to get real-time updates')
        }
      }
    )
    
    setIsPolling(true)
    setPollingStatus(pollingService.getStatus(pollKey))
  }

  const stopPolling = () => {
    if (selectedElection && user) {
      const pollKey = `vote-position-${selectedElection}-${user.id}`
      pollingService.stopPolling(pollKey)
    }
    setIsPolling(false)
    setPollingStatus(null)
  }

  const selectedElectionData = elections.find((e) => e._id === selectedElection)

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading vote position data...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Data</h3>
          <p className="text-slate-600 mb-4">{error}</p>
          <Button onClick={loadPositionData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Show no elections state
  if (elections.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Vote Position Tracking</h1>
                  <p className="text-sm text-slate-600">Track your vote across all electoral levels</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Elections Found</h3>
              <p className="text-slate-600">You haven't voted in any elections yet. Cast your vote to see position tracking.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const hierarchyLevels = [
    {
      id: "polling_unit",
      name: "Polling Unit",
      code: user?.polling_unit || "N/A",
      description: user?.polling_unit || "Polling Unit",
      icon: "🗳️",
      color: "bg-blue-500",
    },
    {
      id: "ward",
      name: "Ward",
      code: user?.ward || "N/A",
      description: `${user?.ward || "Ward"}, ${user?.lga || "LGA"}`,
      icon: "🏘️",
      color: "bg-green-500",
    },
    {
      id: "lga",
      name: "LGA",
      code: user?.lga || "N/A",
      description: `${user?.lga || "LGA"} Local Government Area`,
      icon: "🏛️",
      color: "bg-orange-500",
    },
    {
      id: "state",
      name: "State",
      code: user?.state || "N/A",
      description: `${user?.state || "State"} State`,
      icon: "🌍",
      color: "bg-purple-500",
    },
    {
      id: "national",
      name: "National",
      code: "NG",
      description: "Federal Republic of Nigeria",
      icon: "🇳🇬",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Vote Position Tracking</h1>
                  <p className="text-sm text-slate-600">Track your vote across all electoral levels</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={loadPositionData} 
                variant="outline" 
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge 
                variant="secondary" 
                className={isPolling ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
              >
                <div className={`w-2 h-2 rounded-full mr-1 ${isPolling ? 'bg-green-500' : 'bg-yellow-500'}`} />
                {isPolling ? 'Live Updates' : 'Manual Refresh'}
              </Badge>
              {pollingStatus && pollingStatus.errorCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {pollingStatus.errorCount} errors
                </Badge>
              )}
              {lastUpdate && (
                <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
                  Updated {lastUpdate.toLocaleTimeString()}
            </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Election Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Election</CardTitle>
            <CardDescription>Choose an election to view your vote position across all levels</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedElection} onValueChange={setSelectedElection}>
              <SelectTrigger className="max-w-md">
                <SelectValue placeholder="Select an election" />
              </SelectTrigger>
              <SelectContent>
                {elections.map((election) => (
                  <SelectItem key={election._id} value={election._id}>
                    {election.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedElectionData && (
          <>
            {/* Vote Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedElectionData.title}</span>
                  <Badge className="bg-green-100 text-green-800">Vote Cast</Badge>
                </CardTitle>
                <CardDescription>
                  {hierarchyData ? 
                    `Your vote was cast on ${new Date(hierarchyData.user.voteTimestamp).toLocaleString()}` :
                    'Loading vote details...'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Voter ID</p>
                    <p className="font-mono text-lg font-bold text-blue-900">{user?.id || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Vote Timestamp</p>
                    <p className="font-mono text-sm font-bold text-green-900">
                      {hierarchyData ? new Date(hierarchyData.user.voteTimestamp).toLocaleString() : 'Loading...'}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Election Type</p>
                    <p className="text-lg font-bold text-purple-900">{selectedElectionData.election_type || 'Election'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hierarchy Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Electoral Hierarchy Overview</CardTitle>
                <CardDescription>Your vote position at each level of the Nigerian electoral system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {hierarchyLevels.map((level, index) => {
                    // Get position data from hierarchy data
                    const hierarchyLevel = hierarchyData?.hierarchy.find(h => h.id === level.id)
                    const position = hierarchyLevel?.position
                    const totalVotes = hierarchyLevel?.totalVotes || 0
                    const hasPosition = hierarchyLevel?.hasPosition || false

                    return (
                      <div key={level.id} className="relative">
                        <Link href={`/vote-position/${level.id}?election=${selectedElection}`}>
                          <Card
                            className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
                            style={{ borderLeftColor: level.color.replace("bg-", "#") }}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="text-2xl">{level.icon}</div>
                                  <div>
                                    <h3 className="font-bold text-lg">{level.name}</h3>
                                    <p className="text-sm text-slate-600">{level.description}</p>
                                    <p className="text-xs text-slate-500 font-mono">Code: {level.code}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center space-x-2">
                                    <div>
                                      {hasPosition && position ? (
                                        <>
                                          <p className="text-2xl font-bold text-slate-900">#{position}</p>
                                      <p className="text-sm text-slate-600">
                                            of {totalVotes.toLocaleString()} votes
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <p className="text-2xl font-bold text-slate-400">N/A</p>
                                          <p className="text-sm text-slate-500">
                                            {totalVotes > 0 ? `${totalVotes.toLocaleString()} votes` : 'No votes yet'}
                                          </p>
                                        </>
                                      )}
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-slate-400" />
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                        {index < hierarchyLevels.length - 1 && (
                          <div className="flex justify-center my-2">
                            <div className="w-px h-6 bg-slate-300"></div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Earliest Position</CardTitle>
                  <Target className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {hierarchyData?.summary.earliestPosition ? 
                      `#${hierarchyData.summary.earliestPosition}` : 
                      'N/A'
                    }
                  </div>
                  <p className="text-xs text-slate-500">Best position across all levels</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Levels Tracked</CardTitle>
                  <MapPin className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {hierarchyData?.summary.levelsWithPosition || 0}
                  </div>
                  <p className="text-xs text-slate-500">Out of {hierarchyData?.summary.totalLevels || 0} total levels</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">National Position</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {hierarchyData?.summary.nationalPosition ? 
                      `#${hierarchyData.summary.nationalPosition.toLocaleString()}` : 
                      'N/A'
                    }
                  </div>
                  <p className="text-xs text-slate-500">Out of all Nigerian voters</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {!selectedElectionData && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 mx-auto mb-4 text-slate-400" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Election Selected</h3>
              <p className="text-slate-600">Please select an election to view your vote position tracking.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
