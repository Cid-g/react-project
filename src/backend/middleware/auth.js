const jwt = require("jsonwebtoken");
const { findUserById } = require("../dataAccess/userDAL");

// Verify token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const user = await findUserById(decoded.id);
    if (!user) {
      console.log("User not found for token:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};

// Verify role
const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.userType)) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };