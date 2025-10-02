"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, ArrowLeft, CheckCircle, AlertTriangle, EyeIcon, EyeOff, Loader2, Check, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ObserverRegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactPerson: "",
    position: "",
    email: "",
    countryCode: "+234",
    phone: "",
    address: "",
    website: "",
    description: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [duplicateErrors, setDuplicateErrors] = useState<Record<string, string>>({})
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingField, setIsCheckingField] = useState<string | null>(null)
  const [validFields, setValidFields] = useState<Record<string, boolean>>({})
  const [showProcessingModal, setShowProcessingModal] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [debounceTimers, setDebounceTimers] = useState<Record<string, NodeJS.Timeout>>({})
  const router = useRouter()

  // Handle blur events for duplicate checking
  const handleFieldBlur = async (field: string, value: string) => {
    if (!value.trim()) {
      // Clear any existing duplicate errors when field is empty
      setDuplicateErrors(prev => ({ ...prev, [field]: "" }))
      setValidFields(prev => ({ ...prev, [field]: false }))
      return
    }
    
    // Check for duplicates when user leaves the field
    if (field === 'organizationName' && value.trim().length >= 3) {
      await checkFieldDuplicate('organizationName', value.trim())
    }
    
    if (field === 'email' && validateEmail(value)) {
      await checkFieldDuplicate('email', value.trim())
    }
    
    if (field === 'phone' && validatePhone(value, formData.countryCode)) {
      await checkFieldDuplicate('phone', value.replace(/\D/g, ''))
    }
    
    if (field === 'website' && validateWebsite(value)) {
      await checkFieldDuplicate('website', value.trim())
    }
  }

  // Countdown effect for processing modal
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (showProcessingModal && countdown > 0) {
      // Start the countdown immediately
      const startCountdown = () => {
        interval = setInterval(() => {
          setCountdown(prev => {
            const newCount = prev - 1
            
            // When countdown reaches 2, show success message
            if (newCount === 2) {
              setErrors(prev => ({ ...prev, submit: 'Registration successful! Redirecting to login...' }))
            }
            
            // When countdown reaches 0, redirect
            if (newCount === 0) {
              setShowProcessingModal(false)
              setCountdown(3)
              // Redirect to observer login page with fallback
              setTimeout(() => {
                try {
                  router.push('/observer/login?registered=true')
                } catch (error) {
                  window.location.href = '/observer/login?registered=true'
                }
              }, 100)
              return 0
            }
            
            return newCount
          })
        }, 1000)
      }
      
      // Start countdown immediately
      startCountdown()
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [showProcessingModal, countdown, router])

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers).forEach(timer => {
        if (timer) clearTimeout(timer)
      })
    }
  }, [debounceTimers])

  // Country codes for Nigeria and common international codes
  const countryCodes = [
    { code: "+234", country: "Nigeria" },
    { code: "+1", country: "USA/Canada" },
    { code: "+44", country: "UK" },
    { code: "+33", country: "France" },
    { code: "+49", country: "Germany" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+91", country: "India" },
    { code: "+27", country: "South Africa" },
    { code: "+254", country: "Kenya" },
    { code: "+256", country: "Uganda" },
    { code: "+233", country: "Ghana" },
  ]

  const handleInputChange = async (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // Clear validation errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
    
    // Don't clear duplicate errors immediately - let the duplicate check handle it
    // This prevents flickering of error messages during typing

    // Real-time validation for specific fields
    if (field === 'email' && value.trim()) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }))
        setValidFields(prev => ({ ...prev, email: false }))
        return
      } else {
        setValidFields(prev => ({ ...prev, email: true }))
        // Check for duplicates when email is valid (debounced)
        debouncedDuplicateCheck('email', value.trim())
      }
    }
    
    if (field === 'phone' && value.trim()) {
      if (!validatePhone(value, formData.countryCode)) {
        if (formData.countryCode === "+234") {
          setErrors(prev => ({ ...prev, phone: "Phone number must be 10 digits (e.g., 8012345678)" }))
        } else {
          setErrors(prev => ({ ...prev, phone: "Phone number must be 10 digits" }))
        }
        setValidFields(prev => ({ ...prev, phone: false }))
        return
      } else {
        setValidFields(prev => ({ ...prev, phone: true }))
        // Check for duplicates when phone is valid (debounced)
        debouncedDuplicateCheck('phone', value.replace(/\D/g, ''))
      }
    }
    
    if (field === 'website' && value.trim()) {
      if (!validateWebsite(value)) {
        setErrors(prev => ({ ...prev, website: "Please enter a valid website URL or domain name" }))
        setValidFields(prev => ({ ...prev, website: false }))
        return
      } else {
        setValidFields(prev => ({ ...prev, website: true }))
        // Check for duplicates when website is valid (debounced)
        debouncedDuplicateCheck('website', value.trim())
      }
    }

    // Set valid fields for required fields when they have content
    if (field === 'organizationName' && value.trim().length >= 2) {
      setValidFields(prev => ({ ...prev, organizationName: true }))
      // Check for duplicates when organization name is long enough (debounced)
      if (value.trim().length >= 3) {
        debouncedDuplicateCheck('organizationName', value.trim())
      }
    }
    
    if (field === 'email' && value.trim() && validateEmail(value)) {
      setValidFields(prev => ({ ...prev, email: true }))
    }
    
    if (field === 'phone' && value.trim() && validatePhone(value, formData.countryCode)) {
      setValidFields(prev => ({ ...prev, phone: true }))
    }
    
    if (field === 'website' && value.trim() && validateWebsite(value)) {
      setValidFields(prev => ({ ...prev, website: true }))
    }

    // Handle country code change - revalidate phone if it exists
    if (field === 'countryCode' && formData.phone.trim()) {
      if (validatePhone(formData.phone, value)) {
        setValidFields(prev => ({ ...prev, phone: true }))
      } else {
        setValidFields(prev => ({ ...prev, phone: false }))
      }
    }

    // Set valid fields for required fields when they have content
    if (field === 'contactPerson' && value.trim().length >= 2) {
      setValidFields(prev => ({ ...prev, contactPerson: true }))
    }
    
    if (field === 'position' && value.trim().length >= 2) {
      setValidFields(prev => ({ ...prev, position: true }))
    }
    
    if (field === 'address' && value.trim().length >= 10) {
      setValidFields(prev => ({ ...prev, address: true }))
    }
    
    if (field === 'description' && value.trim().length >= 10) {
      setValidFields(prev => ({ ...prev, description: true }))
    }
    
    if (field === 'password' && value.length >= 8) {
      setValidFields(prev => ({ ...prev, password: true }))
    }
    
    if (field === 'confirmPassword' && value === formData.password && value.length >= 8) {
      setValidFields(prev => ({ ...prev, confirmPassword: true }))
    }
  }

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string, countryCode: string): boolean => {
    const phoneDigits = phone.replace(/\D/g, '')
    
    // Nigeria (+234): 10 digits (excluding country code)
    if (countryCode === "+234") {
      return phoneDigits.length === 10
    }
    
    // Other countries: 10 digits (excluding country code)
    return phoneDigits.length === 10
  }

  const validateWebsite = (website: string): boolean => {
    if (!website) return true // Website is optional
    // Accept both full URLs (https://example.com) and domain names (example.com)
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
    return urlRegex.test(website)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required field validation
    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required"
    }
    if (!formData.organizationType) {
      newErrors.organizationType = "Organization type is required"
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required"
    }
    if (!formData.position.trim()) {
      newErrors.position = "Position is required"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone, formData.countryCode)) {
      if (formData.countryCode === "+234") {
        newErrors.phone = "Phone number must be 10 digits (e.g., 8012345678)"
      } else {
        newErrors.phone = "Phone number must be 10 digits"
      }
    }

    // Website validation
    if (formData.website && !validateWebsite(formData.website)) {
      newErrors.website = "Please enter a valid website URL or domain name (e.g., example.com or https://example.com)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check for duplicates (used during submission)
  const checkDuplicates = async (): Promise<boolean> => {
    try {
      // Check organization name
      if (formData.organizationName.trim()) {
        // Skip if organization name is too short
        if (formData.organizationName.trim().length < 3) {
          return true
        }
        
        const orgResponse = await fetch('/api/observer/check-duplicate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type: 'organizationName', 
            value: formData.organizationName.trim() 
          })
        })
        
        if (orgResponse.ok) {
          const orgResult = await orgResponse.json()
          
          if (orgResult.exists) {
            setDuplicateErrors(prev => ({ ...prev, organizationName: "Organization name already exists" }))
            return false
          }
        } else {
          // If API check fails, don't block submission - assume no duplicates
        }
      }

      // Check email
      if (formData.email.trim()) {
        const emailResponse = await fetch('/api/observer/check-duplicate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type: 'email', 
            value: formData.email.trim() 
          })
        })
        
        if (emailResponse.ok) {
          const emailResult = await emailResponse.json()
          if (emailResult.exists) {
            setDuplicateErrors(prev => ({ ...prev, email: "Email address already exists" }))
            return false
          }
        }
      }

      // Check phone number
      if (formData.phone.trim()) {
        const phoneResponse = await fetch('/api/observer/check-duplicate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type: 'phone', 
            value: formData.phone.replace(/\D/g, '') // Send only the phone digits without country code
          })
        })
        
        if (phoneResponse.ok) {
          const phoneResult = await phoneResponse.json()
          if (phoneResult.exists) {
            setDuplicateErrors(prev => ({ ...prev, phone: "Phone number already exists" }))
            return false
          }
        }
      }

      // Check website (if provided)
      if (formData.website.trim()) {
        const websiteResponse = await fetch('/api/observer/check-duplicate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            type: 'website', 
            value: formData.website.trim() 
          })
        })
        
        if (websiteResponse.ok) {
          const websiteResult = await websiteResponse.json()
          if (websiteResult.exists) {
            setDuplicateErrors(prev => ({ ...prev, website: "Website already exists" }))
            return false
          }
        }
      }

      return true
    } catch (error) {
      return false
    }
  }

  // Debounced duplicate checking to prevent too many API calls
  const debouncedDuplicateCheck = (fieldType: string, value: string) => {
    // Clear existing timer for this field
    if (debounceTimers[fieldType]) {
      clearTimeout(debounceTimers[fieldType])
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      checkFieldDuplicate(fieldType, value)
    }, 500) // 500ms delay
    
    setDebounceTimers(prev => ({ ...prev, [fieldType]: timer }))
  }

  // Real-time field duplicate checking
  const checkFieldDuplicate = async (fieldType: string, value: string) => {
    if (!value.trim()) {
      return
    }
    
    setIsCheckingField(fieldType)
    
    try {
      // Add a timeout to prevent hanging requests
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const response = await fetch('/api/observer/check-duplicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: fieldType, value }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const result = await response.json()
        
        if (result.exists) {
          const fieldName = fieldType === 'organizationName' ? 'organizationName' : 
                           fieldType === 'email' ? 'email' : 
                           fieldType === 'phone' ? 'phone' : 'website'
          
          const errorMessage = fieldType === 'organizationName' ? "Organization name already exists" :
                              fieldType === 'email' ? "Email address already exists" :
                              fieldType === 'phone' ? "Phone number already exists" : "Website already exists"
          
          setDuplicateErrors(prev => ({ ...prev, [fieldName]: errorMessage }))
          setValidFields(prev => ({ ...prev, [fieldName]: false }))
        } else {
          // No duplicates found, field is valid
          const fieldName = fieldType === 'organizationName' ? 'organizationName' : 
                           fieldType === 'email' ? 'email' : 
                           fieldType === 'phone' ? 'phone' : 'website'
          setValidFields(prev => ({ ...prev, [fieldName]: true }))
          // Clear duplicate error when no duplicates found
          setDuplicateErrors(prev => ({ ...prev, [fieldName]: "" }))
        }
      } else {
        // If API check fails, don't set errors - assume no duplicates
        const fieldName = fieldType === 'organizationName' ? 'organizationName' : 
                         fieldType === 'email' ? 'email' : 
                         fieldType === 'phone' ? 'phone' : 'website'
        setDuplicateErrors(prev => ({ ...prev, [fieldName]: "" }))
        setValidFields(prev => ({ ...prev, [fieldName]: true }))
      }
    } catch (error) {
      // Handle abort case specifically
      if (error instanceof Error && error.name === 'AbortError') {
        // Don't change state on timeout - keep previous validation state
      } else {
        // Don't change state on network error - keep previous validation state
      }
      
      // Don't assume no duplicates on error - keep previous state
      // This prevents showing green checkmarks when there are network issues
    } finally {
      setIsCheckingField(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setShowProcessingModal(true)
    setCountdown(3) // Reset countdown to 3 when starting

    try {
      // Check for duplicates first
      const noDuplicates = await checkDuplicates()
      if (!noDuplicates) {
        setIsSubmitting(false)
        setShowProcessingModal(false)
        return
      }

      // Submit registration
      const response = await fetch('/api/observer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_name: formData.organizationName,
          organization_type: formData.organizationType,
          email: formData.email,
          country_code: formData.countryCode,
          phone: formData.phone.replace(/\D/g, ''), // Send only the phone digits without country code
          address: formData.address,
          website: formData.website,
          password: formData.confirmPassword // Send the confirmed password since we've already validated they match
        })
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          // Success! The countdown will handle the success message and redirect
          // Don't close the modal - let the countdown handle it
          setIsSubmitting(false) // Stop the loading state but keep modal open
        } else {
          setErrors(prev => ({ ...prev, submit: result.message || 'Registration failed' }))
          setShowProcessingModal(false)
          setIsSubmitting(false)
        }
      } else {
        const errorData = await response.json()
        setErrors(prev => ({ 
          ...prev, 
          submit: errorData.message || 'Registration failed. Please try again.' 
        }))
        setShowProcessingModal(false)
        setIsSubmitting(false)
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: 'Network error. Please check your connection.' }))
      setShowProcessingModal(false)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/observer/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Observer Login
            </Link>
          </Button>
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Observer Registration</h1>
              <p className="text-slate-600">Register your organization for election observation</p>
            </div>
          </div>
        </div>

        <Alert className="mb-8 border-purple-200 bg-purple-50">
          <AlertTriangle className="h-4 w-4 text-purple-600" />
          <AlertDescription className="text-purple-800">
            <strong>Observer Requirements:</strong> Only registered NGOs, civil society organizations, academic
            institutions, and international bodies are eligible to register for observer status. All registrations are
            subject to verification and approval.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>Details about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                   <div className="relative">
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                       onBlur={(e) => handleFieldBlur("organizationName", e.target.value)}
                    placeholder="Enter organization name"
                       className={`${errors.organizationName ? "border-red-500" : ""} ${isCheckingField === 'organizationName' ? "pr-10" : ""}`}
                       disabled={isSubmitting}
                    required
                  />
                     {isCheckingField === 'organizationName' && (
                       <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                     )}
                     {validFields.organizationName && !isCheckingField && (
                       <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                     )}
                   </div>
                   {errors.organizationName && (
                     <p className="text-sm text-red-600 mt-1">{errors.organizationName}</p>
                   )}
                   {duplicateErrors.organizationName && (
                     <p className="text-sm text-red-600 mt-1">{duplicateErrors.organizationName}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <div className="relative">
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => handleInputChange("organizationType", value)}
                      disabled={isSubmitting}
                  >
                      <SelectTrigger className={`${errors.organizationType ? "border-red-500" : ""} ${formData.organizationType ? "pr-10" : ""}`}>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngo">Non-Governmental Organization (NGO)</SelectItem>
                      <SelectItem value="cso">Civil Society Organization</SelectItem>
                      <SelectItem value="academic">Academic Institution</SelectItem>
                      <SelectItem value="international">International Organization</SelectItem>
                      <SelectItem value="media">Media Organization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                    {formData.organizationType && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                   {errors.organizationType && (
                     <p className="text-sm text-red-600 mt-1">{errors.organizationType}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                       onBlur={(e) => handleFieldBlur("website", e.target.value)}
                    placeholder="https://www.example.org"
                       className={`${errors.website ? "border-red-500" : ""} ${isCheckingField === 'website' ? "pr-10" : ""}`}
                       disabled={isSubmitting}
                     />
                    {isCheckingField === 'website' && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                    )}
                    {validFields.website && !isCheckingField && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                   {errors.website && (
                     <p className="text-sm text-red-600 mt-1">{errors.website}</p>
                   )}
                   {duplicateErrors.website && (
                     <p className="text-sm text-red-600 mt-1">{duplicateErrors.website}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="address">Organization Address *</Label>
                   <div className="relative">
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                       className={`${errors.address ? "border-red-500" : ""} ${validFields.address ? "pr-10" : ""}`}
                       disabled={isSubmitting}
                    required
                  />
                     {validFields.address && (
                       <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                     )}
                   </div>
                   {errors.address && (
                     <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="description">Organization Description *</Label>
                   <div className="relative">
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of your organization's mission and activities"
                    rows={4}
                       className={`${errors.description ? "border-red-500" : ""} ${validFields.description ? "pr-10" : ""}`}
                       disabled={isSubmitting}
                    required
                  />
                     {validFields.description && (
                       <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                     )}
                   </div>
                   {errors.description && (
                     <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                   )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary contact person details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <div className="relative">
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Full name of contact person"
                      className={`${errors.contactPerson ? "border-red-500" : ""} ${validFields.contactPerson ? "pr-10" : ""}`}
                      disabled={isSubmitting}
                    required
                  />
                    {validFields.contactPerson && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                   {errors.contactPerson && (
                     <p className="text-sm text-red-600 mt-1">{errors.contactPerson}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="position">Position/Title *</Label>
                  <div className="relative">
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="e.g., Executive Director, Program Manager"
                      className={`${errors.position ? "border-red-500" : ""} ${validFields.position ? "pr-10" : ""}`}
                      disabled={isSubmitting}
                    required
                  />
                    {validFields.position && (
                      <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                   {errors.position && (
                     <p className="text-sm text-red-600 mt-1">{errors.position}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                       onBlur={(e) => handleFieldBlur("email", e.target.value)}
                    placeholder="contact@organization.org"
                       className={`${errors.email ? "border-red-500" : ""} ${isCheckingField === 'email' ? "pr-10" : ""}`}
                       disabled={isSubmitting}
                    required
                  />
                                         {isCheckingField === 'email' && (
                       <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                     )}
                     {validFields.email && !isCheckingField && (
                       <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                     )}
                  </div>
                   {errors.email && (
                     <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                   )}
                   {duplicateErrors.email && (
                     <p className="text-sm text-red-600 mt-1">{duplicateErrors.email}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                   <div className="flex space-x-2">
                     <Select
                       value={formData.countryCode}
                       onValueChange={(value) => handleInputChange("countryCode", value)}
                       disabled={isSubmitting}
                     >
                       <SelectTrigger className="w-24">
                         <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                         {countryCodes.map((code) => (
                           <SelectItem key={code.code} value={code.code}>
                             {code.code}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                     <div className="relative flex-1">
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                         onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                         placeholder={formData.countryCode === "+234" ? "8012345678" : "1234567890"}
                         className={`w-full ${errors.phone ? "border-red-500" : ""} ${isCheckingField === 'phone' ? "pr-10" : ""} ${validFields.phone ? "pr-10" : ""}`}
                         maxLength={formData.countryCode === "+234" ? 10 : 10}
                         disabled={isSubmitting}
                    required
                  />
                       {isCheckingField === 'phone' && (
                         <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                       )}
                       {validFields.phone && !isCheckingField && (
                         <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                       )}
                     </div>
                   </div>
                   {errors.phone && (
                     <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                   )}
                   {duplicateErrors.phone && (
                     <p className="text-sm text-red-600 mt-1">{duplicateErrors.phone}</p>
                   )}
                   <p className="text-xs text-slate-500 mt-1">
                     {formData.countryCode === "+234" 
                       ? "Enter 10 digits (e.g., 8012345678)" 
                       : "Enter 10 digits (excluding country code)"}
                   </p>
                </div>

              </CardContent>
            </Card>

            {/* Security Information */}
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Set up your observer portal credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Create a strong password"
                       className={errors.password ? "border-red-500" : ""}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                    {validFields.password && (
                      <Check className="absolute right-12 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                   {errors.password && (
                     <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                   )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                       className={errors.confirmPassword ? "border-red-500" : ""}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </Button>
                    {validFields.confirmPassword && (
                      <Check className="absolute right-12 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                    )}
                  </div>
                   {errors.confirmPassword && (
                     <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                   )}
                </div>

              </CardContent>
            </Card>

            {/* Terms and Submit */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>Please review and accept the observer terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Observer Code of Conduct:</strong>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                      <li>Maintain strict neutrality and impartiality during observation</li>
                      <li>Do not interfere with the electoral process</li>
                      <li>Report observations accurately and objectively</li>
                      <li>Respect the confidentiality of sensitive information</li>
                      <li>Follow all instructions from election officials</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-slate-700 leading-relaxed">
                    I acknowledge that I have read and agree to abide by the Observer Code of Conduct and Terms of
                    Service. I understand that violation of these terms may result in immediate revocation of observer
                    status.
                  </Label>
                </div>

                                 {errors.submit && (
                   <Alert className={errors.submit.includes('successful') || errors.submit.includes('Redirecting') 
                     ? "border-green-200 bg-green-50" 
                     : "border-red-200 bg-red-50"}>
                     {errors.submit.includes('successful') || errors.submit.includes('Redirecting') ? (
                       <CheckCircle className="h-4 w-4 text-green-600" />
                     ) : (
                       <AlertTriangle className="h-4 w-4 text-red-600" />
                     )}
                     <AlertDescription className={errors.submit.includes('successful') || errors.submit.includes('Redirecting') 
                       ? "text-green-800" 
                       : "text-red-800"}>
                       {errors.submit}
                     </AlertDescription>
                   </Alert>
                 )}

                <Button
                  type="submit"
                   className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  size="lg"
                  disabled={!acceptedTerms || isSubmitting}
                >
                   <span className="font-medium text-lg">Register Observer Organization</span>
                </Button>

                <div className="text-center">
                  <p className="text-sm text-slate-600">
                    Already have observer credentials?{" "}
                    <Link href="/observer/login" className="text-purple-600 hover:underline">
                      Login here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>

      {/* Processing Modal */}
      {showProcessingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-6">
              {countdown === 2 ? (
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              ) : (
                <Loader2 className="h-16 w-16 text-purple-600 animate-spin mx-auto mb-4" />
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {countdown === 2 ? 'Registration Successful!' : 'Processing Registration'}
              </h3>
              <p className="text-gray-600">
                {countdown === 2 ? 'Your observer organization has been registered successfully!' : 'Please wait while we process your observer registration...'}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Clock className="h-5 w-5 text-purple-600" />
              <span className="text-lg font-medium text-gray-900">
                {countdown === 2 ? 'Registration Successful!' : `Redirecting in ${countdown} seconds`}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ease-linear ${
                  countdown === 2 ? 'bg-green-600' : 'bg-purple-600'
                }`}
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
