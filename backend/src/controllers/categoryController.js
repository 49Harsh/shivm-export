const Category = require("../models/Category");
const { generateSlug, sendSuccess, sendError } = require("../utils/helpers");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private (Admin)
 */
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const slug = generateSlug(name);

    let image = { url: "", publicId: "" };

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "wholesale/categories");
      image = { url: result.secure_url, publicId: result.public_id };
    }

    const category = await Category.create({ name, slug, image });

    return sendSuccess(res, 201, "Category created successfully", { category });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return sendSuccess(res, 200, "Categories fetched", { categories });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return sendError(res, 404, "Category not found");
    return sendSuccess(res, 200, "Category fetched", { category });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a category
 * @route   PUT /api/categories/:id
 * @access  Private (Admin)
 */
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return sendError(res, 404, "Category not found");

    const { name } = req.body;

    // Update image if new one is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (category.image?.publicId) {
        await deleteFromCloudinary(category.image.publicId);
      }
      const result = await uploadToCloudinary(req.file.buffer, "wholesale/categories");
      category.image = { url: result.secure_url, publicId: result.public_id };
    }

    if (name) {
      category.name = name;
      category.slug = generateSlug(name);
    }

    await category.save();

    return sendSuccess(res, 200, "Category updated successfully", { category });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a category
 * @route   DELETE /api/categories/:id
 * @access  Private (Admin)
 */
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return sendError(res, 404, "Category not found");

    // Remove image from Cloudinary
    if (category.image?.publicId) {
      await deleteFromCloudinary(category.image.publicId);
    }

    await category.deleteOne();

    return sendSuccess(res, 200, "Category deleted successfully", {});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
