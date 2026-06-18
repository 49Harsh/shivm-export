const express = require("express");
const router = express.Router();

const {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const { protect } = require("../middleware/authMiddleware");
const { uploadSingle, handleUpload } = require("../middleware/uploadMiddleware");

// Public
router.get("/", getBanners);

// Private (Admin)
router.post("/", protect, handleUpload(uploadSingle), createBanner);
router.put("/:id", protect, handleUpload(uploadSingle), updateBanner);
router.delete("/:id", protect, deleteBanner);

module.exports = router;
