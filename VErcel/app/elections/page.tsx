"use client"

import { ElectionService } from "@/lib/services/electionService";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Vote, TrendingUp, Users, MapPin, ArrowLeft, Filter, BarChart3, LogIn, CheckCircle, Clock, Hash } from "lucide-react"
import Link from "next/link"
import { useUserAuth } from "@/hooks/useUserAuth";
import { VotingModal } from "@/components/voting-modal";
import { getPartyPictureWithFallback, getPartyNameWithFallback } from "@/lib/data/candidates";
import { NINProtectedRoute } from "@/components/NINProtectedRoute";

export default function LiveElectionsPage() {
  const { isAuthenticated, token, user } = useUserAuth();
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedState, setSelectedState] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [selectedElectionForVoting, setSelectedElectionForVoting] = useState<string | null>(null);
  const [myVotes, setMyVotes] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Initial fetch on component mount
  useEffect(() => {
    fetchElections();
  }, []);

  // Fetch user votes if authenticated
  useEffect(() => {
    async function fetchUserVotes() {
      if (isAuthenticated && token) {
        try {
          const { DashboardService } = await import('@/lib/services/dashboardService');
          const response = await DashboardService.getVoterDashboard(token);
          if (response.success && response.data) {
            setMyVotes(response.data.myVotes || []);
          }
        } catch (error) {
          }
      }
    }
    fetchUserVotes();
  }, [isAuthenticated, token]);

  // Add polling for live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchElections();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Function to fetch elections (extracted for reuse)
  const fetchElections = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await ElectionService.getElections();
      
      if (res.success && res.data) {
        setElections(res.data);
        setLastUpdated(new Date());
        setError(""); // Clear any previous errors
      } else {
        setError("No elections data available. Please try again later.");
        setElections([]);
      }
    } catch (err: any) {
      setError(`Failed to load elections: ${err.message || 'Please check your connection and try again.'}`);
      setElections([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading elections...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Error Loading Elections</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full">
            Try Again
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );

  const filteredElections = elections.filter((election) => {
    const stateMatch = selectedState === "all" || election.election_type?.toLowerCase().includes(selectedState.toLowerCase())
    const typeMatch = selectedType === "all" || election.election_type?.toLowerCase() === selectedType.toLowerCase()
    return stateMatch && typeMatch
  })

  // Helper function to check if user has voted in an election
  const hasUserVoted = (electionId: string) => {
    return myVotes.some(vote => vote.election_id === electionId || vote.electionId === electionId);
  }

  const overallStats = {
    totalElections: elections.length,
    totalVotesCast: elections.reduce((sum, e) => sum + (e.total_votes || e.totalVotes || 0), 0),
    averageTurnout: elections.length > 0 ? elections.reduce((sum, e) => sum + (e.total_votes || e.totalVotes || 0), 0) / elections.length : 0,
  }

  return (
    <NINProtectedRoute>
      <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Live Elections</h1>
                  <p className="text-sm text-slate-600">Real-time election results and statistics</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchElections}
                disabled={loading}
              >
                <div className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}>
                  🔄
                </div>
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
              {!isAuthenticated && (
                <Button variant="outline" asChild>
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login to Vote
                  </Link>
                </Button>
              )}
              <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live Updates
              </Badge>
              {lastUpdated && (
                <div className="text-xs text-slate-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Elections</CardTitle>
              <Vote className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{overallStats.totalElections}</div>
              <p className="text-xs text-slate-500">Ongoing nationwide</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{elections.reduce((sum, e) => sum + (e.contestants?.length || 0), 0)}</div>
              <p className="text-xs text-slate-500">Across all elections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Votes Cast</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{overallStats.totalVotesCast.toLocaleString()}</div>
              <p className="text-xs text-slate-500">Across all elections</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average Turnout</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{overallStats.averageTurnout.toFixed(1)}%</div>
              <p className="text-xs text-slate-500">Participation rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Elections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">State/Scope</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="lagos">Lagos State</SelectItem>
                    <SelectItem value="kano">Kano State</SelectItem>
                    <SelectItem value="rivers">Rivers State</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Election Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="presidential">Presidential</SelectItem>
                    <SelectItem value="governorship">Governorship</SelectItem>
                    <SelectItem value="senatorial">Senatorial</SelectItem>
                    <SelectItem value="house">House of Representatives</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Elections List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {filteredElections.length === elections.length ? "All Elections" : "Filtered Elections"}(
            {filteredElections.length})
          </h2>

          {filteredElections.length > 0 ? (
            filteredElections.map((election) => (
              <Card key={election.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{election.title}</CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {election.election_type} • {election.status}
                        {election.wallet_address && (
                          <>
                            <span className="mx-2">•</span>
                            <Hash className="h-4 w-4 mr-1" />
                            <span className="font-mono text-xs">
                              {election.wallet_address.substring(0, 6)}...{election.wallet_address.substring(election.wallet_address.length - 4)}
                            </span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={election.status === 'ONGOING' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {election.status === 'ONGOING' ? (
                            <>
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Live
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              {election.status}
                            </>
                          )}
                        </Badge>
                        {hasUserVoted(election._id) && (
                          <Badge className="bg-blue-100 text-blue-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Voted
                      </Badge>
                        )}
                      </div>
                      {election.contestants && election.contestants.length > 0 && (
                        <p className="text-sm text-slate-600">
                          Leading: <span className="font-semibold">
                            {[...election.contestants]
                              .sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0))[0]?.name || 'No votes yet'}
                          </span>
                          {election.contestants && election.contestants.length > 0 && (
                            <span className="text-sm text-slate-500 ml-2">
                              ({[...election.contestants].sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0))[0]?.party || 'Independent'})
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="results" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="results">Live Results</TabsTrigger>
                      <TabsTrigger value="stats">Statistics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="results" className="space-y-4 mt-4">
                      {election.contestants && election.contestants.length > 0 ? (
                        [...election.contestants]
                          .sort((a: any, b: any) => (b.votes || 0) - (a.votes || 0))
                          .map((candidate: any, index: number) => {
                          // Handle both field name formats for compatibility
                          const totalVotes = election.total_votes || election.totalVotes || 0;
                          const candidateVotes = candidate.votes || candidate.voteCount || 0;
                          const percentage = totalVotes > 0 ? Math.round((candidateVotes / totalVotes) * 100) : 0;
                          
                          return (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                  {index === 0 && candidateVotes > 0 && (
                                  <Badge variant="outline" className="border-yellow-300 text-yellow-700 text-xs">
                                    Leading
                                  </Badge>
                                )}
                                  <img 
                                    src={candidate.partyPicture || getPartyPictureWithFallback(candidate.name, candidate.party)} 
                                    alt={candidate.party || 'Independent'}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-slate-200"
                                    onError={(e) => {
                                      e.currentTarget.src = '/party-logos/placeholder-user.jpg';
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
                        })
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <Vote className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                          <p>No candidates available for this election</p>
                        </div>
                      )}
                      
                      {/* Voting Button */}
                      {isAuthenticated && election.status === 'ONGOING' && !hasUserVoted(election.id) && (
                        <div className="mt-6 pt-4 border-t">
                          <Button 
                            onClick={() => {
                              setSelectedElectionForVoting(election.id);
                              setShowVotingModal(true);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            <Vote className="h-4 w-4 mr-2" />
                            Cast Your Vote
                          </Button>
                        </div>
                      )}
                      
                      {isAuthenticated && hasUserVoted(election.id) && (
                        <div className="mt-6 pt-4 border-t">
                          <div className="text-center py-4">
                            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                            <p className="text-green-600 font-semibold">You have already voted in this election</p>
                          </div>
                        </div>
                      )}
                      
                      {!isAuthenticated && election.status === 'ONGOING' && (
                        <div className="mt-6 pt-4 border-t">
                          <div className="text-center py-4">
                            <p className="text-slate-600 mb-3">You need to be logged in to vote</p>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                              <Link href="/login">Login to Vote</Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="stats" className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-green-600 font-medium">Total Votes Cast</p>
                          <p className="text-2xl font-bold text-green-800">
                            {(election.electionStats?.totalVotesCast || election.total_votes || election.totalVotes || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <p className="text-sm text-orange-600 font-medium">Non-Voters</p>
                          <p className="text-2xl font-bold text-orange-800">
                            {(election.electionStats?.nonVoters || ((election.totalVoters || 0) - (election.total_votes || election.totalVotes || 0))).toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-purple-600 font-medium">Turnout</p>
                          <p className="text-2xl font-bold text-purple-800">
                            {election.electionStats?.electionTurnoutPercentage || 
                             (election.totalVoters && (election.total_votes || election.totalVotes) ? 
                              (((election.total_votes || election.totalVotes) / election.totalVoters) * 100).toFixed(1) : 
                              "0.0")}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Election Period</span>
                          <span>{new Date(election.start_date).toLocaleDateString()} - {new Date(election.end_date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          <p><strong>Description:</strong> {election.description || 'No description available'}</p>
                          {election.wallet_address && (
                            <div className="mt-2 p-2 bg-blue-50 rounded border">
                              <p className="text-xs text-blue-600 font-medium mb-1">Blockchain Contract</p>
                              <p className="font-mono text-xs text-blue-800 break-all">
                                {election.wallet_address}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Vote className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Elections Found</h3>
                <p className="text-slate-600 mb-4">No elections match your current filter criteria.</p>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedState("all")
                      setSelectedType("all")
                    }}
                  >
                    Clear Filters
                  </Button>
                  {!isAuthenticated && (
                    <Button asChild className="w-full">
                      <Link href="/register">Register to Vote</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Voting Modal */}
      <VotingModal
        isOpen={showVotingModal}
        onClose={() => {
          setShowVotingModal(false);
          setSelectedElectionForVoting(null);
        }}
        onVoteSuccess={async () => {
          // Refresh elections data
          try {
            const res = await ElectionService.getElections();
            if (res.success && res.data) {
              setElections(res.data);
            }
          } catch (err) {
            }
        }}
        election={elections.find((e) => e._id === selectedElectionForVoting)}
        voterInfo={user ? {
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Voter',
          voterId: user.id || 'N/A',
          blockchainAddress: 'N/A',
          pollingUnit: '',
          ward: '',
          lga: '',
          state: '',
        } : {
          name: 'Guest',
          voterId: 'N/A',
          blockchainAddress: 'N/A',
          pollingUnit: '',
          ward: '',
          lga: '',
          state: '',
        }}
      />
      </div>
    </NINProtectedRoute>
  )
}
