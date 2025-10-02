// Simple authentication utilities
export const simpleLogin = async (emailOrNin: string, password: string) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrNin, password }),
      cache: 'no-store',
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Wait for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 200));
      return { success: true, redirectTo: data.redirectTo };
    }

    return { success: false, message: data.message || 'Login failed' };
  } catch (error) {
    return { success: false, message: 'Network error' };
  }
};

export const simpleLogout = async () => {
  try {
    await fetch('/api/auth/logout', { method: 'POST', cache: 'no-store' });
  } catch (error) {
    // Ignore errors
  }
  // Force page reload to clear all state
  window.location.href = '/login';
};
