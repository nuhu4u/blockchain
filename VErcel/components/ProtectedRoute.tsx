'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useObserverAuth } from '@/hooks/useObserverAuth';
import { User } from '@/lib/services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login',
  fallback = <div>Loading...</div>,
}) => {
  const userAuth = useUserAuth();
  const adminAuth = useAdminAuth();
  const observerAuth = useObserverAuth();
  
  // Determine which auth hook to use based on required role
  const getAuthHook = () => {
    switch (requiredRole) {
      case 'ADMIN':
        return adminAuth;
      case 'OBSERVER':
        return observerAuth;
      case 'VOTER':
      case 'USER':
      default:
        return userAuth;
    }
  };
  
  const { isAuthenticated, isLoading } = getAuthHook();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  // Show loading state
  if (isLoading) {
    return <>{fallback}</>;
  }

  // Show children only if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
};

// Specific protected route components
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="ADMIN" redirectTo="/admin/login">
      {children}
    </ProtectedRoute>
  );
};

export const ObserverRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="OBSERVER" redirectTo="/observer/login">
    {children}
  </ProtectedRoute>
);

export const VoterRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute requiredRole="VOTER" redirectTo="/login">
    {children}
  </ProtectedRoute>
);

export const AuthenticatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute redirectTo="/login">
    {children}
  </ProtectedRoute>
);

