'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AdminAuthService, AdminUser, AdminLoginRequest } from '@/lib/services/adminAuthService';
import { AuthStorage, UserType } from '@/lib/utils/authStorage';

interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface UseAdminAuthReturn extends AuthState {
  login: (data: AdminLoginRequest) => Promise<{ success: boolean; redirectTo?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AdminUser>) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  refreshAuthState: () => void;
}

export const useAdminAuth = (): UseAdminAuthReturn => {
  const router = useRouter();
  const userType: UserType = 'admin';
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const authData = AuthStorage.getAuthData(userType);
        if (authData && authData.token && authData.user) {
          setAuthState({
            user: authData.user,
            token: authData.token,
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
        AuthStorage.clearAuthData(userType);
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, [userType]);

  // Login function
  const login = useCallback(async (data: AdminLoginRequest): Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      // Clear any existing admin auth data before login to prevent token expiration issues
      AuthStorage.clearAuthData(userType);
      
      const response = await AdminAuthService.login(data);
      if (response.success) {
        const token = response.token;
        const user = response.user;
        const redirectTo = response.redirectTo;
        
        if (token && user) {
          // Store in separate storage for admin type
          AuthStorage.setAuthData(userType, token, user);
          
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
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return { success: false };
    }
  }, [userType]);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      if (authState.token) {
        await AdminAuthService.logout(authState.token);
      }
    } catch (error) {
      } finally {
      // Clear only admin auth data
      AuthStorage.clearAuthData(userType);
      
      // Reset state
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, [authState.token, userType]);

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<AdminUser>): Promise<boolean> => {
    try {
      if (!authState.token) return false;
      
      const response = await AdminAuthService.updateProfile(data, authState.token);
      
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
      
      const response = await AdminAuthService.getProfile(authState.token);
      
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

  const refreshAuthState = useCallback(() => {
    const authData = AuthStorage.getAuthData(userType);
    
    if (authData && authData.token && authData.user) {
      setAuthState({
        user: authData.user,
        token: authData.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, [userType]);

  return {
    ...authState,
    login,
    logout,
    updateProfile,
    refreshUser,
    refreshAuthState,
  };
};
