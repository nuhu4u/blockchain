import { apiRequest, ApiResponse } from '../api';

export interface ElectionStatus {
  wallet_address: string;
  is_active: boolean;
  total_voters: number;
  total_votes: number;
  election_status: string;
  blockchain_network: string;
  last_block_number: number;
}

export interface BlockchainTransaction {
  transaction_hash: string;
  block_number: number;
  gas_used: number;
  gas_price: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  confirmations: number;
  timestamp: string;
}

export interface VoteVerification {
  voter_id: string;
  election_id: string;
  candidate_id: string;
  transaction_hash: string;
  block_number: number;
  is_valid: boolean;
  verification_timestamp: string;
}

export interface SmartContractInfo {
  wallet_address: string;
  contract_name: string;
  contract_version: string;
  network_id: number;
  abi_hash: string;
  deployment_block: number;
  deployment_timestamp: string;
}

export interface BlockchainMetrics {
  total_transactions: number;
  average_gas_price: string;
  average_confirmation_time: number;
  network_congestion: 'LOW' | 'MEDIUM' | 'HIGH';
  last_updated: string;
}

export class BlockchainService {
  // Get election status from blockchain
  static async getElectionStatus(): Promise<ApiResponse<ElectionStatus>> {
    return apiRequest('/blockchain/election-status', { method: 'GET' });
  }

  // Verify a vote message signature
  static async verifyMessage(data: any): Promise<ApiResponse<{ isValid: boolean }>> {
    return apiRequest('/blockchain/verify-message', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get transaction status from blockchain
  static async getTransactionStatus(txHash: string): Promise<ApiResponse<BlockchainTransaction>> {
    return apiRequest(`/blockchain/transaction/${txHash}`, { method: 'GET' });
  }

  // Verify vote on blockchain
  static async verifyVoteOnChain(voteData: {
    voter_id: string;
    election_id: string;
    candidate_id: string;
    transaction_hash: string;
  }): Promise<ApiResponse<VoteVerification>> {
    return apiRequest('/blockchain/verify-vote', {
      method: 'POST',
      body: JSON.stringify(voteData),
    });
  }

  // Get smart contract information
  static async getSmartContractInfo(contractAddress: string): Promise<ApiResponse<SmartContractInfo>> {
    return apiRequest(`/blockchain/contract/${contractAddress}`, { method: 'GET' });
  }

  // Get blockchain metrics
  static async getBlockchainMetrics(): Promise<ApiResponse<BlockchainMetrics>> {
    return apiRequest('/blockchain/metrics', { method: 'GET' });
  }

  // Submit vote to blockchain
  static async submitVoteToBlockchain(voteData: {
    election_id: string;
    candidate_id: string;
    voter_signature: string;
    voter_public_key: string;
  }): Promise<ApiResponse<{ transaction_hash: string; block_number: number }>> {
    return apiRequest('/blockchain/submit-vote', {
      method: 'POST',
      body: JSON.stringify(voteData),
    });
  }

  // Get pending transactions
  static async getPendingTransactions(): Promise<ApiResponse<BlockchainTransaction[]>> {
    return apiRequest('/blockchain/pending-transactions', { method: 'GET' });
  }

  // Validate blockchain address
  static async validateAddress(address: string, network: string): Promise<ApiResponse<{ isValid: boolean; checksum: string }>> {
    return apiRequest('/blockchain/validate-address', {
      method: 'POST',
      body: JSON.stringify({ address, network }),
    });
  }

  // Get gas estimation for vote transaction
  static async estimateGasForVote(election_id: string): Promise<ApiResponse<{ estimated_gas: number; gas_price: string }>> {
    return apiRequest('/blockchain/estimate-gas', {
      method: 'POST',
      body: JSON.stringify({ election_id, action: 'vote' }),
    });
  }

  // Check if voter has already voted on blockchain
  static async checkVoterVoteStatus(voter_id: string, election_id: string): Promise<ApiResponse<{ has_voted: boolean; vote_details?: VoteVerification }>> {
    return apiRequest(`/blockchain/voter-status/${voter_id}/${election_id}`, { method: 'GET' });
  }
}
