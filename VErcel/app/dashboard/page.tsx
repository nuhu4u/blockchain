"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Vote, CheckCircle, Clock, TrendingUp, MapPin, Shield, LogOut, User, BarChart3, Target, Copy, Check, Eye, EyeOff, Loader2, Hash } from "lucide-react"
// VotingModal removed - voting only available on mobile app
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import { simpleLogout } from "@/lib/simpleAuth"
import { useUserTokenExpiration } from "@/hooks/useUserTokenExpiration"
import { TokenExpirationWarning } from "@/components/TokenExpirationWarning"
import { getPartyPictureWithFallback, getPartyNameWithFallback } from "@/lib/data/candidates"
import { QRCodeModal } from "@/components/mobile/QRCodeModal"
import { BiometricStatusComponent } from "@/components/biometric/BiometricStatus"
import { SimpleNINProtectedRoute } from "@/components/SimpleNINProtectedRoute"

export default function VoterDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, ready } = useSimpleAuth()
  
  // Token expiration handling
  const {
    showExpirationWarning,
    timeUntilExpiration,
    dismissWarning,
    extendSession,
    handleApiError
  } = useUserTokenExpiration()

  // Mobile app integration states
  const [showQRModal, setShowQRModal] = useState(false)
  const [selectedElectionForQR, setSelectedElectionForQR] = useState<{id: string, title: string} | null>(null)
  const [activeTab, setActiveTab] = useState<string>("elections")

  // Dashboard data states
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [voterInfo, setVoterInfo] = useState<any>(null)
  const [elections, setElections] = useState<any[]>([])
  const [votedElections, setVotedElections] = useState<any[]>([]) // New state for voted elections
  const [stats, setStats] = useState<any>(null)
  const [myVotes, setMyVotes] = useState<any[]>([])

  // Copy functionality states
  const [copiedVoterId, setCopiedVoterId] = useState(false)
  const [copiedContractAddress, setCopiedContractAddress] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  
  // Privacy states
  const [showFullVoterId, setShowFullVoterId] = useState(false)
  const [showFullContractAddress, setShowFullContractAddress] = useState(false)
  const [showFullEmail, setShowFullEmail] = useState(false)

  // Helper functions for truncating values
  const truncateValue = (value: string, maxLength: number = 8) => {
    if (!value || value.length <= maxLength) return value;
    return `${value.substring(0, maxLength)}...`;
  };

  const formatVoterId = (voterId: string) => {
    if (!voterId || voterId === 'Pending') return voterId;
    return showFullVoterId ? voterId : truncateValue(voterId, 12);
  };

  const formatContractAddress = (address: string) => {
    if (!address || address === 'Not available') return address;
    if (showFullContractAddress) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatEmail = (email: string) => {
    if (!email || email === 'Not available') return email;
    if (showFullEmail) return email;
    
    const [username, domain] = email.split('@');
    if (!domain) return email;
    
    const maskedUsername = username.length > 2 ? 
      `${username.substring(0, 2)}${'*'.repeat(Math.min(username.length - 2, 3))}` : 
      username;
    
    return `${maskedUsername}@${domain}`;
  };

  // Copy functions
  const copyToClipboard = async (text: string, type: 'voterId' | 'contractAddress' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'voterId') {
        setCopiedVoterId(true);
        setTimeout(() => setCopiedVoterId(false), 2000);
      } else if (type === 'contractAddress') {
        setCopiedContractAddress(true);
        setTimeout(() => setCopiedContractAddress(false), 2000);
      } else if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch (err) {
    }
  };

  // Load dashboard data from backend API
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Import the simple dashboard service
      const { SimpleDashboardService } = await import('@/lib/simpleApi');
      
      const response = await SimpleDashboardService.getVoterDashboard() as any;
      if (response.success && response.data) {
        
        // Set voter info with complete geographic data
        if (response.data.voterInfo) {
          const geoData = response.data.voterInfo.geographicData
          
          const voterData = {
            name: `${response.data.voterInfo.first_name} ${response.data.voterInfo.last_name}`,
            voterId: response.data.voterInfo.user_unique_id || 'N/A',
            blockchainAddress: response.data.voterInfo.wallet_address || 'N/A',
            pollingUnit: geoData?.pollingUnit || '',
            pollingUnitCode: geoData?.pollingUnitCode || '',
            ward: geoData?.ward || '',
            wardCode: geoData?.wardCode || '',
            lga: geoData?.lgaOfResidence || geoData?.lgaOfOrigin || '',
            lgaCode: geoData?.lgaCode || '',
            state: geoData?.stateOfResidence || geoData?.stateOfOrigin || '',
            stateCode: geoData?.stateCode || '',
            // Essential info only for dashboard
            email: response.data.voterInfo.email,
            ninVerified: response.data.voterInfo.nin_verified,
            // Store geographic data for profile page access
            geographicData: geoData
          };
        
          setVoterInfo(voterData);
        }
        
        // Set elections data - separate voted and non-voted elections
      if (response.data.activeElections) {
        // Map the API data to match the expected format
        const mappedElections = response.data.activeElections.map((election: any) => {
          // Check if user has voted in this election
          const userVote = response.data.myVotes?.find((vote: any) => 
            vote.election_id === election.id || vote.electionId === election.id
          );
          
          return {
            id: election.id,
          title: election.title,
          type: election.election_type,
            status: election.status,
          endTime: election.end_date,
            startTime: election.start_date,
            contestants: (election.contestants || []).map((contestant: any) => ({
              ...contestant,
              votes: contestant.votes || contestant.voteCount || 0
            })),
            total_votes: election.total_votes || election.totalVotes || 0,
            hasVoted: !!userVote, // Check if user has voted in this election
            votePosition: userVote?.vote_position || 0,
            voteTimestamp: userVote?.vote_timestamp || userVote?.created_at || null,
            leadingCandidate: election.contestants && election.contestants.length > 0 ? (() => {
              // Find candidate with highest votes
              const sortedCandidates = [...election.contestants].sort((a: any, b: any) => (b.votes || b.voteCount || 0) - (a.votes || a.voteCount || 0));
              const leading = sortedCandidates[0];
              return {
                name: leading.name,
                party: leading.party || 'Independent',
                runningMate: leading.running_mate || ''
              };
            })() : { name: 'No candidates', party: 'N/A', runningMate: '' }
          };
        });
        
        // Separate elections: voted vs non-voted
        const nonVotedElections = mappedElections.filter((election: any) => !election.hasVoted);
        const votedElectionsList = mappedElections.filter((election: any) => election.hasVoted);
        
        mappedElections.forEach((election: any, index: number) => {
          });
        
        response.data.myVotes?.forEach((vote: any, index: number) => {
          });
        
        setElections(nonVotedElections);
        setVotedElections(votedElectionsList);
        
        }

      // Set stats data
      if (response.data.stats) {
        setStats(response.data.stats);
      }

      // Set vote history data
      if (response.data.myVotes) {
        setMyVotes(response.data.myVotes);
      } else {
        }

      setError(null);
      } else {
        setError(response.message || 'Failed to load dashboard data');
      }
    } catch (err: any) {
      // Handle authentication errors
      if (err.message.includes('401') || err.message.includes('Unauthorized')) {
      router.push('/login');
      return;
      }
      
      setError(err.message || 'An error occurred while loading dashboard data');
    } finally {
      setLoading(false);
    }
  };
    
  // Combined authentication check and data loading
  useEffect(() => {
    const checkAuthAndLoadData = () => {
      if (ready && !isAuthenticated) {
        router.push('/login');
        return;
      }
      
      if (isAuthenticated && ready) {
        loadDashboardData();
      }
    };
    
    checkAuthAndLoadData();
  }, [isAuthenticated, ready, router]);

  // No additional auth checks - let the hook handle everything

  // Show loading while authentication is being checked
  if (isLoading || !ready) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show loading while redirecting
  if (!isAuthenticated && ready) {
    return null;
  }

  const handleLogout = () => {
    simpleLogout()
  }

  const handleRefresh = () => {
    setError(null);
    loadDashboardData();
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-lg text-gray-700">Loading your dashboard...</div>
      </div>
    )
  }

  // Default contestants from voting progress (same as admin)
  const defaultContestants = [
    { name: "Adebayo Ogundimu", runningMate: "Dr. Fatima Abdullahi" },
    { name: "Chinedu Okwu", runningMate: "Prof. Amina Hassan" },
    { name: "Ibrahim Musa", runningMate: "Mrs. Grace Okafor" },
    { name: "Funmilayo Adeyemi", runningMate: "Alhaji Suleiman Bello" }
  ]

  // Fallback data if API doesn't return data
  const fallbackElections = [
    {
      id: "presidential-2027",
      title: "Presidential Election 2027",
      type: "Presidential",
      status: "active",
      endTime: "2027-02-25 18:00",
      hasVoted: false,
      votePosition: 0,
      voteTimestamp: null,
      contestants: defaultContestants,
      candidates: [
        { name: "Adebayo Ogundimu", party: "All Progressives Congress (APC)", votes: 0, percentage: 0 },
        { name: "Chinedu Okwu", party: "Peoples Democratic Party (PDP)", votes: 0, percentage: 0 },
        { name: "Ibrahim Musa", party: "Labour Party (LP)", votes: 0, percentage: 0 },
        { name: "Funmilayo Adeyemi", party: "New Nigeria Peoples Party (NNPP)", votes: 0, percentage: 0 },
      ],
      leadingCandidate: { name: "No data", party: "N/A", votes: 0 },
    }
  ]

  const displayElections = elections // Non-voted elections for active elections tab
  // Create unique elections array to avoid duplicate keys
  const allElections = [...elections, ...votedElections.filter(votedElection => 
    !elections.some(election => election.id === votedElection.id)
  )]
  const displayStats = stats || {
    totalRegisteredVoters: 84004084,
    totalVotesCast: 45234567,
    nonVoters: 38769517,
    turnoutPercentage: 53.8,
  }

  return (
    <SimpleNINProtectedRoute>
      <div className="min-h-screen bg-slate-50">
      {/* Token Expiration Warning */}
      <TokenExpirationWarning
        show={showExpirationWarning}
        timeUntilExpiration={timeUntilExpiration}
        onDismiss={dismissWarning}
        onExtendSession={extendSession}
        userType="user"
      />
      
      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{success}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setSuccess(null)}
                  className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Vote className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-3">
                {/* Profile Picture */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600">
                    <User className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Voter Dashboard</h1>
                  <p className="text-sm text-slate-600">Welcome back, {voterInfo?.name || 'User'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>

              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                <User className="h-4 w-4 mr-2" />
                Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Voter Info */}
          <div className="lg:col-span-1">
            {/* Profile Picture Section - Above Voter Information */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-200 bg-slate-100 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600">
                      <User className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {user?.first_name} {user?.last_name}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Voter Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Essential Voter Info Only */}
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600">Voter ID</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-semibold">
                        {formatVoterId(voterInfo?.voterId)}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFullVoterId(!showFullVoterId)}
                          className="h-8 w-8 p-0 hover:bg-slate-100"
                          disabled={!voterInfo?.voterId || voterInfo?.voterId === 'Pending'}
                          title={showFullVoterId ? "Hide full Voter ID" : "Show full Voter ID"}
                        >
                          {showFullVoterId ? (
                            <EyeOff className="h-4 w-4 text-slate-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(voterInfo?.voterId || '', 'voterId')}
                          className="h-8 w-8 p-0 hover:bg-slate-100"
                          disabled={!voterInfo?.voterId || voterInfo?.voterId === 'Pending'}
                          title="Copy Voter ID"
                        >
                          {copiedVoterId ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        {formatEmail(voterInfo?.email)}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFullEmail(!showFullEmail)}
                          className="h-8 w-8 p-0 hover:bg-slate-100"
                          disabled={!voterInfo?.email || voterInfo?.email === 'Not available'}
                          title={showFullEmail ? "Hide full email" : "Show full email"}
                        >
                          {showFullEmail ? (
                            <EyeOff className="h-4 w-4 text-slate-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(voterInfo?.email || '', 'email')}
                          className="h-8 w-8 p-0 hover:bg-slate-100"
                          disabled={!voterInfo?.email || voterInfo?.email === 'Not available'}
                          title="Copy email"
                        >
                          {copiedEmail ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Contract Address</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs font-semibold truncate bg-slate-100 p-2 rounded flex-1 mr-2">
                        {formatContractAddress(voterInfo?.blockchainAddress)}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowFullContractAddress(!showFullContractAddress)}
                          className="h-8 w-8 p-0 hover:bg-slate-100 flex-shrink-0"
                          disabled={!voterInfo?.blockchainAddress || voterInfo?.blockchainAddress === 'Not available'}
                          title={showFullContractAddress ? "Hide full Contract Address" : "Show full Contract Address"}
                        >
                          {showFullContractAddress ? (
                            <EyeOff className="h-4 w-4 text-slate-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(voterInfo?.blockchainAddress || '', 'contractAddress')}
                          className="h-8 w-8 p-0 hover:bg-slate-100 flex-shrink-0"
                          title="Copy Contract Address"
                        >
                          {copiedContractAddress ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-slate-600" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* View Full Profile Link */}
                <div className="pt-3 border-t border-slate-200">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      View Full Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Status */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Quick Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">NIN Verification</span>
                  <Badge variant={voterInfo?.ninVerified ? "default" : "secondary"}>
                    {voterInfo?.ninVerified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    {voterInfo?.ninVerified ? 
                      '✅ You can participate in all elections' :
                      '⚠️ Complete NIN verification to unlock full voting privileges'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Vote Position Tracking */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Vote Position
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">Track your vote position across all electoral levels</p>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/vote-position">
                    <Target className="h-4 w-4 mr-2" />
                    View Vote Position
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Biometric Status */}
            <BiometricStatusComponent 
              showMobileCTA={true}
              onStatusChange={(status) => {
                }}
            />

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Election Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Voter Turnout</span>
                    <span>{displayStats.turnoutPercentage}%</span>
                  </div>
                  <Progress value={displayStats.turnoutPercentage} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Votes Cast</span>
                    <span className="font-semibold">{(displayStats.totalVotesCast || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Non-Voters</span>
                    <span className="font-semibold">{(displayStats.nonVoters || 0).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="elections">Active Elections</TabsTrigger>
                <TabsTrigger value="results">Live Results</TabsTrigger>
                <TabsTrigger value="history">Vote History</TabsTrigger>
              </TabsList>

              <TabsContent value="elections" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Available Elections</h2>
                  <div className="grid gap-6">
                    {displayElections.map((election, index) => (
                      <Card key={`display-${election.id}-${index}`} className="relative">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl">{election.title}</CardTitle>
                              <CardDescription className="flex items-center mt-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {election.type} • Ends {election.endTime ? new Date(election.endTime).toLocaleDateString() : 'TBD'}
                              </CardDescription>
                              {election.contract_address && (
                                <div className="mt-2 flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">Contract:</span>
                                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {election.contract_address.slice(0, 10)}...{election.contract_address.slice(-6)}
                                  </code>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              {election.hasVoted ? (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Voted
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-orange-300 text-orange-700">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {election.hasVoted ? (
                            <div className="space-y-4">
                              <Alert className="border-green-200 bg-green-50">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertDescription className="text-green-800">
                                  <strong>Vote Recorded!</strong> Your vote was cast on{" "}
                                  {election.voteTimestamp ? new Date(election.voteTimestamp).toLocaleString() : 'Unknown time'}
                                </AlertDescription>
                              </Alert>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {(election.candidates || []).map((candidate: any, index: number) => (
                                  <div key={index} className="p-3 bg-slate-50 rounded-lg">
                                    <p className="font-semibold text-sm">{candidate.name}</p>
                                    <p className="text-xs text-slate-600">{candidate.party}</p>
                                    <div className="mt-2">
                                      <div className="flex justify-between text-xs mb-1">
                                        <span>{candidate.percentage}%</span>
                                        <span>{(candidate.votes || 0).toLocaleString()} votes</span>
                                      </div>
                                      <Progress value={candidate.percentage} className="h-1" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <p className="text-slate-600">
                                Cast your vote for the {election.type.toLowerCase()} election. You can vote for one
                                candidate per election.
                              </p>

                              {/* Mobile-Only Voting Message */}
                              <div className="space-y-4">
                                <Alert className="border-orange-200 bg-orange-50">
                                  <Vote className="h-4 w-4 text-orange-600" />
                                  <AlertDescription className="text-orange-800">
                                    <strong>Vote on Mobile App</strong> - For security reasons, voting is only available on the mobile app. 
                                    Download the app to cast your vote securely.
                                  </AlertDescription>
                                </Alert>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <Button
                                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                                    onClick={() => {
                                      setSelectedElectionForQR({
                                        id: election.id,
                                        title: election.title
                                      })
                                      setShowQRModal(true)
                                    }}
                                  >
                                    <Vote className="h-4 w-4 mr-2" />
                                    Open Mobile App
                                  </Button>
                                  
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                      // Copy election link to clipboard
                                      const electionLink = `votingapp://vote/election/${election.id}`;
                                      navigator.clipboard.writeText(electionLink);
                                      setSuccess('Election link copied to clipboard! Open mobile app to vote.');
                                    }}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Link
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Live Election Results</h2>
                  <div className="grid gap-6">
                    {allElections.length > 0 ? allElections.map((election, index) => (
                      <Card key={`results-${election.id}-${index}`}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{election.title}</span>
                            <Badge variant="outline" className="border-green-300 text-green-700">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Live
                            </Badge>
                          </CardTitle>
                          <CardDescription className="flex items-center mt-2 text-sm text-slate-700">
                            <BarChart3 className="h-4 w-4 mr-1 text-slate-500" />
                            <span className="font-semibold">Leading:</span>
                            <div className="flex items-center ml-2">
                              <img 
                                src={getPartyPictureWithFallback(election.leadingCandidate.name, election.leadingCandidate.party)} 
                                alt={election.leadingCandidate.party}
                                className="w-4 h-4 mr-2 rounded"
                                onError={(e) => {
                                  e.currentTarget.src = '/placeholder-user.jpg';
                                }}
                              />
                              <span>{election.leadingCandidate.name}</span>
                              {election.leadingCandidate.runningMate && (
                                <span className="text-slate-500 ml-1">/ {election.leadingCandidate.runningMate}</span>
                              )}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[...(election.contestants || [])]
                              .sort((a: any, b: any) => (b.votes || b.voteCount || 0) - (a.votes || a.voteCount || 0))
                              .map((candidate: any, index: number) => {
                              // Calculate percentage based on total votes (handle both field formats)
                              const totalVotes = election.total_votes || election.totalVotes || 0;
                              const candidateVotes = candidate.votes || candidate.voteCount || 0;
                              const percentage = totalVotes > 0 ? Math.round((candidateVotes / totalVotes) * 100) : 0;
                              
                              return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                      <img 
                                        src={getPartyPictureWithFallback(candidate.name, candidate.party)} 
                                        alt={candidate.party}
                                        className="w-6 h-6 rounded"
                                        onError={(e) => {
                                          e.currentTarget.src = '/placeholder-user.jpg';
                                        }}
                                      />
                                  <div>
                                    <p className="font-semibold">{candidate.name}</p>
                                    <p className="text-sm text-slate-600">{candidate.party || 'Independent'}</p>
                                        {candidate.running_mate && (
                                          <p className="text-xs text-slate-500">Running Mate: {candidate.running_mate}</p>
                                        )}
                                      </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="font-bold text-lg">{percentage}%</p>
                                      <p className="text-sm text-slate-600">{candidateVotes.toLocaleString()} votes</p>
                                  </div>
                                </div>
                                  <Progress value={percentage} className="h-3" />
                              </div>
                              );
                            })}
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between text-sm text-slate-600">
                              <span>Total Votes Cast</span>
                              <span>{(election.total_votes || election.totalVotes || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-600 mt-1">
                              <span>Election Status</span>
                              <Badge variant={election.status === 'ONGOING' ? 'default' : 'secondary'}>
                                {election.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )) : (
                      <div className="text-center py-8 text-slate-500">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No elections available for results display.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Vote History</h2>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {(() => {
                          return null;
                        })()}
                        {votedElections.length > 0 ? votedElections.map((election: any, index: number) => {
                            // Find the vote for this election
                            const vote = myVotes.find((v: any) => {
                              const match1 = v.election_id === election.id;
                              const match2 = v.electionId === election.id;
                              return match1 || match2;
                            });
                            
                            if (!vote) {
                              return null;
                            }
                            
                            // Find the candidate information from election contestants
                            const votedCandidate = election.contestants?.find((candidate: any) => {
                              // Try multiple matching strategies
                              const candidateIdStr = candidate.id?.toString();
                              const voteCandidateIdStr = vote.candidate_id?.toString();
                              
                              const match1 = candidateIdStr === voteCandidateIdStr;
                              const match2 = candidate.mongoId === vote.candidate_id;
                              const match3 = candidateIdStr === vote.candidate_id;
                              const match4 = candidate.id === vote.candidate_id;
                              
                              return match1 || match2 || match3 || match4;
                            });
                            
                            const finalCandidate = votedCandidate || {
                              name: 'Unknown Candidate',
                              party: 'Unknown Party',
                              running_mate: null
                            };
                            return (
                              <div
                                key={`vote-${vote._id || vote.id || `${election.id}-${index}`}`}
                                className="p-4 bg-green-50 rounded-lg border border-green-200"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="font-semibold text-slate-900">{election.title}</h3>
                                        <Badge className="bg-green-100 text-green-800 text-xs">Voted</Badge>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <span className="text-sm text-slate-600">Candidate:</span>
                                          <span className="font-medium text-slate-900">
                                            {finalCandidate?.name || 'Unknown Candidate'}
                                          </span>
                                        </div>
                                        
                                          <div className="flex items-center space-x-2">
                                            <span className="text-sm text-slate-600">Party:</span>
                                          <img 
                                            src={getPartyPictureWithFallback(finalCandidate.name, finalCandidate.party)} 
                                            alt={getPartyNameWithFallback(finalCandidate.name, finalCandidate.party)}
                                            className="w-4 h-4 rounded object-cover"
                                            onError={(e) => {
                                              e.currentTarget.src = '/placeholder-user.jpg';
                                            }}
                                          />
                                            <span className="text-sm font-medium text-blue-600">
                                            {getPartyNameWithFallback(finalCandidate.name, finalCandidate.party)}
                                          </span>
                                        </div>
                                        
                                        {finalCandidate?.running_mate && (
                                          <div className="flex items-center space-x-2">
                                            <span className="text-sm text-slate-600">Running Mate:</span>
                                            <span className="text-sm font-medium text-slate-700">
                                              {finalCandidate.running_mate}
                                            </span>
                                          </div>
                                        )}
                                        
                                        <div className="flex items-center space-x-2">
                                          <span className="text-sm text-slate-600">Voted on:</span>
                                          <span className="text-sm text-slate-700">
                                            {vote.vote_timestamp 
                                              ? new Date(vote.vote_timestamp).toLocaleString()
                                              : vote.created_at
                                                ? new Date(vote.created_at).toLocaleString()
                                                : 'Unknown time'
                                            }
                                          </span>
                                        </div>
                                        
                                        {(vote.vote_position !== undefined && vote.vote_position !== null) || 
                                         (vote.sequential_position !== undefined && vote.sequential_position !== null) ? (
                                          <div className="flex items-center space-x-2">
                                            <span className="text-sm text-slate-600">Vote Position:</span>
                                            <span className="text-sm font-mono bg-white px-2 py-1 rounded border">
                                              #{vote.vote_position || vote.sequential_position}
                                            </span>
                                          </div>
                                        ) : null}
                                        
                                        {/* Blockchain Transaction Data */}
                                        {vote.transaction_hash && (
                                          <div className="space-y-2 pt-2 border-t border-green-200">
                                            <div className="flex items-center space-x-2">
                                              <span className="text-sm text-slate-600">Blockchain Tx:</span>
                                              <span className="text-sm font-mono bg-blue-50 px-2 py-1 rounded border text-blue-700">
                                                {vote.transaction_hash.substring(0, 10)}...{vote.transaction_hash.substring(vote.transaction_hash.length - 8)}
                                              </span>
                                              <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="h-6 px-2 text-xs"
                                              >
                                                <Link href={`/blockchain/transaction/${vote.transaction_hash}`}>
                                                  <Eye className="h-3 w-3 mr-1" />
                                                  View
                                                </Link>
                                              </Button>
                                            </div>
                                            
                                            {vote.blockchain_block_number && (
                                              <div className="flex items-center space-x-2">
                                                <span className="text-sm text-slate-600">Block:</span>
                                                <span className="text-sm font-mono bg-slate-50 px-2 py-1 rounded border">
                                                  #{vote.blockchain_block_number}
                                                </span>
                                              </div>
                                            )}
                                            
                                            {vote.blockchain_gas_used && (
                                              <div className="flex items-center space-x-2">
                                                <span className="text-sm text-slate-600">Gas Used:</span>
                                                <span className="text-sm font-mono bg-slate-50 px-2 py-1 rounded border">
                                                  {parseInt(vote.blockchain_gas_used).toLocaleString()}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col space-y-2">
                                    <Button asChild variant="outline" size="sm" className="bg-transparent">
                                      <Link href={`/vote-position?election=${election.id}`}>
                                        <Target className="h-3 w-3 mr-1" />
                                        View Position
                                      </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="sm" className="bg-transparent">
                                      <Link href={`/elections?view=${election.id}`}>
                                        <Eye className="h-3 w-3 mr-1" />
                                        View Results
                                      </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="sm" className="bg-transparent">
                                      <Link href={`/blockchain/election/${election.id}`}>
                                        <Hash className="h-3 w-3 mr-1" />
                                        Explore Blockchain
                                      </Link>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          }) : null}

                        {votedElections.length === 0 && (
                          <div className="text-center py-8 text-slate-500">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No votes cast yet. Participate in elections to see your vote history.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* QR Code Modal for Mobile App Integration */}
      {showQRModal && selectedElectionForQR && (
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => {
            setShowQRModal(false)
            setSelectedElectionForQR(null)
          }}
          electionId={selectedElectionForQR.id}
          electionTitle={selectedElectionForQR.title}
        />
      )}
      </div>
    </SimpleNINProtectedRoute>
  )
}
