// Vote Position Service
// Handles vote position data with real API integration

export interface VotePositionData {
  election: {
    id: string;
    title: string;
    description: string;
    status: string;
    start_date: string;
    end_date: string;
    election_type: string;
  };
  statistics: {
    total_votes: number;
    registered_voters: number;
    non_voters: number;
    turnout_percentage: number;
    last_vote_time: string | null;
    recent_activity: number;
  };
  candidates: Array<{
    candidateId: string;
    votes: number;
    percentage: number;
  }>;
  leading_candidate: {
    candidateId: string;
    votes: number;
    percentage: number;
  } | null;
  recent_votes: Array<{
    position: number;
    timestamp: string;
    voterId: string;
    transactionHash: string;
    blockNumber: string;
    candidateId: string;
  }>;
  blockchain_info: {
    total_transactions: number;
    last_transaction_hash: string | null;
    last_block_number: string | null;
  };
}

export interface UserVotePositionData {
  user: {
    id: string;
    name: string;
    email: string;
    voter_id: string;
    wallet_address: string;
  };
  vote: {
    position: number;
    total_votes: number;
    timestamp: string;
    transaction_hash: string;
    block_number: string;
    candidate_id: string;
  };
  geographic_data: {
    polling_unit: string;
    ward: string;
    lga: string;
    state: string;
  };
}

export class VotePositionService {
  private static baseUrl = '/api/vote-position';

  /**
   * Get comprehensive vote position data for an election
   */
  static async getVotePositionData(electionId: string, userId?: string): Promise<VotePositionData> {
    try {
      const url = new URL(`${this.baseUrl}/${electionId}`, window.location.origin);
      if (userId) {
        url.searchParams.set('userId', userId);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to load vote position data: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to load vote position data');
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user's specific vote position data
   */
  static async getUserVotePositionData(electionId: string, userId: string): Promise<UserVotePositionData> {
    try {
      const response = await fetch(`/api/vote-position/${electionId}/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to load user vote position data: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to load user vote position data');
      }

      return result.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Format position data for display
   */
  static formatPositionData(position: number, total: number, level: string): string {
    if (position && total) {
      return `Position ${position} of ${total} in ${level}`;
    }
    return 'Not available';
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

  /**
   * Format percentage
   */
  static formatPercentage(value: number): string {
    return `${value.toFixed(1)}%`;
  }

  /**
   * Format number with commas
   */
  static formatNumber(value: number): string {
    return value.toLocaleString();
  }
}
