const Inquiry = require("../models/Inquiry");
const { sendSuccess, sendError, getPagination } = require("../utils/helpers");

/**
 * @desc    Submit a new inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
const createInquiry = async (req, res, next) => {
  try {
    const { customerName, phone, email, productId, quantity, message } = req.body;

    const inquiry = await Inquiry.create({
      customerName, phone, email, productId, quantity, message,
    });

    return sendSuccess(res, 201, "Inquiry submitted successfully", { inquiry });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all inquiries with optional status filter and pagination
 * @route   GET /api/inquiries
 * @access  Private (Admin)
 */
const getInquiries = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(filter)
        .populate("productId", "title slug heroImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Inquiry.countDocuments(filter),
    ]);

    return sendSuccess(res, 200, "Inquiries fetched", {
      inquiries,
      pagination: getPagination(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inquiry status
 * @route   PATCH /api/inquiries/:id
 * @access  Private (Admin)
 */
const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const validStatuses = ["pending", "contacted", "closed"];
    if (!validStatuses.includes(status)) {
      return sendError(res, 400, "Invalid status value");
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) return sendError(res, 404, "Inquiry not found");

    return sendSuccess(res, 200, "Inquiry status updated", { inquiry });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInquiry, getInquiries, updateInquiryStatus };
