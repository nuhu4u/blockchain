import { useTokenExpiration } from './useTokenExpiration';

/**
 * Custom hook for observer dashboard token expiration
 * Optimized for observer users
 */
export const useObserverTokenExpiration = () => {
  return useTokenExpiration({
    userType: 'observer',
    redirectOnExpiration: true,
    inactivityTimeout: 600000 // 10 minutes of inactivity
  });
};
