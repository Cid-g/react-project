const { findUserById, updateUserById } = require("../dataAccess/userDAL");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Fetch profile data
const getProfile = catchAsync(async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Exclude sensitive data like password
  const { password, ...userData } = user.toObject();
  console.log("Profile data fetched:", userData); // Debugging line
  res.status(200).json(userData);
});

// Update profile data
const updateProfile = catchAsync(async (req, res, next) => {
  const { firstName, middleName, lastName, sex, birthDate, course, yearLevel, section } = req.body;

  const updatedUser = await updateUserById(req.user.id, {
    firstName,
    middleName,
    lastName,
    sex,
    birthDate,
    course,
    yearLevel,
    section,
  });

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  // Exclude sensitive data like password
  const { password, ...userData } = updatedUser.toObject();
  res.status(200).json(userData);
});

module.exports = { getProfile, updateProfile };