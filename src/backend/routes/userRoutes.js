const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const { verifyToken , verifyRole } = require("../middleware/auth");

const router = express.Router();

router.get("/users", verifyToken, getAllUsers, verifyRole);

module.exports = router;