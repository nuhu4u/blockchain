'use client';

import { useState, useEffect } from 'react';

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
  phone_number?: string;
  encrypted_nin?: string;
  hashed_nin?: string;
  aes_encrypted?: string;
  nin_iv?: string;
  polling_unit?: string;
  ward?: string;
  lga?: string;
  state?: string;
  // Additional profile fields
  date_of_birth?: string;
  gender?: string;
  address?: string;
  contract_address?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  ready: boolean;
}

export const useSimpleAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    ready: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
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
              isAuthenticated: true,
              isLoading: false,
              ready: true,
            });
          } else {
            setAuthState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              ready: true,
            });
          }
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            ready: true,
          });
        }
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          ready: true,
        });
      }
    };

    checkAuth();
  }, []);

  return authState;
};
