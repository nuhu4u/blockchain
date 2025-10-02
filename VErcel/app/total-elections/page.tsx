"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Database, Search, ArrowLeft, Vote, Users, TrendingUp, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Frontend API base URL - single source of truth
const FRONTEND_API_URL = 'http://localhost:3000'

// API helper functions using fetch - frontend API routes
const api = {
  async get(url: string) {
    const response = await fetch(`${FRONTEND_API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return {
      data: await response.json(),
      status: response.status
    }
  }
}

export default function TotalElectionsPage() {
  const [elections, setElections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedElection, setSelectedElection] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [allVotes, setAllVotes] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [votesCache, setVotesCache] = useState<{[key: string]: any[]}>({})
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")

  // Fetch elections data using public API (no auth required)
  const fetchElections = async () => {
    try {
      const response = await api.get('/api/public-elections')
      
      if (response.data.success && response.data.data) {
        setElections(response.data.data)
        
        // Automatically select the election with the most votes
        const electionWithMostVotes = response.data.data.reduce((max: any, current: any) => {
          return (current.total_votes || 0) > (max.total_votes || 0) ? current : max
        })
        
        if (electionWithMostVotes && electionWithMostVotes.total_votes > 0) {
          setSelectedElection(electionWithMostVotes)
        }
        
        setError("")
      } else {
        setElections([])
      }
    } catch (err: any) {
      if (err.message.includes('HTTP error')) {
        setError(`Backend error: ${err.message}`)
      } else if (err.message.includes('fetch')) {
        setError("Unable to connect to backend server")
      } else {
        setError("Request configuration error")
      }
    } finally {
      setLoading(false)
    }
  }

  // Filter votes based on search input - dynamic filtering
  const getFilteredVotes = () => {
    if (!searchQuery.trim()) {
      // If no search query, return all votes
      return allVotes
    }

    const searchTerm = searchQuery.toLowerCase().trim()
    
    // Filter the array using the input value as parameter
    const filteredArray = allVotes.filter((vote: any) => {
      const voterId = vote.voterId?.toLowerCase() || ''
      const voterName = vote.voterName?.toLowerCase() || ''
      const voterEmail = vote.voterEmail?.toLowerCase() || ''
      
      return voterId.includes(searchTerm) || 
             voterName.includes(searchTerm) || 
             voterEmail.includes(searchTerm)
    })

    return filteredArray
  }

  // Debounce search query to avoid frequent API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update search results when debounced query or all votes change
  useEffect(() => {
    const filtered = getFilteredVotes()
    setSearchResults(filtered)
  }, [debouncedSearchQuery, allVotes])

  useEffect(() => {
    fetchElections()
  }, [])

  // Load all votes when an election is selected
  useEffect(() => {
    if (selectedElection) {
      loadAllVotes()
    }
  }, [selectedElection])

  // Load all votes for the selected election with caching
  const loadAllVotes = async () => {
    if (!selectedElection) return

    const electionId = selectedElection._id
    
    // Check cache first
    if (votesCache[electionId]) {
      setAllVotes(votesCache[electionId])
      setSearchResults(votesCache[electionId])
      return
    }

    setSearchLoading(true)
    try {
      // Call the public votes API (no auth required)
      const response = await api.get(`/api/public-elections/${electionId}/votes`)
      
      if (response.data.success && response.data.data && response.data.data.length > 0) {
        // Map vote data from backend - include voter information
        const mappedResults = response.data.data.map((vote: any) => {
          return {
            id: vote._id || vote.id,
            electionId: vote.election_id,
            candidateId: vote.candidate_id,
            voterId: vote.voter_id || vote.voterId,
            voterName: vote.voter_name || vote.voterName,
            voterEmail: vote.voter_email || vote.voterEmail,
            transactionHash: vote.transaction_hash || vote.transactionHash || 'Pending',
            voteTime: vote.created_at || vote.createdAt || vote.voteTime,
            blockNumber: vote.block_number || vote.blockNumber || 'N/A',
            verified: vote.verified !== false,
            status: vote.status || 'success'
          }
        })
        
        // Cache the results
        setVotesCache(prev => ({
          ...prev,
          [electionId]: mappedResults
        }))
        
        setAllVotes(mappedResults)
        setSearchResults(mappedResults)
      } else {
        setAllVotes([])
        setSearchResults([])
      }
    } catch (err: any) {
      if (err.message.includes('HTTP error')) {
        setError(`Backend error: ${err.message}`)
      } else if (err.message.includes('fetch')) {
        setError("Unable to connect to backend server")
      } else {
        setError("Request configuration error")
      }
      setAllVotes([])
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading elections...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Error Loading Elections</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button onClick={fetchElections} className="!bg-red-600 hover:!bg-red-700 !text-white">
            Try Again
          </Button>
        </div>
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
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Vote className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Total for Each Election</h1>
                  <p className="text-sm text-slate-600">View voter details and election totals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!selectedElection ? (
          // Election Selection View
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Select an Election</h2>
              <p className="text-slate-600">Choose an election to view voter details and totals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {elections.map((election, index) => (
                <Card 
                  key={election._id || index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-600"
                  onClick={() => setSelectedElection(election)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{election.title}</span>
                      <Badge className={election.status === 'ONGOING' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {election.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {election.election_type} • {election.contestants?.length || 0} candidates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Total Votes:</span>
                        <span className="font-bold text-green-600">{election.total_votes || 0}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">Candidates:</span>
                        <span className="font-medium">{election.contestants?.length || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Election Details View
          <div>
            {/* Election Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedElection.title}</h2>
                  <p className="text-slate-600">{selectedElection.election_type} • {selectedElection.contestants?.length || 0} candidates</p>
                </div>
                <Badge className={selectedElection.status === 'ONGOING' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                  {selectedElection.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Vote className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Votes</p>
                    <p className="text-lg font-bold text-green-600">{selectedElection.total_votes || 0}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Candidates</p>
                    <p className="text-lg font-bold text-blue-600">{selectedElection.contestants?.length || 0}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Database className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Blockchain Status</p>
                    <p className="text-lg font-bold text-purple-600">Deployed</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Verified Votes</p>
                    <p className="text-lg font-bold text-emerald-600">100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Search className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-900">Search Voters</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">Search for specific voters by voter ID, name, or email</p>
              
              <div className="flex space-x-3">
                <Input
                  type="text"
                  placeholder="Enter voter ID, name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery("")}
                  className="!bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50"
                >
                  Show All
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">Voter Details</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-slate-600">
                      {searchQuery ? `${searchResults.length} of ${allVotes.length} voters` : `${allVotes.length} total voters`}
                    </span>
                    {searchLoading && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {searchLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading voter details...</p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.map((vote, index) => (
                      <Card key={vote.id || index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-slate-600">Voter ID</p>
                              <p className="font-medium text-slate-900">{vote.voterId || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">Voter Name</p>
                              <p className="font-medium text-slate-900">{vote.voterName || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">Email</p>
                              <p className="font-medium text-slate-900">{vote.voterEmail || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-600">Vote Time</p>
                              <p className="font-medium text-slate-900">
                                {vote.voteTime ? new Date(vote.voteTime).toLocaleString() : 'N/A'}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-slate-600">Transaction Hash:</span>
                                <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                                  {vote.transactionHash}
                                </code>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={vote.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                  {vote.verified ? 'Verified' : 'Pending'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Voter Not Found</h3>
                    <p className="text-slate-600 mb-4">
                      No voter found with: "{searchQuery}"
                    </p>
                    <p className="text-sm text-slate-500">
                      Make sure you've entered the voter ID, name, or email correctly.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Votes Yet</h3>
                    <p className="text-slate-600">
                      This election doesn't have any votes yet. Check back later when voting begins.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedElection(null)}
                className="!bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Elections
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
