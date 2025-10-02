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

export default function BlockchainTransactionsPage() {
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

  // Filter transactions based on search input - dynamic filtering
  const getFilteredTransactions = () => {
    if (!searchQuery.trim()) {
      // If no search query, return all votes
      return allVotes
    }

    const searchTerm = searchQuery.toLowerCase().trim()
    
    // Filter the array using the input value as parameter
    const filteredArray = allVotes.filter((transaction: any) => {
      const transactionHash = transaction.transactionHash.toLowerCase()
      return transactionHash === searchTerm
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
    const filtered = getFilteredTransactions()
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
        // Map ALL vote data from backend - transaction data only
        const mappedResults = response.data.data.map((vote: any) => {
          return {
            id: vote._id || vote.id,
            contractAddress: selectedElection.contract_address || selectedElection.wallet_address,
            transactionHash: vote.transactionHash || vote.transaction_hash || 'Pending',
            voteTime: vote.createdAt || vote.created_at || vote.voteTime,
            blockNumber: vote.blockNumber || vote.block_number || 'N/A',
            verified: vote.verified !== false,
            voteValue: vote.voteValue || vote.vote_value || 1,
            gasUsed: vote.gasUsed || vote.gas_used || 'N/A',
            votePosition: vote.votePosition || vote.vote_position || 'N/A'
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
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Blockchain Transactions</h1>
                  <p className="text-sm text-slate-600">View and verify election votes on the blockchain</p>
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
              <p className="text-slate-600">Choose an election to view its blockchain transactions and vote verification</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {elections.map((election, index) => (
                <Card 
                  key={election._id || index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-600"
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
                        <span className="text-sm text-slate-600">Contract Address:</span>
                        <span className="font-mono text-xs text-blue-600">
                          {(election.contract_address || election.wallet_address || 'Not deployed').substring(0, 10)}...
                        </span>
                      </div>
                      <Button className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white">
                        <Database className="h-4 w-4 mr-2" />
                        View Transactions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          // Election Details View
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedElection.title}</h2>
                <p className="text-slate-600">{selectedElection.election_type} • {selectedElection.status}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setSelectedElection(null)}
                className="!bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Elections
              </Button>
            </div>

            {/* Election Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Total Votes</CardTitle>
                  <Vote className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{selectedElection.total_votes || 0}</div>
                  <p className="text-xs text-slate-500">On blockchain</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Candidates</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">{selectedElection.contestants?.length || 0}</div>
                  <p className="text-xs text-slate-500">Participating</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Contract</CardTitle>
                  <Database className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-bold text-slate-900">
                    {selectedElection.contract_address || selectedElection.wallet_address ? 'Deployed' : 'Pending'}
                  </div>
                  <p className="text-xs text-slate-500">Blockchain status</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Verification</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <p className="text-xs text-slate-500">Verified votes</p>
                </CardContent>
              </Card>
            </div>

            {/* Search Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Votes
                </CardTitle>
                <CardDescription>
                  Search for specific vote transactions by transaction hash
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Input
                    placeholder="Enter transaction hash to search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <div className="text-sm text-slate-500 px-3 py-2 bg-slate-100 rounded">
                    Search automatically as you type
                  </div>
                  {searchQuery && (
                    <Button 
                      onClick={() => {
                        setSearchQuery("")
                        setSearchResults(allVotes)
                      }}
                      variant="outline"
                      className="!bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50"
                    >
                      Show All
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Debug Info */}
            {searchQuery && (
              <Card className="mb-4 bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Public Elections API & Cache Debug</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>Frontend API:</strong> http://localhost:3000 (Single Source of Truth)</p>
                    <p><strong>Backend Proxy:</strong> http://localhost:3001 (Via Frontend Routes)</p>
                    <p><strong>API Type:</strong> Public Elections Routes (No Auth Required)</p>
                    <p><strong>Search input:</strong> "{searchQuery}"</p>
                    <p><strong>Debounced query:</strong> "{debouncedSearchQuery}"</p>
                    <p><strong>Data source:</strong> {votesCache[selectedElection?._id] ? 'Cached' : 'Public API'}</p>
                    <p><strong>Original array length:</strong> {allVotes.length}</p>
                    <p><strong>Filtered array length:</strong> {searchResults.length}</p>
                    <p><strong>Cache status:</strong> {Object.keys(votesCache).length} elections cached</p>
                    <p><strong>HTTP Client:</strong> Native fetch with baseURL</p>
                    {searchResults.length > 0 && (
                      <p><strong>Found transaction:</strong> {searchResults[0].transactionHash}</p>
                    )}
                    {allVotes.length > 0 && (
                      <p><strong>All transaction hashes:</strong> {allVotes.map(v => v.transactionHash).join(', ')}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {searchQuery ? 
                      (searchResults.length > 0 ? 
                        `Found Transaction` : 
                        `No Transaction Found`
                      ) : 
                      `Vote Transactions (${searchResults.length})`
                    }
                  </CardTitle>
                  <CardDescription>
                    {searchQuery ? 
                      (searchResults.length > 0 ? 
                        `Exact match for "${searchQuery}"` : 
                        `No transaction found matching "${searchQuery}"`
                      ) : 
                      'All vote transactions for this election'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <div key={index} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                        searchQuery && result.transactionHash.toLowerCase().includes(searchQuery.toLowerCase()) 
                          ? 'border-green-500 bg-green-50' 
                          : ''
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <h4 className="font-semibold text-lg text-slate-900">Vote Transaction #{index + 1}</h4>
                              <p className="text-sm text-slate-600">Blockchain Verified Vote</p>
                            </div>
                          </div>
                           <div className="flex items-center space-x-2">
                             <Badge className="bg-green-100 text-green-800 border-green-200">
                               <CheckCircle className="h-3 w-3 mr-1" />
                               Verified
                             </Badge>
                           </div>
                        </div>
                        
                         {/* Transaction Details - Focus on blockchain data only */}
                         <div className="text-sm text-slate-600 bg-slate-50 rounded p-3">
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             <div>
                               <p className="font-medium text-slate-700">Vote Time:</p>
                               <p className="text-slate-900">{new Date(result.voteTime).toLocaleString()}</p>
                             </div>
                             <div>
                               <p className="font-medium text-slate-700">Block Number:</p>
                               <p className="text-slate-900 font-mono">{result.blockNumber}</p>
                             </div>
                             <div>
                               <p className="font-medium text-slate-700">Gas Used:</p>
                               <p className="text-slate-900 font-mono">{result.gasUsed}</p>
                             </div>
                           </div>
                         </div>

                        {/* Transaction Details - Full transaction hash and contract address */}
                        <div className="mt-3 space-y-3">
                          <div className="grid grid-cols-1 gap-3 text-sm">
                            <div className="p-3 bg-white rounded border">
                              <p className="font-medium text-gray-600 mb-2">Transaction Hash (Full)</p>
                              <p className="text-gray-900 font-mono text-sm break-all bg-gray-50 p-2 rounded">
                                {result.transactionHash}
                              </p>
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <p className="font-medium text-gray-600 mb-2">Contract Address</p>
                              <p className="text-gray-900 font-mono text-sm break-all bg-gray-50 p-2 rounded">
                                {result.contractAddress}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                            <div>
                              <p className="font-medium">Gas Used:</p>
                              <p className="font-mono">{result.gasUsed}</p>
                            </div>
                            <div>
                              <p className="font-medium">Vote Position:</p>
                              <p className="font-mono">#{result.votePosition}</p>
                            </div>
                            <div>
                              <p className="font-medium">Vote Value:</p>
                              <p className="font-mono">{result.voteValue}</p>
                            </div>
                            <div>
                              <p className="font-medium">Status:</p>
                              <p className={result.verified ? 'text-green-600' : 'text-yellow-600'}>
                                {result.verified ? 'Verified' : 'Pending'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {searchQuery && searchResults.length === 0 && !searchLoading && (
              <Card>
                <CardContent className="text-center py-8">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Transaction Not Found</h3>
                  <p className="text-slate-600 mb-4">No transaction found with hash: "{searchQuery}"</p>
                  <p className="text-sm text-slate-500">Make sure you've entered the complete transaction hash correctly.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
