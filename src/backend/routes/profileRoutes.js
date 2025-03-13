const express = require("express");
const { getProfile, updateProfile, uploadProfilePicture} = require("../controllers/profileController");
const { verifyToken } = require("../middleware/auth");
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Fetch profile data
router.get("/", verifyToken, getProfile); 

// Update profile data
router.put("/", verifyToken, updateProfile); 

router.patch(
    '/upload-profile-picture',
    verifyToken,
    upload.single('profilePicture'),
    uploadProfilePicture
  );

module.exports = router;