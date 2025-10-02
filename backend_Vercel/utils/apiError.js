const httpStatus = require('http-status');

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
  }
}

module.exports = { ApiError };
