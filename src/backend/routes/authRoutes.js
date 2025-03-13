const express = require("express");
const { signup, login, getUser, adminLogin, refreshToken, logout } = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/users", verifyToken, getUser);
router.post("/admin/login", adminLogin);
router.post("/refresh", refreshToken);
router.post('/logout', logout)

module.exports = router;