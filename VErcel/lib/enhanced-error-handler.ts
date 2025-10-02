// Enhanced Error Handler for better user experience
export class EnhancedErrorHandler {
  // User-friendly error messages
  static getUserFriendlyMessage(error: unknown): string {
    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
        return 'Unable to connect to the server. Please check your internet connection and try again.';
      }
      
      // Authentication errors
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return 'Your session has expired. Please log in again to continue.';
      }
      
      // Permission errors
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        return 'You do not have permission to perform this action.';
      }
      
      // Not found errors
      if (error.message.includes('404') || error.message.includes('Not Found')) {
        return 'The requested information could not be found.';
      }
      
      // Server errors
      if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
        return 'The server is experiencing issues. Please try again in a few moments.';
      }
      
      // Validation errors
      if (error.message.includes('Validation failed') || error.message.includes('Invalid')) {
        return 'Please check your input and try again.';
      }
      
      // Vote-specific errors
      if (error.message.includes('already voted')) {
        return 'You have already voted in this election.';
      }
      
      if (error.message.includes('election closed')) {
        return 'This election has ended. Voting is no longer available.';
      }
      
      if (error.message.includes('election not started')) {
        return 'This election has not started yet. Please wait for the voting period to begin.';
      }
      
      // Generic fallback
      return 'Something went wrong. Please try again.';
    }
    
    return 'An unexpected error occurred. Please try again.';
  }
  
  // Get error severity level
  static getErrorSeverity(error: unknown): 'low' | 'medium' | 'high' {
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('403')) {
        return 'high';
      }
      if (error.message.includes('500') || error.message.includes('NetworkError')) {
        return 'high';
      }
      if (error.message.includes('404') || error.message.includes('Validation')) {
        return 'medium';
      }
    }
    return 'low';
  }
  
  // Get suggested actions
  static getSuggestedActions(error: unknown): string[] {
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return ['Log in again', 'Check your credentials'];
      }
      if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
        return ['Check your internet connection', 'Try again in a moment', 'Contact support if the issue persists'];
      }
      if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
        return ['Try again in a few moments', 'Contact support if the issue persists'];
      }
      if (error.message.includes('already voted')) {
        return ['Check your vote history', 'Contact support if this is incorrect'];
      }
    }
    return ['Try again', 'Contact support if the issue persists'];
  }
}