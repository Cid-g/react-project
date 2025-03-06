const express = require("express");
const { getProfile, updateProfile } = require("../controllers/profileController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Fetch profile data
router.get("/", verifyToken, getProfile); // Changed from "/profile" to "/"

// Update profile data
router.put("/", verifyToken, updateProfile); // Changed from "/profile" to "/"

module.exports = router;