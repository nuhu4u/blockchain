import { apiRequest, ApiResponse, PaginatedResponse } from '../api';

// Types
export interface Election {
  id: string;
  _id?: string; // MongoDB _id field
  title: string;
  description?: string;
  election_type: 'PRESIDENTIAL' | 'GUBERNATORIAL' | 'HOUSE_OF_ASSEMBLY' | 'SENATORIAL' | 'HOUSE_OF_REPS' | 'LOCAL_GOVERNMENT';
  start_date: string;
  end_date: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  state_id?: string;
  lga_id?: string;
  ward_id?: string;
  polling_unit_id?: string;
  created_by: string;
  blockchain_wallet_address?: string;
  created_at: string;
  updated_at: string;
  candidates?: Candidate[];
  state?: GeoData;
  lga?: GeoData;
  ward?: GeoData;
  pollingUnit?: GeoData;
}

export interface Candidate {
  id: string;
  election_id: string;
  user_id: string;
  party_id: string;
  position: string;
  manifesto?: string;
  status: 'APPROVED' | 'REJECTED';
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  party?: {
    id: string;
    name: string;
    acronym: string;
  };
}

export interface GeoData {
  id: string;
  name: string;
  type: 'STATE' | 'LGA' | 'WARD' | 'POLLING_UNIT';
}

export interface CreateElectionRequest {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  election_type: Election['election_type'];
  state_id?: string;
  lga_id?: string;
  ward_id?: string;
  polling_unit_id?: string;
  candidates?: Array<{
    user_id: string;
    party_id: string;
    position: string;
    manifesto?: string;
  }>;
}

export interface UpdateElectionRequest {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  status?: Election['status'];
  state_id?: string;
  lga_id?: string;
  ward_id?: string;
  polling_unit_id?: string;
}

export interface AddCandidateRequest {
  user_id: string;
  party_id: string;
  position: string;
  manifesto?: string;
}

export interface UpdateCandidateStatusRequest {
  status: 'APPROVED' | 'REJECTED';
  rejection_reason?: string;
}

export interface CastVoteRequest {
  candidate_id: string;
}

export interface Vote {
  id: string;
  voter_id: string;
  election_id: string;
  candidate_id: string;
  vote_timestamp: string;
  candidate?: Candidate;
}

export interface ElectionResults {
  election: Election;
  results: Array<{
    id: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
    party: {
      id: string;
      name: string;
      acronym: string;
    };
    position: string;
    votes: number;
    vote_percentage: number;
  }>;
  summary: {
    total_votes: number;
    total_valid_votes: number;
    total_invalid_votes: number;
    voter_turnout: number;
    candidates_count: number;
  };
}

// Election Service
export class ElectionService {
  // Get all elections with filtering
  static async getElections(params?: {
    page?: number;
    limit?: number;
    status?: Election['status'];
    type?: Election['election_type'];
    state_id?: string;
    lga_id?: string;
    ward_id?: string;
    polling_unit_id?: string;
    search?: string;
  }): Promise<PaginatedResponse<Election>> {
    const searchParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString());
    });
    
    // Add cache-busting parameter for live updates
    searchParams.append('_t', Date.now().toString());
    
    const query = searchParams.toString();
    const endpoint = `/elections?${query}`;
    // For public elections viewing, we don't require authentication
    // The API should handle public access to election data
    const result = await apiRequest(endpoint, {
      method: 'GET',
    });
    
    return result;
  }

  // Get election by ID
  static async getElectionById(id: string): Promise<ApiResponse<Election>> {
    return apiRequest(`/elections/${id}`, {
      method: 'GET',
    });
  }

  // Get election results
  static async getElectionResults(id: string): Promise<ApiResponse<ElectionResults>> {
    return apiRequest(`/elections/${id}/results`, {
      method: 'GET',
    });
  }

  // Create election (Admin only)
  static async createElection(data: CreateElectionRequest, token: string): Promise<ApiResponse<Election>> {
    return apiRequest('/elections', {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  // Update election (Admin only)
  static async updateElection(id: string, data: UpdateElectionRequest, token: string): Promise<ApiResponse<Election>> {
    return apiRequest(`/elections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }

  // Delete election (Admin only)
  static async deleteElection(id: string, token: string): Promise<ApiResponse> {
    return apiRequest(`/elections/${id}`, {
      method: 'DELETE',
    }, token);
  }

  // Add candidate to election (Admin only)
  static async addCandidate(electionId: string, data: AddCandidateRequest, token: string): Promise<ApiResponse<Candidate>> {
    return apiRequest(`/elections/${electionId}/candidates`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  // Update candidate status (Admin only)
  static async updateCandidateStatus(
    electionId: string, 
    candidateId: string, 
    data: UpdateCandidateStatusRequest, 
    token: string
  ): Promise<ApiResponse<Candidate>> {
    return apiRequest(`/elections/${electionId}/candidates/${candidateId}/status`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token);
  }

  // Remove candidate from election (Admin only)
  static async removeCandidate(electionId: string, candidateId: string, token: string): Promise<ApiResponse> {
    return apiRequest(`/elections/${electionId}/candidates/${candidateId}`, {
      method: 'DELETE',
    }, token);
  }

  // Cast vote
  static async castVote(electionId: string, data: CastVoteRequest, token: string): Promise<ApiResponse<Vote>> {
    return apiRequest(`/elections/${electionId}/vote`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  // Get user's vote for a specific election
  static async getMyVote(electionId: string, token: string): Promise<ApiResponse<Vote>> {
    return apiRequest(`/elections/${electionId}/my-vote`, {
      method: 'GET',
    }, token);
  }

  // Get election details for observer
  static async getElectionForObserver(electionId: string, token: string): Promise<ApiResponse<Election>> {
    return apiRequest(`/elections/${electionId}/observer`, {
      method: 'GET',
    }, token);
  }

  // Get candidates for an election
  static async getElectionCandidates(electionId: string, token: string): Promise<ApiResponse<Candidate[]>> {
    return apiRequest(`/elections/${electionId}/candidates`, {
      method: 'GET',
    }, token);
  }
}
