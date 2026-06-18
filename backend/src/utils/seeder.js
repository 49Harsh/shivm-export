require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const User = require("../models/User");
const connectDB = require("../config/db");

const seed = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "admin@shivm.com" });
  if (existing) {
    console.log("✅ Admin already exists:", existing.email);
    process.exit(0);
  }

  await User.create({
    name: "ShivM Admin",
    email: "admin@shivm.com",
    password: "admin@123",
    role: "superadmin",
  });

  console.log("✅ Admin created — email: admin@shivm.com | password: admin@123");
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seeder failed:", err.message);
  process.exit(1);
});
