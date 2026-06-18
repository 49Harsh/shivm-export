const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: String,
      trim: true,
      default: "",
    },
    // Single hero/thumbnail image
    heroImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    // Multiple gallery images
    images: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    wholesalePrice: {
      type: Number,
      min: [0, "Wholesale price cannot be negative"],
    },
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true, // Allows multiple docs without SKU
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    fabric: {
      type: String,
      trim: true,
      default: "",
    },
    occasion: {
      type: String,
      trim: true,
      default: "",
    },
    weight: {
      type: Number,
      min: [0, "Weight cannot be negative"],
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Indexes for search and filtering performance
productSchema.index({ title: "text", description: "text", tags: "text" });
productSchema.index({ categoryId: 1, subCategoryId: 1 });
productSchema.index({ price: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ status: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);
