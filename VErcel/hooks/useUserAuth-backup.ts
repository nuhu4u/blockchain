'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService, User, LoginRequest, RegisterRequest } from '@/lib/services/authService';
import { AuthStorage, UserType } from '@/lib/utils/authStorage';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
    ready: boolean;
    refresh: () => Promise<void>;
  }

interface UseUserAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  ready: boolean;
  refresh: () => Promise<void>;
  login: (data: LoginRequest) => Promise<{ success: boolean; redirectTo?: string }>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  refreshAuthState: () => void;
}

export const useUserAuth = (): UseUserAuthReturn => {
  const router = useRouter();
  const userType: UserType = 'user';
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    ready: false,
    refresh: async () => {},
  });

  // Initialize auth state from server session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check server session instead of localStorage
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            const newState = {
              user: data.data,
              token: data.token || 'cookie-based',
              isAuthenticated: true,
              isLoading: false,
              ready: true,
            };
            setAuthState({...newState, refresh: async () => {}});
            } else {
            setAuthState({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              ready: true,
              refresh: async () => {},
            });
          }
        } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            ready: true,
            refresh: async () => {},
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          ready: true,
          refresh: async () => {},
        });
      }
    };

    initializeAuth();
  }, [userType]);

  // Login function - now uses cookie-based authentication
  const login = useCallback(async (data: LoginRequest): Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Use the new cookie-based login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
      });
      
      const result = await response.json();
      if (response.ok && result.success) {
        // After successful login, check server session to get user data
        const sessionResponse = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          if (sessionData.success && sessionData.data) {
            const newState = {
              user: sessionData.data,
              token: sessionData.token || 'cookie-based',
              isAuthenticated: true,
              isLoading: false,
              ready: true,
            };
            setAuthState({...newState, refresh: async () => {}});
            
            return { success: true, redirectTo: result.redirectTo };
          }
        }
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false, ready: true }));
      return { success: false };
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, ready: true }));
      return { success: false };
    }
  }, []);

  // Register function
  const register = useCallback(async (data: RegisterRequest): Promise<boolean> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const response = await AuthService.register(data);
      
      if (response.success) {
        const token = response.token;
        const user = response.user;
        
        if (token && user) {
          // Store in separate storage for user type
          AuthStorage.setAuthData(userType, token, user);
          
          // Update state
          setAuthState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            ready: true,
            refresh: async () => {},
          });
          
          return true;
        } else {
          return false;
        }
      }
      
      return false;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [userType]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', {
        method: 'POST',
        cache: 'no-store',
      });
    } catch (error) {
      } finally {
      // Clear only user auth data
      AuthStorage.clearAuthData(userType);
      
      // Reset state
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ready: true,
        refresh: async () => {},
      });
    }
  }, [userType]);

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<User>): Promise<boolean> => {
    try {
      if (!authState.token) return false;
      
      const response = await AuthService.updateProfile(data, authState.token);
      
      if (response.success && response.data) {
        const updatedUser = response.data;
        
        // Update storage
        AuthStorage.setAuthData(userType, authState.token, updatedUser);
        
        // Update state
        setAuthState(prev => ({
          ...prev,
          user: updatedUser,
        }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }, [authState.token, userType]);

  // Refresh user data
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      if (!authState.token) return;
      
      const response = await AuthService.getMe(authState.token);
      
      if (response.success && response.data) {
        const user = response.data;
        
        // Update storage
        AuthStorage.setAuthData(userType, authState.token, user);
        
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
  }, [authState.token, logout, userType]);

  const refreshAuthState = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        cache: 'no-store',
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setAuthState({
            user: data.data,
            token: data.token || 'cookie-based',
            isAuthenticated: true,
            isLoading: false,
            ready: true,
            refresh: async () => {},
          });
          } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            ready: true,
            refresh: async () => {},
          });
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          ready: true,
          refresh: async () => {},
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ready: true,
        refresh: async () => {},
      });
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refresh: refreshAuthState,
    refreshUser,
    refreshAuthState,
  };
};
