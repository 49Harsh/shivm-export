const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategoryController");

const { protect } = require("../middleware/authMiddleware");
const { validateSubCategory } = require("../validators");
const handleValidation = require("../middleware/handleValidation");

// Public
router.get("/", getSubCategories);
router.get("/:id", getSubCategoryById);

// Private (Admin)
router.post("/", protect, validateSubCategory, handleValidation, createSubCategory);
router.put("/:id", protect, updateSubCategory);
router.delete("/:id", protect, deleteSubCategory);

module.exports = router;
