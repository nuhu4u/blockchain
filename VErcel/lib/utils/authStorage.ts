/**
 * Separate authentication storage for different user types
 * This prevents conflicts when multiple user types are logged in simultaneously
 */

export type UserType = 'user' | 'admin' | 'observer';

export interface AuthData {
  token: string;
  user: any;
  userType: UserType;
  loginTime: number;
}

export class AuthStorage {
  private static getStorageKey(userType: UserType, key: 'token' | 'user' | 'data'): string {
    return `${userType}_${key}`;
  }

  private static getDataKey(userType: UserType): string {
    return this.getStorageKey(userType, 'data');
  }

  private static getTokenKey(userType: UserType): string {
    return this.getStorageKey(userType, 'token');
  }

  private static getUserKey(userType: UserType): string {
    return this.getStorageKey(userType, 'user');
  }

  /**
   * Store authentication data for a specific user type
   */
  static setAuthData(userType: UserType, token: string, user: any): void {
    const authData: AuthData = {
      token,
      user,
      userType,
      loginTime: Date.now()
    };

    // Store in localStorage with user type prefix
    localStorage.setItem(this.getDataKey(userType), JSON.stringify(authData));
    localStorage.setItem(this.getTokenKey(userType), token);
    localStorage.setItem(this.getUserKey(userType), JSON.stringify(user));

    // Also store in sessionStorage for security
    sessionStorage.setItem(this.getDataKey(userType), JSON.stringify(authData));
  }

  /**
   * Get authentication data for a specific user type
   */
  static getAuthData(userType: UserType): AuthData | null {
    try {
      const data = localStorage.getItem(this.getDataKey(userType));
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      }
    return null;
  }

  /**
   * Get token for a specific user type
   */
  static getToken(userType: UserType): string | null {
    return localStorage.getItem(this.getTokenKey(userType));
  }

  /**
   * Get user data for a specific user type
   */
  static getUser(userType: UserType): any | null {
    try {
      const data = localStorage.getItem(this.getUserKey(userType));
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      }
    return null;
  }

  /**
   * Check if a user type is authenticated
   */
  static isAuthenticated(userType: UserType): boolean {
    const authData = this.getAuthData(userType);
    return !!(authData?.token && authData?.user);
  }

  /**
   * Clear authentication data for a specific user type
   */
  static clearAuthData(userType: UserType): void {
    localStorage.removeItem(this.getDataKey(userType));
    localStorage.removeItem(this.getTokenKey(userType));
    localStorage.removeItem(this.getUserKey(userType));
    
    sessionStorage.removeItem(this.getDataKey(userType));
  }

  /**
   * Clear all authentication data for all user types
   */
  static clearAllAuthData(): void {
    const userTypes: UserType[] = ['user', 'admin', 'observer'];
    userTypes.forEach(userType => {
      this.clearAuthData(userType);
    });

    // Also clear legacy keys
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user_data');
  }

  /**
   * Get all authenticated user types
   */
  static getAuthenticatedUserTypes(): UserType[] {
    const userTypes: UserType[] = ['user', 'admin', 'observer'];
    return userTypes.filter(userType => this.isAuthenticated(userType));
  }

  /**
   * Get the most recent login user type
   */
  static getMostRecentUserType(): UserType | null {
    const userTypes: UserType[] = ['user', 'admin', 'observer'];
    let mostRecent: UserType | null = null;
    let mostRecentTime = 0;

    userTypes.forEach(userType => {
      const authData = this.getAuthData(userType);
      if (authData && authData.loginTime > mostRecentTime) {
        mostRecent = userType;
        mostRecentTime = authData.loginTime;
      }
    });

    return mostRecent;
  }

  /**
   * Migrate legacy auth data to new format
   */
  static migrateLegacyAuthData(): void {
    // Check for legacy keys and migrate them
    const legacyToken = localStorage.getItem('user_token') || localStorage.getItem('auth_token');
    const legacyUser = localStorage.getItem('user_data');

    if (legacyToken && legacyUser) {
      try {
        const user = JSON.parse(legacyUser);
        const userType = this.determineUserTypeFromUser(user);
        
        if (userType) {
          // Check if already migrated
          const existingData = this.getAuthData(userType);
          if (!existingData) {
            // Migrate to new format
            this.setAuthData(userType, legacyToken, user);
            }
        }
      } catch (error) {
        }
    }
  }

  /**
   * Determine user type from user object
   */
  private static determineUserTypeFromUser(user: any): UserType | null {
    if (!user || !user.role) return null;

    switch (user.role.toUpperCase()) {
      case 'VOTER':
        return 'user';
      case 'ADMIN':
        return 'admin';
      case 'OBSERVER':
        return 'observer';
      default:
        return 'user'; // Default to user
    }
  }
}
