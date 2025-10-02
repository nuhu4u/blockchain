"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  ExternalLink,
  TrendingUp,
  AlertTriangle,
  Loader2
} from "lucide-react"
import { BlockchainService, BlockchainTransaction } from "@/lib/services"

interface TransactionMonitorProps {
  electionId?: string
  autoRefresh?: boolean
  refreshInterval?: number
}

export function TransactionMonitor({ 
  electionId, 
  autoRefresh = true, 
  refreshInterval = 10000 
}: TransactionMonitorProps) {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchTransactions = async () => {
    try {
      setIsLoading(true)
      setError("")

      const response = await BlockchainService.getPendingTransactions()
      if (response.success) {
        if (response.data) {
          setTransactions(response.data)
        }
      } else {
        setError("Failed to fetch transactions")
      }

      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
    
    if (autoRefresh) {
      const interval = setInterval(fetchTransactions, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refreshInterval])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'CONFIRMED':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getConfirmationProgress = (confirmations: number, maxConfirmations: number = 12) => {
    return Math.min((confirmations / maxConfirmations) * 100, 100)
  }

  const formatGasPrice = (gasPrice: string) => {
    const price = parseFloat(gasPrice)
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(2)} Gwei`
    }
    return `${price} Wei`
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return date.toLocaleDateString()
  }

  if (isLoading && transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading transactions...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error && transactions.length === 0) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <XCircle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          {error}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Transaction Monitor</h3>
          <Badge variant="outline">{transactions.length} transactions</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchTransactions}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-gray-500">
            No transactions found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.transaction_hash} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Transaction Hash and Status */}
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(tx.status)}
                      <div className="flex-1">
                        <div className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                          {tx.transaction_hash}
                        </div>
                      </div>
                      <Badge className={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                    </div>

                    {/* Transaction Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Block:</span>
                        <div className="font-semibold">{tx.block_number}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Gas Used:</span>
                        <div className="font-semibold">{tx.gas_used.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Gas Price:</span>
                        <div className="font-semibold">{formatGasPrice(tx.gas_price)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <div className="font-semibold">{formatTimestamp(tx.timestamp)}</div>
                      </div>
                    </div>

                    {/* Confirmation Progress */}
                    {tx.status === 'PENDING' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Confirmations</span>
                          <span className="font-semibold">
                            {tx.confirmations}/12
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getConfirmationProgress(tx.confirmations)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Confirmation Status */}
                    {tx.status === 'CONFIRMED' && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Confirmed with {tx.confirmations} confirmations
                        </span>
                      </div>
                    )}

                    {/* Failed Status */}
                    {tx.status === 'FAILED' && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Transaction failed
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${tx.transaction_hash}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Auto-refresh indicator */}
      {autoRefresh && (
        <div className="text-center text-sm text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>Auto-refreshing every {refreshInterval / 1000} seconds</span>
          </div>
        </div>
      )}
    </div>
  )
}
