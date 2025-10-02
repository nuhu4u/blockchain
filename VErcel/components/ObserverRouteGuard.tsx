"use client"

import { useObserverAuth } from "@/hooks/useObserverAuth"
import { useRouter } from "next/navigation"
import { useEffect, ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, User } from "lucide-react"
import Link from "next/link"

interface ObserverRouteGuardProps {
  children: ReactNode
  requireApproval?: boolean
  redirectTo?: string
  showRestrictedMessage?: boolean
}

export function ObserverRouteGuard({ 
  children, 
  requireApproval = true, 
  redirectTo = "/observer/profile",
  showRestrictedMessage = true 
}: ObserverRouteGuardProps) {
  const { user, isAuthenticated, isLoading } = useObserverAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/observer/login')
      return
    }

    // If approval required but user not approved, redirect to profile
    if (requireApproval && user && !user.isApproved) {
      if (window.location.pathname !== redirectTo) {
        router.push(redirectTo)
      }
    }
  }, [isAuthenticated, user, isLoading, router, requireApproval, redirectTo])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login redirect message
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-slate-600 mb-4">Please log in to access this page.</p>
            <Button asChild>
              <Link href="/observer/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show restricted access message for pending users
  if (requireApproval && user && !user.isApproved && showRestrictedMessage) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Shield className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Access Restricted</h1>
                  <p className="text-slate-600">Account pending approval</p>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/observer/profile">
                  <User className="h-4 w-4 mr-2" />
                  Go to Profile
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Alert className="border-yellow-200 bg-yellow-50">
              <Shield className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <div className="space-y-3">
                  <div>
                    <strong>Account Status: Pending Approval</strong>
                  </div>
                  <div>
                    Your observer account is currently under review. While waiting for approval, 
                    you can only access your profile page to view and edit your information.
                  </div>
                  <div>
                    <strong>Available actions:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>View and edit your profile information</li>
                      <li>Update your organization details</li>
                      <li>Check your account status</li>
                    </ul>
                  </div>
                  <div>
                    <strong>After approval, you will have access to:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Live election monitoring</li>
                      <li>Real-time voting results</li>
                      <li>Blockchain verification tools</li>
                      <li>Comprehensive reporting features</li>
                      <li>Data export capabilities</li>
                    </ul>
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            <div className="mt-6 flex justify-center space-x-4">
              <Button asChild>
                <Link href="/observer/profile">
                  <User className="h-4 w-4 mr-2" />
                  Go to My Profile
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/observer/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If all checks pass, render the protected content
  return <>{children}</>
}
