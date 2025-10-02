/**
 * Mock Biometric Service for Web App
 * Provides fallback data when backend is not available
 */

export interface BiometricStatus {
  biometric_registered: boolean;
  biometric_status: 'pending' | 'registered' | 'locked' | 'disabled';
  biometric_registered_at: string | null;
  biometric_consent: boolean;
  biometric_failed_attempts: number;
}

export interface BiometricResponse {
  success: boolean;
  message: string;
  data?: BiometricStatus;
}

class MockBiometricService {
  /**
   * Get mock biometric registration status
   * This is a fallback when the real API is not available
   */
  async getBiometricStatus(): Promise<BiometricStatus> {
    // Return a default status indicating biometric is not registered
    // This encourages users to use the mobile app
    return {
      biometric_registered: false,
      biometric_status: 'pending',
      biometric_registered_at: null,
      biometric_consent: false,
      biometric_failed_attempts: 0
    };
  }

  /**
   * Check if biometric is available (mock version)
   */
  async checkBiometricAvailability(): Promise<{ available: boolean; message: string }> {
    return {
      available: false,
      message: 'Biometric status unavailable - please use mobile app to register'
    };
  }
}

export const mockBiometricService = new MockBiometricService();
