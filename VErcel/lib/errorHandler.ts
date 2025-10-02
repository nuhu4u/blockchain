import { ApiError } from './api';

// Error types
export interface ErrorDetails {
  field?: string;
  message: string;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Error handler class
export class ErrorHandler {
  // Handle API errors
  static handleApiError(error: unknown): string {
    if (error instanceof ApiError) {
      // Handle specific HTTP status codes
      switch (error.status) {
        case 400:
          return this.formatValidationErrors(error.errors) || 'Invalid request data';
        case 401:
          return 'You are not authorized to perform this action. Please log in.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 409:
          return 'This resource already exists or conflicts with existing data.';
        case 422:
          return this.formatValidationErrors(error.errors) || 'Validation failed';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
          return 'An internal server error occurred. Please try again later.';
        default:
          return error.message || 'An unexpected error occurred.';
      }
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return 'Network error. Please check your internet connection.';
    }

    // Handle generic errors
    if (error instanceof Error) {
      return error.message;
    }

    return 'An unexpected error occurred.';
  }

  // Format validation errors
  static formatValidationErrors(errors?: any[]): string {
    if (!errors || !Array.isArray(errors)) {
      return '';
    }

    const formattedErrors = errors.map(error => {
      if (typeof error === 'string') {
        return error;
      }
      if (error.field && error.message) {
        return `${error.field}: ${error.message}`;
      }
      return error.message || 'Validation error';
    });

    return formattedErrors.join(', ');
  }

  // Check if error is a validation error
  static isValidationError(error: unknown): boolean {
    if (error instanceof ApiError) {
      return error.status === 400 || error.status === 422;
    }
    return false;
  }

  // Check if error is an authentication error
  static isAuthError(error: unknown): boolean {
    if (error instanceof ApiError) {
      return error.status === 401 || error.status === 403;
    }
    return false;
  }

  // Check if error is a network error
  static isNetworkError(error: unknown): boolean {
    if (error instanceof TypeError) {
      return error.message.includes('fetch') || error.message.includes('network');
    }
    return false;
  }

  // Get user-friendly error message
  static getUserFriendlyMessage(error: unknown): string {
    const message = this.handleApiError(error);
    
    // Make messages more user-friendly
    if (message.includes('email')) {
      return 'Please check your email address and try again.';
    }
    if (message.includes('password')) {
      return 'Please check your password and try again.';
    }
    if (message.includes('network')) {
      return 'Connection problem. Please check your internet and try again.';
    }
    
    return message;
  }
}

// Toast error handler
export const showErrorToast = (error: unknown, toast: any) => {
  const message = ErrorHandler.getUserFriendlyMessage(error);
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};

// Form error handler
export const handleFormError = (error: unknown, setError: any) => {
  if (ErrorHandler.isValidationError(error) && error instanceof ApiError) {
    error.errors?.forEach((err: any) => {
      if (err.field) {
        setError(err.field, {
          type: 'server',
          message: err.message,
        });
      }
    });
  }
};

