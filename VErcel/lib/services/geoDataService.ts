export type ApiResult<T> = { success: true; data: T } | { success: false; message: string };

// Utility function to parse JSON or NDJSON responses
async function parseAsJsonOrNdjson<T>(res: Response): Promise<T[]> {
  try {
    const text = await res.text();
    const json = JSON.parse(text);
    
    // Handle our API response format: { success: true, data: [...] }
    if (json && json.success === true && Array.isArray(json.data)) {
      return json.data;
    }
    
    // Handle direct array response
    if (Array.isArray(json)) {
      return json;
    }
    
    // Handle NDJSON format (fallback)
    if (typeof text === 'string') {
      const lines = text.split(/\r?\n/).filter(Boolean);
      const parsed = lines.map(l => JSON.parse(l));
      return parsed;
    }
    
    return [];
  } catch (error) {
    return [];
  }
}

// Normalized data types for consistent dropdown rendering
export interface NormalizedGeoData {
  id: string;
  name: string;
}

export interface State {
  state_id: string;
  state_name: string;
}

export interface LGA {
  lga_id: string;
  lga_name: string;
  state_id: string;
}

export interface Ward {
  ward_id: string;
  ward_name: string;
  lga_id: string;
}

export interface PollingUnit {
  pu_id: string;
  pu_name: string;
  ward_id: string;
  address?: string | null;
  gps_lat?: number | null;
  gps_lng?: number | null;
}

// Helper function to normalize geo data to consistent format
function normalizeGeoData(data: any[], idField: string, nameField: string): NormalizedGeoData[] {
  return data.map(item => ({
    id: item[idField],
    name: item[nameField]
  }));
}

// Helper function to create unique IDs for static templates
function createUniqueId(prefix: string, baseId: string, index: number): string {
  return `${prefix}-${baseId}-${String(index).padStart(2, '0')}`;
}

export const GeoDataService = {
  async getStates(): Promise<ApiResult<NormalizedGeoData[]>> {
    try {
      const res = await fetch('/api/geo-data?type=state', {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        return { success: false, message: `Request failed: ${res.status}` };
      }
      
      const data = await parseAsJsonOrNdjson<State>(res);
      const normalized = normalizeGeoData(data, 'state_id', 'state_name');
      return { success: true, data: normalized };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  },

  async getLGAsForState(stateId: string): Promise<ApiResult<NormalizedGeoData[]>> {
    if (!stateId) return { success: false, message: "stateId is required" };
    
    try {
      const res = await fetch(`/api/geo-data?type=lga&state_id=${encodeURIComponent(stateId)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        return { success: false, message: `Request failed: ${res.status}` };
      }
      
      const data = await parseAsJsonOrNdjson<LGA>(res);
      const normalized = normalizeGeoData(data, 'lga_id', 'lga_name');
      return { success: true, data: normalized };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  },

  async getWardsForLGA(lgaId: string): Promise<ApiResult<NormalizedGeoData[]>> {
    if (!lgaId) return { success: false, message: "lgaId is required" };
    
    try {
      const res = await fetch(`/api/geo-data?type=ward&lga_id=${encodeURIComponent(lgaId)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        return { success: false, message: `Request failed: ${res.status}` };
      }
      
      const data = await parseAsJsonOrNdjson<Ward>(res);
      
      // Create unique ward IDs for this specific LGA
      const normalized = data.map((ward, index) => ({
        id: createUniqueId('WARD', lgaId, index + 1),
        name: ward.ward_name
      }));
      
      return { success: true, data: normalized };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  },

  async getPollingUnitsForWard(wardId: string): Promise<ApiResult<NormalizedGeoData[]>> {
    if (!wardId) return { success: false, message: "wardId is required" };
    
    try {
      const res = await fetch(`/api/geo-data?type=polling_unit&ward_id=${encodeURIComponent(wardId)}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        return { success: false, message: `Request failed: ${res.status}` };
      }
      
      const data = await parseAsJsonOrNdjson<PollingUnit>(res);
      
      // Create unique polling unit IDs for this specific ward
      const normalized = data.map((pu, index) => ({
        id: createUniqueId('PU', wardId, index + 1),
        name: pu.pu_name
      }));
      
      return { success: true, data: normalized };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Network error' };
    }
  },
};
