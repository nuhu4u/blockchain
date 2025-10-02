import { useTokenExpiration } from './useTokenExpiration';

/**
 * Custom hook for admin dashboard token expiration
 * Optimized for admin users with longer session tolerance
 */
export const useAdminTokenExpiration = () => {
  return useTokenExpiration({
    userType: 'admin',
    redirectOnExpiration: true,
    inactivityTimeout: 600000 // 10 minutes of inactivity
  });
};
