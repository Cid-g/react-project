const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);

module.exports = router;