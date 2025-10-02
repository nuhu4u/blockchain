// Simple API request function that works with cookie-based authentication
export async function simpleApiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `/api${endpoint}`;
  
  // Get token from cookies
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };
  
  const token = getCookie('token');
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    cache: 'no-store',
    credentials: 'include', // Include cookies for authentication
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Simple dashboard service
export class SimpleDashboardService {
  static async getVoterDashboard() {
    return simpleApiRequest('/dashboard/voter');
  }
}
