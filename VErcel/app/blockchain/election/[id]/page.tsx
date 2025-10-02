"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Copy, Check, Hash, Shield, Clock, Zap, Database, Link as LinkIcon, AlertCircle, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"

export default function ElectionExplorerPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, ready } = useSimpleAuth()
  
  const [electionData, setElectionData] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [consistency, setConsistency] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  
  const electionId = params?.id as string

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      }
  }

  // Load election data
  useEffect(() => {
    if (!ready) return
    
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    
    if (electionId) {
      loadElectionData()
    }
  }, [ready, isAuthenticated, electionId, router])

  const loadElectionData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Fetch election transactions from API
      const response = await fetch(`/api/blockchain/election/${electionId}`, {
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
        if (result.data.status === 'deleted') {
          setError('Election not found (deleted)')
          return
        }
        
        if (result.data.status === 'unavailable') {
          setError('Blockchain service is currently unavailable')
          return
        }
        
        setElectionData(result.data.election)
        setTransactions(result.data.transactions || [])
        setConsistency({
          dbVotes: result.data.dbVotes,
          chainVotes: result.data.chainVotes,
          status: result.data.consistency
        })
        
        } else {
        throw new Error(result.message || 'Failed to load election data')
      }
      
    } catch (err: any) {
      setError('Failed to load election data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadElectionData()
    setRefreshing(false)
  }

  // Redirect if not authenticated
  if (ready && !isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading election data...</p>
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
                <ArrowLeft className="h-4 w-4 mr-2" />
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

  if (!electionData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-slate-500 mb-4">
              <Database className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Election Not Found</h2>
            <p className="text-slate-600 mb-4">The election could not be found or loaded.</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
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
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Election Explorer</h1>
                <p className="text-sm text-slate-600">{electionData.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Badge variant="outline" className="border-green-300 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                Blockchain Verified
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Election Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Election Overview
              </CardTitle>
              <CardDescription>
                Blockchain verification details for {electionData.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Election Contract Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Election Contract Address</label>
                <div className="flex items-center space-x-2">
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border flex-1 break-all">
                    {electionData.wallet_address || 'Not available'}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(electionData.wallet_address || '')}
                    disabled={!electionData.wallet_address}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Transaction Count */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Total Transactions</p>
                      <p className="text-2xl font-bold text-blue-900">{transactions.length}</p>
                    </div>
                    <Hash className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Election ID</p>
                      <p className="text-lg font-bold text-green-900">{electionData.id}</p>
                    </div>
                    <Database className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consistency Check */}
          {consistency && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Database vs Blockchain Consistency
                </CardTitle>
                <CardDescription>
                  Verification that database votes match blockchain transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Database Votes</p>
                        <p className="text-2xl font-bold text-slate-900">{consistency.dbVotes}</p>
                      </div>
                      <Database className="h-8 w-8 text-slate-600" />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 font-medium">Blockchain Votes</p>
                        <p className="text-2xl font-bold text-slate-900">{consistency.chainVotes}</p>
                      </div>
                      <Hash className="h-8 w-8 text-slate-600" />
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${
                    consistency.status === 'consistent' 
                      ? 'bg-green-50' 
                      : consistency.status === 'inconsistent'
                      ? 'bg-red-50'
                      : 'bg-yellow-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium ${
                          consistency.status === 'consistent' 
                            ? 'text-green-600' 
                            : consistency.status === 'inconsistent'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }">Status</p>
                        <div className="flex items-center space-x-2">
                          {consistency.status === 'consistent' ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : consistency.status === 'inconsistent' ? (
                            <XCircle className="h-6 w-6 text-red-600" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                          )}
                          <p className={`text-lg font-bold ${
                            consistency.status === 'consistent' 
                              ? 'text-green-900' 
                              : consistency.status === 'inconsistent'
                              ? 'text-red-900'
                              : 'text-yellow-900'
                          }`}>
                            {consistency.status === 'consistent' ? 'Consistent' : 
                             consistency.status === 'inconsistent' ? 'Inconsistent' : 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                Blockchain Transactions
              </CardTitle>
              <CardDescription>
                All vote transactions recorded on the blockchain for this election
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((tx, index) => (
                    <div key={tx.hash || index} className="p-4 bg-slate-50 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <Hash className="h-4 w-4 text-slate-500" />
                            <span className="font-mono text-sm text-slate-600">
                              {tx.hash ? `${tx.hash.substring(0, 10)}...${tx.hash.substring(tx.hash.length - 8)}` : 'Unknown Hash'}
                            </span>
                            <Badge variant="outline" className="text-green-700 border-green-300">
                              {tx.status || 'Success'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Block:</span>
                              <span className="ml-2 font-mono">#{tx.blockNumber || 'Unknown'}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Zap Used:</span>
                              <span className="ml-2 font-mono">{parseInt(tx.gasUsed || '0').toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Candidate:</span>
                              <span className="ml-2 font-mono">{tx.candidateId || 'Unknown'}</span>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-xs text-slate-500">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {tx.timestamp ? new Date(tx.timestamp).toLocaleString() : 'Unknown time'}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/blockchain/transaction/${tx.hash}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No blockchain transactions found for this election.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LinkIcon className="h-5 w-5 mr-2" />
                Actions
              </CardTitle>
              <CardDescription>
                Additional actions and navigation options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <Link href={`/vote-position`}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Vote Position
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link href={`/dashboard`}>
                    <Database className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link href={`/elections`}>
                    <Hash className="h-4 w-4 mr-2" />
                    View All Elections
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
                  <h3 className="text-sm font-medium text-blue-900 mb-1">Blockchain Verification</h3>
                  <p className="text-sm text-blue-700">
                    This explorer shows all blockchain transactions for the selected election. 
                    The consistency check verifies that database votes match blockchain records.
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
