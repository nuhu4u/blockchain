/**
 * Biometric Service for Web App
 * Handles biometric status checking (read-only, no enrollment)
 */

import { biometricConfig } from '@/lib/config/biometric';

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

class BiometricService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = biometricConfig.apiEndpoint;
  }

  private getAuthHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      // Don't include Authorization header - use cookies instead
    };
  }

  /**
   * Get biometric registration status (read-only)
   */
  async getBiometricStatus(): Promise<BiometricStatus> {
    try {
      // Use the same pattern as other web app services - call through Next.js API route
      const response = await fetch('/api/biometric/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        cache: 'no-store',
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in to view biometric status.');
        }
        if (response.status === 403) {
          throw new Error('Access denied. You do not have permission to view biometric status.');
        }
        throw new Error(result.message || `HTTP ${response.status}: Failed to get biometric status`);
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if biometric is available (for display purposes only)
   */
  async checkBiometricAvailability(): Promise<{ available: boolean; message: string }> {
    try {
      // For web app, we can only check if the user has registered biometric
      // We cannot check device biometric availability like in mobile app
      const status = await this.getBiometricStatus();
      
      return {
        available: status.biometric_registered,
        message: status.biometric_registered 
          ? 'Biometric is registered and ready for mobile voting'
          : 'Biometric not registered - please use mobile app to register'
      };
    } catch (error) {
      return {
        available: false,
        message: 'Unable to check biometric status'
      };
    }
  }
}

export const biometricService = new BiometricService();
