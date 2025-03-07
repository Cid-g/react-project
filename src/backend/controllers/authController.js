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

  const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(201).json({ user: { id: newUser._id, firstName, lastName, email, userType }, token });
});

// Login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid credentials", 400);
  }

  // Generate tokens
  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  // Exclude password from the response
  const { password: _, ...userData } = existingUser.toObject();

  // Send response with tokens and user data
  res.status(200).json({
    user: userData,
    accessToken,
    refreshToken,
    expiresIn: 900, // 15 minutes in seconds
  });
});

// Fetch logged-in user's data
const getUser = catchAsync(async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const { password, ...userData } = user.toObject();
  res.status(200).json(userData);
});

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

  // Verify the refresh token
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  // Find the user in the database
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Generate a new access token and refresh token
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  res.json({
    user: {
      id: user._id,
      email: user.email,
      userType: user.userType,
    },
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: 900, // 15 minutes in seconds
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
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, userType: user.userType },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Long-lived refresh token
  );
};

module.exports = { signup, login, getUser, adminLogin, refreshToken };