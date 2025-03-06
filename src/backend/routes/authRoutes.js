const express = require("express");
const { signup, login, getUser } = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);

module.exports = router;