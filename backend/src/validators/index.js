const { body, param } = require("express-validator");

// ─── Auth Validators ──────────────────────────────────────────────────────────

const validateRegister = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// ─── Category Validators ──────────────────────────────────────────────────────

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
];

// ─── SubCategory Validators ───────────────────────────────────────────────────

const validateSubCategory = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("SubCategory name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
];

// ─── Product Validators ───────────────────────────────────────────────────────

const validateProduct = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ max: 200 })
    .withMessage("Title cannot exceed 200 characters"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid Category ID"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("wholesalePrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Wholesale price must be a positive number"),
];

// ─── Inquiry Validators ───────────────────────────────────────────────────────

const validateInquiry = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

// ─── Validate MongoId Param ───────────────────────────────────────────────────

const validateMongoId = (fieldName = "id") => [
  param(fieldName).isMongoId().withMessage(`Invalid ${fieldName}`),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateCategory,
  validateSubCategory,
  validateProduct,
  validateInquiry,
  validateMongoId,
};
