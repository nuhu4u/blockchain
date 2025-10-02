"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Network, Vote, Users, TrendingUp } from "lucide-react"

export default function BlockchainDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Blockchain Dashboard</h1>
        <p className="text-gray-600">
          Monitor blockchain status, transactions, and voting analytics in real-time
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Network className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Network Status</p>
                <p className="text-2xl font-bold text-blue-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Vote className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Votes</p>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Voters</p>
                <p className="text-2xl font-bold text-purple-600">892</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction Rate</p>
                <p className="text-2xl font-bold text-orange-600">45/min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Content */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Blockchain monitoring features are being implemented. This page will show real-time blockchain status, 
            transaction monitoring, and voting analytics once the backend services are fully configured.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
