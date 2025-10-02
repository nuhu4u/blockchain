import { nigerianAdministrativeData } from '@/lib/data/nigerian-administrative-data';

export interface LocationStats {
  totalStates: number;
  totalLGAs: number;
  totalWards: number;
  totalPollingUnits: number;
  states: Array<{
    name: string;
    lgaCount: number;
    wardCount: number;
    pollingUnitCount: number;
  }>;
}

export interface AdminLocationStats {
  totalStates: number;
  totalLGAs: number;
  totalWards: number;
  totalPollingUnits: number;
  totalVoters: number; // This would come from user registration data
  activeElections: number; // This would come from election data
  pendingObservers: number; // This would come from observer data
  approvedObservers: number; // This would come from observer data
  rejectedObservers: number; // This would come from observer data
}

export class AdminStatsService {
  /**
   * Calculate comprehensive location statistics from Nigerian administrative data
   */
  static calculateLocationStats(): LocationStats {
    const states = Object.values(nigerianAdministrativeData);
    
    let totalLGAs = 0;
    let totalWards = 0;
    let totalPollingUnits = 0;
    
    const stateStats = states.map(state => {
      const lgas = Object.values(state.lgas);
      let stateLgaCount = lgas.length;
      let stateWardCount = 0;
      let statePollingUnitCount = 0;
      
      lgas.forEach(lga => {
        const wards = Object.values(lga.wards);
        stateWardCount += wards.length;
        
        wards.forEach(ward => {
          statePollingUnitCount += ward.pollingUnits.length;
        });
      });
      
      totalLGAs += stateLgaCount;
      totalWards += stateWardCount;
      totalPollingUnits += statePollingUnitCount;
      
      return {
        name: state.name,
        lgaCount: stateLgaCount,
        wardCount: stateWardCount,
        pollingUnitCount: statePollingUnitCount
      };
    });
    
    return {
      totalStates: states.length,
      totalLGAs,
      totalWards,
      totalPollingUnits,
      states: stateStats
    };
  }
  
  /**
   * Get detailed breakdown by state
   */
  static getStateBreakdown() {
    const locationStats = this.calculateLocationStats();
    return locationStats.states.sort((a, b) => b.pollingUnitCount - a.pollingUnitCount);
  }
  
  /**
   * Get top states by polling units
   */
  static getTopStatesByPollingUnits(limit: number = 10) {
    return this.getStateBreakdown().slice(0, limit);
  }
  
  /**
   * Get states with most LGAs
   */
  static getStatesWithMostLGAs(limit: number = 10) {
    return this.getStateBreakdown()
      .sort((a, b) => b.lgaCount - a.lgaCount)
      .slice(0, limit);
  }
  
  /**
   * Get comprehensive admin dashboard stats
   * This combines location data with dynamic data from the database
   */
  static async getAdminDashboardStats(): Promise<AdminLocationStats> {
    const locationStats = this.calculateLocationStats();
    
    // These would typically come from your database/API
    // For now, we'll use the location stats and add placeholders for dynamic data
    return {
      totalStates: locationStats.totalStates,
      totalLGAs: locationStats.totalLGAs,
      totalWards: locationStats.totalWards,
      totalPollingUnits: locationStats.totalPollingUnits,
      totalVoters: 0, // This should come from user registration count
      activeElections: 0, // This should come from election data
      pendingObservers: 0, // This should come from observer data
      approvedObservers: 0, // This should come from observer data
      rejectedObservers: 0, // This should come from observer data
    };
  }
  
  /**
   * Get polling units for a specific state
   */
  static getPollingUnitsForState(stateKey: string) {
    const state = nigerianAdministrativeData[stateKey];
    if (!state) return [];
    
    const pollingUnits: Array<{
      name: string;
      ward: string;
      lga: string;
      state: string;
    }> = [];
    
    Object.entries(state.lgas).forEach(([lgaKey, lga]) => {
      Object.entries(lga.wards).forEach(([wardKey, ward]) => {
        ward.pollingUnits.forEach(pu => {
          pollingUnits.push({
            name: pu,
            ward: ward.name,
            lga: lga.name,
            state: state.name
          });
        });
      });
    });
    
    return pollingUnits;
  }
  
  /**
   * Search for polling units by name
   */
  static searchPollingUnits(query: string, limit: number = 50) {
    const allPollingUnits: Array<{
      name: string;
      ward: string;
      lga: string;
      state: string;
    }> = [];
    
    Object.entries(nigerianAdministrativeData).forEach(([stateKey, state]) => {
      Object.entries(state.lgas).forEach(([lgaKey, lga]) => {
        Object.entries(lga.wards).forEach(([wardKey, ward]) => {
          ward.pollingUnits.forEach(pu => {
            allPollingUnits.push({
              name: pu,
              ward: ward.name,
              lga: lga.name,
              state: state.name
            });
          });
        });
      });
    });
    
    const filtered = allPollingUnits.filter(pu => 
      pu.name.toLowerCase().includes(query.toLowerCase()) ||
      pu.ward.toLowerCase().includes(query.toLowerCase()) ||
      pu.lga.toLowerCase().includes(query.toLowerCase()) ||
      pu.state.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.slice(0, limit);
  }
}
