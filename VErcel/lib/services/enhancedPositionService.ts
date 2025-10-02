// Enhanced Position Tracking Service
// Handles complete data loading and live refresh functionality

export interface PositionData {
  polling_unit: {
    position: number;
    total: number;
    level_id: string;
  } | null;
  ward: {
    position: number;
    total: number;
    level_id: string;
  } | null;
  lga: {
    position: number;
    total: number;
    level_id: string;
  } | null;
  state: {
    position: number;
    total: number;
    level_id: string;
  } | null;
  national: {
    position: number;
    total: number;
    level_id: string;
  } | null;
}

export interface CompletePositionData {
  election: {
    id: string;
    title: string;
    status: string;
    total_votes: number;
    last_vote_time: string | null;
    recent_activity: number;
  };
  positions: {
    polling_unit: Record<string, any>;
    ward: Record<string, any>;
    lga: Record<string, any>;
    state: Record<string, any>;
    national: Record<string, any>;
  };
  statistics: {
    total_votes: number;
    last_updated: string;
    recent_activity: number;
  };
  userPosition?: {
    pollingUnitPosition?: number;
    wardPosition?: number;
    lgaPosition?: number;
  };
  recentVotes?: Array<{
    id: string;
    voter_id: string;
    candidate_id: string;
    timestamp: string;
    position: number;
  }>;
}

export interface LiveRefreshData {
  new_votes: number;
  total_votes: number;
  recent_activity: number;
  last_updated: string;
  new_votes_data: Array<{
    voter_id: string;
    timestamp: string;
    geographic_data: any;
  }>;
}

export class EnhancedPositionService {
  private static baseUrl = '/api/enhanced-position-tracking';

  /**
   * Get complete position data for instant loading
   */
  static async getCompletePositionData(electionId: string, token?: string): Promise<CompletePositionData> {
    try {
      // Get authentication token from parameter or localStorage
      const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : null);
      // Prepare headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add authorization header only if token is available
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${this.baseUrl}/${electionId}/complete`, {
        method: 'GET',
        headers,
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to load position data: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to load position data');
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user's specific position data
   */
  static async getUserPositionData(electionId: string, userId: string): Promise<{
    user_id: string;
    election_id: string;
    positions: PositionData;
    geographic_data: any;
    vote_timestamp: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/${electionId}/user/${userId}`, {
        method: 'GET',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to load user position data: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to load user position data');
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get live refresh data (incremental updates)
   */
  static async getLiveRefreshData(electionId: string, lastUpdateTime?: Date): Promise<LiveRefreshData> {
    try {
      // Get authentication token (optional)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const url = new URL(`${this.baseUrl}/${electionId}/refresh`, window.location.origin);
      if (lastUpdateTime) {
        url.searchParams.set('lastUpdate', lastUpdateTime.toISOString());
      }

      // Prepare headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add authorization header only if token is available
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to load refresh data: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to load refresh data');
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format position data for display
   */
  static formatPositionData(positions: PositionData): {
    pollingUnit: string;
    ward: string;
    lga: string;
    state: string;
    national: string;
  } {
    return {
      pollingUnit: positions.polling_unit 
        ? `Position ${positions.polling_unit.position} of ${positions.polling_unit.total} in ${positions.polling_unit.level_id}`
        : 'Not available',
      ward: positions.ward 
        ? `Position ${positions.ward.position} of ${positions.ward.total} in ${positions.ward.level_id}`
        : 'Not available',
      lga: positions.lga 
        ? `Position ${positions.lga.position} of ${positions.lga.total} in ${positions.lga.level_id}`
        : 'Not available',
      state: positions.state 
        ? `Position ${positions.state.position} of ${positions.state.total} in ${positions.state.level_id}`
        : 'Not available',
      national: positions.national 
        ? `Position ${positions.national.position} of ${positions.national.total} nationally`
        : 'Not available',
    };
  }

  /**
   * Format time ago string
   */
  static formatTimeAgo(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }
}
