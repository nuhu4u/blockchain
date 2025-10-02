'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService, User, LoginRequest, RegisterRequest } from '@/lib/services/authService';
// import { showErrorToast } from '@/lib/errorHandler';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface UseAuthReturn extends AuthState {
  login: (data: LoginRequest) => Promise<{ success: boolean; redirectTo?: string }>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  refreshAuthState: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true, // Set to true to show loading initially
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Check for both old and new localStorage keys
        const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user') || localStorage.getItem('user_data');
        
        if (token && userData) {
          const user = JSON.parse(userData);
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        localStorage.removeItem('user_data');
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (data: LoginRequest): Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await AuthService.login(data);
      
      if (response.success) {
        // Backend returns token and user directly on the response
        const token = response.token;
        const user = response.user;
        const redirectTo = response.redirectTo;
        
        if (token && user) {
          // Store in localStorage
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(user));
          
          // Update state
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return { success: true, redirectTo };
        } else {
          return { success: false };
        }
      }
      
      return { success: false };
    } catch (error) {
      // showErrorToast(error); // Replace with actual toast
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false };
    }
  }, []);

  // Register function
  const register = useCallback(async (data: RegisterRequest): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await AuthService.register(data);
      
      if (response.success) {
        // Backend returns token and user directly on the response
        const token = response.token;
        const user = response.user;
        
        if (token && user) {
          // Store in localStorage
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(user));
          
          // Update state
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        } else {
          return false;
        }
      }
      
      return false;
    } catch (error) {
      // showErrorToast(error); // Replace with actual toast
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      if (authState.token) {
        await AuthService.logout(authState.token);
      }
    } catch (error) {
      } finally {
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Reset state
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });

    }
  }, [authState.token, router]);

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!authState.token) return false;
      
      const response = await AuthService.updateProfile(data, authState.token);
      
      if (response.success && response.data) {
        const updatedUser = response.data;
        
        // Update localStorage
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        
        // Update state
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
        }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      // showErrorToast(error); // Replace with actual toast
      return false;
    }
  }, [authState.token]);

  // Refresh user data
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      if (!authState.token) return;
      
      const response = await AuthService.getMe(authState.token);
      
      if (response.success && response.data) {
        const user = response.data;
        
        // Update localStorage (use both keys for compatibility)
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_data', JSON.stringify(user));
        
        // Update state
        setAuthState(prev => ({
          ...prev,
          user,
        }));
      }
    } catch (error) {
      // If token is invalid, logout
      if (error instanceof Error && error.message.includes('401')) {
        logout();
      }
    }
  }, [authState.token, logout]);

  const refreshAuthState = useCallback(() => {
    // Check for both old and new localStorage keys
    const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user') || localStorage.getItem('user_data');

    if (token && userData) {
      const user = JSON.parse(userData);
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    refreshAuthState,
  };
};

// Hook for checking if user has specific role
export const useRole = (requiredRole: User['role']) => {
  const { user } = useAuth();
  return user?.role === requiredRole;
};

// Hook for protecting routes - redirects unauthenticated users
export const useProtectedRoute = (redirectTo: string = '/login') => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return { isAuthenticated, isLoading };
};

// Hook for checking if user has admin role
export const useAdmin = () => useRole('ADMIN');

// Hook for checking if user has observer role
export const useObserver = () => useRole('OBSERVER');

// Hook for checking if user has voter role
export const useVoter = () => useRole('VOTER');

