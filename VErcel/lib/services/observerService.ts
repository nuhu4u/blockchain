import { apiRequest, ApiResponse, PaginatedResponse } from '../api';
import { Election } from './electionService';

// Types
export interface ObservationReport {
  id: string;
  election_id: string;
  observer_id: string;
  report_type: 'INCIDENT' | 'OBSERVATION' | 'VIOLATION' | 'ISSUE' | 'OTHER';
  title: string;
  description: string;
  incident_date: string;
  location?: string;
  evidence_urls?: string[];
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PENDING_REVIEW' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';
  created_at: string;
  updated_at: string;
  election?: Election;
}

export interface ReportComment {
  id: string;
  report_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface SubmitReportRequest {
  report_type: ObservationReport['report_type'];
  title: string;
  description: string;
  incident_date: string;
  location?: string;
  evidence_urls?: string[];
  severity?: ObservationReport['severity'];
}

export interface AddCommentRequest {
  content: string;
}

export interface GetReportsParams {
  electionId?: string;
  status?: ObservationReport['status'];
  page?: number;
  limit?: number;
}

// Observer Service
export class ObserverService {
  // Get observer's assigned elections
  static async getAssignedElections(
    token: string,
    params?: { status?: Election['status'] }
  ): Promise<ApiResponse<Election[]>> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    
    const query = searchParams.toString();
    const endpoint = query ? `/observer/elections?${query}` : '/observer/elections';
    
    return apiRequest(endpoint, {
      method: 'GET',
    }, token);
  }

  // Get election details for observer
  static async getElectionDetails(electionId: string, token: string): Promise<ApiResponse<Election>> {
    return apiRequest(`/observer/elections/${electionId}`, {
      method: 'GET',
    }, token);
  }

  // Submit observation report
  static async submitObservationReport(
    electionId: string, 
    data: SubmitReportRequest, 
    token: string
  ): Promise<ApiResponse<ObservationReport>> {
    return apiRequest(`/observer/elections/${electionId}/reports`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token);
  }

  // Get observer's reports
  static async getObserverReports(
    token: string,
    params?: GetReportsParams
  ): Promise<PaginatedResponse<ObservationReport>> {
    const searchParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined) searchParams.append(key, value.toString());
    });
    
    const query = searchParams.toString();
    const endpoint = query ? `/observer/reports?${query}` : '/observer/reports';
    
    return apiRequest(endpoint, {
      method: 'GET',
    }, token);
  }

  // Get report details
  static async getReportDetails(reportId: string, token: string): Promise<ApiResponse<ObservationReport>> {
    return apiRequest(`/observer/reports/${reportId}`, {
      method: 'GET',
    }, token);
  }

  // Add comment to report
  static async addCommentToReport(
    reportId: string, 
    data: AddCommentRequest, 
    token: string
  ): Promise<ApiResponse<ReportComment>> {
    return apiRequest(`/observer/reports/${reportId}/comments`, {
        method: 'POST',
        body: JSON.stringify(data),
    }, token);
  }
}
