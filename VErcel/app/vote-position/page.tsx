"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Target, MapPin, Clock, TrendingUp, ChevronRight, Loader2, AlertCircle, Users } from "lucide-react"
import Link from "next/link"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import { positionTrackingService, type HierarchyData, type UserPositionData } from "@/lib/services/positionTrackingService"
import { EnhancedPositionService, type CompletePositionData, type PositionData } from "@/lib/services/enhancedPositionService"
import { ElectionService } from "@/lib/services/electionService"
import { pollingService } from "@/lib/services/pollingService"
import DashboardButton from "@/components/DashboardButton"
import { SimpleNINProtectedRoute } from "@/components/SimpleNINProtectedRoute"

export default function VotePositionPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  
  // ALL STATE HOOKS AT THE TOP - NO CONDITIONAL HOOKS
  const [elections, setElections] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

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

  // ALL FUNCTION DEFINITIONS
  const loadElections = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await ElectionService.getElections()
      
      if (response.success && response.data) {
        setElections(response.data)
      } else {
        setError(response.message || 'Failed to load elections')
      }
    } catch (error) {
      setError('Failed to load elections: ' + (error as Error).message)
    } finally {
      setLoading(false)
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
    <SimpleNINProtectedRoute>
      <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DashboardButton variant="header" />
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
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Clock className="h-3 w-3 mr-1" />
              Live Updates
            </Badge>
            </div>
          </div>
      </header>
          
      <div className="container mx-auto px-4 py-8">

        {/* Election Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Available Elections
            </CardTitle>
            <CardDescription>
              Click on any election card to view your vote position and tracking information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {elections.length > 0 ? (
              <div className="space-y-4">
                {elections.map((election) => (
                  <div 
                    key={election.id} 
                    className="group relative p-6 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg border-slate-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                    onClick={() => {
                      router.push(`/vote-position/${election.id}`);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-purple-100 transition-colors">
                            <Target className="h-5 w-5 text-blue-600 group-hover:text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-900 transition-colors">
                              {election.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant="outline" 
                                className="text-xs bg-slate-100 text-slate-700 group-hover:bg-purple-100 group-hover:text-purple-700"
                              >
                                {election.election_type}
                              </Badge>
                              <Badge 
                                variant={election.status === 'ONGOING' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {election.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">
                              <span className="font-semibold text-slate-900">{election.total_votes || election.totalVotes || 0}</span> votes
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-slate-600">
                              {new Date(election.start_date).toLocaleDateString()} - {new Date(election.end_date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="text-xs text-slate-500 mb-1">Click to view</p>
                          <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Elections Available</h3>
                <p className="text-slate-600">There are currently no elections to track positions for.</p>
              </div>
            )}
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

        {/* Quick Stats */}
        {elections.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Elections</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{elections.length}</div>
                <p className="text-xs text-slate-500">Available for tracking</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Ongoing Elections</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {elections.filter(e => e.status === 'ONGOING').length}
                      </div>
                <p className="text-xs text-slate-500">Currently active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Votes</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {elections.reduce((sum, e) => sum + (e.total_votes || e.totalVotes || 0), 0).toLocaleString()}
                    </div>
                <p className="text-xs text-slate-500">Across all elections</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Election Selected */}
        {!loading && elections.length > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Ready to Track Your Vote Position</h3>
                <p className="text-slate-600">
                  Click on any election card above to view your vote position and tracking information across all electoral levels.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Dashboard Button */}
      <DashboardButton variant="floating" />
      </div>
    </SimpleNINProtectedRoute>
  )
}
