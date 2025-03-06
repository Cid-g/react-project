const jwt = require("jsonwebtoken");
const { findUserById } = require("../dataAccess/userDAL");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  if (req.user.userType !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };