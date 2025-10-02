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
  });

  // Initialize auth state from server session
  useEffect(() => {
    const initializeAuth = async () => {
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
            });
          } else {
            setAuthState({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              ready: true,
            });
          }
        } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            ready: true,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          ready: true,
        });
      }
    };

    initializeAuth();
  }, [userType]);

  // Login function
  const login = useCallback(async (data: LoginRequest): Promise<{ success: boolean; redirectTo?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
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
            setAuthState({
              user: sessionData.data,
              token: sessionData.token || 'cookie-based',
              isAuthenticated: true,
              isLoading: false,
              ready: true,
            });
            
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
      
      const result = await AuthService.register(data);
      
      if (result.success && result.token && result.user) {
        setAuthState({
          user: result.user,
          token: result.token,
          isAuthenticated: true,
          isLoading: false,
          ready: true,
        });
        
        return true;
      }
      
      setAuthState(prev => ({ ...prev, isLoading: false, ready: true }));
      return false;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false, ready: true }));
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' });
    } catch (error) {
      // Ignore logout errors
    } finally {
      AuthStorage.clearAuthData(userType);
      setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false, ready: true });
    }
  }, [userType]);

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<User>): Promise<boolean> => {
    try {
      const result = await AuthService.updateProfile(data, authState.token || '');
      
      if (result.success && result.data) {
        setAuthState(prev => ({
          ...prev,
          user: result.data!,
        }));
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        cache: 'no-store',
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.data) {
          setAuthState(prev => ({
            ...prev,
            user: data.data,
          }));
        }
      }
    } catch (error) {
      // Ignore refresh errors
    }
  }, []);

  // Refresh auth state
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
          });
        } else {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            ready: true,
          });
        }
      } else {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          ready: true,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ready: true,
      });
    }
  }, []);

  // Generic refresh function
  const refresh = useCallback(async (): Promise<void> => {
    await refreshAuthState();
  }, [refreshAuthState]);

  return {
    ...authState,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    refreshAuthState,
    refresh,
  };
};
