// Service to work with the real geodata_full.ndjson file
export interface GeoDataState {
  state_id: string;
  state_name: string;
}

export interface GeoDataLGA {
  lga_id: string;
  lga_name: string;
  state_id: string;
}

export interface GeoDataWard {
  index: number;
  ward_name: string;
}

export interface GeoDataPollingUnit {
  code: string;
  pu_name: string;
  address: string;
}

export interface GeoDataStructure {
  states: GeoDataState[];
  lgas: GeoDataLGA[];
  templates: {
    wards: GeoDataWard[];
    polling_units: GeoDataPollingUnit[];
  };
}

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

export class RealGeoDataService {
  private static geoData: GeoDataStructure | null = null;

  /**
   * Load and parse the geodata_full.ndjson file
   */
  static async loadGeoData(): Promise<GeoDataStructure> {
    if (this.geoData) {
      return this.geoData;
    }

    try {
      // Check if we're on the server side
      if (typeof window === 'undefined') {
        // Server-side: use fs to read the file
        const fs = require('fs');
        const path = require('path');
        const geoDataPath = path.join(process.cwd(), 'public', 'geodata_full.ndjson');
        
        if (!fs.existsSync(geoDataPath)) {
          throw new Error(`Geo data file not found at: ${geoDataPath}`);
        }
        
        const fileContent = fs.readFileSync(geoDataPath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        this.geoData = data;
        return data;
      } else {
        // Client-side: use fetch
      const response = await fetch('/geodata_full.ndjson');
      if (!response.ok) {
        throw new Error(`Failed to load geo data: ${response.status}`);
      }
      
      const data = await response.json();
      
      this.geoData = data;
      return data;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Calculate comprehensive location statistics from real geo data
   */
  static async calculateLocationStats(): Promise<LocationStats> {
    const data = await this.loadGeoData();
    
    // Ensure we have the required data arrays
    if (!data.states || !Array.isArray(data.states)) {
      throw new Error('Invalid data structure: states array not found');
    }
    if (!data.lgas || !Array.isArray(data.lgas)) {
      throw new Error('Invalid data structure: lgas array not found');
    }
    if (!data.templates || !data.templates.wards || !Array.isArray(data.templates.wards)) {
      throw new Error('Invalid data structure: wards array not found in templates');
    }
    if (!data.templates || !data.templates.polling_units || !Array.isArray(data.templates.polling_units)) {
      throw new Error('Invalid data structure: polling_units array not found in templates');
    }
    
    // Count LGAs per state
    const lgaCountByState = new Map<string, number>();
    data.lgas.forEach((lga: GeoDataLGA) => {
      const count = lgaCountByState.get(lga.state_id) || 0;
      lgaCountByState.set(lga.state_id, count + 1);
    });

    // Count wards per state (using template: 5 wards per LGA)
    const wardCountByState = new Map<string, number>();
    data.lgas.forEach((lga: GeoDataLGA) => {
      const count = wardCountByState.get(lga.state_id) || 0;
      wardCountByState.set(lga.state_id, count + 5); // 5 wards per LGA (from template)
    });

    // Count polling units per state (using template: 5 polling units per ward, 5 wards per LGA = 25 per LGA)
    const pollingUnitCountByState = new Map<string, number>();
    data.lgas.forEach((lga: GeoDataLGA) => {
      const count = pollingUnitCountByState.get(lga.state_id) || 0;
      pollingUnitCountByState.set(lga.state_id, count + 25); // 25 polling units per LGA (5 wards × 5 PUs)
    });

    const stateStats = data.states.map(state => ({
      name: state.state_name,
      lgaCount: lgaCountByState.get(state.state_id) || 0,
      wardCount: wardCountByState.get(state.state_id) || 0,
      pollingUnitCount: pollingUnitCountByState.get(state.state_id) || 0
    }));

    // Calculate total wards and polling units using template data
    const totalWards = data.lgas.length * 5; // 368 LGAs × 5 wards per LGA = 1,840
    const totalPollingUnits = data.lgas.length * 25; // 368 LGAs × 25 polling units per LGA = 9,200

    const result = {
      totalStates: data.states.length,
      totalLGAs: data.lgas.length,
      totalWards: totalWards,
      totalPollingUnits: totalPollingUnits,
      states: stateStats
    };
    
    return result;
  }

  /**
   * Get detailed breakdown by state
   */
  static async getStateBreakdown() {
    const locationStats = await this.calculateLocationStats();
    return locationStats.states.sort((a, b) => b.pollingUnitCount - a.pollingUnitCount);
  }

  /**
   * Get top states by polling units
   */
  static async getTopStatesByPollingUnits(limit: number = 10) {
    const breakdown = await this.getStateBreakdown();
    return breakdown.slice(0, limit);
  }

  /**
   * Get states with most LGAs
   */
  static async getStatesWithMostLGAs(limit: number = 10) {
    const breakdown = await this.getStateBreakdown();
    return breakdown
      .sort((a, b) => b.lgaCount - a.lgaCount)
      .slice(0, limit);
  }

  /**
   * Search for polling units by name, address, or code
   */
  static async searchPollingUnits(query: string, limit: number = 50) {
    const data = await this.loadGeoData();
    
    const filtered = data.templates.polling_units.filter(pu => 
      pu.pu_name.toLowerCase().includes(query.toLowerCase()) ||
      pu.code.toLowerCase().includes(query.toLowerCase()) ||
      pu.address.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.slice(0, limit).map(pu => ({
      name: pu.pu_name,
      code: pu.code,
      address: pu.address,
      // Note: We'd need to map these back to their geographic hierarchy
      // This would require additional logic to trace back through the data structure
    }));
  }

  /**
   * Get all states
   */
  static async getStates(): Promise<GeoDataState[]> {
    const data = await this.loadGeoData();
    return data.states;
  }

  /**
   * Get LGAs for a specific state
   */
  static async getLGAsForState(stateId: string): Promise<GeoDataLGA[]> {
    const data = await this.loadGeoData();
    return data.lgas.filter((lga: GeoDataLGA) => lga.state_id === stateId);
  }

  /**
   * Get all LGAs
   */
  static async getAllLGAs(): Promise<GeoDataLGA[]> {
    const data = await this.loadGeoData();
    return data.lgas;
  }

  /**
   * Get all wards
   */
  static async getAllWards(): Promise<GeoDataWard[]> {
    const data = await this.loadGeoData();
    return data.templates.wards;
  }

  /**
   * Get all polling units
   */
  static async getAllPollingUnits(): Promise<GeoDataPollingUnit[]> {
    const data = await this.loadGeoData();
    return data.templates.polling_units;
  }

  /**
   * Get comprehensive admin dashboard stats
   */
  static async getAdminDashboardStats() {
    const locationStats = await this.calculateLocationStats();
    
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
   * Resolve state name from code or name
   */
  static resolveStateName(codeOrName: string): { code: string; name: string } | null {
    if (!codeOrName) return null;
    
    const data = this.geoData;
    if (!data?.states) return null;
    
    const normalized = codeOrName.trim().toUpperCase();
    
    // Try exact code match first
    const stateByCode = data.states.find(s => s.state_id === normalized);
    if (stateByCode) {
      return { code: stateByCode.state_id, name: stateByCode.state_name };
    }
    
    // Try case-insensitive name match
    const stateByName = data.states.find(s => 
      s.state_name.toLowerCase() === codeOrName.toLowerCase()
    );
    if (stateByName) {
      return { code: stateByName.state_id, name: stateByName.state_name };
    }
    
    // Try partial name match
    const stateByPartial = data.states.find(s => 
      s.state_name.toLowerCase().includes(codeOrName.toLowerCase())
    );
    if (stateByPartial) {
      return { code: stateByPartial.state_id, name: stateByPartial.state_name };
    }
    
    return null;
  }

  /**
   * Resolve LGA name from state and LGA codes/names
   */
  static resolveLgaName(stateCodeOrName: string, lgaCodeOrName: string): { code: string; name: string } | null {
    if (!stateCodeOrName || !lgaCodeOrName) return null;
    
    const data = this.geoData;
    if (!data?.lgas) return null;
    
    // First resolve the state
    const stateRes = this.resolveStateName(stateCodeOrName);
    if (!stateRes) return null;
    
    const normalizedLga = lgaCodeOrName.trim().toUpperCase();
    
    // Try exact LGA code match
    const lgaByCode = data.lgas.find((lga: GeoDataLGA) => 
      lga.lga_id === normalizedLga && lga.state_id === stateRes.code
    );
    if (lgaByCode) {
      return { code: lgaByCode.lga_id, name: lgaByCode.lga_name };
    }
    
    // Try case-insensitive name match
    const lgaByName = data.lgas.find((lga: GeoDataLGA) => 
      lga.lga_name.toLowerCase() === lgaCodeOrName.toLowerCase() && 
      lga.state_id === stateRes.code
    );
    if (lgaByName) {
      return { code: lgaByName.lga_id, name: lgaByName.lga_name };
    }
    
    // Try partial name match
    const lgaByPartial = data.lgas.find((lga: GeoDataLGA) => 
      lga.lga_name.toLowerCase().includes(lgaCodeOrName.toLowerCase()) && 
      lga.state_id === stateRes.code
    );
    if (lgaByPartial) {
      return { code: lgaByPartial.lga_id, name: lgaByPartial.lga_name };
    }
    
    return null;
  }

  /**
   * Resolve ward name from state, LGA, and ward codes/names
   */
  static resolveWardName(stateRef: string, lgaRef: string, wardRef: string): { code: string; name: string } | null {
    if (!stateRef || !lgaRef || !wardRef) return null;
    
    const data = this.geoData;
    if (!data?.templates?.wards) return null;
    
    // First resolve the LGA to ensure we have the right context
    const lgaRes = this.resolveLgaName(stateRef, lgaRef);
    if (!lgaRes) return null;
    
    const normalizedWard = wardRef.trim().toUpperCase();
    
    // Try exact ward code match (assuming ward codes follow a pattern)
    const wardByCode = data.templates.wards.find(ward => 
      ward.ward_name.toUpperCase().includes(normalizedWard) ||
      ward.ward_name.toLowerCase().includes(wardRef.toLowerCase())
    );
    if (wardByCode) {
      return { code: wardByCode.ward_name, name: wardByCode.ward_name };
    }
    
    // Try case-insensitive name match
    const wardByName = data.templates.wards.find(ward => 
      ward.ward_name.toLowerCase() === wardRef.toLowerCase()
    );
    if (wardByName) {
      return { code: wardByName.ward_name, name: wardByName.ward_name };
    }
    
    // Try partial name match
    const wardByPartial = data.templates.wards.find(ward => 
      ward.ward_name.toLowerCase().includes(wardRef.toLowerCase())
    );
    if (wardByPartial) {
      return { code: wardByPartial.ward_name, name: wardByPartial.ward_name };
    }
    
    return null;
  }

  /**
   * Resolve polling unit name from state, LGA, ward, and polling unit codes/names
   */
  static resolvePollingUnitName(stateRef: string, lgaRef: string, wardRef: string, puRef: string): { code: string; name: string } | null {
    if (!stateRef || !lgaRef || !wardRef || !puRef) return null;
    
    const data = this.geoData;
    if (!data?.templates?.polling_units) return null;
    
    // First resolve the ward to ensure we have the right context
    const wardRes = this.resolveWardName(stateRef, lgaRef, wardRef);
    if (!wardRes) return null;
    
    const normalizedPu = puRef.trim().toUpperCase();
    
    // Try exact polling unit code match
    const puByCode = data.templates.polling_units.find(pu => 
      pu.code === normalizedPu
    );
    if (puByCode) {
      return { code: puByCode.code, name: puByCode.pu_name };
    }
    
    // Try case-insensitive name match
    const puByName = data.templates.polling_units.find(pu => 
      pu.pu_name.toLowerCase() === puRef.toLowerCase()
    );
    if (puByName) {
      return { code: puByName.code, name: puByName.pu_name };
    }
    
    // Try partial name match
    const puByPartial = data.templates.polling_units.find(pu => 
      pu.pu_name.toLowerCase().includes(puRef.toLowerCase()) ||
      pu.code.toLowerCase().includes(puRef.toLowerCase())
    );
    if (puByPartial) {
      return { code: puByPartial.code, name: puByPartial.pu_name };
    }
    
    return null;
  }
}

// Export the resolver functions for use in other modules
export const resolveStateName = RealGeoDataService.resolveStateName.bind(RealGeoDataService);
export const resolveLgaName = RealGeoDataService.resolveLgaName.bind(RealGeoDataService);
export const resolveWardName = RealGeoDataService.resolveWardName.bind(RealGeoDataService);
export const resolvePollingUnitName = RealGeoDataService.resolvePollingUnitName.bind(RealGeoDataService);
