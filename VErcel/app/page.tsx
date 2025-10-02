"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MapPin, Building2, Globe, Vote, Eye, UserPlus, LogIn, Shield, TrendingUp, Clock, Loader2, ArrowLeft, Database, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [elections, setElections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [showElectionDetails, setShowElectionDetails] = useState(false)

  // Fetch elections data
  const fetchElections = async () => {
    try {
      const response = await fetch('/api/elections', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setElections(data.data)
          setLastUpdated(new Date())
          setError("")
        } else {
          setElections([])
        }
      } else {
        setError("Failed to load election data")
      }
    } catch (err: any) {
      setError("Unable to connect to election service")
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch on component mount
  useEffect(() => {
    fetchElections()
  }, [])

  // Smart polling every 30 seconds with visibility detection
  useEffect(() => {
    let interval: NodeJS.Timeout

    const startPolling = () => {
      interval = setInterval(() => {
        fetchElections()
      }, 30000) // 30 seconds
    }

    const stopPolling = () => {
      if (interval) clearInterval(interval)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling()
      } else {
        fetchElections() // Immediate refresh when returning to page
        startPolling()
      }
    }

    // Start polling and add visibility listener
    startPolling()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopPolling()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Filter active elections
  const activeElections = elections.filter(election => 
    election.status === 'ONGOING' || election.status === 'active'
  )

  // Get leading candidate for an election
  const getLeadingCandidate = (election: any) => {
    if (!election.contestants || election.contestants.length === 0) {
      return { name: "No candidates", votes: 0 }
    }
    
    // Check if any votes have been cast
    const totalVotes = election.total_votes || election.contestants.reduce((sum: number, c: any) => sum + (c.votes || 0), 0) || 0
    
    if (totalVotes === 0) {
      return { name: "Voting yet to commence", votes: 0, isNoVotes: true }
    }
    
    return election.contestants.reduce((leading: any, candidate: any) => {
      const candidateVotes = candidate.votes || 0
      const leadingVotes = leading.votes || 0
      return candidateVotes > leadingVotes ? candidate : leading
    }, election.contestants[0])
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Vote className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-2xl font-bold">Nigerian E-Voting Portal</h1>
                <p className="text-slate-300 text-sm">Secure • Transparent • Decentralized</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="!text-slate-900 !border-white !bg-white hover:!bg-slate-100" asChild>
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button className="!bg-blue-600 hover:!bg-blue-700 !text-white" asChild>
                <Link href="/register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register to Vote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Your Voice, Your Vote, Your Future</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Participate in Nigeria's most secure and transparent electronic voting system. Built on blockchain
            technology for maximum integrity.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="!bg-blue-600 hover:!bg-blue-700 !text-white" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="!text-slate-900 !border-white !bg-white hover:!bg-slate-100"
              asChild
            >
              <Link href="/elections">View Live Elections</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Election Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Registered Voters</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">84,004,084</div>
                <p className="text-xs text-slate-500">+2.1% from last election</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Polling Units</CardTitle>
                <MapPin className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">176,846</div>
                <p className="text-xs text-slate-500">Across all states</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total LGAs</CardTitle>
                <Building2 className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">774</div>
                <p className="text-xs text-slate-500">Local Government Areas</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total States</CardTitle>
                <Globe className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">36 + FCT</div>
                <p className="text-xs text-slate-500">States and Federal Capital Territory</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <UserPlus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Register as Voter</CardTitle>
                <CardDescription>Complete your voter registration with NIN verification</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white" asChild>
                  <Link href="/register">Register Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <LogIn className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Voter Login</CardTitle>
                <CardDescription>Access your dashboard to cast votes and view results</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full !bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Vote className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Live Elections</CardTitle>
                <CardDescription>View ongoing elections and real-time results</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full !bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50"
                  onClick={() => setShowElectionDetails(true)}
                >
                  View Elections
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Observer Portal</CardTitle>
                <CardDescription>Accredited observers can monitor elections in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full !bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50" asChild>
                  <Link href="/observer/login">Observer Login</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Admin Portal</CardTitle>
                <CardDescription>Administrative access for election management and oversight</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full !bg-transparent !border-red-300 !text-red-700 hover:!bg-red-50" asChild>
                  <Link href="/admin/login">Admin Login</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Election Details Modal */}
      {showElectionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Election Details</h3>
                <Button 
                  variant="outline" 
                  onClick={() => setShowElectionDetails(false)}
                  className="!bg-transparent !border-slate-300 !text-slate-700 hover:!bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Complete Blockchain Transactions Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Complete Blockchain Transactions</CardTitle>
                    <CardDescription>View all blockchain transactions and verification details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full !bg-blue-600 hover:!bg-blue-700 !text-white"
                      asChild
                    >
                      <Link href="/blockchain-transactions">
                        <Database className="h-4 w-4 mr-2" />
                        View Transactions
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Total for Each Election Card */}
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <CardTitle className="text-lg">Total for Each Election</CardTitle>
                    <CardDescription>View comprehensive vote counts and election statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full !bg-green-600 hover:!bg-green-700 !text-white"
                      asChild
                    >
                      <Link href="/total-elections">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Totals
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Elections Status */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Current Election Status</h3>
            
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  Loading Election Status...
                </Badge>
              </div>
            ) : error ? (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                ⚠️ Unable to Load Election Status
              </Badge>
            ) : activeElections.length > 0 ? (
              <Badge className="text-lg px-4 py-2 bg-red-600 hover:bg-red-700 text-white animate-pulse">
                🔴 LIVE: {activeElections.length} Active Election{activeElections.length > 1 ? 's' : ''}
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                No Active Elections
              </Badge>
            )}

            {lastUpdated && !loading && (
              <p className="text-xs text-slate-500 mt-2">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>

          {/* Dynamic Content Based on Election Status */}
          {loading ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Loading election information...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="max-w-2xl mx-auto border-red-200 bg-red-50">
              <CardHeader className="text-center">
                <CardTitle className="text-red-800">Connection Error</CardTitle>
                <CardDescription className="text-red-600">{error}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button 
                  onClick={fetchElections}
                  className="!bg-red-600 hover:!bg-red-700 !text-white"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : activeElections.length > 0 ? (
            // Display Active Elections
            <div className="space-y-6">
              {activeElections.map((election, index) => {
                const leadingCandidate = getLeadingCandidate(election)
                const totalVotes = election.total_votes || election.contestants?.reduce((sum: number, c: any) => sum + (c.votes || 0), 0) || 0
                
                return (
                  <Card key={election._id || index} className="max-w-4xl mx-auto border-green-200 bg-green-50">
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center space-x-3">
                        <Vote className="h-6 w-6 text-green-600" />
                        <span>{election.title}</span>
                        <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
                      </CardTitle>
                      <CardDescription className="text-green-700">
                        Currently accepting votes • Status: {election.status}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Election Statistics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                            <p className="font-semibold text-blue-700">Total Votes</p>
                          </div>
                          <p className="text-3xl font-bold text-slate-900">{totalVotes.toLocaleString()}</p>
                        </div>
                        
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-5 w-5 text-green-600 mr-2" />
                            <p className="font-semibold text-green-700">Leading</p>
                          </div>
                          {leadingCandidate.isNoVotes ? (
                            <>
                              <p className="text-sm font-medium text-slate-500 italic">
                                {leadingCandidate.name}
                              </p>
                              <p className="text-xs text-slate-400">
                                Election ready for voting
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="text-lg font-bold text-slate-900 truncate">
                                {leadingCandidate.name}
                              </p>
                              <p className="text-sm text-slate-600">
                                {leadingCandidate.votes || 0} votes
                              </p>
                            </>
                          )}
                        </div>
                        
                        <div className="text-center p-4 bg-white rounded-lg border">
                          <div className="flex items-center justify-center mb-2">
                            <Clock className="h-5 w-5 text-purple-600 mr-2" />
                            <p className="font-semibold text-purple-700">Candidates</p>
                          </div>
                          <p className="text-3xl font-bold text-slate-900">
                            {election.contestants?.length || 0}
                          </p>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex justify-center space-x-4">
                        <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                          <Link href="/elections">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            View Live Results
                          </Link>
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50" asChild>
                          <Link href="/login">
                            <Vote className="h-4 w-4 mr-2" />
                            Vote Now
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            // No Active Elections
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle>Next Scheduled Election</CardTitle>
                <CardDescription>2027 General Elections</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-4">
                  Registration is currently open for the next general elections. Ensure you're registered to participate
                  in Nigeria's democratic process.
                </p>
                <Button className="!bg-blue-600 hover:!bg-blue-700 !text-white" asChild>
                  <Link href="/register">Register to Vote</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-6 w-6 text-blue-400" />
                <span className="font-bold text-lg">E-Voting Portal</span>
              </div>
              <p className="text-slate-400 text-sm">
                Secure, transparent, and decentralized voting system for Nigeria.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/register" className="hover:text-white">
                    Register to Vote
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Voter Login
                  </Link>
                </li>
                <li>
                  <Link href="/elections" className="hover:text-white">
                    Live Elections
                  </Link>
                </li>
                <li>
                  <Link href="/observer/apply" className="hover:text-white">
                    Observer Application
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-white flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin Access
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Security</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>🔒 End-to-End Encryption</li>
                <li>⛓️ Blockchain Verified</li>
                <li>🛡️ NIN Authentication</li>
                <li>📱 Multi-Factor Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>
              &copy; 2024 Nigerian E-Voting Portal. All rights reserved. Built with security and transparency in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
