"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ObserverRouteGuard } from "@/components/ObserverRouteGuard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Eye, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Users, 
  Shield,
  RefreshCw,
  Loader2,
  LogOut,
  User
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useObserverAuth } from "@/hooks/useObserverAuth"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Election {
  electionId: string
  title: string
  status: string
  startDate: string
  endDate: string
  dbVotes: number
  chainVotes: number
  consistency: 'consistent' | 'inconsistent' | 'unavailable' | 'noContract'
  lastChecked: string
  contractAddress: string | null
  candidateVotes: Array<{
    candidateId: string
    votes: number
  }>
}

export default function ObserverDashboard() {
  const router = useRouter()
  const { user, token, isAuthenticated, isLoading: authLoading, logout } = useObserverAuth()
  
  const [elections, setElections] = useState<Election[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  // Load elections data
  const loadElections = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/observer/elections', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setElections(data.data.elections || [])
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to load elections')
      }
    } catch (error) {
      setError('Failed to load elections. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Refresh elections data
  const handleRefresh = async () => {
    setRefreshing(true)
    await loadElections()
    setRefreshing(false)
  }

  // Export elections data
  const exportElectionsData = () => {
    if (elections.length === 0) {
      setError('No elections data to export')
      return
    }

    const csvContent = [
      ['Election Title', 'Status', 'DB Votes', 'Blockchain Votes', 'Consistency', 'Contract Address', 'Last Checked'],
      ...elections.map(election => [
        election.title,
        election.status,
        election.dbVotes,
        election.chainVotes,
        election.consistency,
        election.contractAddress || 'Not Set',
        new Date(election.lastChecked).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `elections-observer-report-${new Date().toISOString().split('T')[0]}.csv`
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
      loadElections()
    }
  }, [isAuthenticated, token])

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
          <p>Loading observer dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <ObserverRouteGuard requireApproval={true}>
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
                <h1 className="text-2xl font-bold text-gray-900">Election Observer Dashboard</h1>
              <p className="text-gray-600">
                Monitor elections and verify blockchain consistency
                {user && (
                  <span className="ml-2 text-blue-600 font-medium">
                    • Welcome, {user.first_name || user.name || user.email}
                  </span>
                )}
              </p>
              {user && (
                <div className="mt-2">
                  <Badge 
                    className={user.isApproved 
                      ? "bg-green-100 text-green-800 border-green-200" 
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                    }
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {user.isApproved ? 'Approved Observer' : 'Pending Approval'}
                  </Badge>
                </div>
              )}
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
              {elections.length > 0 && (
                <Button
                  onClick={exportElectionsData}
                  variant="outline"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              )}
              
              {/* User Profile Button */}
              <Button
                asChild
                variant="outline"
                size="sm"
              >
                <Link href="/observer/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>
              
              {/* Logout Button */}
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading elections...</p>
              </div>
            ) : elections.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Elections Found</h3>
                <p className="text-gray-600">There are no elections available for observation at this time.</p>
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
                        Available for observation
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
                  <h2 className="text-xl font-semibold text-gray-900">Elections Overview</h2>
                  {elections.map((election) => (
                    <Card key={election.electionId} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-slate-900">{election.title}</CardTitle>
                            <CardDescription className="flex items-center mt-2 text-slate-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {new Date(election.startDate).toLocaleDateString()} - {new Date(election.endDate).toLocaleDateString()}
                              <span className="mx-2">•</span>
                              <Shield className="h-4 w-4 mr-1" />
                              Contract: {election.contractAddress ? 
                                `${election.contractAddress.substring(0, 6)}...${election.contractAddress.substring(election.contractAddress.length - 4)}` 
                                : 'Not Set'}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(election.status)}
                            {getConsistencyBadge(election.consistency)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        {/* Observer Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-center mb-2">
                              <Users className="h-5 w-5 text-green-600 mr-2" />
                              <p className="text-sm font-medium text-green-700">DB Votes</p>
                            </div>
                            <p className="text-2xl font-bold text-green-900">{election.dbVotes}</p>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-center mb-2">
                              <Shield className="h-5 w-5 text-blue-600 mr-2" />
                              <p className="text-sm font-medium text-blue-700">Chain Votes</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-900">{election.chainVotes}</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="flex items-center justify-center mb-2">
                              <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                              <p className="text-sm font-medium text-purple-700">Accuracy</p>
                          </div>
                            <p className="text-2xl font-bold text-purple-900">
                              {election.dbVotes === election.chainVotes ? '100%' : 
                               election.dbVotes > 0 ? Math.round((Math.min(election.dbVotes, election.chainVotes) / Math.max(election.dbVotes, election.chainVotes)) * 100) + '%' : 'N/A'}
                            </p>
                          </div>
                          <div className="text-center p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="h-5 w-5 text-slate-600 mr-2" />
                              <p className="text-sm font-medium text-slate-700">Last Check</p>
                            </div>
                            <p className="text-sm font-bold text-slate-900">
                              {new Date(election.lastChecked).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-slate-600">
                            Observer monitoring • Last updated: {new Date(election.lastChecked).toLocaleString()}
                          </div>
                          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Link href={`/observer/${election.electionId}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Detailed Analysis
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            <div className="text-center py-8">
              <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Blockchain Verification</h3>
              <p className="text-gray-600 mb-4">Monitor elections with detailed blockchain transparency</p>
              <Button asChild>
                <Link href="/observer/blockchain">
                  <Shield className="h-4 w-4 mr-2" />
                  Open Blockchain Dashboard
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </ObserverRouteGuard>
  )
}
