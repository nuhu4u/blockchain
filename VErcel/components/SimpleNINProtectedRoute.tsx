"use client"

import { ReactNode } from 'react'
import { useSimpleNINVerification } from '@/hooks/useSimpleNINVerification'
import { Loader2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SimpleNINProtectedRouteProps {
  children: ReactNode
  fallback?: ReactNode
}

export const SimpleNINProtectedRoute = ({ children, fallback }: SimpleNINProtectedRouteProps) => {
  const { isChecking, hasNIN, ninVerified, shouldRedirect, user } = useSimpleNINVerification()

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Verifying NIN status...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (shouldRedirect && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <CardTitle className="text-red-800">Authentication Required</CardTitle>
            <CardDescription>Please log in to access this page</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show NIN verification required if no NIN
  if (shouldRedirect && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <CardTitle className="text-amber-800">NIN Verification Required</CardTitle>
            <CardDescription>
              You must verify your National Identification Number (NIN) to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                NIN verification is mandatory for all users to ensure secure voting.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => window.location.href = '/verify-nin'}
              className="w-full"
            >
              Verify NIN Now
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show custom fallback if provided
  if (fallback) {
    return <>{fallback}</>
  }

  // Render children if NIN verification is complete
  return <>{children}</>
}
