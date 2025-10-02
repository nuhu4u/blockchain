"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Shield, Calendar, Phone, MapPin, Edit, Save, X, CheckCircle, Camera, Trash2, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { AuthService, UpdateProfileRequest } from "@/lib/services/authService"
import { useSimpleAuth } from "@/hooks/useSimpleAuth"
import { BiometricStatusComponent } from "@/components/biometric/BiometricStatus"
import { SimpleNINProtectedRoute } from "@/components/SimpleNINProtectedRoute"

export default function ProfilePage() {
  const router = useRouter()
  const { user: authUser, isAuthenticated, isLoading: authLoading, ready } = useSimpleAuth()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState<UpdateProfileRequest>({
    email: '',
    phone_number: '',
    password: ''
  })

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [hasCustomPicture, setHasCustomPicture] = useState(false)
  const [uploadingPicture, setUploadingPicture] = useState(false)
  const [deletingPicture, setDeletingPicture] = useState(false)
  
     // NIN display state
   const [showNIN, setShowNIN] = useState(false)
   const [decryptedNIN, setDecryptedNIN] = useState<string | null>(null)
   const [partialNIN, setPartialNIN] = useState<string>('••••••••••••')
   const [loadingPartialNIN, setLoadingPartialNIN] = useState(false)

   // Function to format NIN with partial masking (e.g., 646xxxxxx65)
   const formatPartialNIN = (aesEncrypted: string | null) => {
     if (!aesEncrypted) return '••••••••••••'
     
     // For now, show a placeholder partial format
     // In a real implementation, you might want to store a partial hash in the database
     return '••••••••••••'
   }

     // Function to load partial NIN when user first visits profile
  const loadPartialNIN = async () => {
    if (!showNIN && user?.nin_verified) {
      // Try to decrypt AES encrypted NIN for partial display
      if (user.aes_encrypted && user.nin_iv) {
        try {
          setLoadingPartialNIN(true)
          // Using frontend API route which handles authentication automatically
          
          const response = await fetch('/api/profile/decrypt-nin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              aes_encrypted: user.aes_encrypted,
              nin_iv: user.nin_iv
            })
          })
          
          if (response.ok) {
            const result = await response.json()
            if (result.success && result.decryptedNIN && result.decryptedNIN.length === 11) {
              const nin = result.decryptedNIN
              const partial = `${nin.substring(0, 3)}xxxxxx${nin.substring(nin.length - 2)}`
              setPartialNIN(partial)
              return
            }
          }
        } catch (error) {
          // Fallback to generic mask
        } finally {
          setLoadingPartialNIN(false)
        }
      }
      
      // For all cases (AES decryption failed, hashed_nin, or other), show generic mask
      setPartialNIN('•••••••••••')
    }
  }

  // Load user data on component mount
  useEffect(() => {
    // Wait for auth to finish loading and be ready
    if (authLoading || !ready) return

    // Check if user is authenticated
    if (!isAuthenticated || !authUser) {
      router.push('/login')
      return
    }

    // Force refresh user data by calling the API directly
    const refreshUserData = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            console.log('=== REFRESHED USER DATA ===');
            console.log('Profile fields:', {
              date_of_birth: result.data.date_of_birth,
              gender: result.data.gender,
              address: result.data.address,
              user_unique_id: result.data.user_unique_id,
              wallet_address: result.data.wallet_address,
              contract_address: result.data.contract_address
            });
            setUser(result.data);
          }
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
        // Fallback to auth hook data
        setUser(authUser);
      }
    };

    // Refresh user data
    refreshUserData();

    setFormData({
      email: authUser.email || '',
      phone_number: authUser.phone_number || '',
      password: '' // Password is never pre-filled for security
    })
    
    // Load partial NIN immediately when profile loads for all verified users
    if (authUser.nin_verified) {
      loadPartialNIN()
    }
    
    setIsLoading(false)
  }, [authUser, isAuthenticated, authLoading, ready, router])

  const handleInputChange = (field: keyof UpdateProfileRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleShowNIN = async () => {
    console.log('=== NIN DISPLAY DEBUG ===');
    console.log('User data:', {
      nin_verified: user.nin_verified,
      encrypted_nin: !!user.encrypted_nin,
      hashed_nin: !!user.hashed_nin,
      aes_encrypted: !!user.aes_encrypted,
      nin_iv: !!user.nin_iv
    });

    // If user has AES encrypted NIN, try to decrypt it
    if (user.aes_encrypted && user.nin_iv) {
      console.log('Attempting to decrypt AES encrypted NIN...');
      try {
        // Using frontend API route which handles authentication automatically
        const response = await fetch('/api/profile/decrypt-nin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            aes_encrypted: user.aes_encrypted,
            nin_iv: user.nin_iv
          })
        });

        console.log('Decrypt response status:', response.status);
        if (response.ok) {
          const result = await response.json();
          console.log('Decrypt result:', result);
          if (result.success && result.decryptedNIN) {
            console.log('Successfully decrypted NIN:', result.decryptedNIN);
            setDecryptedNIN(result.decryptedNIN);
            setShowNIN(true);
          } else {
            console.log('Decryption failed, showing masked version');
            setDecryptedNIN('•••••••••••');
            setShowNIN(true);
          }
        } else {
          console.log('Response not OK, showing masked version');
          setDecryptedNIN('•••••••••••');
          setShowNIN(true);
        }
      } catch (error) {
        console.log('Decryption error:', error);
        setDecryptedNIN('•••••••••••');
        setShowNIN(true);
      }
    } 
    // For all other cases (hashed_nin, encrypted_nin without aes_encrypted, etc.)
    else {
      console.log('No AES encrypted NIN available, showing placeholder');
      // Show a placeholder NIN for demonstration (in real app, this would be masked)
      setDecryptedNIN('12345678901');
      setShowNIN(true);
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('Authentication token not found')
        return
      }

      const response = await AuthService.updateProfile(formData, token)
      
      if (response.success && response.data) {
        // Update local user data
        const updatedUser = response.data
        setUser(updatedUser)
        localStorage.setItem('user_data', JSON.stringify(updatedUser))
        
        setSuccess('Profile updated successfully!')
        setEditing(false)
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError('Failed to update profile. Please try again.')
      }
    } catch (error) {
      setError('An error occurred while updating your profile.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        email: user.email || '',
        phone_number: user.phone_number || '',
        password: '' // Password is never pre-filled for security
      })
    }
    setEditing(false)
    setError(null)
  }

  // Profile picture functions
  const getDefaultAvatar = (gender?: string) => {
    if (gender === 'MALE') return '/avatars/male-avatar.png'
    if (gender === 'FEMALE') return '/avatars/female-avatar.png'
    return '/avatars/male-avatar.png' // Default fallback
  }

  const handlePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    try {
      setUploadingPicture(true)
      setError(null)

      const formData = new FormData()
      formData.append('profilePicture', file)

      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('Authentication token not found')
        return
      }

      const response = await fetch('/api/profile/upload-picture', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setProfilePicture(result.data.profile_picture)
        setHasCustomPicture(true)
        setSuccess('Profile picture uploaded successfully!')
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(result.message || 'Failed to upload profile picture')
      }
    } catch (error) {
      setError('Failed to upload profile picture')
    } finally {
      setUploadingPicture(false)
    }
  }

  const handleDeletePicture = async () => {
    try {
      setDeletingPicture(true)
      setError(null)

      const token = localStorage.getItem('auth_token')
      if (!token) {
        setError('Authentication token not found')
        return
      }

      const response = await fetch('/api/profile/delete-picture', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await response.json()

      if (result.success) {
        setProfilePicture(null)
        setHasCustomPicture(false)
        setSuccess('Profile picture deleted successfully!')
        setTimeout(() => setSuccess(null), 3000)
      } else {
        setError(result.message || 'Failed to delete profile picture')
      }
    } catch (error) {
      setError('Failed to delete profile picture')
    } finally {
      setDeletingPicture(false)
    }
  }

  // Show loading while auth is loading or profile is loading
  if (authLoading || !ready || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <div className="text-lg text-gray-700 mt-4">Loading profile...</div>
      </div>
    )
  }

  // Show redirecting message if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-700">Redirecting to login...</div>
      </div>
    )
  }

  return (
    <SimpleNINProtectedRoute>
      <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <p className="text-sm text-slate-600">Manage your account information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                {user.nin_verified ? 'NIN Verified' : 'NIN Pending'}
              </Badge>
              <Badge variant="outline">
                <User className="h-3 w-3 mr-1" />
                {user.role}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        {/* Profile Picture Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Profile Picture</CardTitle>
              <CardDescription>Upload a custom profile picture or use the default avatar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                {/* Current Profile Picture */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-200 bg-slate-100 flex items-center justify-center">
                    {profilePicture ? (
                      <>
                        <img 
                          src={profilePicture.startsWith('/') ? profilePicture : `/uploads/${profilePicture.split('/').pop()}`}
                          alt="Profile Picture"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to default avatar if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'block';
                          }}
                        />
                        <img 
                          src={getDefaultAvatar(user.gender)}
                          alt="Default Avatar"
                          className="w-full h-full object-cover hidden"
                        />
                      </>
                    ) : (
                      <img 
                        src={getDefaultAvatar(user.gender)}
                        alt="Default Avatar"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {hasCustomPicture && (
                    <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs">
                      Custom
                    </Badge>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex-1 space-y-3">
                  <div className="flex space-x-3">
                    <div className="relative">
                      <input
                        type="file"
                        id="profile-picture-upload"
                        accept="image/*"
                        onChange={handlePictureUpload}
                        className="hidden"
                        disabled={uploadingPicture}
                      />
                      <Button
                        onClick={() => document.getElementById('profile-picture-upload')?.click()}
                        disabled={uploadingPicture}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {uploadingPicture ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Picture
                          </>
                        )}
                      </Button>
                    </div>

                    {hasCustomPicture && (
                      <Button
                        onClick={handleDeletePicture}
                        disabled={deletingPicture}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        {deletingPicture ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove Picture
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  
                  <div className="text-sm text-slate-600">
                    <p>• Supported formats: JPG, PNG, GIF</p>
                    <p>• Maximum file size: 5MB</p>
                    <p>• Your picture will replace the default avatar</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biometric Status - Full Width */}
        <div className="mb-8">
          <BiometricStatusComponent 
            showMobileCTA={true}
            onStatusChange={(status) => {
              }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </div>
                  {!editing ? (
                    <Button onClick={() => setEditing(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} disabled={loading} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                      {user.first_name || 'Not provided'}
                    </p>
                    <p className="text-xs text-slate-500">First name cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                      {user.last_name || 'Not provided'}
                    </p>
                    <p className="text-xs text-slate-500">Last name cannot be changed</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {editing ? (
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      type="email"
                    />
                  ) : (
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                      {user.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  {editing ? (
                    <Input
                      id="phone_number"
                      value={formData.phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                  ) : (
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                      {user.phone_number || 'Not provided'}
                    </p>
                  )}
                </div>

                {/* Password Change */}
                {editing && (
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter new password (leave blank to keep current)"
                      type="password"
                    />
                    <p className="text-xs text-slate-500">
                      Leave blank if you don't want to change your password
                    </p>
                  </div>
                )}

                {/* NIN Information */}
                <div className="space-y-2">
                  <Label htmlFor="nin">National Identification Number (NIN)</Label>
                  <div className="p-2 bg-slate-50 rounded border">
                    {user.nin_verified ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span 
                            className="text-sm text-slate-700 font-mono cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => {
                              if (showNIN && decryptedNIN) {
                                console.log('Full NIN:', decryptedNIN);
                                alert(`Your NIN: ${decryptedNIN}`);
                              } else {
                                handleShowNIN();
                              }
                            }}
                            title="Click to view full NIN"
                          >
                            {showNIN 
                              ? (decryptedNIN || '•••••••••••')
                              : loadingPartialNIN 
                                ? 'Loading...' 
                                : partialNIN
                            }
                          </span>
                          <Badge variant={user.nin_verified ? "default" : "secondary"}>
                            {user.nin_verified ? 'VERIFIED' : 'PENDING'}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500">
                          {user.nin_verified ? '✓ NIN verified and secure' : '⏳ NIN submitted, verification pending'}
                        </div>
                        <div className="flex items-center space-x-2">
                          {!showNIN ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleShowNIN}
                              className="text-xs"
                            >
                              Show Full NIN
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowNIN(false)}
                              className="text-xs"
                            >
                              Hide Full NIN
                            </Button>
                          )}
                          <span className="text-xs text-slate-500">
                            {!showNIN ? 'Click to reveal full NIN' : 'Full NIN is now visible - click NIN to copy'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">Not provided</span>
                          <Badge variant="outline">NOT SET</Badge>
                        </div>
                        <div className="text-xs text-slate-500">
                          NIN verification is required to access the dashboard
                        </div>
                        <div className="text-xs text-amber-600 font-medium">
                          ⚠️ You will be redirected to NIN verification
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {user.encrypted_nin 
                      ? 'NIN is encrypted and secure. Click on the NIN to view it. Cannot be changed once verified.'
                      : 'NIN verification is mandatory for secure voting and dashboard access.'
                    }
                  </p>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                      {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'Not provided'}
                    </p>
                    <p className="text-xs text-slate-500">Date of birth cannot be changed</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                      {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not provided'}
                    </p>
                    <p className="text-xs text-slate-500">Gender cannot be changed</p>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border">
                    {user.address || 'Not provided'}
                  </p>
                  <p className="text-xs text-slate-500">Address cannot be changed</p>
                </div>

                {/* Voter ID and Contract Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="voter_id">Voter ID</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border font-mono">
                      {user.user_unique_id || 'Not assigned'}
                    </p>
                    <p className="text-xs text-slate-500">Unique voter identifier</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contract_address">User Contract Address</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border font-mono break-all">
                      {user.wallet_address || 'Not assigned'}
                    </p>
                    <p className="text-xs text-slate-500">Blockchain wallet address</p>
                  </div>
                </div>

                {/* Additional Contract Address */}
                {user.contract_address && (
                  <div className="space-y-2">
                    <Label htmlFor="additional_contract">Additional Contract Address</Label>
                    <p className="text-sm text-slate-700 p-2 bg-slate-50 rounded border font-mono break-all">
                      {user.contract_address}
                    </p>
                    <p className="text-xs text-slate-500">Secondary contract address</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Account Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Account Status</span>
                  <Badge variant={user.is_active ? "default" : "secondary"}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Registration</span>
                  <Badge variant={user.registration_completed ? "default" : "secondary"}>
                    {user.registration_completed ? 'Complete' : 'Incomplete'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">NIN Verification</span>
                  <Badge variant={user.nin_verified ? "default" : "secondary"}>
                    {user.nin_verified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Calendar className="h-4 w-4" />
                  <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <User className="h-4 w-4" />
                  <span>Role: {user.role}</span>
                </div>
                {user.updated_at && (
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4" />
                    <span>Last updated: {new Date(user.updated_at).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/dashboard">
                    <User className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Link>
                </Button>
                {!user.nin_verified && (
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/verify-nin">
                      <Shield className="h-4 w-4 mr-2" />
                      Verify NIN
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </SimpleNINProtectedRoute>
  )
}
