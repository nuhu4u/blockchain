'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  nin_verified: boolean;
  registration_completed: boolean;
  user_unique_id: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  ready: boolean;
}

interface LoginRequest {
  emailOrNin: string;
  password: string;
}

export const useUserAuth = () => {
  const router = useRouter();
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    ready: false,
  });

  // Check authentication status
  const checkAuth = useCallback(async () => {
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
            token: 'cookie-based',
            isAuthenticated: true,
            isLoading: false,
            ready: true,
          });
          return true;
        }
      }
      
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ready: true,
      });
      return false;
    } catch (error) {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ready: true,
      });
      return false;
    }
  }, []);

  // Initialize auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login function
  const login = useCallback(async (data: LoginRequest) => {
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
        // Wait a moment for cookie to be set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check auth status
        const isAuthenticated = await checkAuth();
        
        if (isAuthenticated) {
          return { success: true, redirectTo: result.redirectTo };
        }
      }
      
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  }, [checkAuth]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' });
    } catch (error) {
      // Ignore errors
    } finally {
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        ready: true,
      });
    }
  }, []);

  // Refresh function
  const refresh = useCallback(async () => {
    await checkAuth();
  }, [checkAuth]);

  return {
    ...authState,
    login,
    logout,
    refresh,
  };
};
