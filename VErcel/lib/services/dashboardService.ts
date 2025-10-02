import { apiRequest, ApiResponse } from '../api';

// Types
export interface DashboardStats {
  total_elections: number;
  active_elections: number;
  completed_elections: number;
  total_voters: number;
  total_observers: number;
  voter_turnout: number;
  active_voters: number;
}

export interface ElectionResultsSummary {
  election: {
    id: string;
    title: string;
    election_type: string;
    total_votes: number;
    total_candidates: number;
  };
  results: Array<{
    candidate_name: string;
    party_name: string;
    votes: number;
    percentage: number;
  }>;
}

export interface VoterAnalytics {
  total_voters: number;
  demographics: {
    age_groups: Array<{
      range: string;
      count: number;
      percentage: number;
    }>;
    gender_distribution: Array<{
      gender: string;
      count: number;
      percentage: number;
    }>;
    state_distribution: Array<{
      state: string;
      count: number;
      percentage: number;
    }>;
  };
  registration_trend: Array<{
    month: string;
    count: number;
  }>;
  voter_turnout: Array<{
    election: string;
    total_voters: number;
    voters_voted: number;
    percentage: number;
  }>;
}

export interface VoterDashboard {
  voterInfo: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    nin_verified: boolean;
    user_unique_id: string;
    wallet_address: string;
    created_at: string;
    geographicData?: {
      stateOfOrigin: string | null;
      lgaOfOrigin: string | null;
      stateOfResidence: string | null;
      lgaOfResidence: string | null;
      ward: string | null;
      pollingUnit: string | null;
      stateCode: string | null;
      lgaCode: string | null;
      wardCode: string | null;
      pollingUnitCode: string | null;
    } | null;
  };
  activeElections: Array<any>;
  upcomingElections: Array<any>;
  completedElections: Array<any>;
  myVotes: Array<any>;
  voterStats: {
    totalVotes: number;
    uniqueElections: Array<string>;
  };
}

// Dashboard Service
export class DashboardService {
  // Get voter dashboard data
  static async getVoterDashboard(token: string): Promise<ApiResponse<VoterDashboard>> {
    return apiRequest('/dashboard/voter', {
      method: 'GET',
    }, token);
  }

  // Get dashboard statistics (admin only)
  static async getDashboardStats(token: string): Promise<ApiResponse<DashboardStats>> {
    return apiRequest('/dashboard/stats', {
      method: 'GET',
    }, token);
  }

  // Get election results summary
  static async getElectionResultsSummary(electionId: string, token: string): Promise<ApiResponse<ElectionResultsSummary>> {
    return apiRequest(`/dashboard/elections/${electionId}/results`, {
      method: 'GET',
    }, token);
  }

  // Get voter analytics (admin only)
  static async getVoterAnalytics(
    token: string,
    params?: { limit?: number; page?: number }
  ): Promise<ApiResponse<VoterAnalytics>> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.page) searchParams.append('page', params.page.toString());
    
    const query = searchParams.toString();
    const endpoint = query ? `/dashboard/analytics/voters?${query}` : '/dashboard/analytics/voters';
    
    return apiRequest(endpoint, {
      method: 'GET',
    }, token);
  }
}
