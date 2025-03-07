const express = require("express");
const { signup, login, getUser, adminLogin, refreshToken } = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/admin/login", adminLogin);
// Refresh token route
router.post("/refresh", refreshToken);

module.exports = router;