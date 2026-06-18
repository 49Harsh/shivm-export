const express = require("express");
const router = express.Router();

const {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
} = require("../controllers/inquiryController");

const { protect } = require("../middleware/authMiddleware");
const { validateInquiry } = require("../validators");
const handleValidation = require("../middleware/handleValidation");

// Public — submit inquiry
router.post("/", validateInquiry, handleValidation, createInquiry);

// Private (Admin) — view and manage inquiries
router.get("/", protect, getInquiries);
router.patch("/:id", protect, updateInquiryStatus);

module.exports = router;
