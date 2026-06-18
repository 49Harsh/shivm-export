const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const { generateSlug, sendSuccess, sendError } = require("../utils/helpers");

/**
 * @desc    Create a new subcategory
 * @route   POST /api/subcategories
 * @access  Private (Admin)
 */
const createSubCategory = async (req, res, next) => {
  try {
    const { categoryId, name } = req.body;

    // Verify parent category exists
    const category = await Category.findById(categoryId);
    if (!category) return sendError(res, 404, "Parent category not found");

    const slug = generateSlug(name);
    const subCategory = await SubCategory.create({ categoryId, name, slug });

    return sendSuccess(res, 201, "SubCategory created successfully", { subCategory });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all subcategories (optionally filter by categoryId)
 * @route   GET /api/subcategories?categoryId=xxx
 * @access  Public
 */
const getSubCategories = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;

    const subCategories = await SubCategory.find(filter)
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 });

    return sendSuccess(res, 200, "SubCategories fetched", { subCategories });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single subcategory by ID
 * @route   GET /api/subcategories/:id
 * @access  Public
 */
const getSubCategoryById = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate(
      "categoryId",
      "name slug"
    );
    if (!subCategory) return sendError(res, 404, "SubCategory not found");
    return sendSuccess(res, 200, "SubCategory fetched", { subCategory });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update subcategory
 * @route   PUT /api/subcategories/:id
 * @access  Private (Admin)
 */
const updateSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;

    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) return sendError(res, 404, "SubCategory not found");

    if (name) {
      subCategory.name = name;
      subCategory.slug = generateSlug(name);
    }
    if (categoryId) subCategory.categoryId = categoryId;

    await subCategory.save();

    return sendSuccess(res, 200, "SubCategory updated successfully", { subCategory });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete subcategory
 * @route   DELETE /api/subcategories/:id
 * @access  Private (Admin)
 */
const deleteSubCategory = async (req, res, next) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) return sendError(res, 404, "SubCategory not found");

    await subCategory.deleteOne();

    return sendSuccess(res, 200, "SubCategory deleted successfully", {});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
};
