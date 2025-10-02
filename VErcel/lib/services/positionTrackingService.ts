import { ApiResponse } from '../api';

export interface PositionData {
  level: string;
  level_id: string;
  total_votes: number;
  positions: Array<{
    voter_id: string;
    position: number;
    timestamp: string;
  }>;
  last_updated: string;
}

export interface UserPositions {
  sequential: number;
  polling_unit: number | null;
  ward: number | null;
  lga: number | null;
  state: number | null;
  national: number;
}

export interface HierarchyLevel {
  id: string;
  name: string;
  position: number | null;
  levelId: string | null;
  totalVotes: number;
  hasPosition: boolean;
}

export interface PositionTrackingStats {
  totalVotes: number;
  votesWithPositions: number;
  positionRecords: number;
  calculationStatus: string;
  lastCalculation: string | null;
}

export interface ElectionLevelsData {
  election: {
    id: string;
    title: string;
    type: string;
    status: string;
  };
  totalVotes: number;
  levels: {
    [key: string]: PositionData[];
  };
}

export interface UserPositionData {
  election: {
    id: string;
    title: string;
    type: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  totalVotes: number;
  positions: UserPositions;
}

export interface HierarchyData {
  election: {
    id: string;
    title: string;
    type: string;
  };
  user: {
    id: string;
    voteTimestamp: string;
    transactionHash: string;
  };
  hierarchy: HierarchyLevel[];
  summary: {
    totalLevels: number;
    levelsWithPosition: number;
    earliestPosition: number;
    nationalPosition: number;
  };
}

class PositionTrackingService {
  private baseUrl = '/api/position-tracking';

  /**
   * Get all position levels for an election
   */
  async getElectionLevels(electionId: string): Promise<ApiResponse<ElectionLevelsData>> {
    try {
      const response = await fetch(`${this.baseUrl}/${electionId}/levels`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Election levels fetched successfully',
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to fetch election levels',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error while fetching election levels',
      };
    }
  }

  /**
   * Get position data for a specific level
   */
  async getLevelData(
    electionId: string, 
    level: string, 
    levelId?: string
  ): Promise<ApiResponse<{ election: any; level: string; levelId: string | null; totalVotes: number; positions: PositionData[] }>> {
    try {
      let url = `${this.baseUrl}/${electionId}/level/${level}`;
      if (levelId) {
        url += `?levelId=${encodeURIComponent(levelId)}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Level data fetched successfully',
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to fetch level data',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error while fetching level data',
      };
    }
  }

  /**
   * Get user's positions across all levels for an election
   */
  async getUserPositions(electionId: string, userId: string): Promise<ApiResponse<UserPositionData>> {
    try {
      // Try multiple token sources in order of preference
      const token = localStorage.getItem('user_token') || 
                   localStorage.getItem('auth_token') || 
                   localStorage.getItem('token') ||
                   sessionStorage.getItem('user_token') ||
                   sessionStorage.getItem('auth_token');
      
      if (!token) {
        return {
          success: false,
          message: 'Authentication required - no token found',
        };
      }
      
      const response = await fetch(`${this.baseUrl}/${electionId}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'User positions fetched successfully',
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: data.message || `Failed to fetch user positions (${response.status})`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error while fetching user positions',
      };
    }
  }

  /**
   * Get complete hierarchy breakdown for a user's vote
   */
  async getUserHierarchy(electionId: string, userId: string): Promise<ApiResponse<HierarchyData>> {
    try {
      // Try multiple token sources in order of preference
      const token = localStorage.getItem('user_token') || 
                   localStorage.getItem('auth_token') || 
                   localStorage.getItem('token') ||
                   sessionStorage.getItem('user_token') ||
                   sessionStorage.getItem('auth_token');
      
      if (!token) {
        return {
          success: false,
          message: 'Authentication required - no token found',
        };
      }
      
      const response = await fetch(`${this.baseUrl}/${electionId}/hierarchy/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Data fetched successfully',
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: data.message || `Failed to fetch user hierarchy (${response.status})`,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error while fetching user hierarchy',
      };
    }
  }

  /**
   * Get position tracking statistics for an election
   */
  async getElectionStats(electionId: string): Promise<ApiResponse<{ election: any; statistics: PositionTrackingStats }>> {
    try {
      const response = await fetch(`${this.baseUrl}/${electionId}/stats`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Data fetched successfully',
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to fetch election stats',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error while fetching election stats',
      };
    }
  }

  /**
   * Recalculate all positions for an election (Admin only)
   */
  async recalculatePositions(electionId: string): Promise<ApiResponse<{ election: any; totalVotes: number }>> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return {
          success: false,
          message: 'Authentication required',
        };
      }

      const response = await fetch(`${this.baseUrl}/${electionId}/recalculate`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: 'Data fetched successfully',
          data: data.data,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Failed to recalculate positions',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error while recalculating positions',
      };
    }
  }
}

export const positionTrackingService = new PositionTrackingService();
