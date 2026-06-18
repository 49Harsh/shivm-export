const express = require("express");
const router = express.Router();

const { register, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validateRegister, validateLogin } = require("../validators");
const handleValidation = require("../middleware/handleValidation");

router.post("/register", validateRegister, handleValidation, register);
router.post("/login", validateLogin, handleValidation, login);
router.get("/profile", protect, getProfile);

module.exports = router;
