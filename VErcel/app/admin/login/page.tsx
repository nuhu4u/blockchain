"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, ArrowLeft } from "lucide-react"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import Link from "next/link"

export default function AdminLoginPage() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()
  const { login, isAuthenticated, isLoading } = useAdminAuth()

  // No automatic redirects - let the login process handle redirects
  // This prevents conflicts with the login flow

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields")
      return
    }

    if (isLoggingIn) {
      return // Prevent multiple login attempts
    }

    setIsLoggingIn(true)
    try {
      const result = await login({
        email: loginData.email,
        password: loginData.password
      });

      if (result.success) {
        // Use Next.js router for proper client-side navigation
        router.push('/admin');
      } else {
        setError("Login failed. Please check your credentials.")
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          className="mb-6 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Admin Login Card */}
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <Link href="/" className="inline-block">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 hover:bg-blue-700 transition-colors cursor-pointer">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </Link>
            <CardTitle className="text-2xl font-bold text-white">
              Admin Access
            </CardTitle>
            <CardDescription className="text-slate-300">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {error && (
                <Alert className="border-red-500 bg-red-500/10">
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={isLoading || isLoggingIn}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
              >
                {isLoading || isLoggingIn ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Admin Panel</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Admin Sign-Up Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Or</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => router.push('/admin/register')}
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-500"
              >
                <Shield className="w-4 h-4 mr-2" />
                Create Admin Account
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-400">
                Need help? Contact system administrator
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            🔒 Secure admin access • All activities are logged and monitored
          </p>
        </div>
      </div>
    </div>
  )
}
