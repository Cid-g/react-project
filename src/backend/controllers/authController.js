const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, findUserById, findAdminByUsername } = require("../dataAccess/userDAL");
const { ROLES } = require("../UserType");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Signup
const signup = catchAsync(async (req, res, next) => {
  const { firstName, middleName, lastName, userType, email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await createUser({ firstName, middleName, lastName, userType, email, password: hashedPassword });

  const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

  res.status(201).json({ user: { id: newUser._id, firstName, lastName, email, userType }, token });
});

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Ensure only one save operation at a time
    user.refreshTokens = [...user.refreshTokens, { token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }];
    
    await user.save(); // Save only once after all modifications

    res.json({ user, accessToken, refreshToken, expiresIn: 3600 });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Fetch logged-in user's data
const getUser = catchAsync(async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const { password, ...userData } = user.toObject();
  res.status(200).json(userData);
});


 const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    // Remove refresh token from the database
    const user = await User.findOne({ "refreshTokens.token": refreshToken });

    if (!user) return res.status(404).json({ message: "User not found" });

    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
    await user.save();

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Login admin
const adminLogin = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const admin = await findAdminByUsername(username);
  if (!admin) {
    throw new AppError("Admin not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 400);
  }

  // Generate tokens
  const accessToken = generateAccessToken(admin);
  const refreshToken = generateRefreshToken(admin);

  // Return token and admin data (excluding password)
  const { password: _, ...adminData } = admin.toObject();
  res.status(200).json({
    user: adminData,
    accessToken,
    refreshToken,
    expiresIn: 900, // 15 minutes in seconds
  });
});

// Refresh token endpoint logic
const refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Check if the refresh token exists in the database
  const storedToken = user.refreshTokens.find(rt => rt.token === refreshToken);
  if (!storedToken) {
    throw new AppError("Invalid refresh token", 403);
  }

  // Generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = await generateRefreshToken(user);

  // Remove the old refresh token
  user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
  await user.save();

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: 900, // 15 minutes
  });
});



// Function to generate a new access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // Short-lived access token
  );
};

// Function to generate a new refresh token
const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email, userType: user.userType },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Token valid for 7 days
  );

  // Set expiration date for the refresh token
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

  // Add refresh token to the database
  user.refreshTokens.push({ token: refreshToken, expiresAt });

  // Save the updated user document in MongoDB
  await user.save();

  return refreshToken;
};



module.exports = { signup, login, getUser, adminLogin, refreshToken, logout};