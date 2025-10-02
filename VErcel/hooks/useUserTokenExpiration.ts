import { useTokenExpiration } from './useTokenExpiration';

/**
 * Custom hook for user dashboard token expiration
 * Optimized for regular voter users
 * DISABLED: Token validation removed for vote casting
 */
export const useUserTokenExpiration = () => {
  // Return disabled token expiration to prevent auth/me redirects
  return {
    checkTokenExpiration: () => true,
    handleApiError: () => {},
    showExpirationWarning: false,
    timeUntilExpiration: null,
    dismissWarning: () => {},
    extendSession: () => {}
  };
};
