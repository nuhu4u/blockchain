"use client"

import type React from "react"
import { useState, useMemo, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ArrowLeft, Eye, EyeOff, Loader2, RefreshCw } from "lucide-react"
import Link from "next/link"
import { AuthService } from "@/lib/services/authService";
import { GeoDataService, NormalizedGeoData } from "@/lib/services/geoDataService";

export default function RegisterPage() {
  const [showWarning, setShowWarning] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    otherName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    stateOfOrigin: "",
    lgaOfOrigin: "",
    stateOfResidence: "",
    lgaOfResidence: "",
    ward: "",
    pollingUnit: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [phoneExists, setPhoneExists] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  // Geographic data state - using normalized types
  const [states, setStates] = useState<NormalizedGeoData[]>([]);
  const [lgasOrigin, setLgasOrigin] = useState<NormalizedGeoData[]>([]);
  const [lgasResidence, setLgasResidence] = useState<NormalizedGeoData[]>([]);
  const [wards, setWards] = useState<NormalizedGeoData[]>([]);
  const [pollingUnits, setPollingUnits] = useState<NormalizedGeoData[]>([]);
  const [loadingGeoData, setLoadingGeoData] = useState(false);

  // useRef guard to prevent double fetching in React Strict Mode
  const hasLoadedGeoData = useRef(false);

  // Countdown effect for success redirect
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      window.location.href = '/login';
    }
  }, [success, countdown]);

  // Fetch geographic data on component mount - with useRef guard for React Strict Mode
  useEffect(() => {
    if (!hasLoadedGeoData.current) {
      hasLoadedGeoData.current = true;
      fetchGeoData();
    }
  }, []);

  const fetchGeoData = async () => {
    setLoadingGeoData(true);
    setError(''); // Clear previous errors
    try {
      const statesResponse = await GeoDataService.getStates();
      
      if (statesResponse.success && statesResponse.data) {
        setStates(statesResponse.data);
        if (statesResponse.data.length > 0) {
          setSuccessMessage('Geographic data loaded successfully! You can now select your location details.');
          // Clear success message after 3 seconds
          setTimeout(() => setSuccessMessage(''), 3000);
        }
      } else {
        const errorMessage = 'message' in statesResponse ? statesResponse.message : 'Unknown error';
        setError('Failed to load geographic data. Please try again.');
      }
    } catch (error) {
      setError('Network error: Unable to load geographic data. Please check your connection.');
    } finally {
      setLoadingGeoData(false);
    }
  };

  const handleInputChange = async (field: keyof typeof formData, value: string) => {
    // Create a new form data object with the updated field
    const newFormData = { ...formData, [field]: value };
    
    // Reset dependent fields when state changes
    if (field === "stateOfOrigin") {
      newFormData.lgaOfOrigin = "";
      newFormData.ward = "";
      newFormData.pollingUnit = "";
      setLgasOrigin([]);
      setWards([]);
      setPollingUnits([]);
      
      // Fetch LGAs for selected state
      if (value) {
        try {
          const response = await GeoDataService.getLGAsForState(value);
          if (response.success && response.data) {
            setLgasOrigin(response.data);
          } else {
            const errorMessage = 'message' in response ? response.message : 'Unknown error';
            setError('Failed to load LGAs. Please try again.');
          }
        } catch (error) {
          setError('Network error: Unable to load LGAs. Please check your connection.');
        }
      }
    }
    
    if (field === "stateOfResidence") {
      newFormData.lgaOfResidence = "";
      newFormData.ward = "";
      newFormData.pollingUnit = "";
      setLgasResidence([]);
      setWards([]);
      setPollingUnits([]);
      
      // Fetch LGAs for selected state
      if (value) {
        try {
          const response = await GeoDataService.getLGAsForState(value);
          if (response.success && response.data) {
            setLgasResidence(response.data);
          } else {
            const errorMessage = 'message' in response ? response.message : 'Unknown error';
            setError('Failed to load LGAs. Please try again.');
          }
        } catch (error) {
          setError('Network error: Unable to load LGAs. Please check your connection.');
        }
      }
    }
    
    if (field === "lgaOfResidence") {
      newFormData.ward = "";
      newFormData.pollingUnit = "";
      setWards([]);
      setPollingUnits([]);
      
      // Fetch wards for selected LGA
      if (value) {
        try {
          const response = await GeoDataService.getWardsForLGA(value);
          if (response.success && response.data) {
            setWards(response.data);
          } else {
            const errorMessage = 'message' in response ? response.message : 'Unknown error';
            setError('Failed to load wards. Please try again.');
          }
        } catch (error) {
          setError('Network error: Unable to load wards. Please check your connection.');
        }
      }
    }
    
    if (field === "ward") {
      newFormData.pollingUnit = "";
      setPollingUnits([]);
      
      // Fetch polling units for selected ward
      if (value) {
        try {
          const response = await GeoDataService.getPollingUnitsForWard(value);
          if (response.success && response.data) {
            setPollingUnits(response.data);
          } else {
            const errorMessage = 'message' in response ? response.message : 'Unknown error';
            setError('Failed to load polling units. Please try again.');
          }
        } catch (error) {
          setError('Network error: Unable to load polling units. Please check your connection.');
        }
      }
    }
    
    // Update form state once with all changes
    setFormData(newFormData);
  }

  // Get available LGAs based on selected state
  const availableLgasOrigin = useMemo(() => {
    if (!formData.stateOfOrigin) return [];
    return lgasOrigin;
  }, [formData.stateOfOrigin, lgasOrigin]);

  const availableLgasResidence = useMemo(() => {
    if (!formData.stateOfResidence) return [];
    return lgasResidence;
  }, [formData.stateOfResidence, lgasResidence]);

  // Get available wards based on selected state and LGA
  const availableWards = useMemo(() => {
    if (!formData.stateOfResidence || !formData.lgaOfResidence) return [];
    return wards;
  }, [formData.stateOfResidence, formData.lgaOfResidence, wards]);

  // Get available polling units based on selected state, LGA, and ward
  const availablePollingUnits = useMemo(() => {
    if (!formData.stateOfResidence || !formData.lgaOfResidence || !formData.ward) return [];
    return pollingUnits;
  }, [formData.stateOfResidence, formData.lgaOfResidence, formData.ward, pollingUnits]);

  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth: string): number => {
    if (!dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Check if user is old enough to register
  const isUserOldEnough = (): boolean => {
    return calculateAge(formData.dateOfBirth) >= 18;
  };

  // Nigerian phone number validation
  const isValidNigerianPhone = (phone: string): boolean => {
    if (!phone) return false;
    
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Nigerian phone number patterns:
    // +2348012345678 (international format with +) - 14 characters
    // 2348012345678 (international format without +) - 13 characters
    // 08012345678 (local format with 0) - 11 characters
    // 8012345678 (local format without 0) - 10 characters
    
    const patterns = [
      /^\+234[789]\d{9}$/,     // +234 + 9 digits starting with 7, 8, or 9
      /^234[789]\d{9}$/,       // 234 + 9 digits starting with 7, 8, or 9
      /^0[789]\d{9}$/,         // 0 + 9 digits starting with 7, 8, or 9 (11 total)
      /^[789]\d{9}$/           // 9 digits starting with 7, 8, or 9 (10 total)
    ];
    
    return patterns.some(pattern => pattern.test(cleanPhone));
  };

  // Format Nigerian phone number to standard format
  const formatNigerianPhone = (phone: string): string => {
    if (!phone) return '';
    
    // Remove all non-digit characters except +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Convert to international format (+234 format)
    if (cleanPhone.startsWith('+234')) {
      // Already in correct format, return as is
      return cleanPhone;
    } else if (cleanPhone.startsWith('234')) {
      // Has 234 but no +, add +
      return `+${cleanPhone}`;
    } else if (cleanPhone.startsWith('0')) {
      // Local format starting with 0, remove 0 and add +234
      return `+234${cleanPhone.substring(1)}`;
    } else if (/^[789]\d{8}$/.test(cleanPhone)) {
      // Local format without 0, add +234
      return `+234${cleanPhone}`;
    }
    
    return cleanPhone;
  };

  // Debounced phone number check
  useEffect(() => {
    if (!formData.phoneNumber || !isValidNigerianPhone(formData.phoneNumber)) {
      setPhoneExists(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setCheckingPhone(true);
      try {
        // Check if phone number exists in database
        const formattedPhone = formatNigerianPhone(formData.phoneNumber);
        const exists = await checkPhoneExists(formattedPhone);
        setPhoneExists(exists);
      } catch (error) {
        setPhoneExists(false);
      } finally {
        setCheckingPhone(false);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, [formData.phoneNumber]);

  // Debounced email check
  useEffect(() => {
    if (!formData.email || !isValidEmail(formData.email)) {
      setEmailExists(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setCheckingEmail(true);
      try {
        // Check if email exists in database
        const exists = await checkEmailExists(formData.email);
        setEmailExists(exists);
      } catch (error) {
        setEmailExists(false);
      } finally {
        setCheckingEmail(false);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  // Function to check if phone number exists in database
  const checkPhoneExists = async (phone: string): Promise<boolean> => {
    try {
      // This would typically call your backend API
      // For now, we'll simulate the check
      const response = await fetch('/api/check-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.exists;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  };

  // Function to check if email exists in database
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // This would typically call your backend API
      // For now, we'll simulate the check
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.exists;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  };

  // Password strength validation
  const getPasswordStrength = (password: string): { strength: string; color: string; valid: boolean; details: string[] } => {
    if (!password) return { strength: '', color: '', valid: false, details: [] };
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    const hasMinLength = password.length >= 8;
    
    const score = [hasLower, hasUpper, hasNumber, hasSpecial, hasMinLength].filter(Boolean).length;
    
    // Create details array for missing requirements
    const details = [];
    if (!hasMinLength) details.push('At least 8 characters');
    if (!hasLower) details.push('One lowercase letter');
    if (!hasUpper) details.push('One uppercase letter');
    if (!hasNumber) details.push('One number');
    if (!hasSpecial) details.push('One special character (@$!%*?&)');
    
    let strength, color, valid;
    if (score === 5) {
      strength = 'Strong';
      color = 'text-green-600';
      valid = true;
    } else if (score >= 4) {
      strength = 'Good';
      color = 'text-blue-600';
      valid = true;
    } else if (score >= 3) {
      strength = 'Fair';
      color = 'text-yellow-600';
      valid = false;
    } else {
      strength = 'Weak';
      color = 'text-red-600';
      valid = false;
    }
    
    return { strength, color, valid, details };
  };

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    if (!email) return false;
    
    // Comprehensive email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    // Basic length and format checks
    if (email.length > 254) return false; // RFC 5321 limit
    if (email.indexOf('@') === -1) return false;
    if (email.indexOf('@') === 0) return false; // Starts with @
    if (email.indexOf('@') === email.length - 1) return false; // Ends with @
    
    // Check for consecutive dots
    if (email.includes('..')) return false;
    
    // Check for valid domain structure
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    
    const localPart = parts[0];
    const domain = parts[1];
    
    // Local part validation
    if (localPart.length === 0 || localPart.length > 64) return false;
    if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
    
    // Domain validation
    if (domain.length === 0 || domain.length > 253) return false;
    if (domain.startsWith('.') || domain.endsWith('.')) return false;
    if (domain.includes('..')) return false;
    
    // Check if domain has at least one dot (for TLD)
    if (!domain.includes('.')) return false;
    
    // Use regex for final validation
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    // Validate required fields
    if (!formData.surname || !formData.firstName || !formData.dateOfBirth || !formData.gender || !formData.phoneNumber || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields marked with *");
      setLoading(false);
      return;
    }

    // Validate age before submission
    if (!isUserOldEnough()) {
      setError("You must be 18 years or older to register as a voter.");
      setLoading(false);
      return;
    }

    // Validate phone number format
    if (!isValidNigerianPhone(formData.phoneNumber)) {
      setError("Please enter a valid Nigerian phone number.");
      setLoading(false);
      return;
    }

    // Check if phone number already exists
    if (phoneExists) {
      setError("This phone number is already registered. Please use a different number.");
      setLoading(false);
      return;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Check if email already exists
    if (emailExists) {
      setError("This email is already registered. Please use a different email.");
      setLoading(false);
      return;
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please ensure both passwords are identical.");
      setLoading(false);
      return;
    }

    // Validate geographic data is loaded
    if (loadingGeoData) {
      setError("Please wait for geographic data to finish loading before submitting.");
      setLoading(false);
      return;
    }

    // Validate required geographic fields
    if (!formData.stateOfOrigin || !formData.lgaOfOrigin) {
      setError("Please select both State of Origin and LGA of Origin.");
      setLoading(false);
      return;
    }

    if (!formData.stateOfResidence || !formData.lgaOfResidence || !formData.ward || !formData.pollingUnit) {
      setError("Please select all residence information: State, LGA, Ward, and Polling Unit.");
      setLoading(false);
      return;
    }

    try {
      // Prepare form data for registration
      const registrationData = {
        email: formData.email.trim(),
        password: formData.password,
        first_name: formData.firstName.trim(),
        last_name: formData.surname.trim(),
        phone_number: formatNigerianPhone(formData.phoneNumber),
        date_of_birth: formData.dateOfBirth || undefined,
        gender: formData.gender || undefined,
        address: formData.stateOfResidence && formData.lgaOfResidence ? 
          `${formData.stateOfResidence}, ${formData.lgaOfResidence}` : undefined,
        // State of Origin
        state_of_origin_id: formData.stateOfOrigin || undefined,
        lga_of_origin_id: formData.lgaOfOrigin || undefined,
        // State of Residence
        state_id: formData.stateOfResidence || undefined,
        lga_id: formData.lgaOfResidence || undefined,
        ward_id: formData.ward || undefined,
        polling_unit_id: formData.pollingUnit || undefined,
      };
      
      const result = await AuthService.register(registrationData);
      
      setSuccess(true);
      setCountdown(3); // Reset countdown to 3
      
      // Remove the old setTimeout - countdown will handle redirect automatically
      
    } catch (err: any) {
      
      // Check for different types of errors
      if (err.message && err.message.includes('<!DOCTYPE')) {
        setError("Backend server is not responding. Please ensure the backend server is running on port 3001.");
      } else if (err.message && err.message.includes('fetch')) {
        setError("Cannot connect to backend server. Please check if the server is running on port 3001.");
      } else if (err.message && err.message.includes('Failed to fetch')) {
        setError("Network error: Cannot reach the backend server. Please check your connection and ensure the server is running on port 3001.");
      } else if (err.message && err.message.includes('Validation failed')) {
        // Handle validation errors from backend
        if (err.errors && Array.isArray(err.errors)) {
          const errorMessages = err.errors.map((error: any) => `${error.path}: ${error.msg}`).join(', ');
          setError(`Validation failed: ${errorMessages}`);
        } else {
          setError("Validation failed. Please check all required fields and ensure they meet the requirements.");
        }
      } else if (err.message && err.message.includes('ApiError')) {
        // Handle API errors
        if (err.errors && Array.isArray(err.errors)) {
          const errorMessages = err.errors.map((error: any) => `${error.path}: ${error.msg}`).join(', ');
          setError(`API Error: ${errorMessages}`);
        } else {
          setError(err.message || "API Error occurred. Please try again.");
        }
      } else {
        setError(err.message || "Registration failed. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (showWarning) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl text-slate-900">Important Notice</CardTitle>
            <CardDescription className="text-base">
              Please read carefully before proceeding with voter registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-slate-700">
                <strong>Official Voter Registration Requirements:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>You must be 18 years or older</li>
                  <li>You must be a Nigerian citizen</li>
                  <li>You must provide valid identification (NIN)</li>
                  <li>You must be resident in the constituency where you wish to vote</li>
                  <li>You must not be registered to vote elsewhere</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-slate-700">
                <strong>Registration Process:</strong>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Complete all required fields accurately</li>
                  <li>Review your information before submission</li>
                  <li>You will receive a confirmation email upon successful registration</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
              <Label htmlFor="terms" className="text-sm text-slate-700">
                I have read and understood the requirements and agree to proceed with registration
                </Label>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                className="flex-1"
              >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
              </Button>
              <Button
                type="button"
                onClick={() => setShowWarning(false)}
                disabled={!acceptedTerms}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Registration
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          <h1 className="text-3xl font-bold text-slate-900">Voter Registration</h1>
          <p className="text-slate-600 mt-2">
            Complete the form below to register as a voter in the blockchain-based voting system
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error}
              {error.includes('geographic data') || error.includes('LGAs') || error.includes('wards') || error.includes('polling units') ? (
                <div className="mt-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={fetchGeoData}
                    disabled={loadingGeoData}
                    className="text-red-700 border-red-300 hover:bg-red-100"
                  >
                    {loadingGeoData ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                      </>
                    )}
                  </Button>
                </div>
              ) : null}
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <div className="h-4 w-4 text-green-600">✓</div>
            <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Geographic Data Progress */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-900">Geographic Data Status</h3>
            <span className="text-xs text-blue-600">
              {loadingGeoData ? "Loading..." : states.length > 0 ? `${states.length} states loaded` : "No data loaded"}
            </span>
          </div>
          
          {loadingGeoData && (
            <div className="flex items-center space-x-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span>Loading geographic data...</span>
            </div>
          )}
          
          {!loadingGeoData && states.length > 0 && (
            <>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${([
                      formData.stateOfOrigin,
                      formData.lgaOfOrigin,
                      formData.stateOfResidence,
                      formData.lgaOfResidence,
                      formData.ward,
                      formData.pollingUnit
                    ].filter(Boolean).length / 6) * 100}%`
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-blue-700">
                {!formData.stateOfOrigin && "• Select State of Origin"}
                {formData.stateOfOrigin && !formData.lgaOfOrigin && "• Select LGA of Origin"}
                {formData.lgaOfOrigin && !formData.stateOfResidence && "• Select State of Residence"}
                {formData.stateOfResidence && !formData.lgaOfResidence && "• Select LGA of Residence"}
                {formData.lgaOfResidence && !formData.ward && "• Select Ward"}
                {formData.ward && !formData.pollingUnit && "• Select Polling Unit"}
                {formData.pollingUnit && "✓ All geographic data completed!"}
              </div>
            </>
          )}
          
          {!loadingGeoData && states.length === 0 && (
            <div className="text-red-600 text-sm">
              ❌ No geographic data loaded. Click "Reload Geographic Data" button below.
            </div>
          )}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-blue-700">Creating your account... Please wait while we process your registration.</span>
            </div>
          </Alert>
        )}

        {/* Validation Summary */}
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-slate-700">
            <strong>Registration Requirements:</strong>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Must be 18 years or older</li>
              <li>Must provide a valid Nigerian phone number</li>
              <li>Phone number must not be already registered</li>
              <li>Must provide a valid email address</li>
              <li>Password must be at least 8 characters with required complexity</li>
              <li>Password confirmation must match</li>
              <li>All required fields must be completed</li>
            </ul>
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              <CardDescription>Enter your personal details as they appear on your official documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      value={formData.surname}
                      onChange={(e) => handleInputChange("surname", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                <div>
                  <Label htmlFor="otherName">Other Names</Label>
                  <Input
                    id="otherName"
                    value={formData.otherName}
                    onChange={(e) => handleInputChange("otherName", e.target.value)}
                  />
                </div>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      required
                      max={new Date().toISOString().split('T')[0]}
                      min={new Date(Date.now() - 120 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className={formData.dateOfBirth && !isUserOldEnough() ? "border-red-500 focus:border-red-500" : ""}
                    />
                    {formData.dateOfBirth && !isUserOldEnough() && (
                      <div className="text-sm mt-1 text-red-600">
                        ✗ Age: {calculateAge(formData.dateOfBirth)} years (Must be 18 or older)
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                    required
                  >
                      <SelectTrigger className={!formData.gender ? "border-red-500 focus:border-red-500" : ""}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {!formData.gender && (
                      <div className="text-sm mt-1 text-red-600">
                        ✗ Gender is required
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <div className="relative">
                    <Input
                      id="phoneNumber"
                    type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        placeholder="e.g., 09080018688 or +2349080018688"
                      required
                        className={formData.phoneNumber && !isValidNigerianPhone(formData.phoneNumber) ? "border-red-500 focus:border-red-500" : ""}
                    />
                      {checkingPhone && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                      )}
                    </div>
                    {formData.phoneNumber && !isValidNigerianPhone(formData.phoneNumber) && (
                      <div className="text-sm mt-1 text-red-600">
                        ✗ Invalid format. Use: 09080018688 or +2349080018688
                      </div>
                    )}
                    
                    {formData.phoneNumber && isValidNigerianPhone(formData.phoneNumber) && phoneExists && (
                      <div className="text-sm mt-1 text-red-600">
                        ✗ This phone number is already registered
                      </div>
                    )}
                    
                    {formData.phoneNumber && isValidNigerianPhone(formData.phoneNumber) && checkingPhone && (
                      <div className="text-sm mt-1 text-blue-600">
                        🔄 Checking availability...
                      </div>
                    )}
                  </div>
              </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="e.g., user@example.com"
                      required
                    className={formData.email && !isValidEmail(formData.email) ? "border-red-500 focus:border-red-500" : ""}
                  />
                  {formData.email && !isValidEmail(formData.email) && (
                    <div className="text-sm mt-1 text-red-600">
                      ✗ Please enter a valid email address
                    </div>
                  )}
                  
                  {formData.email && isValidEmail(formData.email) && emailExists && (
                    <div className="text-sm mt-1 text-red-600">
                      ✗ This email is already registered
                    </div>
                  )}
                  
                  {formData.email && isValidEmail(formData.email) && checkingEmail && (
                    <div className="text-sm mt-1 text-blue-600">
                      🔄 Checking availability...
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

          {/* Origin Information */}
            <Card>
              <CardHeader>
              <CardTitle>Origin Information</CardTitle>
              <CardDescription>
                Your state and LGA of origin
                {loadingGeoData && (
                  <div className="flex items-center mt-2 text-sm text-blue-600">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading geographic data...
                  </div>
                )}
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stateOfOrigin">State of Origin *</Label>
                    <Select
                      value={formData.stateOfOrigin}
                      onValueChange={(value) => handleInputChange("stateOfOrigin", value)}
                      disabled={loadingGeoData}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingGeoData ? "Loading..." : "Select state"} />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingGeoData ? (
                          <SelectItem value="loading-states-origin" disabled>Loading states...</SelectItem>
                        ) : states.length === 0 ? (
                          <SelectItem value="no-states-available-origin" disabled>No states available (Length: {states.length})</SelectItem>
                        ) : (
                          states.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lgaOfOrigin">LGA of Origin *</Label>
                    <Select
                      value={formData.lgaOfOrigin}
                      onValueChange={(value) => handleInputChange("lgaOfOrigin", value)}
                    disabled={!formData.stateOfOrigin}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder={formData.stateOfOrigin ? "Select LGA" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {!formData.stateOfOrigin ? (
                          <SelectItem value="select-state-origin-first" disabled>Select state of origin first</SelectItem>
                        ) : lgasOrigin.length === 0 ? (
                          <SelectItem value="loading-lgas-origin" disabled>Loading LGAs...</SelectItem>
                        ) : (
                          lgasOrigin.map((lga) => (
                            <SelectItem key={lga.id} value={lga.id}>
                              {lga.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Residence Information */}
            <Card>
              <CardHeader>
              <CardTitle>Residence Information</CardTitle>
              <CardDescription>
                Your current place of residence for voting purposes
                {loadingGeoData && (
                  <div className="flex items-center mt-2 text-sm text-blue-600">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading geographic data...
                  </div>
                )}
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stateOfResidence">State of Residence *</Label>
                    <Select
                      value={formData.stateOfResidence}
                      onValueChange={(value) => handleInputChange("stateOfResidence", value)}
                      disabled={loadingGeoData}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={loadingGeoData ? "Loading..." : "Select state"} />
                      </SelectTrigger>
                      <SelectContent>
                        {loadingGeoData ? (
                          <SelectItem value="loading-states-residence" disabled>Loading states...</SelectItem>
                        ) : states.length === 0 ? (
                          <SelectItem value="no-states-available-residence" disabled>No states available (Length: {states.length})</SelectItem>
                        ) : (
                          states.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="lgaOfResidence">LGA of Residence *</Label>
                    <Select
                      value={formData.lgaOfResidence}
                      onValueChange={(value) => handleInputChange("lgaOfResidence", value)}
                    disabled={!formData.stateOfResidence}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder={formData.stateOfResidence ? "Select LGA" : "Select state first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {!formData.stateOfResidence ? (
                          <SelectItem value="select-state-residence-first" disabled>Select state of residence first</SelectItem>
                        ) : lgasResidence.length === 0 ? (
                          <SelectItem value="loading-lgas-residence" disabled>Loading LGAs...</SelectItem>
                        ) : (
                          lgasResidence.map((lga) => (
                            <SelectItem key={lga.id} value={lga.id}>
                              {lga.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ward">Ward *</Label>
                    <Select
                    value={formData.ward}
                    onValueChange={(value) => handleInputChange("ward", value)}
                    disabled={!formData.lgaOfResidence}
                  >
                      <SelectTrigger>
                      <SelectValue placeholder={formData.lgaOfResidence ? "Select ward" : "Select LGA first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {!formData.lgaOfResidence ? (
                          <SelectItem value="select-lga-residence-first" disabled>Select LGA of residence first</SelectItem>
                        ) : wards.length === 0 ? (
                          <SelectItem value="loading-wards" disabled>Loading wards...</SelectItem>
                        ) : (
                          wards.map((ward) => (
                            <SelectItem key={ward.id} value={ward.id}>
                              {ward.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pollingUnit">Polling Unit *</Label>
                    <Select
                      value={formData.pollingUnit}
                      onValueChange={(value) => handleInputChange("pollingUnit", value)}
                    disabled={!formData.ward}
                    >
                      <SelectTrigger>
                      <SelectValue placeholder={formData.ward ? "Select polling unit" : "Select ward first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {!formData.ward ? (
                          <SelectItem value="select-ward-first" disabled>Select ward first</SelectItem>
                        ) : pollingUnits.length === 0 ? (
                          <SelectItem value="loading-polling-units" disabled>Loading polling units...</SelectItem>
                        ) : (
                          pollingUnits.map((pu) => (
                            <SelectItem key={pu.id} value={pu.id}>
                              {pu.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Security Information */}
            <Card>
              <CardHeader>
              <CardTitle>Security Information</CardTitle>
              <CardDescription>Create a secure password for your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                   <div className="text-sm mt-1 text-gray-600">
                     Password must be at least 8 characters with uppercase, lowercase, number, and special character
                   </div>
                   {formData.password && (
                     <div className="space-y-2">
                       <div className={`text-sm ${getPasswordStrength(formData.password).color} font-medium`}>
                         Password strength: {getPasswordStrength(formData.password).strength}
                       </div>
                       <div className="text-sm">
                         <div className="font-medium mb-2">Password requirements:</div>
                         <div className="grid grid-cols-1 gap-1">
                           <div className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-red-500'}`}>
                             {formData.password.length >= 8 ? '✓' : '✗'} At least 8 characters
                           </div>
                           <div className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                             {/[a-z]/.test(formData.password) ? '✓' : '✗'} One lowercase letter
                           </div>
                           <div className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                             {/[A-Z]/.test(formData.password) ? '✓' : '✗'} One uppercase letter
                           </div>
                           <div className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                             {/\d/.test(formData.password) ? '✓' : '✗'} One number
                           </div>
                           <div className={`flex items-center ${/[@$!%*?&]/.test(formData.password) ? 'text-green-600' : 'text-red-500'}`}>
                             {/[@$!%*?&]/.test(formData.password) ? '✓' : '✗'} One special character (@$!%*?&)
                           </div>
                         </div>
                       </div>
                     </div>
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
                      required
                      className={formData.confirmPassword && formData.password !== formData.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                </Button>
          </div>
                  
                  {/* Password confirmation validation messages */}
                  {formData.confirmPassword && (
                    <div className="text-sm mt-1">
                      {formData.password === formData.confirmPassword ? (
                        <div className="text-green-600 flex items-center">
                          <span className="mr-1">✓</span> Passwords match
      </div>
                      ) : (
                        <div className="text-red-600 flex items-center">
                          <span className="mr-1">✗</span> Passwords do not match
    </div>
                      )}
                    </div>
                  )}
                  
                  {!formData.confirmPassword && formData.password && (
                    <div className="text-sm mt-1 text-gray-600">
                      Please confirm your password
                    </div>
                  )}
                </div>
              </div> {/* Close the grid wrapper */}
              </CardContent>
            </Card>

            {/* Submit Section */}
            <Card>
              <CardHeader>
                <CardTitle>Complete Registration</CardTitle>
                <CardDescription>Review your information and submit your registration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    By submitting this form, you confirm that all information provided is accurate and complete. False
                    information may result in criminal charges.
                  </AlertDescription>
                </Alert>

                             <Button 
                 type="submit" 
                 className="w-full bg-blue-600 hover:bg-blue-700" 
                 size="lg" 
                 disabled={
                   loading || 
                   loadingGeoData ||
                   !formData.surname || 
                   !formData.firstName || 
                   !formData.dateOfBirth || 
                   !formData.gender || 
                   !formData.phoneNumber || 
                   !formData.email || 
                   !formData.password || 
                   !formData.confirmPassword || 
                   !isUserOldEnough() || 
                   !isValidNigerianPhone(formData.phoneNumber) || 
                   phoneExists || 
                   !isValidEmail(formData.email) || 
                   emailExists || 
                   !getPasswordStrength(formData.password).valid || 
                   formData.password.length < 8 || 
                   formData.password !== formData.confirmPassword ||
                   !formData.stateOfOrigin ||
                   !formData.lgaOfOrigin ||
                   !formData.stateOfResidence ||
                   !formData.lgaOfResidence ||
                   !formData.ward ||
                   !formData.pollingUnit
                 }
               >
                 {loading ? (
                   <div className="flex items-center justify-center space-x-2">
                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                     <span>Creating your account...</span>
                   </div>
                 ) : (
                   loadingGeoData ? "Loading geographic data..." :
                   !isUserOldEnough() && formData.dateOfBirth ? "Must be 18 or older" :
                   !isValidNigerianPhone(formData.phoneNumber) ? "Invalid phone number" :
                   phoneExists ? "Phone number already exists" :
                   !isValidEmail(formData.email) ? "Invalid email" :
                   emailExists ? "Email already exists" :
                   formData.password.length < 8 ? "Password too short (min 8)" :
                   !getPasswordStrength(formData.password).valid ? "Password too weak" :
                   formData.password !== formData.confirmPassword ? "Passwords do not match" :
                   !formData.stateOfOrigin ? "Select State of Origin" :
                   !formData.lgaOfOrigin ? "Select LGA of Origin" :
                   !formData.stateOfResidence ? "Select State of Residence" :
                   !formData.lgaOfResidence ? "Select LGA of Residence" :
                   !formData.ward ? "Select Ward" :
                   !formData.pollingUnit ? "Select Polling Unit" :
                   "Submit Registration"
                 )}
                </Button>

                {!isUserOldEnough() && formData.dateOfBirth && (
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-700">
                      You must be 18 years or older to register as a voter. Please select a valid date of birth.
                    </AlertDescription>
                  </Alert>
                )}

                <p className="text-center text-sm text-slate-600">
                  Already registered?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Login here
                  </Link>
                </p>
              </CardContent>
            </Card>
        </form>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Creating Your Account</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please wait while we process your registration. This may take a few moments.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                <div className="animate-pulse">🔄</div>
                <span>Processing registration...</span>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Registration Successful! 🎉</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your account has been created successfully. You will be redirected to the login page in a few seconds.
              </p>
              
              {/* Countdown Timer */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear" 
                    style={{ width: `${(countdown / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Redirecting in <span className="font-semibold text-blue-600">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Preparing redirect...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

