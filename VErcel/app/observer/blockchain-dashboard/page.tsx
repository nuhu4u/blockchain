"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  Database, 
  Hash, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  TrendingUp, 
  Clock, 
  Users,
  Loader2,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"

export default function ObserverBlockchainDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Load dashboard data
  useEffect(() => {
    if (!ready) return
    
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    
    // Check if user is an observer
    if (user?.role !== 'OBSERVER') {
      router.replace('/dashboard')
      return
    }
    
    loadDashboardData()
  }, [ready, isAuthenticated, user, router])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch('/api/observer/blockchain-dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      if (result.success && result.data) {
        setDashboardData(result.data)
        setLastUpdated(new Date())
        } else {
        throw new Error(result.message || 'Failed to load dashboard data')
      }
      
    } catch (err: any) {
      setError('Failed to load dashboard data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  // Redirect if not authenticated or not an observer
  if (ready && !isAuthenticated) {
    return null
  }

  if (ready && user?.role !== 'OBSERVER') {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading observer dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <AlertCircle className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-4">{error}</p>
            <div className="space-y-2">
              <Button onClick={() => router.back()}>
                Go Back
              </Button>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-slate-500 mb-4">
              <Database className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">No Data Available</h2>
            <p className="text-slate-600 mb-4">Unable to load dashboard data.</p>
            <Button onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { observer, elections, statistics, blockchainAvailable } = dashboardData

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Observer Dashboard</h1>
                <p className="text-sm text-slate-600">
                  Blockchain Verification • {observer?.organization || 'Observer Organization'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge variant="outline" className="border-green-300 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                Observer
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Blockchain Status Alert */}
          {!blockchainAvailable && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Blockchain Service Offline:</strong> Some verification features may be limited. 
                Data shown is from database only.
              </AlertDescription>
            </Alert>
          )}

          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Elections</CardTitle>
                <Database className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{statistics.totalElections}</div>
                <p className="text-xs text-slate-500">All elections</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Elections</CardTitle>
                <Clock className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{statistics.activeElections}</div>
                <p className="text-xs text-slate-500">Currently ongoing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Consistent Elections</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{statistics.consistentElections}</div>
                <p className="text-xs text-slate-500">DB matches blockchain</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Blockchain Elections</CardTitle>
                <Hash className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{statistics.electionsWithBlockchain}</div>
                <p className="text-xs text-slate-500">With blockchain contracts</p>
              </CardContent>
            </Card>
          </div>

          {/* Elections List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Election Verification Status
              </CardTitle>
              <CardDescription>
                Monitor blockchain consistency for all elections
                {lastUpdated && (
                  <span className="ml-2 text-xs text-slate-500">
                    • Last updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {elections.length > 0 ? (
                <div className="space-y-4">
                  {elections.map((election: any) => (
                    <ObserverElectionCard key={election.id} election={election} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No elections available for monitoring.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Additional tools and navigation options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href="/observer/dashboard">
                    <Database className="h-4 w-4 mr-2" />
                    Standard Dashboard
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link href="/observer/profile">
                    <Users className="h-4 w-4 mr-2" />
                    Observer Profile
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link href="/blockchain/status">
                    <Hash className="h-4 w-4 mr-2" />
                    Blockchain Status
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Note */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900 mb-1">Observer Access</h3>
                  <p className="text-sm text-blue-700">
                    This dashboard provides read-only access to election data and blockchain verification. 
                    As an observer, you can monitor election integrity but cannot cast votes or modify elections.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Observer Election Card Component
function ObserverElectionCard({ election }: { election: any }) {
  const getConsistencyIcon = (consistency: string) => {
    switch (consistency) {
      case 'consistent':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'inconsistent':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getConsistencyColor = (consistency: string) => {
    switch (consistency) {
      case 'consistent':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'inconsistent':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONGOING':
        return 'text-green-700 bg-green-100'
      case 'COMPLETED':
        return 'text-blue-700 bg-blue-100'
      default:
        return 'text-slate-700 bg-slate-100'
    }
  }

  return (
    <div className="p-4 bg-slate-50 rounded-lg border">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-slate-900 truncate">{election.title}</h3>
            <Badge className={getStatusColor(election.status)}>
              {election.status}
            </Badge>
            <Badge className={getConsistencyColor(election.consistency)}>
              {getConsistencyIcon(election.consistency)}
              <span className="ml-1">
                {election.consistency === 'consistent' ? 'Consistent' : 
                 election.consistency === 'inconsistent' ? 'Inconsistent' : 'Unknown'}
              </span>
            </Badge>
          </div>
          
          <p className="text-sm text-slate-600 mb-3">{election.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-500">DB Votes:</span>
              <span className="ml-2 font-semibold">{election.dbVoteCount}</span>
            </div>
            <div>
              <span className="text-slate-500">Blockchain Votes:</span>
              <span className="ml-2 font-semibold">{election.chainVoteCount}</span>
            </div>
            <div>
              <span className="text-slate-500">Candidates:</span>
              <span className="ml-2 font-semibold">{election.totalCandidates}</span>
            </div>
            <div>
              <span className="text-slate-500">Type:</span>
              <span className="ml-2 font-semibold">{election.election_type}</span>
            </div>
          </div>
          
          {election.blockchainMessage && (
            <div className="mt-2 text-xs text-slate-500">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              {election.blockchainMessage}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          {election.hasBlockchainContract && (
            <Button asChild variant="outline" size="sm">
              <Link href={`/blockchain/election/${election.id}`}>
                <Hash className="h-3 w-3 mr-1" />
                View Blockchain
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm">
            <Link href={`/elections?view=${election.id}`}>
              <Eye className="h-3 w-3 mr-1" />
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
