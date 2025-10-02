"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Target, MapPin, Clock, TrendingUp, ChevronRight, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import { positionTrackingService, type HierarchyData, type UserPositionData } from "@/lib/services/positionTrackingService"
import { EnhancedPositionService, type CompletePositionData, type PositionData } from "@/lib/services/enhancedPositionService"
import { ElectionService } from "@/lib/services/electionService"
import { pollingService } from "@/lib/services/pollingService"

export default function VotePositionPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  
  // ALL STATE HOOKS AT THE TOP - NO CONDITIONAL HOOKS
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
  const [isPolling, setIsPolling] = useState(false)
  const [pollingStatus, setPollingStatus] = useState<any>(null)

  // ALL EFFECT HOOKS AT THE TOP - NO CONDITIONAL HOOKS
  // Client-side auth guard - wait for ready before deciding
  useEffect(() => {
    if (!ready) return;               // wait for the server-verified check
    if (!isAuthenticated) {
      if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
        }
      router.replace('/login');
    }
  }, [ready, isAuthenticated, router]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG_AUTH === 'true') {
      }
  }, [authLoading, isAuthenticated, user, ready]);

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
    
    // return () => {
    //   stopPolling()
    // }
  }, [selectedElection, user])

  // ALL FUNCTION DEFINITIONS
  const loadElections = async () => {
    try {
      setLoading(true)
      const response = await ElectionService.getElections()
      
      if (response.success && response.data) {
        setElections(response.data)
        } else {
        setError('Failed to load elections')
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
      setError('')

      // Load enhanced position data
      const response = await EnhancedPositionService.getCompletePositionData(selectedElection)
      
      if (response) {
        setCompletePositionData(response)
        setLastUpdate(new Date())
      } else {
        setError('Failed to load position data')
      }
    } catch (error) {
      setError('Failed to load position data')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    if (!selectedElection) return

    try {
      setRefreshing(true)
      setError('')

      const refreshData = await EnhancedPositionService.getLiveRefreshData(selectedElection)
      
      if (refreshData.new_votes > 0) {
        // Get complete data if there are new votes
        const completeData = await EnhancedPositionService.getCompletePositionData(selectedElection)
        setCompletePositionData(completeData)
        setLastUpdate(new Date())
        } else {
        }
    } catch (error) {
      setError('Failed to refresh position data')
    } finally {
      setRefreshing(false)
    }
  }

  // CONDITIONAL RENDERING AT THE END - AFTER ALL HOOKS
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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-3xl font-bold text-slate-900">Vote Position Tracking</h1>
            </div>
            <div className="flex items-center space-x-2">
              {lastUpdate && (
                <span className="text-sm text-slate-500">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
              <Button 
                onClick={handleRefresh} 
                disabled={refreshing || !selectedElection}
                size="sm"
                variant="outline"
              >
                {refreshing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <TrendingUp className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            </div>
          </div>
          
          <p className="text-slate-600">
            Track your vote position and see real-time updates from your polling unit.
          </p>
        </div>

        {/* Election Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Select Election
            </CardTitle>
            <CardDescription>
              Choose an election to view your vote position and tracking information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedElection} onValueChange={setSelectedElection}>
              <SelectTrigger>
                <SelectValue placeholder="Select an election..." />
              </SelectTrigger>
              <SelectContent>
                {elections.map((election) => (
                  <SelectItem key={election.id} value={election.id}>
                    {election.title} - {election.election_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Position Data */}
        {selectedElection && completePositionData && (
          <div className="space-y-6">
            {/* User Position Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Your Vote Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {completePositionData.userPosition?.pollingUnitPosition || 'N/A'}
                    </div>
                    <div className="text-sm text-blue-600">Polling Unit</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {completePositionData.userPosition?.wardPosition || 'N/A'}
                    </div>
                    <div className="text-sm text-green-600">Ward</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {completePositionData.userPosition?.lgaPosition || 'N/A'}
                    </div>
                    <div className="text-sm text-purple-600">LGA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Real-time Updates
                </CardTitle>
                <CardDescription>
                  Live updates from your polling unit and surrounding areas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completePositionData.recentVotes?.map((vote, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">
                          New vote recorded at {vote.voter_id || 'Unknown Location'}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {new Date(vote.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                  
                  {(!completePositionData.recentVotes || completePositionData.recentVotes.length === 0) && (
                    <div className="text-center py-8 text-slate-500">
                      <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No recent updates</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Loading position data...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Election Selected */}
        {!selectedElection && !loading && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">Select an Election</h3>
                <p className="text-slate-600">
                  Choose an election from the dropdown above to view your vote position.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
