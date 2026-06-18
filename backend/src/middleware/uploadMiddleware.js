const multer = require("multer");

// Use memory storage — buffers passed directly to Cloudinary
const storage = multer.memoryStorage();

// Filter: allow only image files
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, PNG, and WEBP images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

/**
 * Upload single image (field name: "image")
 */
const uploadSingle = upload.single("image");

/**
 * Upload hero image + multiple gallery images
 * Fields: heroImage (1), images (up to 10)
 */
const uploadProductImages = upload.fields([
  { name: "heroImage", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

/**
 * Wrapper to convert multer callback errors into next(err) flow
 */
const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = { uploadSingle, uploadProductImages, handleUpload };
