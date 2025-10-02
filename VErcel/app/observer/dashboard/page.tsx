"use client"

import { useEffect, useState } from "react";
import { useObserverAuth } from "@/hooks/useObserverAuth";
import { useRouter } from "next/navigation";
import { useObserverTokenExpiration } from "@/hooks/useObserverTokenExpiration";
import { TokenExpirationWarning } from "@/components/TokenExpirationWarning";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Shield, LogOut, Clock, Building, Globe, Phone, Mail, User, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

// Base user type
interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
}

// Observer user type with additional properties
interface ObserverUser extends User {
  organization_name?: string;
  organizationName?: string;
  status?: string;
  contact_person?: string;
  position?: string;
  website?: string;
  phone?: string;
  country_code?: string;
  address?: string;
  state?: string;
  lga?: string;
  ward?: string;
  polling_unit?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  last_login?: string;
}

export default function ObserverDashboard() {
  const { isAuthenticated, user, refreshUser } = useObserverAuth();
  const router = useRouter();
  
  // Token expiration handling
  const {
    showExpirationWarning,
    timeUntilExpiration,
    dismissWarning,
    extendSession,
    handleApiError
  } = useObserverTokenExpiration();
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("all");
  const [selectedElection, setSelectedElection] = useState("all");
  const [elections, setElections] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [statusRefreshed, setStatusRefreshed] = useState(false);

  // Redirect if not authenticated or not observer
  useEffect(() => {
    const checkAuth = () => {
      // First check if useAuth hook has data
      if (isAuthenticated && user && user.role === 'OBSERVER') {
        // Check approval status
        if (user.status !== 'approved') {
          // Don't redirect, just show limited functionality
        }
        
        setLoading(false);
        return;
      }
      
      // Fallback: check localStorage directly if useObserverAuth hasn't initialized
      const token = localStorage.getItem('observer_token');
      const userData = localStorage.getItem('observer_user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.role === 'OBSERVER') {
            // Check approval status
            if (parsedUser.status !== 'approved') {
              // Don't redirect, just show limited functionality
            }
            
            setLoading(false);
            return;
          }
        } catch (error) {
          }
      }
      
      // If we get here, user is not authenticated or not an observer
      if (!isAuthenticated) {
        router.push('/observer/login');
        return;
      }
      
      if (user && user.role !== 'OBSERVER') {
        router.push('/dashboard');
        return;
      }
    };
    
    // Check immediately, but also after a short delay to catch tokens that are being stored
    checkAuth();
    const timeoutId = setTimeout(checkAuth, 200);
    
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, user, router]);

  // Refresh observer status when component mounts (only once)
  useEffect(() => {
    if (isAuthenticated && user && user.role === 'OBSERVER' && !statusRefreshed) {
      refreshObserverStatus();
      setStatusRefreshed(true);
    }
  }, [isAuthenticated, user?.id, statusRefreshed]); // Only depend on user ID, not the entire user object

  // Refresh observer status from backend
  const refreshObserverStatus = async () => {
    try {
      await refreshUser();
      } catch (error) {
      }
  };

  // Load election data
  const loadElectionData = async () => {
    try {
      setDataLoading(true);
      
      // Get token from useObserverAuth hook or fallback to localStorage
      let token = null;
      if (user && isAuthenticated) {
        // Try to get token from AuthStorage first
        const { AuthStorage } = await import('@/lib/utils/authStorage');
        token = AuthStorage.getToken('observer');
      }
      
      // Fallback to direct localStorage access
      if (!token) {
        token = localStorage.getItem('observer_token');
      }
      
      if (!token) {
        return;
      }
      
      const response = await fetch('/api/observer/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setElections(result.data.elections || []);
          setStatistics(result.data.statistics || {});
          }
      } else {
        }
    } catch (error) {
      } finally {
      setDataLoading(false);
    }
  };

  // Load data when component mounts and user is authenticated and approved
  useEffect(() => {
    if (isAuthenticated && user && user.role === 'OBSERVER' && user.status === 'approved') {
      loadElectionData();
    }
  }, [isAuthenticated, user]);

  // Filter elections based on selection
  const filteredElections = elections.filter(election => {
    if (selectedElection === 'all') return true;
    return election._id === selectedElection || election._id?.toString() === selectedElection;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading observer dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Check if user data exists - try to get from localStorage if useObserverAuth doesn't have it
  let currentUser = user;
  if (!currentUser) {
    // Fallback: check localStorage directly
    const token = localStorage.getItem('observer_token');
    const userData = localStorage.getItem('observer_user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role === 'OBSERVER') {
          // Use localStorage data temporarily
          currentUser = parsedUser;
        } else {
          return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600">Access denied. This dashboard is for observers only.</p>
                <Button onClick={() => router.push('/dashboard')} className="mt-4">
                  Go to Main Dashboard
                </Button>
              </div>
            </div>
          );
        }
      } catch (error) {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600">User data not available</p>
              <Button onClick={() => router.push('/observer/login')} className="mt-4">
                Back to Login
              </Button>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">User data not available</p>
            <Button onClick={() => router.push('/observer/login')} className="mt-4">
              Back to Login
            </Button>
          </div>
        </div>
      );
    }
  }
  
  // Final check to ensure we have a valid user
  if (!currentUser || currentUser.role !== 'OBSERVER') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Access denied. This dashboard is for observers only.</p>
          <Button onClick={() => router.push('/dashboard')} className="mt-4">
            Go to Main Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  // At this point, currentUser is guaranteed to exist and be an observer
  const observerUser = currentUser as any;

  // Add safety check for user data
  if (!user || typeof user !== 'object') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Invalid user data</p>
          <Button onClick={() => router.push('/observer/login')} className="mt-4">
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Token Expiration Warning */}
      <TokenExpirationWarning
        show={showExpirationWarning}
        timeUntilExpiration={timeUntilExpiration}
        onDismiss={dismissWarning}
        onExtendSession={extendSession}
        userType="observer"
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Observer Dashboard</h1>
                <p className="text-sm text-slate-600">
                  {observerUser.organization_name || observerUser.organizationName || 'Organization Name Not Set'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge 
                variant={(observerUser.status === 'approved' || observerUser.isApproved) ? 'default' : 'secondary'} 
                className={(observerUser.status === 'approved' || observerUser.isApproved) ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
              >
                <Shield className="h-3 w-3 mr-1" />
                {(observerUser.status === 'approved' || observerUser.isApproved) ? 'Approved Observer' : (observerUser.status || 'Pending Approval')}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={async () => {
                  await refreshObserverStatus();
                  // Only load election data if observer is approved
                  if (user?.status === 'approved') {
                    await loadElectionData();
                  }
                }}
                disabled={dataLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${dataLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/observer/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  router.push('/observer/login');
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Alert */}
        {!(observerUser.status === 'approved' || observerUser.isApproved) && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Account Status: {observerUser.status || 'Pending'}</strong> - Your observer account is currently under review. 
                  You can view your profile and basic information, but advanced functionality will be available once your account is approved.
                  {observerUser.status === 'rejected' && observerUser.rejection_reason && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded">
                      <strong>Rejection Reason:</strong> {observerUser.rejection_reason}
                    </div>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={refreshObserverStatus}
                  className="ml-4"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check Status
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Approved Status Alert */}
        {(observerUser.status === 'approved' || observerUser.isApproved) && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Account Approved!</strong> Your observer account has been approved. You now have full access to all observer functionality including live election monitoring, real-time results, and comprehensive reporting.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Observer Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Observer Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">Observer ID</p>
                  <p className="font-mono text-sm font-semibold">{observerUser.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Organization</p>
                  <p className="text-sm font-semibold">{observerUser.organization_name || observerUser.organizationName || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <Badge 
                    variant={(observerUser.status === 'approved' || observerUser.isApproved) ? 'default' : 'secondary'}
                    className={(observerUser.status === 'approved' || observerUser.isApproved) ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {(observerUser.status === 'approved' || observerUser.isApproved) ? 'Approved' : (observerUser.status || 'Pending')}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Registration Date</p>
                  <p className="text-sm font-semibold">
                    {observerUser.created_at ? new Date(observerUser.created_at).toLocaleDateString() : 'Not Available'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm" asChild>
                  <Link href="/observer/profile">
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm" 
                  disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Download Reports
                  {!(observerUser.status === 'approved' || observerUser.isApproved) && (
                    <Badge variant="secondary" className="ml-auto text-xs">Requires Approval</Badge>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm" 
                  disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Export Data
                  {!(observerUser.status === 'approved' || observerUser.isApproved) && (
                    <Badge variant="secondary" className="ml-auto text-xs">Requires Approval</Badge>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-transparent" 
                  size="sm" 
                  disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  View Credentials
                  {!(observerUser.status === 'approved' || observerUser.isApproved) && (
                    <Badge variant="secondary" className="ml-auto text-xs">Requires Approval</Badge>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Information Notice */}
            {!(observerUser.status === 'approved' || observerUser.isApproved) ? (
              <Card className="mt-4 border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-900 mb-2">Limited Access</h3>
                    <p className="text-sm text-blue-800">
                      Your observer account currently has limited functionality. 
                      Full access will be granted once your account is approved.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="mt-4 border-green-200 bg-green-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-900 mb-2">Full Access Granted</h3>
                    <p className="text-sm text-green-800">
                      Your observer account has been approved. You now have access to all observer functionality including live election monitoring and comprehensive reporting.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Filter Elections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">State/Scope</label>
                    <Select 
                      value={selectedState} 
                      onValueChange={setSelectedState} 
                      disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All States</SelectItem>
                        <SelectItem value="national">National</SelectItem>
                        <SelectItem value="lagos">Lagos State</SelectItem>
                        <SelectItem value="kano">Kano State</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Election</label>
                    <Select 
                      value={selectedElection} 
                      onValueChange={setSelectedElection} 
                      disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select election" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Elections</SelectItem>
                        {elections.map((election, index) => (
                          <SelectItem key={election._id || index} value={election._id || index.toString()}>
                            {election.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {!(observerUser.status === 'approved' || observerUser.isApproved) && (
                  <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Feature Disabled:</strong> Election filtering is currently unavailable. 
                      This feature will be enabled once your account is approved.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="results" disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}>Live Results</TabsTrigger>
                <TabsTrigger value="turnout" disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}>Turnout Analysis</TabsTrigger>
                <TabsTrigger value="reports" disabled={!(observerUser.status === 'approved' || observerUser.isApproved)}>Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Election Data - Only show for approved observers */}
                {(observerUser.status === 'approved' || observerUser.isApproved) ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Active Elections</CardTitle>
                        <Eye className="h-4 w-4 text-purple-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                          {dataLoading ? '...' : (statistics?.activeElections || 0)}
                        </div>
                        <p className="text-xs text-slate-500">Currently monitoring</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Total Voters</CardTitle>
                        <Eye className="h-4 w-4 text-blue-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                          {dataLoading ? '...' : (statistics?.totalVoters || 0).toLocaleString()}
                        </div>
                        <p className="text-sm text-slate-500">Registered voters</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Average Turnout</CardTitle>
                        <Eye className="h-4 w-4 text-green-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                          {dataLoading ? '...' : `${statistics?.averageTurnout || 0}%`}
                        </div>
                        <p className="text-xs text-slate-500">Participation rate</p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Election Data Restricted</strong> - Election statistics and data are only available to approved observers. 
                      Please wait for your account to be approved to access this information.
                    </AlertDescription>
                  </Alert>
                )}

                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Observer Access:</strong> You currently have limited access to the observer dashboard. 
                    Once your account is approved, you'll have full access to election monitoring, real-time results, 
                    and comprehensive reporting capabilities.
                  </AlertDescription>
                </Alert>

                {/* Profile Information Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Organization Information
                    </CardTitle>
                    <CardDescription>
                      Your registered organization details and credentials
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">Basic Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-slate-600">Organization Name</p>
                            <p className="font-medium">{observerUser.organization_name || observerUser.organizationName || 'Not Set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Organization Type</p>
                            <p className="font-medium">{observerUser.organization_type || observerUser.organizationType || 'Not Set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Email Address</p>
                            <p className="font-medium flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-slate-500" />
                              {observerUser.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Phone Number</p>
                            <p className="font-medium flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-slate-500" />
                              {observerUser.country_code || ''} {observerUser.phone || 'Not Set'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">Location Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-slate-600">Address</p>
                            <p className="font-medium">{observerUser.address || 'Not Set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">State</p>
                            <p className="font-medium">{observerUser.state || 'Not Set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Local Government Area</p>
                            <p className="text-sm font-semibold">{observerUser.lga || 'Not Set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Ward</p>
                            <p className="font-medium">{observerUser.ward || 'Not Set'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Polling Unit</p>
                            <p className="font-medium">{observerUser.polling_unit || 'Not Set'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {observerUser.website && observerUser.website.trim() && (
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">Website</h3>
                        <p className="font-medium flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-slate-500" />
                          <a 
                            href={typeof observerUser.website === 'string' && observerUser.website.startsWith('http') ? observerUser.website : `https://${observerUser.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            {observerUser.website}
                          </a>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                {(observerUser.status === 'approved' || observerUser.isApproved) ? (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Live Election Results</h3>
                    {dataLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                        <p className="text-slate-600">Loading election data...</p>
                      </div>
                    ) : filteredElections.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredElections.map((election, index) => (
                          <Card key={election._id || index}>
                            <CardHeader>
                              <CardTitle>{election.title}</CardTitle>
                              <CardDescription>{election.election_type} • {election.status}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {/* Statistics */}
                                <div className="grid grid-cols-3 gap-2 text-center">
                                  <div className="bg-green-50 p-2 rounded">
                                    <p className="text-xs text-green-600">Votes Cast</p>
                                    <p className="font-semibold text-green-800">{election.votesCast || 0}</p>
                                  </div>
                                  <div className="bg-orange-50 p-2 rounded">
                                    <p className="text-xs text-orange-600">Non-Voters</p>
                                    <p className="font-semibold text-orange-800">{election.nonVoters || 0}</p>
                                  </div>
                                  <div className="bg-purple-50 p-2 rounded">
                                    <p className="text-xs text-purple-600">Turnout</p>
                                    <p className="font-semibold text-purple-800">{election.turnoutPercentage || 0}%</p>
                                  </div>
                                </div>
                                
                                {/* Candidates */}
                                {election.contestants && election.contestants.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-sm">Candidates</h4>
                                    {election.contestants.map((candidate: any, idx: number) => (
                                      <div key={idx} className="flex justify-between text-sm">
                                        <span className="truncate">{candidate.name}</span>
                                        <span className="font-semibold">{candidate.votes || 0} votes</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Eye className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-600">No elections available</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Feature Unavailable:</strong> Live election results are currently disabled. 
                      This feature will be available once your observer account is approved.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="turnout" className="space-y-6">
                {(observerUser.status === 'approved' || observerUser.isApproved) ? (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Turnout Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>National Average</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-blue-600">53.8%</div>
                          <p className="text-sm text-slate-600">Overall turnout rate</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Highest Turnout</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-green-600">78.2%</div>
                          <p className="text-sm text-slate-600">Lagos State</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Lowest Turnout</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-red-600">32.1%</div>
                          <p className="text-sm text-slate-600">Kano State</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Feature Unavailable:</strong> Turnout analysis is currently disabled. 
                      This feature will be available once your observer account is approved.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                {(observerUser.status === 'approved' || observerUser.isApproved) ? (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Observer Reports</h3>
                    <div className="grid gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Generate Report</CardTitle>
                          <CardDescription>Create comprehensive election observation reports</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <Button className="w-full">
                              <Shield className="h-4 w-4 mr-2" />
                              Generate Election Report
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Shield className="h-4 w-4 mr-2" />
                              Download Previous Reports
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Feature Unavailable:</strong> Report generation is currently disabled. 
                      This feature will be available once your observer account is approved.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
