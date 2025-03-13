const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, findUserById, findAdminByUsername } = require("../dataAccess/userDAL");
const { ROLES } = require("../UserType");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Signup
const signup = catchAsync(async (req, res, next) => {
  const  { firstName, middleName,
           lastName, userType,
           email, password,
           birthDate,sex,
           yearLevel, section,
           course, college} = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = await createUser({  firstName, middleName, lastName,
                                      userType, email,  birthDate,sex,
                                      yearLevel, section,
                                      course, college, password: hashedPassword });

  const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

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
    throw new AppError("Invalid credentials", 401);
  }

  // Generate access & refresh tokens
  const accessToken = generateAccessToken(existingUser);
  const refreshToken = await generateRefreshToken(existingUser); // Store in DB

  // Exclude password from response
  const { password: _, ...userData } = existingUser.toObject();

  res.status(200).json({
    user: userData,
    accessToken,
    refreshToken,
    expiresIn: 900, // 15 minutes
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


const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  
  const result = await User.updateOne(
    { "refreshTokens.token": refreshToken },
    { $pull: { refreshTokens: { token: refreshToken } } }
  );

  if (result.modifiedCount === 0) {
    throw new AppError("Token not found", 404);
  }

  res.status(204).send();
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
  
  // Add secret verification
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  
  // Verify token exists in DB
  const user = await User.findOne({
    'refreshTokens.token': refreshToken,
    'refreshTokens.expiresAt': { $gt: new Date() }
  });

  if (!user) throw new AppError("Invalid refresh token", 401);

  // Generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = await generateRefreshToken(user);

  // Remove ALL previous tokens for security
  user.refreshTokens = user.refreshTokens.filter(rt => rt.token === refreshToken);
  await user.save();

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: 900
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
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Remove oldest token if exceeding limit
  await User.findByIdAndUpdate(
    user._id,
    {
      $push: {
        refreshTokens: {
          $each: [{ token: refreshToken, expiresAt: new Date(Date.now() + 7*24*60*60*1000) }],
          $sort: { createdAt: -1 },
          $slice: 5
        }
      }
    }
  );

  return refreshToken;
};



module.exports = { signup, login, getUser, adminLogin, refreshToken, logout};