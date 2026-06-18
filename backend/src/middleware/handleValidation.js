const { validationResult } = require("express-validator");

/**
 * Middleware to check validation results from express-validator.
 * Must be placed after validation chain in the route.
 */
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg, // Return first error message
      errors: errors.array(),
    });
  }
  next();
};

module.exports = handleValidation;
