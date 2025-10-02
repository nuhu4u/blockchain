"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, MapPin, Clock, TrendingUp, ChevronRight, Loader2, AlertCircle, Users, ExternalLink, Hash, Shield } from "lucide-react"
import Link from "next/link"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import { ElectionService } from "@/lib/services/electionService"
import { VotePositionService, VotePositionData } from "@/lib/services/votePositionService"
import DashboardButton from "@/components/DashboardButton"

export default function ElectionPositionPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  
  const [election, setElection] = useState<any>(null)
  const [positionData, setPositionData] = useState<VotePositionData | null>(null)
  const [userPositionData, setUserPositionData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const electionId = params?.electionId as string

  // Helper function to format dates safely for SSR
  const formatDate = (timestamp: string) => {
    if (typeof window === 'undefined') return timestamp
    try {
      return new Date(timestamp).toLocaleString()
    } catch {
      return timestamp
    }
  }

  // Load election and position data
  const loadElectionData = async () => {
    if (!electionId) return
    
    // Check authentication before proceeding
    if (!isAuthenticated || !user || !ready) {
      setError('User not authenticated')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      // Load election and position data in parallel
      const [electionResponse, positionResponse] = await Promise.all([
        ElectionService.getElections(),
        VotePositionService.getVotePositionData(electionId)
      ])
      
      // Try to load user position data, but don't fail if user hasn't voted
      let userPositionResponse = null
      
      // Use authenticated user ID
      const userId = user?.id
      
      if (!userId) {
        throw new Error('User not authenticated')
      }
      
      try {
        userPositionResponse = await VotePositionService.getUserVotePositionData(electionId, userId)
        // Check if we got valid position data
        if (userPositionResponse?.vote?.position) {
          } else {
          }
      } catch (error: any) {
        // If user hasn't voted, show a message
        if (error.message.includes('User has not voted') || error.message.includes('404')) {
          }
        userPositionResponse = null
      }
      
      const electionData = electionResponse.data?.find((e: any) => e.id === electionId)
      if (electionData) {
        setElection(electionData)
        setPositionData(positionResponse)
        setUserPositionData(userPositionResponse || null)
        } else {
        setError('Election not found')
      }
    } catch (err) {
      setError('Failed to load election data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (electionId && ready && isAuthenticated && user) {
      loadElectionData()
    }
  }, [electionId, ready, isAuthenticated, user])

  // Real voter info from user data and position data
  const voterInfo = {
    name: userPositionData?.user?.name || "Unknown User",
    voterId: userPositionData?.user?.voter_id || "Not available",
    pollingUnit: userPositionData?.geographic_data?.polling_unit || "Not available",
    pollingUnitCode: userPositionData?.user?.polling_unit_id || "Not available",
    ward: userPositionData?.geographic_data?.ward || "Not available",
    wardCode: userPositionData?.user?.ward_id || "Not available",
    lga: userPositionData?.geographic_data?.lga || "Not available",
    lgaCode: userPositionData?.user?.lga_id || "Not available",
    state: userPositionData?.geographic_data?.state || "Not available",
    stateCode: userPositionData?.user?.state_id || "Not available",
    walletAddress: userPositionData?.user?.wallet_address || "Not available",
    voteTimestamp: userPositionData?.vote?.timestamp ? formatDate(userPositionData.vote.timestamp) : "Not voted in this election",
    // Blockchain data from API - use real data or show unavailable message
    transactionHash: userPositionData?.vote?.transaction_hash || "Transaction hash unavailable. Please try again.",
    blockNumber: userPositionData?.vote?.blockchain_block_number || "Block number unavailable",
    gasUsed: userPositionData?.vote?.blockchain_gas_used || "Gas data unavailable",
    network: "Ganache Local Network",
    selectedCandidate: userPositionData?.vote?.candidate_id || "Not voted in this election",
    candidateParty: "Unknown",
    // Contract address from election
    contractAddress: election?.wallet_address || "Contract address unavailable"
  }

  // Real position data from API
  // The position is calculated based on vote submission time across the entire election
  // So all hierarchy levels use the same position since it's the user's overall position
  const userPosition = userPositionData?.vote?.position || "Not voted in this election"
  
  const realPositionData = positionData ? {
    pollingUnit: { 
      position: userPosition,
      totalVotes: positionData.statistics.total_votes,
      registeredVoters: positionData.statistics.registered_voters,
      nonVoters: positionData.statistics.non_voters
    },
    ward: { 
      position: userPosition,
      totalVotes: positionData.statistics.total_votes,
      registeredVoters: positionData.statistics.registered_voters,
      nonVoters: positionData.statistics.non_voters
    },
    lga: { 
      position: userPosition,
      totalVotes: positionData.statistics.total_votes,
      registeredVoters: positionData.statistics.registered_voters,
      nonVoters: positionData.statistics.non_voters
    },
    state: { 
      position: userPosition,
      totalVotes: positionData.statistics.total_votes,
      registeredVoters: positionData.statistics.registered_voters,
      nonVoters: positionData.statistics.non_voters
    },
    national: { 
      position: userPosition,
      totalVotes: positionData.statistics.total_votes,
      registeredVoters: positionData.statistics.registered_voters,
      nonVoters: positionData.statistics.non_voters
    },
  } : null

  // Geographic code to full name mapping
  const stateCodeToName = {
    'BEN': 'Benue',
    'LAG': 'Lagos',
    'ABJ': 'Abuja',
    'KAN': 'Kano',
    'RIV': 'Rivers',
    'DEL': 'Delta',
    'EDO': 'Edo',
    'KAD': 'Kaduna',
    'KAT': 'Katsina',
    'BAY': 'Bayelsa',
    'BOR': 'Borno',
    'CRO': 'Cross River',
    'EBU': 'Ebonyi',
    'ENU': 'Enugu',
    'GOM': 'Gombe',
    'IMO': 'Imo',
    'JIG': 'Jigawa',
    'KEB': 'Kebbi',
    'KOG': 'Kogi',
    'KW': 'Kwara',
    'NAS': 'Nasarawa',
    'NIG': 'Niger',
    'OGU': 'Ogun',
    'OND': 'Ondo',
    'OSU': 'Osun',
    'OYO': 'Oyo',
    'PLA': 'Plateau',
    'SOK': 'Sokoto',
    'TAR': 'Taraba',
    'YOB': 'Yobe',
    'ZAM': 'Zamfara'
  }

  // LGA code to full name mapping (for BEN-LGA-01 → Victoria Island)
  const lgaCodeToName = {
    'BEN-LGA-01': 'Victoria Island',
    'BEN-LGA-02': 'Ikoyi',
    'BEN-LGA-03': 'Surulere',
    'LAG-LGA-01': 'Ikeja',
    'LAG-LGA-02': 'Eti-Osa',
    'LAG-LGA-03': 'Surulere',
    'KAN-LGA-01': 'Kano Municipal',
    'KAN-LGA-02': 'Nassarawa',
    'KAN-LGA-03': 'Fagge'
  }

  // Ward code to full name mapping
  const wardCodeToName = {
    'WARD-BEN-LGA-01-02': 'Ward 3',
    'WARD-BEN-LGA-01-01': 'Ward 1',
    'WARD-BEN-LGA-01-03': 'Ward 5',
    'WARD-LAG-LGA-01-01': 'Ward 1',
    'WARD-LAG-LGA-01-02': 'Ward 2'
  }

  // Polling Unit code to full name mapping
  const pollingUnitCodeToName = {
    'PU-WARD-BEN-LGA-01-02-02': 'PU003',
    'PU-WARD-BEN-LGA-01-02-01': 'PU001',
    'PU-WARD-BEN-LGA-01-02-03': 'PU005',
    'PU-WARD-LAG-LGA-01-01-01': 'PU001',
    'PU-WARD-LAG-LGA-01-01-02': 'PU002'
  }

  // Hierarchy levels for navigation with realistic vote data
  const hierarchyLevels = realPositionData ? [
    {
      id: "pollingUnit",
      name: "Polling Unit",
      code: voterInfo.pollingUnitCode,
      description: `${voterInfo.pollingUnit} - ${voterInfo.ward}, ${voterInfo.lga}`,
      icon: "🗳️",
      color: "bg-blue-500",
      position: realPositionData?.pollingUnit.position || "Not voted",
      totalVotes: realPositionData?.pollingUnit.totalVotes || 0,
      registeredVoters: realPositionData?.pollingUnit.registeredVoters || 0,
      nonVoters: realPositionData?.pollingUnit.nonVoters || 0,
    },
    {
      id: "ward",
      name: "Ward",
      code: voterInfo.wardCode,
      description: `${voterInfo.ward}, ${voterInfo.lga} LGA`,
      icon: "🏘️",
      color: "bg-green-500",
      position: realPositionData?.ward.position || "Not voted",
      totalVotes: realPositionData?.ward.totalVotes || 0,
      registeredVoters: realPositionData?.ward.registeredVoters || 0,
      nonVoters: realPositionData?.ward.nonVoters || 0,
    },
    {
      id: "lga",
      name: "LGA",
      code: voterInfo.lgaCode,
      description: `${voterInfo.lga} Local Government Area`,
      icon: "🏛️",
      color: "bg-orange-500",
      position: realPositionData?.lga.position || "Not voted",
      totalVotes: realPositionData?.lga.totalVotes || 0,
      registeredVoters: realPositionData?.lga.registeredVoters || 0,
      nonVoters: realPositionData?.lga.nonVoters || 0,
    },
    {
      id: "state",
      name: "State",
      code: voterInfo.stateCode,
      description: `${stateCodeToName[voterInfo.stateCode as keyof typeof stateCodeToName] || voterInfo.state} State`,
      icon: "🌍",
      color: "bg-purple-500",
      position: realPositionData?.state.position || "Not voted",
      totalVotes: realPositionData?.state.totalVotes || 0,
      registeredVoters: realPositionData?.state.registeredVoters || 0,
      nonVoters: realPositionData?.state.nonVoters || 0,
    },
    {
      id: "national",
      name: "National",
      code: "NG",
      description: "Federal Republic of Nigeria",
      icon: "🇳🇬",
      color: "bg-red-500",
      position: realPositionData?.national.position || "Not voted",
      totalVotes: realPositionData?.national.totalVotes || 0,
      registeredVoters: realPositionData?.national.registeredVoters || 0,
      nonVoters: realPositionData?.national.nonVoters || 0,
    },
  ] : []

  // Redirect if not authenticated
  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace('/login')
    }
  }, [ready, isAuthenticated, router])

  // Load election and position data
  useEffect(() => {
    if (electionId && user && isAuthenticated) {
      loadElectionAndPositionData()
    }
  }, [electionId, user, isAuthenticated])

  const loadElectionAndPositionData = async () => {
    try {
      setLoading(true)
      setError('')

      // Load election details
      const electionResponse = await ElectionService.getElections()
      if (electionResponse.success && electionResponse.data) {
        const foundElection = electionResponse.data.find((e: any) => e.id === electionId)
        if (foundElection) {
          setElection(foundElection)
        } else {
          setError('Election not found')
          return
        }
      }

      // This will be implemented in the next step
      } catch (error: any) {
      setError(`Failed to load election data: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !ready) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p className="text-red-700 text-lg font-medium">{error}</p>
            <Button onClick={loadElectionData} className="mt-4">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading || !election || !positionData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading election data...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <p className="text-slate-600 text-lg font-medium">{error}</p>
            <Button onClick={() => router.push('/vote-position')} className="mt-4">Back to Elections</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!election) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <p className="text-slate-600 text-lg font-medium">Election not found.</p>
            <Button onClick={() => router.push('/vote-position')} className="mt-4">Back to Elections</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
                  Back to Elections
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
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Clock className="h-3 w-3 mr-1" />
              Live Updates
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Election Details & Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{election.title}</span>
              <Badge className="bg-green-100 text-green-800">Vote Cast</Badge>
            </CardTitle>
            <CardDescription>
              Your vote was cast on {voterInfo.voteTimestamp}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Vote Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Voter ID</p>
                <p className="font-mono text-lg font-bold text-blue-900">{voterInfo.voterId}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Vote Timestamp</p>
                <p className="font-mono text-sm font-bold text-green-900">
                  {voterInfo.voteTimestamp}
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Election Type</p>
                <p className="text-lg font-bold text-purple-900">{election.election_type}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">Contract Address</p>
                <p className="font-mono text-sm font-bold text-orange-900 break-all">{voterInfo.contractAddress}</p>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="border-t pt-4 mb-4">
              <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Blockchain Verification
              </h3>
              <div className="bg-slate-50 rounded p-4">
               <div className="text-center space-y-4">
                 {/* Transaction Hash - Centered */}
                 <div>
                   <p className="text-xs text-slate-600 mb-2">Transaction Hash</p>
                   <p className="font-mono text-xs bg-white p-2 rounded border break-all max-w-xl mx-auto">
                     {voterInfo.transactionHash}
                   </p>
                 </div>

                 {/* Contract Address - Centered */}
                 <div>
                   <p className="text-xs text-slate-600 mb-2">Contract Address</p>
                   <p className="font-mono text-xs bg-white p-2 rounded border break-all max-w-xl mx-auto">
                     {voterInfo.contractAddress}
                   </p>
                 </div>

                 {/* Block Number and Gas Used */}
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <p className="text-xs text-slate-600 mb-2">Block Number</p>
                     <p className="font-mono text-xs bg-white p-2 rounded border">
                       #{voterInfo.blockNumber}
                     </p>
                   </div>
                   <div>
                     <p className="text-xs text-slate-600 mb-2">Gas Used</p>
                     <p className="font-mono text-xs bg-white p-2 rounded border">
                       {voterInfo.gasUsed.includes('unavailable') ? voterInfo.gasUsed : parseInt(voterInfo.gasUsed).toLocaleString()}
                     </p>
                   </div>
                 </div>

                 {/* View on Blockchain - Only show if transaction hash is available */}
                 {voterInfo.transactionHash && !voterInfo.transactionHash.includes('unavailable') ? (
                   <div>
                     <Button 
                       asChild 
                       size="sm"
                       className="bg-blue-600 hover:bg-blue-700 text-white"
                     >
                       <Link href={`/blockchain/transaction/${voterInfo.transactionHash}`}>
                         <ExternalLink className="h-3 w-3 mr-1" />
                         View Transaction Details
                       </Link>
                     </Button>
                   </div>
                 ) : (
                   <div>
                     <p className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                       Blockchain data unavailable. Please try again.
                     </p>
                   </div>
                 )}

                 {/* Verification Status - Show appropriate status */}
                 {voterInfo.transactionHash && !voterInfo.transactionHash.includes('unavailable') ? (
                   <div className="p-2 bg-green-50 rounded border border-green-200 max-w-sm mx-auto">
                     <div className="flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                       <p className="text-xs text-green-800">
                         Vote verified on blockchain
                       </p>
                     </div>
                   </div>
                 ) : (
                   <div className="p-2 bg-orange-50 rounded border border-orange-200 max-w-sm mx-auto">
                     <div className="flex items-center justify-center">
                       <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1"></div>
                       <p className="text-xs text-orange-800">
                         Blockchain verification pending
                       </p>
                     </div>
                   </div>
                 )}
               </div>
              </div>
            </div>

            {/* Election Statistics */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Election Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Registered Voters</p>
                      <p className="text-2xl font-bold text-blue-900">{positionData?.statistics.registered_voters?.toLocaleString() || 0}</p>
                    </div>
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Total Votes Cast</p>
                      <p className="text-2xl font-bold text-green-900">{positionData?.statistics.total_votes?.toLocaleString() || 0}</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-orange-600 font-medium">Non-Voters</p>
                      <p className="text-2xl font-bold text-orange-900">{positionData?.statistics.non_voters?.toLocaleString() || 0}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 font-medium">Turnout</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {positionData?.statistics.turnout_percentage?.toFixed(1) || 0}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
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
              {hierarchyLevels.map((level, index) => (
                <div key={level.id} className="relative">
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
                    style={{ borderLeftColor: level.color.replace("bg-", "#") }}
                    onClick={() => router.push(`/vote-position/level-detail/${level.id}?election=${electionId}`)}
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
                              <p className="text-2xl font-bold text-slate-900">
                                {typeof level.position === 'number' 
                                  ? `#${level.position.toLocaleString()}` 
                                  : level.position}
                              </p>
                              <p className="text-sm text-slate-600">
                                of {level.totalVotes.toLocaleString()} votes
                              </p>
                              <p className="text-xs text-slate-500">
                                {level.registeredVoters.toLocaleString()} registered • {level.nonVoters.toLocaleString()} non-voters
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {index < hierarchyLevels.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-slate-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Best Position</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">#{Math.min(...hierarchyLevels.map(l => l.position))}</div>
              <p className="text-xs text-slate-500">At {hierarchyLevels.find(l => l.position === Math.min(...hierarchyLevels.map(l => l.position)))?.name} level</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Levels</CardTitle>
              <MapPin className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{hierarchyLevels.length}</div>
              <p className="text-xs text-slate-500">Electoral levels tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">National Position</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">
                {typeof realPositionData?.national.position === 'number' 
                  ? `#${realPositionData.national.position.toLocaleString()}` 
                  : realPositionData?.national.position || "Not voted"}
              </div>
              <p className="text-xs text-slate-500">Out of {realPositionData?.national.totalVotes?.toLocaleString() || 0} total votes</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Dashboard Button */}
      <DashboardButton variant="floating" />
    </div>
  )
}