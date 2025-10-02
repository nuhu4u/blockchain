import { apiRequest, ApiResponse } from '../api';

// Types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  profile_picture?: string;
  has_custom_picture?: boolean;
  role: 'VOTER' | 'ADMIN' | 'OBSERVER' | 'USER';
  is_active: boolean;
  registration_completed: boolean;
  nin_verified: boolean;
  created_at: string;
  updated_at: string;
  // NIN information (read-only)
  encrypted_nin?: string;
  nin_iv?: string;
  aes_encrypted?: string;
}

export interface LoginRequest {
  emailOrNin: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileRequest {
  email?: string;
  phone_number?: string;
  password?: string;
}

export interface NinVerificationRequest {
  nin: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  hasSubmittedNin: boolean;
  ninStatus: string;
  canAccessDashboard: boolean;
  redirectTo: string;
  message: string;
  loginActions: {
    showLogoutButton: boolean;
    allowDashboardAccess: boolean;
    requiresNinVerification: boolean;
  };
}

// Authentication Service
export class AuthService {
  // User registration
  static async register(data: RegisterRequest): Promise<LoginResponse> {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User login
  static async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }, undefined); // Explicitly pass undefined for token
    return response;
  }

  // Forgot password
  static async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse> {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Reset password
  static async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse> {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get current user profile
  static async getMe(token: string): Promise<ApiResponse<User>> {
    return apiRequest('/auth/me', {
      method: 'GET',
    }, token);
  }

  // Update user profile
  static async updateProfile(data: UpdateProfileRequest, token: string): Promise<ApiResponse<User>> {
    return apiRequest('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }

  // Change password
  static async changePassword(data: ChangePasswordRequest, token: string): Promise<ApiResponse> {
    return apiRequest('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  // Submit NIN for verification
  static async submitNIN(data: NinVerificationRequest, token: string): Promise<ApiResponse> {
    return apiRequest('/auth/nin', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  // Check NIN verification status
  static async checkNINStatus(token: string): Promise<ApiResponse> {
    return apiRequest('/auth/nin/status', {
      method: 'GET',
    }, token);
  }

  // Logout
  static async logout(token: string): Promise<ApiResponse> {
    return apiRequest('/auth/logout', {
      method: 'POST',
    }, token);
  }
}
