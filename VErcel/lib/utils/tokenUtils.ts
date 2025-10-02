import { jwtDecode } from 'jwt-decode';
import { AuthStorage, UserType } from './authStorage';

interface DecodedToken {
  userId: string;
  role: string;
  exp: number;
  iat: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    if (!token) return true;
    
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    
    // Check if token is actually expired (no buffer for actual expiration)
    return decoded.exp < currentTime;
  } catch (error) {
    return true; // If we can't decode it, consider it expired
  }
};

export const isTokenExpiringSoon = (token: string, bufferMinutes: number = 10): boolean => {
  try {
    if (!token) return true;
    
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    const bufferTime = bufferMinutes * 60; // Convert minutes to seconds
    
    // Check if token expires within the buffer time
    return decoded.exp < (currentTime + bufferTime);
  } catch (error) {
    return true;
  }
};

export const getTokenExpirationTime = (token: string): number | null => {
  try {
    if (!token) return null;
    
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    return null;
  }
};

export const getTimeUntilExpiration = (token: string): number => {
  try {
    if (!token) return 0;
    
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    const timeUntilExpiration = decoded.exp - currentTime;
    
    return Math.max(0, timeUntilExpiration * 1000); // Return in milliseconds
  } catch (error) {
    return 0;
  }
};

export const clearAuthData = (userType?: UserType) => {
  if (userType) {
    AuthStorage.clearAuthData(userType);
  } else {
    AuthStorage.clearAllAuthData();
  }
};

export const redirectToLogin = (userType: 'user' | 'admin' | 'observer' = 'user', showMessage: boolean = true) => {
  if (showMessage) {
    // Show a user-friendly message before redirecting
    const messages = {
      user: 'Your session has expired. Please log in again to continue.',
      admin: 'Your admin session has expired. Please log in again to continue.',
      observer: 'Your observer session has expired. Please log in again to continue.'
    };
    
    alert(messages[userType]);
  }
  
  clearAuthData(userType);
  
  const loginPaths = {
    user: '/login',
    admin: '/admin/login',
    observer: '/observer/login'
  };
  
  // Use a small delay to ensure the message is seen
  setTimeout(() => {
    window.location.href = loginPaths[userType];
  }, 1000);
};

export const getUserTypeFromToken = (token: string): 'user' | 'admin' | 'observer' | null => {
  try {
    if (!token) return null;
    
    const decoded: DecodedToken = jwtDecode(token);
    
    // Map roles to user types
    switch (decoded.role?.toUpperCase()) {
      case 'VOTER':
        return 'user';
      case 'ADMIN':
        return 'admin';
      case 'OBSERVER':
        return 'observer';
      default:
        return 'user'; // Default to user
    }
  } catch (error) {
    return null;
  }
};
