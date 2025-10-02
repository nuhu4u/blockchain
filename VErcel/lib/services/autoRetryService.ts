/**
 * Auto Retry Service
 * Automatically retries pending blockchain votes at regular intervals
 */

export interface RetryConfig {
  enabled: boolean;
  intervalMinutes: number;
  maxRetries: number;
  retryDelayMs: number;
}

export interface RetryResult {
  success: boolean;
  retried: number;
  successful: number;
  stillPending: number;
  errors: string[];
  timestamp: Date;
}

class AutoRetryService {
  private config: RetryConfig;
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;
  private retryCount = 0;

  constructor() {
    this.config = {
      enabled: true,
      intervalMinutes: 5, // Check every 5 minutes
      maxRetries: 3, // Max 3 retries per vote
      retryDelayMs: 2000, // 2 second delay between retries
    };
  }

  /**
   * Start automatic retry service
   */
  start(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    
    // Start the interval
    this.intervalId = setInterval(() => {
      this.checkAndRetryPendingVotes();
    }, this.config.intervalMinutes * 60 * 1000);

    // Also run immediately
    this.checkAndRetryPendingVotes();
  }

  /**
   * Stop automatic retry service
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    }

  /**
   * Check for pending votes and retry them
   */
  private async checkAndRetryPendingVotes(): Promise<RetryResult> {
    try {
      // Get pending votes count
      const pendingResponse = await fetch('/api/blockchain/pending-votes', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });

      if (!pendingResponse.ok) {
        throw new Error('Failed to fetch pending votes');
      }

      const pendingData = await pendingResponse.json();
      const pendingCount = pendingData.data?.votes?.length || 0;

      if (pendingCount === 0) {
        return {
          success: true,
          retried: 0,
          successful: 0,
          stillPending: 0,
          errors: [],
          timestamp: new Date(),
        };
      }

      // Retry pending votes
      const retryResponse = await fetch('/api/blockchain/retry-votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
      });

      if (!retryResponse.ok) {
        throw new Error('Failed to retry votes');
      }

      const retryData = await retryResponse.json();
      
      const result: RetryResult = {
        success: retryData.success,
        retried: retryData.data?.retried || 0,
        successful: retryData.data?.success || 0,
        stillPending: retryData.data?.stillPending || 0,
        errors: retryData.data?.errors || [],
        timestamp: new Date(),
      };

      this.retryCount++;
      return result;

    } catch (error) {
      return {
        success: false,
        retried: 0,
        successful: 0,
        stillPending: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        timestamp: new Date(),
      };
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): RetryConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<RetryConfig>): void {
    this.config = { ...this.config, ...newConfig };
    }

  /**
   * Get service status
   */
  getStatus(): {
    isRunning: boolean;
    retryCount: number;
    config: RetryConfig;
  } {
    return {
      isRunning: this.isRunning,
      retryCount: this.retryCount,
      config: this.getConfig(),
    };
  }

  /**
   * Manually trigger retry
   */
  async manualRetry(): Promise<RetryResult> {
    return this.checkAndRetryPendingVotes();
  }
}

export const autoRetryService = new AutoRetryService();
