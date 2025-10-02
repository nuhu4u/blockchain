/**
 * Polling Service for Real-time Updates
 * 
 * This service provides a simple polling mechanism for real-time updates
 * without the complexity of WebSockets. It polls the backend every few seconds
 * to get the latest data.
 */

export interface PollingOptions {
  interval?: number; // Polling interval in milliseconds (default: 3000)
  enabled?: boolean; // Whether polling is enabled (default: true)
  onUpdate?: (data: any) => void; // Callback when data is updated
  onError?: (error: Error) => void; // Callback when polling fails
}

export interface PollingStatus {
  isActive: boolean;
  interval: number;
  lastUpdate: Date | null;
  errorCount: number;
}

class PollingService {
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private status: Map<string, PollingStatus> = new Map();
  private callbacks: Map<string, PollingOptions> = new Map();

  /**
   * Start polling for a specific resource
   */
  startPolling(
    key: string, 
    pollFunction: () => Promise<any>, 
    options: PollingOptions = {}
  ): void {
    const {
      interval = 3000,
      enabled = true,
      onUpdate,
      onError
    } = options;

    if (!enabled) return;

    // Stop existing polling for this key
    this.stopPolling(key);

    // Store callbacks
    this.callbacks.set(key, { interval, enabled, onUpdate, onError });

    // Initialize status
    this.status.set(key, {
      isActive: true,
      interval,
      lastUpdate: null,
      errorCount: 0
    });

    // Start polling
    const poll = async () => {
      try {
        const data = await pollFunction();
        
        // Update status
        const currentStatus = this.status.get(key);
        if (currentStatus) {
          currentStatus.lastUpdate = new Date();
          currentStatus.errorCount = 0;
          this.status.set(key, currentStatus);
        }

        // Call update callback
        if (onUpdate) {
          onUpdate(data);
        }
      } catch (error) {
        // Update error count
        const currentStatus = this.status.get(key);
        if (currentStatus) {
          currentStatus.errorCount++;
          this.status.set(key, currentStatus);
        }

        // Call error callback
        if (onError) {
          onError(error as Error);
        }
      }
    };

    // Initial poll
    poll();

    // Set up interval
    const intervalId = setInterval(poll, interval);
    this.intervals.set(key, intervalId);
  }

  /**
   * Stop polling for a specific resource
   */
  stopPolling(key: string): void {
    const intervalId = this.intervals.get(key);
    if (intervalId) {
      clearInterval(intervalId);
      this.intervals.delete(key);
    }

    // Update status
    const currentStatus = this.status.get(key);
    if (currentStatus) {
      currentStatus.isActive = false;
      this.status.set(key, currentStatus);
    }

    }

  /**
   * Stop all polling
   */
  stopAllPolling(): void {
    for (const key of this.intervals.keys()) {
      this.stopPolling(key);
    }
  }

  /**
   * Get polling status for a specific resource
   */
  getStatus(key: string): PollingStatus | null {
    return this.status.get(key) || null;
  }

  /**
   * Get all polling statuses
   */
  getAllStatuses(): Map<string, PollingStatus> {
    return new Map(this.status);
  }

  /**
   * Update polling interval for a specific resource
   */
  updateInterval(key: string, newInterval: number): void {
    const currentOptions = this.callbacks.get(key);
    if (currentOptions) {
      currentOptions.interval = newInterval;
      this.callbacks.set(key, currentOptions);
      
      // Restart polling with new interval
      const pollFunction = () => Promise.resolve(); // Placeholder
      this.startPolling(key, pollFunction, currentOptions);
    }
  }

  /**
   * Check if polling is active for a specific resource
   */
  isPolling(key: string): boolean {
    return this.intervals.has(key);
  }

  /**
   * Get polling statistics
   */
  getStats(): {
    totalActive: number;
    totalErrors: number;
    averageInterval: number;
  } {
    const statuses = Array.from(this.status.values());
    const totalActive = statuses.filter(s => s.isActive).length;
    const totalErrors = statuses.reduce((sum, s) => sum + s.errorCount, 0);
    const averageInterval = statuses.length > 0 
      ? statuses.reduce((sum, s) => sum + s.interval, 0) / statuses.length 
      : 0;

    return {
      totalActive,
      totalErrors,
      averageInterval
    };
  }
}

// Create singleton instance
export const pollingService = new PollingService();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    pollingService.stopAllPolling();
  });
}

export default pollingService;
