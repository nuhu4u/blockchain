"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  Fingerprint, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Smartphone,
  Download,
  RefreshCw
} from "lucide-react"
import { biometricService, BiometricStatus } from "@/lib/services/biometricService"
import { mockBiometricService } from "@/lib/services/mockBiometricService"
import { mobileAppService } from "@/lib/services/mobileAppService"

interface BiometricStatusProps {
  onStatusChange?: (status: BiometricStatus) => void;
  onRegisterPress?: () => void;
  showMobileCTA?: boolean;
}

export function BiometricStatusComponent({ 
  onStatusChange, 
  onRegisterPress,
  showMobileCTA = true 
}: BiometricStatusProps) {
  const [status, setStatus] = useState<BiometricStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBiometricStatus();
  }, []);

  const loadBiometricStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const biometricStatus = await biometricService.getBiometricStatus();
      setStatus(biometricStatus);
      onStatusChange?.(biometricStatus);
    } catch (err: any) {
      // Try to use mock service as fallback
      try {
        const mockStatus = await mockBiometricService.getBiometricStatus();
        setStatus(mockStatus);
        onStatusChange?.(mockStatus);
        
        // Set a warning message instead of error
        if (err.message?.includes('Authentication required')) {
          setError('Please log in to view your biometric status');
        } else if (err.message?.includes('Access denied')) {
          setError('You do not have permission to view biometric status');
        } else if (err.message?.includes('Invalid or expired token')) {
          setError('Your session has expired. Please log in again');
        } else {
          setError('Biometric status unavailable - please use mobile app to register');
        }
      } catch (mockError) {
        setError('Unable to load biometric status. Please use mobile app to register.');
        
        // Set a fallback status for display purposes
        setStatus({
          biometric_registered: false,
          biometric_status: 'pending',
          biometric_registered_at: null,
          biometric_consent: false,
          biometric_failed_attempts: 0
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadMobileApp = () => {
    mobileAppService.showInstallPrompt();
  };

  const getStatusIcon = () => {
    if (loading) return Clock;
    if (error) return AlertTriangle;
    if (status?.biometric_registered) return CheckCircle;
    return Fingerprint;
  };

  const getStatusColor = () => {
    if (loading) return 'text-gray-500';
    if (error) return 'text-red-500';
    if (status?.biometric_registered) return 'text-green-500';
    return 'text-orange-500';
  };

  const getStatusText = () => {
    if (loading) return 'Loading...';
    if (error) return 'Error loading status';
    if (status?.biometric_registered) return 'Authorized to Vote';
    return 'Pending Registration';
  };

  const getStatusDescription = () => {
    if (loading) return 'Checking biometric status...';
    if (error) return 'Unable to load biometric status';
    if (status?.biometric_registered) {
      return `Registered on ${status.biometric_registered_at ? new Date(status.biometric_registered_at).toLocaleDateString() : 'Unknown date'}`;
    }
    return 'Biometric fingerprint required for voting';
  };

  const StatusIcon = getStatusIcon();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-blue-600" />
            Biometric Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-600 mr-2" />
            <span className="text-gray-600">Loading biometric status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      {/* Warning Message for Not Enrolled */}
      {!status?.biometric_registered && (
        <Alert className="border-orange-200 bg-orange-50 mb-4">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Important:</strong> You must register your biometric on the mobile app to vote in elections
          </AlertDescription>
        </Alert>
      )}

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="h-5 w-5 text-blue-600" />
          Biometric Security
        </CardTitle>
        <CardDescription>
          Your biometric authentication status for secure voting
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Display */}
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <StatusIcon className={`h-6 w-6 ${getStatusColor()}`} />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{getStatusText()}</h3>
              <Badge 
                variant={status?.biometric_registered ? "default" : "secondary"}
                className={status?.biometric_registered ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
              >
                {status?.biometric_registered ? "Registered" : "Not Registered"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{getStatusDescription()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {!status?.biometric_registered && showMobileCTA && (
          <div className="space-y-3">
            <Alert className="border-blue-200 bg-blue-50">
              <Smartphone className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Register on Mobile:</strong> Biometric enrollment is only available on the mobile app for security reasons.
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={handleDownloadMobileApp}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Mobile App to Register
            </Button>
          </div>
        )}

        {/* Success Message for Enrolled */}
        {status?.biometric_registered && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Ready to Vote!</strong> Your biometric is registered and you can vote securely on the mobile app.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="space-y-2">
                <p>{error}</p>
                {error.includes('session has expired') && (
                  <p className="text-sm">
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => window.location.href = '/login'}
                      className="p-0 h-auto text-red-700 underline"
                    >
                      Click here to log in again
                    </Button>
                  </p>
                )}
              </div>
            </AlertDescription>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadBiometricStatus}
              className="mt-2"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </Alert>
        )}

      </CardContent>
    </Card>
  );
}
