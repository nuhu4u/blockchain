export interface Observer {
  id: string;
  organization_name: string;
  organization_type: string;
  email: string;
  website?: string;
  phone: string;
  country_code: string;
  address: string;
  state: string;
  lga: string;
  ward: string;
  polling_unit: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  approved_by_id?: string;
  approved_at?: string;
  rejection_reason?: string;
}

export interface ObserverAssignment {
  id: string;
  observer_id: string;
  election_id: string;
  polling_unit_id?: string;
  ward_id?: string;
  lga_id?: string;
  state_id?: string;
  assigned_at: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface ObservationReport {
  id: string;
  observer_id: string;
  election_id: string;
  polling_unit_id?: string;
  ward_id?: string;
  lga_id?: string;
  state_id?: string;
  report_type: 'opening' | 'voting' | 'closing' | 'incident';
  content: string;
  timestamp: string;
  status: 'draft' | 'submitted' | 'verified';
  attachments?: string[];
  verified_by?: string;
  verified_at?: string;
}

export interface AdminDashboardStats {
  totalVoters: number;
  totalPollingUnits: number;
  totalLGAs: number;
  totalStates: number;
  totalWards: number;
  activeElections: number;
  pendingObservers: number;
  approvedObservers: number;
  rejectedObservers: number;
}

export interface ReportComment {
  id: string;
  report_id: string;
  commenter_id: string;
  commenter_name: string;
  comment: string;
  created_at: string;
}

export interface GetObserversParams {
  status?: 'pending' | 'approved' | 'rejected';
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetReportsParams {
  status?: 'draft' | 'submitted' | 'verified';
  report_type?: 'opening' | 'voting' | 'closing' | 'incident';
  page?: number;
  limit?: number;
  observer_id?: string;
  election_id?: string;
}

export interface AssignObserverRequest {
  observer_id: string;
  election_id: string;
  polling_unit_id?: string;
  ward_id?: string;
  lga_id?: string;
  state_id?: string;
  notes?: string;
}

export interface UpdateAssignmentStatusRequest {
  assignment_id: string;
  status: 'active' | 'completed' | 'cancelled';
  notes?: string;
}

export interface UpdateReportStatusRequest {
  report_id: string;
  status: 'draft' | 'submitted' | 'verified';
  verified_by?: string;
  notes?: string;
}

class AdminService {
  private baseUrl = '/api/admin';

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async getDashboardStats(): Promise<AdminDashboardStats> {
    try {
      const response = await fetch(`${this.baseUrl}/dashboard`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch dashboard stats`);
      }

      const data = await response.json();
      return data.data.stats;
    } catch (error) {
      throw error;
    }
  }

  async getObservers(): Promise<Observer[]> {
    try {
      const response = await fetch(`${this.baseUrl}/observers`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch observers`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

    async getObserverDetails(observerId: string): Promise<Observer> {
    try {
      const response = await fetch(`${this.baseUrl}/observers/${observerId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch observer details`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }

  async approveObserver(observerId: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/observers/${observerId}/approve`, {
      method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to approve observer`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async rejectObserver(observerId: string, rejectionReason?: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/observers/${observerId}/reject`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ rejectionReason }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to reject observer`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getObservationReports(): Promise<ObservationReport[]> {
    try {
      const response = await fetch(`${this.baseUrl}/reports`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to fetch observation reports`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

export const adminService = new AdminService();