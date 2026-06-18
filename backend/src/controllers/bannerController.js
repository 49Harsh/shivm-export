const Banner = require("../models/Banner");
const { sendSuccess, sendError } = require("../utils/helpers");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

/**
 * @desc    Create a new banner
 * @route   POST /api/banners
 * @access  Private (Admin)
 */
const createBanner = async (req, res, next) => {
  try {
    const { title, subtitle, buttonText, buttonLink, active } = req.body;

    let image = { url: "", publicId: "" };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "wholesale/banners");
      image = { url: result.secure_url, publicId: result.public_id };
    }

    const banner = await Banner.create({ title, subtitle, image, buttonText, buttonLink, active });

    return sendSuccess(res, 201, "Banner created successfully", { banner });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all banners (active only for public use — pass ?all=true for admin)
 * @route   GET /api/banners
 * @access  Public / Admin
 */
const getBanners = async (req, res, next) => {
  try {
    const filter = req.query.all === "true" ? {} : { active: true };
    const banners = await Banner.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, 200, "Banners fetched", { banners });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a banner
 * @route   PUT /api/banners/:id
 * @access  Private (Admin)
 */
const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return sendError(res, 404, "Banner not found");

    const { title, subtitle, buttonText, buttonLink, active } = req.body;

    if (title !== undefined) banner.title = title;
    if (subtitle !== undefined) banner.subtitle = subtitle;
    if (buttonText !== undefined) banner.buttonText = buttonText;
    if (buttonLink !== undefined) banner.buttonLink = buttonLink;
    if (active !== undefined) banner.active = active;

    // Replace image if new one provided
    if (req.file) {
      if (banner.image?.publicId) {
        await deleteFromCloudinary(banner.image.publicId);
      }
      const result = await uploadToCloudinary(req.file.buffer, "wholesale/banners");
      banner.image = { url: result.secure_url, publicId: result.public_id };
    }

    await banner.save();

    return sendSuccess(res, 200, "Banner updated successfully", { banner });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a banner
 * @route   DELETE /api/banners/:id
 * @access  Private (Admin)
 */
const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return sendError(res, 404, "Banner not found");

    if (banner.image?.publicId) {
      await deleteFromCloudinary(banner.image.publicId);
    }

    await banner.deleteOne();

    return sendSuccess(res, 200, "Banner deleted successfully", {});
  } catch (error) {
    next(error);
  }
};

module.exports = { createBanner, getBanners, updateBanner, deleteBanner };
