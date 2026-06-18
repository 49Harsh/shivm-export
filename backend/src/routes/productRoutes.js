const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { validateProduct } = require("../validators");
const handleValidation = require("../middleware/handleValidation");
const { uploadProductImages, handleUpload } = require("../middleware/uploadMiddleware");

// ─── Public Routes ────────────────────────────────────────────────────────────
// IMPORTANT: specific paths (featured, new-arrivals) must come before /:slug
router.get("/featured", getFeaturedProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// ─── Admin Routes ─────────────────────────────────────────────────────────────
router.get("/admin/all", protect, getAdminProducts);

router.post(
  "/",
  protect,
  handleUpload(uploadProductImages),
  validateProduct,
  handleValidation,
  createProduct
);

router.put("/:id", protect, handleUpload(uploadProductImages), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
