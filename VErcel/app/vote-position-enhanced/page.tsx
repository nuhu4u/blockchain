"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Target, MapPin, Clock, TrendingUp, ChevronRight, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useUserAuth } from "@/hooks/useUserAuth"
import { EnhancedPositionService, type CompletePositionData, type PositionData } from "@/lib/services/enhancedPositionService"
import { ElectionService } from "@/lib/services/electionService"
import { NINProtectedRoute } from "@/components/NINProtectedRoute"

export default function VotePositionEnhancedPage() {
  const { user, isLoading: authLoading, isAuthenticated } = useUserAuth()
  const [selectedElection, setSelectedElection] = useState<string>("")
  const [elections, setElections] = useState<any[]>([])
  const [completePositionData, setCompletePositionData] = useState<CompletePositionData | null>(null)
  const [userPositions, setUserPositions] = useState<PositionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string>("")
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

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

  // Load elections on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadElections()
    }
  }, [isAuthenticated])

  // Load position data when election changes
  useEffect(() => {
    if (selectedElection && user) {
      loadPositionData()
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
      
      // Load complete position data instantly
      const completeData = await EnhancedPositionService.getCompletePositionData(selectedElection)
      setCompletePositionData(completeData)

      // Load user's specific position data
      const userData = await EnhancedPositionService.getUserPositionData(selectedElection, user.id)
      setUserPositions(userData.positions)

      setLastUpdate(new Date())
      } catch (error) {
      setError('Failed to load position data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    if (!selectedElection || !user) return

    try {
      setRefreshing(true)
      setError("")
      
      // Get live refresh data
      const refreshData = await EnhancedPositionService.getLiveRefreshData(selectedElection, lastUpdate || undefined)
      // Update complete data if there are new votes
      if (refreshData.new_votes > 0) {
        const completeData = await EnhancedPositionService.getCompletePositionData(selectedElection)
        setCompletePositionData(completeData)
        
        // Update user positions
        const userData = await EnhancedPositionService.getUserPositionData(selectedElection, user.id)
        setUserPositions(userData.positions)
      }

      setLastUpdate(new Date())
      } catch (error) {
      setError('Failed to refresh position data. Please try again.')
    } finally {
      setRefreshing(false)
    }
  }

  const formatPositionData = (positions: PositionData) => {
    return {
      pollingUnit: positions.polling_unit 
        ? `Position ${positions.polling_unit.position} of ${positions.polling_unit.total} in ${positions.polling_unit.level_id}`
        : 'Not available',
      ward: positions.ward 
        ? `Position ${positions.ward.position} of ${positions.ward.total} in ${positions.ward.level_id}`
        : 'Not available',
      lga: positions.lga 
        ? `Position ${positions.lga.position} of ${positions.lga.total} in ${positions.lga.level_id}`
        : 'Not available',
      state: positions.state 
        ? `Position ${positions.state.position} of ${positions.state.total} in ${positions.state.level_id}`
        : 'Not available',
      national: positions.national 
        ? `Position ${positions.national.position} of ${positions.national.total} nationally`
        : 'Not available',
    };
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading position data...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <NINProtectedRoute>
      <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Vote Position Tracking</h1>
                <p className="text-sm text-slate-600">Track your position in elections</p>
              </div>
            </div>
            
            {/* Refresh Button */}
            <Button 
              onClick={handleRefresh} 
              disabled={refreshing || !selectedElection}
              variant="outline"
              size="sm"
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              {refreshing ? 'Refreshing...' : 'Refresh Live Data'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Election Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Election</CardTitle>
            <CardDescription>Choose an election to view your vote position</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedElection} onValueChange={setSelectedElection}>
              <SelectTrigger>
                <SelectValue placeholder="Select an election" />
              </SelectTrigger>
              <SelectContent>
                {elections.map((election) => (
                  <SelectItem key={election._id} value={election._id}>
                    {election.title} - {election.total_votes || 0} votes
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
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Position Data */}
        {completePositionData && userPositions && (
          <>
            {/* Election Stats */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Election Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {completePositionData.statistics.total_votes}
                    </div>
                    <div className="text-sm text-slate-600">Total Votes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {completePositionData.statistics.recent_activity}
                    </div>
                    <div className="text-sm text-slate-600">Recent Activity (1 hour)</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {completePositionData.election.last_vote_time 
                        ? formatTimeAgo(completePositionData.election.last_vote_time)
                        : 'No recent votes'
                      }
                    </div>
                    <div className="text-sm text-slate-600">Last Vote</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Positions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Your Vote Positions</span>
                </CardTitle>
                <CardDescription>
                  Your position at each geographic level
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(() => {
                    const formatted = formatPositionData(userPositions);
                    return (
                      <>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold">1</span>
                            </div>
                            <div>
                              <div className="font-medium text-blue-900">Polling Unit</div>
                              <div className="text-sm text-blue-700">{formatted.pollingUnit}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">Local</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-semibold">2</span>
                            </div>
                            <div>
                              <div className="font-medium text-green-900">Ward</div>
                              <div className="text-sm text-green-700">{formatted.ward}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">Ward Level</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                              <span className="text-yellow-600 font-semibold">3</span>
                            </div>
                            <div>
                              <div className="font-medium text-yellow-900">LGA</div>
                              <div className="text-sm text-yellow-700">{formatted.lga}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">LGA Level</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-semibold">4</span>
                            </div>
                            <div>
                              <div className="font-medium text-purple-900">State</div>
                              <div className="text-sm text-purple-700">{formatted.state}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">State Level</Badge>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <span className="text-red-600 font-semibold">5</span>
                            </div>
                            <div>
                              <div className="font-medium text-red-900">National</div>
                              <div className="text-sm text-red-700">{formatted.national}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">National</Badge>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Last Update Info */}
            {lastUpdate && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Last updated: {formatTimeAgo(lastUpdate.toISOString())}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Live data available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* No Data State */}
        {!loading && !completePositionData && !error && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Position Data</h3>
              <p className="text-slate-600 mb-4">
                Select an election to view your vote position
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </NINProtectedRoute>
  )
}
