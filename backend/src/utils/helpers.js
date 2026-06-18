const slugify = require("slugify");

/**
 * Generate a URL-friendly slug from a string
 * Appends a short timestamp to ensure uniqueness
 * @param {string} text
 * @returns {string} slug
 */
const generateSlug = (text) => {
  const base = slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
  const suffix = Date.now().toString(36); // Short unique suffix
  return `${base}-${suffix}`;
};

/**
 * Send a standardized success response
 * @param {object} res - Express response object
 * @param {number} statusCode
 * @param {string} message
 * @param {any} data
 */
const sendSuccess = (res, statusCode = 200, message = "Success", data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send a standardized error response
 * @param {object} res - Express response object
 * @param {number} statusCode
 * @param {string} message
 */
const sendError = (res, statusCode = 500, message = "Server Error") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

/**
 * Build pagination metadata
 * @param {number} total - Total document count
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {object} pagination meta
 */
const getPagination = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { generateSlug, sendSuccess, sendError, getPagination };
