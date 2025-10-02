"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Activity, 
  Network, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  ExternalLink,
  TrendingUp,
  Shield
} from "lucide-react"
import { BlockchainService, BlockchainMetrics, ElectionStatus, SmartContractInfo } from "@/lib/services"

interface BlockchainStatusProps {
  electionId?: string
  showRefresh?: boolean
}

export function BlockchainStatus({ electionId, showRefresh = true }: BlockchainStatusProps) {
  const [metrics, setMetrics] = useState<BlockchainMetrics | null>(null)
  const [electionStatus, setElectionStatus] = useState<ElectionStatus | null>(null)
  const [contractInfo, setContractInfo] = useState<SmartContractInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const fetchBlockchainData = async () => {
    try {
      setIsLoading(true)
      setError("")

      // Fetch blockchain metrics
      const metricsResponse = await BlockchainService.getBlockchainMetrics()
      if (metricsResponse.success && metricsResponse.data) {
        setMetrics(metricsResponse.data)
      }

      // Fetch election status if electionId is provided
      if (electionId) {
        const statusResponse = await BlockchainService.getElectionStatus()
        if (statusResponse.success && statusResponse.data) {
          setElectionStatus(statusResponse.data)
          
          // Fetch smart contract info
          if (statusResponse.data.wallet_address) {
            const contractResponse = await BlockchainService.getSmartContractInfo(statusResponse.data.wallet_address)
            if (contractResponse.success && contractResponse.data) {
              setContractInfo(contractResponse.data)
            }
          }
        }
      }

      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to fetch blockchain data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlockchainData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchBlockchainData, 30000)
    return () => clearInterval(interval)
  }, [electionId])

  const getNetworkCongestionColor = (congestion: string) => {
    switch (congestion) {
      case 'LOW': return 'bg-green-100 text-green-800'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800'
      case 'HIGH': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getNetworkCongestionIcon = (congestion: string) => {
    switch (congestion) {
      case 'LOW': return <CheckCircle className="h-4 w-4" />
      case 'MEDIUM': return <AlertTriangle className="h-4 w-4" />
      case 'HIGH': return <AlertTriangle className="h-4 w-4" />
      default: return <Network className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading blockchain status...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          {error}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Network className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Blockchain Status</h3>
        </div>
        {showRefresh && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchBlockchainData}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>

      {/* Last Updated */}
      <div className="text-sm text-gray-500 text-right">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>

      {/* Blockchain Metrics */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Network Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{metrics.total_transactions.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{metrics.average_gas_price} Gwei</div>
                <div className="text-sm text-gray-600">Avg Gas Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{metrics.average_confirmation_time}s</div>
                <div className="text-sm text-gray-600">Avg Confirmation</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Network Congestion</span>
                <Badge className={getNetworkCongestionColor(metrics.network_congestion)}>
                  {getNetworkCongestionIcon(metrics.network_congestion)}
                  <span className="ml-1">{metrics.network_congestion}</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Election Status */}
      {electionStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span>Election Contract Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Contract Address</div>
                <div className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                  {electionStatus.wallet_address}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Network</div>
                <div className="font-semibold">{electionStatus.blockchain_network}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{electionStatus.total_voters}</div>
                <div className="text-sm text-gray-600">Total Voters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{electionStatus.total_votes}</div>
                <div className="text-sm text-gray-600">Total Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{electionStatus.last_block_number}</div>
                <div className="text-sm text-gray-600">Last Block</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Election Status</span>
                <Badge variant={electionStatus.is_active ? "default" : "secondary"}>
                  {electionStatus.election_status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Contract Active</span>
                <Badge variant={electionStatus.is_active ? "default" : "destructive"}>
                  {electionStatus.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Smart Contract Info */}
      {contractInfo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>Smart Contract Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Contract Name</div>
                <div className="font-semibold">{contractInfo.contract_name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Version</div>
                <div className="font-semibold">{contractInfo.contract_version}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Network ID</div>
                <div className="font-semibold">{contractInfo.network_id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Deployment Block</div>
                <div className="font-semibold">{contractInfo.deployment_block}</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Deployment Date</div>
              <div className="font-semibold">
                {new Date(contractInfo.deployment_timestamp).toLocaleDateString()}
              </div>
            </div>

            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(`https://etherscan.io/address/${contractInfo.wallet_address}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Contract on Explorer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
