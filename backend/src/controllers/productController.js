const Product = require("../models/Product");
const { generateSlug, sendSuccess, sendError, getPagination } = require("../utils/helpers");
const { uploadToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

// ─── Helper: build filter object from query params ────────────────────────────
const buildProductFilter = (query, extraFilter = {}) => {
  const filter = { ...extraFilter };

  if (query.category) filter.categoryId = query.category;
  if (query.subcategory) filter.subCategoryId = query.subcategory;
  if (query.color) filter.colors = { $in: [query.color] };
  if (query.size) filter.sizes = { $in: [query.size] };

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.search) {
    filter.$text = { $search: query.search };
  }

  return filter;
};

// ─── Helper: build sort object from query param ───────────────────────────────
const buildSort = (sortParam) => {
  switch (sortParam) {
    case "newest":
      return { createdAt: -1 };
    case "oldest":
      return { createdAt: 1 };
    case "price_asc":
      return { price: 1 };
    case "price_desc":
      return { price: -1 };
    default:
      return { createdAt: -1 };
  }
};

// ─── Admin: Create Product ────────────────────────────────────────────────────
/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Admin)
 */
const createProduct = async (req, res, next) => {
  try {
    const {
      title, description, categoryId, subCategoryId, brand,
      price, wholesalePrice, sku, sizes, colors, stock,
      fabric, occasion, weight, tags, isFeatured, status,
    } = req.body;

    const slug = generateSlug(title);

    // Upload hero image
    let heroImage = { url: "", publicId: "" };
    if (req.files?.heroImage?.[0]) {
      const result = await uploadToCloudinary(
        req.files.heroImage[0].buffer,
        "wholesale/products/hero"
      );
      heroImage = { url: result.secure_url, publicId: result.public_id };
    }

    // Upload multiple gallery images
    let images = [];
    if (req.files?.images?.length) {
      const uploadPromises = req.files.images.map((file) =>
        uploadToCloudinary(file.buffer, "wholesale/products/gallery")
      );
      const results = await Promise.all(uploadPromises);
      images = results.map((r) => ({ url: r.secure_url, publicId: r.public_id }));
    }

    const product = await Product.create({
      title, slug, description,
      categoryId, subCategoryId, brand,
      heroImage, images,
      price, wholesalePrice, sku,
      sizes: sizes ? JSON.parse(sizes) : [],
      colors: colors ? JSON.parse(colors) : [],
      stock, fabric, occasion, weight,
      tags: tags ? JSON.parse(tags) : [],
      isFeatured, status,
    });

    return sendSuccess(res, 201, "Product created successfully", { product });
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Update Product ────────────────────────────────────────────────────
/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private (Admin)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, "Product not found");

    const allowedFields = [
      "title", "description", "categoryId", "subCategoryId", "brand",
      "price", "wholesalePrice", "sku", "stock", "fabric",
      "occasion", "weight", "isFeatured", "status",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    // Update slug if title changed
    if (req.body.title) product.slug = generateSlug(req.body.title);

    // Parse JSON arrays if provided as strings
    if (req.body.sizes) product.sizes = JSON.parse(req.body.sizes);
    if (req.body.colors) product.colors = JSON.parse(req.body.colors);
    if (req.body.tags) product.tags = JSON.parse(req.body.tags);

    // Replace hero image if new one uploaded
    if (req.files?.heroImage?.[0]) {
      if (product.heroImage?.publicId) {
        await deleteFromCloudinary(product.heroImage.publicId);
      }
      const result = await uploadToCloudinary(
        req.files.heroImage[0].buffer,
        "wholesale/products/hero"
      );
      product.heroImage = { url: result.secure_url, publicId: result.public_id };
    }

    // Append new gallery images
    if (req.files?.images?.length) {
      const uploadPromises = req.files.images.map((file) =>
        uploadToCloudinary(file.buffer, "wholesale/products/gallery")
      );
      const results = await Promise.all(uploadPromises);
      const newImages = results.map((r) => ({ url: r.secure_url, publicId: r.public_id }));
      product.images = [...product.images, ...newImages];
    }

    await product.save();

    return sendSuccess(res, 200, "Product updated successfully", { product });
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Delete Product ────────────────────────────────────────────────────
/**
 * @desc    Delete product and all associated Cloudinary images
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, "Product not found");

    // Delete hero image from Cloudinary
    if (product.heroImage?.publicId) {
      await deleteFromCloudinary(product.heroImage.publicId);
    }

    // Delete all gallery images from Cloudinary
    if (product.images?.length) {
      await Promise.all(
        product.images.map((img) => deleteFromCloudinary(img.publicId))
      );
    }

    await product.deleteOne();

    return sendSuccess(res, 200, "Product deleted successfully", {});
  } catch (error) {
    next(error);
  }
};

// ─── Admin: Get All Products (admin view with inactive) ───────────────────────
/**
 * @desc    Get all products for admin panel (includes inactive)
 * @route   GET /api/products/admin
 * @access  Private (Admin)
 */
const getAdminProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = buildProductFilter(req.query);
    const sort = buildSort(req.query.sort);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("categoryId", "name slug")
        .populate("subCategoryId", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return sendSuccess(res, 200, "Admin products fetched", {
      products,
      pagination: getPagination(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
};

// ─── Public: Get Products ─────────────────────────────────────────────────────
/**
 * @desc    Get all active products with filters, search, pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const filter = buildProductFilter(req.query, { status: "active" });
    const sort = buildSort(req.query.sort);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("categoryId", "name slug")
        .populate("subCategoryId", "name slug")
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter),
    ]);

    return sendSuccess(res, 200, "Products fetched", {
      products,
      pagination: getPagination(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
};

// ─── Public: Get Product by Slug ──────────────────────────────────────────────
/**
 * @desc    Get single product by slug
 * @route   GET /api/products/:slug
 * @access  Public
 */
const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, status: "active" })
      .populate("categoryId", "name slug")
      .populate("subCategoryId", "name slug");

    if (!product) return sendError(res, 404, "Product not found");

    return sendSuccess(res, 200, "Product fetched", { product });
  } catch (error) {
    next(error);
  }
};

// ─── Public: Featured Products ────────────────────────────────────────────────
/**
 * @desc    Get featured active products
 * @route   GET /api/products/featured
 * @access  Public
 */
const getFeaturedProducts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.find({ isFeatured: true, status: "active" })
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 })
      .limit(limit);

    return sendSuccess(res, 200, "Featured products fetched", { products });
  } catch (error) {
    next(error);
  }
};

// ─── Public: New Arrivals ─────────────────────────────────────────────────────
/**
 * @desc    Get latest active products (new arrivals)
 * @route   GET /api/products/new-arrivals
 * @access  Public
 */
const getNewArrivals = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const products = await Product.find({ status: "active" })
      .populate("categoryId", "name slug")
      .sort({ createdAt: -1 })
      .limit(limit);

    return sendSuccess(res, 200, "New arrivals fetched", { products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
};
