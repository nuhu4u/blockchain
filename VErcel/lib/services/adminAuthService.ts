import { apiRequest, ApiResponse } from '../api';

// Types
export interface AdminUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'ADMIN';
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  last_login?: string;
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  user: AdminUser;
  token: string;
  redirectTo: string;
}

// Admin Authentication Service
export class AdminAuthService {
  // Admin login
  static async login(data: AdminLoginRequest): Promise<AdminLoginResponse> {
    const response = await apiRequest('/admin/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }, undefined); // Explicitly pass undefined for token
    return response;
  }

  // Admin logout
  static async logout(token: string): Promise<ApiResponse> {
    return apiRequest('/admin/logout', {
      method: 'POST',
    }, token);
  }

  // Get admin profile
  static async getProfile(token: string): Promise<ApiResponse<AdminUser>> {
    return apiRequest('/admin/me', {
      method: 'GET',
    }, token);
  }

  // Update admin profile
  static async updateProfile(data: Partial<AdminUser>, token: string): Promise<ApiResponse<AdminUser>> {
    return apiRequest('/admin/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }
}
