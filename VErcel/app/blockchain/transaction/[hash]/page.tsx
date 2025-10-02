"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Copy, Check, Hash, Shield, Clock, Zap, Database, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"

export default function BlockchainTransactionPage() {
  const params = useParams()
  const router = useRouter()
  const { isAuthenticated, ready } = useSimpleAuth()
  
  const [transactionData, setTransactionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  
  const transactionHash = params?.hash as string

  // Copy to clipboard function
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      }
  }

  // Load transaction data
  useEffect(() => {
    if (!ready) return
    
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    
    if (transactionHash) {
      loadTransactionData()
    }
  }, [ready, isAuthenticated, transactionHash, router])

  const loadTransactionData = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Fetch transaction data from API
      const response = await fetch(`/api/blockchain/transaction/${transactionHash}`, {
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
        if (result.data.status === 'unavailable') {
          setError('Blockchain service is currently unavailable')
          return
        }
        
        if (result.data.status === 'deleted') {
          setError('Transaction not found (election may have been deleted)')
          return
        }
        
        // Check if transaction data exists
        if (!result.data.transaction) {
          setError('Transaction data not available')
          return
        }
        
        // Transform API data to match component expectations
        const transaction = result.data.transaction
        const transformedData = {
          hash: transaction.hash,
          blockNumber: transaction.blockNumber,
          gasUsed: transaction.gasUsed,
          gasPrice: transaction.gasPrice,
          from: transaction.from,
          to: transaction.to,
          value: transaction.value,
          status: transaction.status,
          timestamp: transaction.timestamp,
          electionContract: transaction.voteData?.electionContract || transaction.to,
          voterAddress: transaction.voteData?.voterAddress || transaction.from,
          candidateId: transaction.voteData?.candidateId || 'Unknown',
          network: transaction.network,
          explorerUrl: transaction.explorerUrl
        }
        
        setTransactionData(transformedData)
        } else {
        throw new Error(result.message || 'Failed to load transaction data')
      }
      
    } catch (err: any) {
      setError('Failed to load transaction data: ' + err.message)
    } finally {
      setLoading(false)
    }
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
          <p className="text-slate-600">Loading transaction details...</p>
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
              <Shield className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!transactionData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-slate-500 mb-4">
              <Hash className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Transaction Not Found</h2>
            <p className="text-slate-600 mb-4">The transaction could not be found or loaded.</p>
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
                <h1 className="text-xl font-bold text-slate-900">Blockchain Transaction</h1>
                <p className="text-sm text-slate-600">Transaction Details</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-green-300 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Transaction Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Hash className="h-5 w-5 mr-2" />
                Transaction Overview
              </CardTitle>
              <CardDescription>
                Details for transaction {transactionData.hash.substring(0, 10)}...{transactionData.hash.substring(transactionData.hash.length - 8)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Transaction Hash */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Transaction Hash</label>
                <div className="flex items-center space-x-2">
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border flex-1 break-all">
                    {transactionData.hash}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(transactionData.hash)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Status</label>
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    {transactionData.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Network</label>
                  <p className="text-sm text-slate-600">{transactionData.network}</p>
                </div>
              </div>

              {/* Block and Zap Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Block Number</label>
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border">
                    #{transactionData.blockNumber}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Zap Used</label>
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border">
                    {parseInt(transactionData.gasUsed).toLocaleString()}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Zap Price</label>
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border">
                    {parseInt(transactionData.gasPrice).toLocaleString()} wei
                  </p>
                </div>
              </div>

              {/* Timestamp */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Timestamp</label>
                <p className="text-sm text-slate-600 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {new Date(transactionData.timestamp).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Vote Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Vote Details
              </CardTitle>
              <CardDescription>
                Information about the vote cast in this transaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Election Contract */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Election Contract Address</label>
                <div className="flex items-center space-x-2">
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border flex-1 break-all">
                    {transactionData.electionContract}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(transactionData.electionContract)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Voter Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Voter Address</label>
                <div className="flex items-center space-x-2">
                  <p className="font-mono text-sm bg-slate-100 p-2 rounded border flex-1 break-all">
                    {transactionData.voterAddress}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(transactionData.voterAddress)}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Candidate ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Selected Candidate ID</label>
                <p className="font-mono text-sm bg-slate-100 p-2 rounded border">
                  {transactionData.candidateId}
                </p>
              </div>

              {/* Transaction Value */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Transaction Value</label>
                <p className="font-mono text-sm bg-slate-100 p-2 rounded border">
                  {transactionData.value} ETH
                </p>
              </div>
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
                Additional actions and links for this transaction
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
                  <a 
                    href={transactionData.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </a>
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
                    This transaction has been verified and recorded on the blockchain. 
                    The vote data is immutable and cannot be altered once confirmed.
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
