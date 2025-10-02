"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, X } from "lucide-react"
import { AuthService } from "@/lib/services/authService"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"

export default function VerifyNINPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useSimpleAuth()
  const [nin, setNin] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "error">("idle")
  const [voterDetails, setVoterDetails] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, isLoading, router])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      }
  }

  const handleNinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError("")

    try {
      if (!user) {
        setError("User not authenticated")
        setVerificationStatus("error")
        return
      }

      const res = await AuthService.submitNIN({ nin }, 'cookie-based')
      
      // Check if verification was successful immediately
      if (res.success && res.status === 'verified' && res.data) {
        setVoterDetails(res.data)
        setVerificationStatus("success")
      } else {
        setError("NIN verification failed. Please try again.");
        setVerificationStatus("error")
      }
    } catch (err: any) {
      setError(err.message || "NIN verification failed")
      setVerificationStatus("error")
    } finally {
      setIsVerifying(false)
    }
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading authentication...</p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="relative">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              Verify Your NIN
            </CardTitle>
            <p className="text-center text-slate-600 mt-2">
              Enter your 11-digit National Identification Number to complete your voter registration
            </p>
            
            {/* Logout Button */}
            <Button
              variant="outline"
              onClick={() => {
                router.push('/')
              }}
              className="absolute top-4 right-4"
            >
              <X className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            {verificationStatus === "idle" && (
              <form onSubmit={handleNinSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nin" className="text-sm font-medium text-slate-700">
                    National Identification Number (NIN) *
                  </Label>
                  <Input
                    id="nin"
                    type="text"
                    placeholder="Enter your 11-digit NIN"
                    value={nin}
                    onChange={(e) => setNin(e.target.value)}
                    maxLength={11}
                    pattern="[0-9]{11}"
                    required
                    className="text-center text-lg font-mono tracking-wider"
                  />
                  <p className="text-xs text-slate-500">
                    Your NIN is an 11-digit number issued by NIMC
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isVerifying || nin.length !== 11}
                  className="w-full"
                >
                  {isVerifying ? "Verifying..." : "Verify NIN"}
                </Button>

                <div className="text-center text-sm text-slate-600">
                  <p>By verifying your NIN, you confirm that:</p>
                  <ul className="mt-2 space-y-1 text-left">
                    <li>• This NIN belongs to you</li>
                    <li>• You are eligible to vote in Nigerian elections</li>
                    <li>• You agree to the terms of voter registration</li>
                  </ul>
                </div>
              </form>
            )}

            {verificationStatus === "success" && voterDetails && (
              <div className="space-y-6">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Verification Successful!</strong> Your NIN has been verified and your voter profile is now
                    active.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                      ✓ Verified Voter
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <Card className="bg-slate-50">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-sm text-slate-600">Voter ID</Label>
                            <p className="font-mono text-lg font-semibold text-slate-900">
                              {voterDetails.user_unique_id || 'Not available'}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => copyToClipboard(voterDetails.user_unique_id || '')}
                            disabled={!voterDetails.user_unique_id}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <Label className="text-sm text-slate-600">Blockchain Address</Label>
                            <p className="font-mono text-sm font-semibold text-slate-900 truncate">
                              {voterDetails.wallet_address || 'Not available'}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(voterDetails.wallet_address || '')}
                            disabled={!voterDetails.wallet_address}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center space-y-4">
                    <p className="text-sm text-slate-600">
                      Your voter profile is now complete. You can access the dashboard to participate in elections.
                    </p>
                    
                    <div className="flex gap-3 justify-center">
                      <Button
                        onClick={() => router.push('/dashboard')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Go to Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="space-y-6">
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    <strong>Verification Failed</strong> {error}
                  </AlertDescription>
                </Alert>

                <div className="text-center space-y-4">
                  <p className="text-sm text-slate-600">
                    Please check your NIN and try again. Make sure it's exactly 11 digits.
                  </p>
                  
                  <Button
                    onClick={() => {
                      setVerificationStatus("idle")
                      setError("")
                    }}
                    className="w-full"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
