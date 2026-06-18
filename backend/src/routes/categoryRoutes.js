const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middleware/authMiddleware");
const { validateCategory } = require("../validators");
const handleValidation = require("../middleware/handleValidation");
const { uploadSingle, handleUpload } = require("../middleware/uploadMiddleware");

// Public
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Private (Admin)
router.post(
  "/",
  protect,
  handleUpload(uploadSingle),
  validateCategory,
  handleValidation,
  createCategory
);
router.put("/:id", protect, handleUpload(uploadSingle), updateCategory);
router.delete("/:id", protect, deleteCategory);

module.exports = router;
