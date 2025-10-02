import { apiRequest, ApiResponse } from '../api';

// Types
export interface ObserverUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'OBSERVER';
  organization_name?: string;
  organization_type?: string;
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
  status: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  last_login?: string;
}

export interface ObserverLoginRequest {
  email: string;
  password: string;
}

export interface ObserverLoginResponse {
  success: boolean;
  message: string;
  user: ObserverUser;
  token: string;
  redirectTo: string;
  canAccessDashboard: boolean;
}

// Observer Authentication Service
export class ObserverAuthService {
  // Observer login
  static async login(data: ObserverLoginRequest): Promise<ObserverLoginResponse> {
    const response = await apiRequest('/observer/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }, undefined); // Explicitly pass undefined for token
    return response;
  }

  // Observer logout
  static async logout(token: string): Promise<ApiResponse> {
    return apiRequest('/observer/logout', {
      method: 'POST',
    }, token);
  }

  // Get observer profile
  static async getProfile(token: string): Promise<ApiResponse<ObserverUser>> {
    return apiRequest('/observer/profile', {
      method: 'GET',
    }, token);
  }

  // Update observer profile
  static async updateProfile(data: Partial<ObserverUser>, token: string): Promise<ApiResponse<ObserverUser>> {
    return apiRequest('/observer/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }
}
