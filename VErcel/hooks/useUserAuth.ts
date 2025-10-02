'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
    isLoading: false,
    ready: false,
  });
  const checkingRef = useRef(false);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    if (checkingRef.current) return authState.isAuthenticated; // don't start a parallel check
    checkingRef.current = true;
    setAuthState(p => ({ ...p, isLoading: true }));
    try {
      const res = await fetch('/api/auth/me', { method: 'GET', cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        // Debug log
        const user: User | null = json?.data ?? null;
        if (json?.success && user) {
          setAuthState({ user, token: 'cookie-based', isAuthenticated: true, isLoading: false, ready: true });
          return true;
        } else {
          }
      } else {
        }
      setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false, ready: true });
      return false;
    } catch {
      setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false, ready: true });
      return false;
    } finally {
      checkingRef.current = false;
    }
  }, [authState.isAuthenticated]);

  useEffect(() => { 
    void checkAuth(); /* run once on mount */ 
  }, []); // eslint-disable-line

  const login = useCallback(async (data: LoginRequest) => {
    try {
      setAuthState(p => ({ ...p, isLoading: true }));
      const resp = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), cache: 'no-store',
      });
      const json = await resp.json().catch(() => ({} as any));
      await new Promise(r => setTimeout(r, 0)); // let Set-Cookie commit
      const ok = resp.ok && json?.success && (await checkAuth());
      if (ok) return { success: true, redirectTo: json?.redirectTo };
      setAuthState(p => ({ ...p, isLoading: false })); return { success: false };
    } catch {
      setAuthState(p => ({ ...p, isLoading: false })); return { success: false };
    }
  }, [checkAuth]);

  const logout = useCallback(async () => {
    try { await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' }); } catch {}
    setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false, ready: true });
  }, []);

  const refresh = useCallback(async () => { await checkAuth(); }, [checkAuth]);

  return {
    ...authState,
    login,
    logout,
    refresh,
  };
};
