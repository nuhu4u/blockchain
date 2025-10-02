'use client';

import { useState, useEffect, useCallback } from 'react';

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
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    ready: false,
  });

  // Single auth check on mount
  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (!isMounted) return;
        
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
        if (isMounted) {
          setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            ready: true,
          });
        }
      }
    };

    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, []); // Only run once on mount

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
        // Wait for cookie to be set
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Check auth status
        const authResponse = await fetch('/api/auth/me', {
          method: 'GET',
          cache: 'no-store',
        });
        
        if (authResponse.ok) {
          const authData = await authResponse.json();
          
          if (authData.success && authData.data) {
            setAuthState({
              user: authData.data,
              token: 'cookie-based',
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
    // Simple refresh - just check auth once
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
      } else {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          ready: true,
        });
      }
    }
  }, []);

  return {
    ...authState,
    login,
    logout,
    refresh,
  };
};
