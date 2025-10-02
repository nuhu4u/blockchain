import { useEffect, useCallback, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  isTokenExpired, 
  isTokenExpiringSoon,
  getTimeUntilExpiration, 
  redirectToLogin, 
  getUserTypeFromToken,
  clearAuthData 
} from '@/lib/utils/tokenUtils';
import { AuthStorage } from '@/lib/utils/authStorage';

interface UseTokenExpirationOptions {
  userType?: 'user' | 'admin' | 'observer';
  redirectOnExpiration?: boolean;
  inactivityTimeout?: number; // in milliseconds - time before checking token after inactivity
}

export const useTokenExpiration = (options: UseTokenExpirationOptions = {}) => {
  const {
    userType = 'user',
    redirectOnExpiration = true,
    inactivityTimeout = 600000 // 10 minutes of inactivity before checking
  } = options;
  
  const router = useRouter();
  const [showExpirationWarning, setShowExpirationWarning] = useState(false);
  const [timeUntilExpiration, setTimeUntilExpiration] = useState<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const checkTokenExpiration = useCallback(() => {
    // DISABLED: Skip token validation to prevent auth/me redirects
    return true;
    
    // Original token validation code (commented out)
    /*
    const token = AuthStorage.getToken(userType);
    
    if (!token) {
      // Don't redirect if user is not authenticated (no token)
      // Only redirect if they were previously authenticated
      return false;
    }

    // Check if token is actually expired
    if (isTokenExpired(token)) {
      clearAuthData(userType);
      
      if (redirectOnExpiration) {
        redirectToLogin(userType);
      }
      return false;
    }

    // Check if token is expiring soon (5 minutes)
    const expiringSoon = isTokenExpiringSoon(token, 5);
    const timeLeft = getTimeUntilExpiration(token);
    
    setTimeUntilExpiration(timeLeft);
    
    if (expiringSoon && timeLeft > 0) {
      setShowExpirationWarning(true);
      } minutes`);
    } else {
      setShowExpirationWarning(false);
    }

    return true;
    */
  }, [userType, redirectOnExpiration]);

  // Track user activity
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Set new timer to check token after inactivity period
    inactivityTimerRef.current = setTimeout(() => {
      checkTokenExpiration();
    }, inactivityTimeout);
  }, [checkTokenExpiration, inactivityTimeout]);

  const handleApiError = useCallback((error: any) => {
    // DISABLED: Skip authentication error handling to prevent auth/me redirects
    return;
    
    // Original error handling code (commented out)
    /*
    // Check if error is related to authentication
    if (error?.status === 401 || 
        error?.message?.includes('token') || 
        error?.message?.includes('unauthorized') ||
        error?.message?.includes('authentication')) {
      
      clearAuthData(userType);
      
      if (redirectOnExpiration) {
        redirectToLogin(userType);
      }
    }
    */
  }, [userType, redirectOnExpiration]);

  const dismissWarning = useCallback(() => {
    setShowExpirationWarning(false);
  }, []);

  const extendSession = useCallback(async () => {
    // This would typically make an API call to refresh the token
    // For now, we'll just dismiss the warning
    setShowExpirationWarning(false);
    }, []);

  useEffect(() => {
    // Check token expiration on mount
    checkTokenExpiration();

    // Set up activity tracking
    const handleActivity = () => {
      updateActivity();
    };

    // Set up event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Check token expiration when page becomes visible after being hidden
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Check if user was away for more than 10 minutes
        const timeSinceLastActivity = Date.now() - lastActivityRef.current;
        if (timeSinceLastActivity > inactivityTimeout) {
          checkTokenExpiration();
        }
        updateActivity();
      }
    };

    // Check token expiration when window gains focus
    const handleFocus = () => {
      const timeSinceLastActivity = Date.now() - lastActivityRef.current;
      if (timeSinceLastActivity > inactivityTimeout) {
        checkTokenExpiration();
      }
      updateActivity();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Initialize activity tracking
    updateActivity();

    return () => {
      // Clear inactivity timer
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      
      // Remove event listeners
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkTokenExpiration, updateActivity, inactivityTimeout]);

  return {
    checkTokenExpiration,
    handleApiError,
    showExpirationWarning,
    timeUntilExpiration,
    dismissWarning,
    extendSession
  };
};
