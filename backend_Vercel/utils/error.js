const httpStatus = require('http-status');
const logger = require('./logger');

/**
 * Custom API error class
 * @extends Error
 */
class ApiError extends Error {
  /**
   * Create an API error
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   * @param {boolean} isOperational - Is this a known operational error?
   * @param {Object} details - Additional error details
   */
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true,
    details = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);

    // Log the error
    logger.error(`${this.name}: ${message}`, {
      status,
      isOperational,
      details,
      stack: this.stack,
    });
  }
}

/**
 * 400 Bad Request Error
 */
class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', details = {}) {
    super(message, httpStatus.BAD_REQUEST, true, details);
  }
}

/**
 * 401 Unauthorized Error
 */
class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized', details = {}) {
    super(message, httpStatus.UNAUTHORIZED, true, details);
  }
}

/**
 * 403 Forbidden Error
 */
class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', details = {}) {
    super(message, httpStatus.FORBIDDEN, true, details);
  }
}

/**
 * 404 Not Found Error
 */
class NotFoundError extends ApiError {
  constructor(message = 'Not Found', details = {}) {
    super(message, httpStatus.NOT_FOUND, true, details);
  }
}

/**
 * 409 Conflict Error
 */
class ConflictError extends ApiError {
  constructor(message = 'Conflict', details = {}) {
    super(message, httpStatus.CONFLICT, true, details);
  }
}

/**
 * 422 Unprocessable Entity Error
 */
class ValidationError extends ApiError {
  constructor(message = 'Validation Error', details = {}) {
    super(message, httpStatus.UNPROCESSABLE_ENTITY, true, details);
  }
}

/**
 * 429 Too Many Requests Error
 */
class RateLimitError extends ApiError {
  constructor(message = 'Too Many Requests', details = {}) {
    super(message, httpStatus.TOO_MANY_REQUESTS, true, details);
  }
}

/**
 * 500 Internal Server Error
 */
class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error', details = {}) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR, false, details);
  }
}

/**
 * 503 Service Unavailable Error
 */
class ServiceUnavailableError extends ApiError {
  constructor(message = 'Service Unavailable', details = {}) {
    super(message, httpStatus.SERVICE_UNAVAILABLE, true, details);
  }
}

/**
 * Handles errors and sends appropriate response
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ValidationError('Validation failed', { errors: messages });
  }

  if (err.name === 'JsonWebTokenError') {
    error = new UnauthorizedError('Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new UnauthorizedError('Token expired');
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ConflictError(`${field} already exists`);
  }

  // Default to 500 Internal Server Error
  if (!error.status || error.status === 500) {
    error = new InternalServerError(error.message);
  }

  // Ensure we have a valid status code
  let statusCode = error.status || 500;
  if (typeof statusCode !== 'number' || statusCode < 100 || statusCode >= 600) {
    statusCode = 500;
    console.warn('⚠️ Invalid status code received:', error.status, 'using default 500');
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    ...(error.details && { details: error.details }),
  });
};

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  RateLimitError,
  InternalServerError,
  ServiceUnavailableError,
  errorHandler,
};
