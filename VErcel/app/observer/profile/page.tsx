"use client"

import { useState, useEffect } from "react";
import { useObserverAuth } from "@/hooks/useObserverAuth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, ArrowLeft, Shield, Building, Globe, Phone, Mail, Save, Edit3 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ObserverProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser } = useObserverAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_type: "",
    website: "",
    phone: "",
    address: ""
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user && !isLoading) {
        setFormData({
        organization_name: user.organization_name || user.organizationName || "",
        organization_type: user.organization_type || user.organizationType || "",
        website: user.website || "",
        phone: user.phone || "",
        address: user.address || ""
      });
    }
  }, [user, isLoading]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
        router.push('/observer/login');
      }
  }, [isAuthenticated, isLoading, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch('/api/observer/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('observer_token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        // Update local user data
        const updatedUser = { ...user, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser({...updatedUser, id: updatedUser.id || user?.id || '', email: updatedUser.email || user?.email || '', role: 'OBSERVER'});
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">User data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {(user.status === 'approved' || user.isApproved) ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/observer/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              ) : (
                <Button variant="ghost" size="sm" disabled>
                  <Shield className="h-4 w-4 mr-2" />
                  Dashboard (Requires Approval)
                </Button>
              )}
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Observer Profile</h1>
                <p className="text-sm text-slate-600">Manage your organization information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge 
                variant={(user.status === 'approved' || user.isApproved) ? 'default' : 'secondary'} 
                className={(user.status === 'approved' || user.isApproved) ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
              >
                <Shield className="h-3 w-3 mr-1" />
                {(user.status === 'approved' || user.isApproved) ? 'Approved Observer' : 'Pending Approval'}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  router.push('/observer/login');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Status Alert */}
        {!(user.status === 'approved' || user.isApproved) && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <Shield className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Account Status: Pending</strong> - Your observer account is currently under review. 
              You can view and edit your profile information, but full functionality will be available once approved.
            </AlertDescription>
          </Alert>
        )}

        {/* Success/Error Messages */}
        {message && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <Shield className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2" />
                      Organization Information
                    </CardTitle>
                    <CardDescription>
                      {isEditing ? 'Edit your organization details' : 'Your registered organization information'}
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organization_name">Organization Name</Label>
                    {isEditing ? (
                      <Input
                        id="organization_name"
                        value={formData.organization_name}
                        onChange={(e) => handleInputChange("organization_name", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{user.organization_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="organization_type">Organization Type</Label>
                    {isEditing ? (
                      <Input
                        id="organization_type"
                        value={formData.organization_type}
                        onChange={(e) => handleInputChange("organization_type", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="font-medium mt-1">{user.organization_type}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  {isEditing ? (
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="mt-1"
                      placeholder="https://example.com"
                    />
                  ) : (
                    <p className="font-medium mt-1 flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-slate-500" />
                      {user.website || "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium mt-1 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-slate-500" />
                      {user.country_code} {user.phone}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium mt-1">{user.address}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button 
                      onClick={handleSave} 
                      disabled={saving}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {saving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form data to original values
                        setFormData({
                          organization_name: user.organization_name || "",
                          organization_type: user.organization_type || "",
                          website: user.website || "",
                          phone: user.phone || "",
                          address: user.address || ""
                        });
                        setMessage("");
                        setError("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Read-only Information */}
          <div className="lg:col-span-1">
            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                    (user.status === 'approved' || user.isApproved) ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Shield className={`h-8 w-8 ${
                      (user.status === 'approved' || user.isApproved) ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <Badge 
                    variant={(user.status === 'approved' || user.isApproved) ? 'default' : 'secondary'}
                    className={(user.status === 'approved' || user.isApproved) ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  >
                    {(user.status === 'approved' || user.isApproved) ? 'Approved' : 'Pending Approval'}
                  </Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-600">Observer ID</p>
                    <p className="font-mono font-semibold">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">Email Address</p>
                    <p className="font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-slate-500" />
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-600">Registration Date</p>
                    <p className="font-medium">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {user.last_login && (
                    <div>
                      <p className="text-slate-600">Last Login</p>
                      <p className="font-medium">
                        {new Date(user.last_login).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Location Information (Read-only) */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Location Details</CardTitle>
                <CardDescription>Geographic coverage area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600">State</p>
                  <p className="font-medium">{user.state}</p>
                </div>
                <div>
                  <p className="text-slate-600">Local Government Area</p>
                  <p className="font-medium">{user.lga}</p>
                </div>
                <div>
                  <p className="text-slate-600">Ward</p>
                  <p className="font-medium">{user.ward}</p>
                </div>
                <div>
                  <p className="text-slate-600">Polling Unit</p>
                  <p className="font-medium">{user.polling_unit}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
