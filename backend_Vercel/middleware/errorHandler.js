const httpStatus = require('http-status');
const logger = require('../utils/logger');
// Prisma removed - using MongoDB native driver

/**
 * Custom error class for handling API errors
 */
class ApiError extends Error {
  /**
   * Create an API error
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   * @param {boolean} isOperational - Is this a known operational error?
   * @param {Object} errors - Additional error details
   */
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isOperational = true,
    errors = {}
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.isOperational = isOperational;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Convert error to ApiError if needed
 * @param {Error} err - The error to convert
 * @returns {ApiError} - The converted error
 */
const convertToApiError = (err) => {
  let error = err;
  
  // Handle MongoDB errors
  if (error.name === 'MongoError' || error.name === 'MongoServerError') {
    // Handle unique constraint violation
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      error = new ApiError(
        `The provided ${field} is already in use`,
        httpStatus.CONFLICT,
        true
      );
    } 
    // Handle other MongoDB errors
    else {
      error = new ApiError(
        'Database operation failed',
        httpStatus.INTERNAL_SERVER_ERROR,
        false,
        { code: error.code }
      );
    }
  } 
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    error = new ApiError('Invalid token', httpStatus.UNAUTHORIZED, true);
  } else if (error.name === 'TokenExpiredError') {
    error = new ApiError('Token expired', httpStatus.UNAUTHORIZED, true);
  } 
  // Handle validation errors
  else if (error.name === 'ValidationError' || error.name === 'ValidatorError') {
    const message = Object.values(error.errors).map((val) => val.message).join(', ');
    error = new ApiError(`Validation error: ${message}`, httpStatus.BAD_REQUEST, true);
  }
  
  // If it's not an instance of ApiError, convert it
  if (!(error instanceof ApiError)) {
    let status = httpStatus.INTERNAL_SERVER_ERROR; // Default to 500
    
    // Only use error.status if it's a valid HTTP status code
    if (error.status && typeof error.status === 'number' && error.status >= 100 && error.status < 600) {
      status = error.status;
    }
    
    const message = error.message || 'An unexpected error occurred';
    error = new ApiError(message, status, false, error.errors);
  }
  
  // Ensure the error has a valid status code
  if (!error.status || typeof error.status !== 'number' || error.status < 100 || error.status >= 600) {
    error.status = httpStatus.INTERNAL_SERVER_ERROR;
  }
  
  return error;
};

/**
 * Global error handler middleware
 * @param {Error} err - The error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let error = convertToApiError(err);
  
  // Log the error
  if (process.env.NODE_ENV === 'development') {
    logger.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(error.stack);
    
    // Log the original error if it's different
    if (error !== err) {
      logger.error('Original error:', err);
    }
  } else {
    // In production, only log operational errors
    if (error.isOperational) {
      logger.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    } else {
      // Log all details for non-operational errors
      logger.error('Unexpected error occurred:', {
        message: error.message,
        stack: error.stack,
        originalError: err,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        user: req.user && req.user.id ? req.user.id : 'anonymous',
        body: req.body,
        params: req.params,
        query: req.query,
        headers: {
          'user-agent': req.headers['user-agent'],
          referer: req.headers.referer,
          'x-forwarded-for': req.headers['x-forwarded-for']
        }
      });
    }
  }
  
  // Send error response
  const response = {
    success: false,
    message: error.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      error: error.toString(),
      ...(error.errors && { errors: error.errors })
    })
  };
  
  // In production, don't leak error details
  if (process.env.NODE_ENV === 'production' && !error.isOperational) {
    response.message = 'An unexpected error occurred';
  }
  
  // Handle specific status codes
  if (error.status === httpStatus.UNAUTHORIZED) {
    response.message = response.message || 'Authentication required';
    res.setHeader('WWW-Authenticate', 'Bearer');
  }
  
  // Use the error status or default to 500
  const statusCode = error.status || httpStatus.INTERNAL_SERVER_ERROR;
  
  // Ensure status code is a valid number
  const validStatusCode = Number.isInteger(statusCode) && statusCode >= 100 && statusCode < 600 
    ? statusCode 
    : httpStatus.INTERNAL_SERVER_ERROR;
  
  // Ensure response has consistent structure
  const finalResponse = {
    success: false,
    code: `ERROR_${validStatusCode}`,
    message: response.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      error: error.toString(),
      ...(error.errors && { errors: error.errors })
    })
  };
  
  // Send the response
  try {
    res.status(validStatusCode).json(finalResponse);
  } catch (responseError) {
    console.error('⚠️ Error sending response:', responseError);
    // Fallback to basic error response
    res.status(500).json({
      success: false,
      code: 'ERROR_500',
      message: 'Internal server error'
    });
  }
};

/**
 * 404 Not Found middleware
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    code: 'ERROR_404',
    message: 'Not Found',
    path: req.originalUrl,
    method: req.method
  });
};

module.exports = {
  ApiError,
  errorHandler,
  notFound,
  convertToApiError
};
