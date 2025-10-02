// API Configuration - Use Next.js API proxy for consistent behavior
export const API_BASE_URL = '/api';

// Token expiration utilities
import { isTokenExpired, clearAuthData, getUserTypeFromToken } from './utils/tokenUtils';

// Common headers
export const getHeaders = (token?: string) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  status?: string; // For NIN verification status
  data?: T;
  errors?: any[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<any> {
  const url = `${API_BASE_URL}${endpoint}`;
  // Check token expiration before making request (only if actually expired)
  // Skip token expiration check for login/register endpoints to prevent redirect loops
  // Explicitly exclude admin, observer, and auth login endpoints
  const isLoginEndpoint = endpoint.includes('/login') || endpoint.includes('/register');
  if (token && !isLoginEndpoint && isTokenExpired(token)) {
    // Get user type before clearing auth data
    const userType = getUserTypeFromToken(token) || 'user';
    clearAuthData(userType as any);
    
    // Redirect to appropriate login page
    const loginPaths = {
      user: '/login',
      admin: '/admin/login',
      observer: '/observer/login'
    };
    
    if (typeof window !== 'undefined') {
      window.location.href = loginPaths[userType];
    }
    
    throw new ApiError('Token expired', 401);
  }
  
  const headers = getHeaders(token);
  const config: RequestInit = {
    headers,
    mode: 'cors',
    credentials: 'omit',
    ...options,
  };

  try {
    const response = await fetch(url, config);
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      throw new ApiError('Response is not JSON', response.status);
    }
    
    const data = await response.json();
    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data.errors
      );
    }

    // Return the backend response directly since it already has the correct structure
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'Unable to connect to server. Please check if the backend is running.',
        0
      );
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      500
    );
  }
}
