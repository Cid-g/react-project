const { findUserById, updateUserById } = require("../dataAccess/userDAL");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const upload = require('../middleware/uploadMiddleware');

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
  const { firstName, middleName, lastName, sex, birthDate, course, yearLevel, section,college, profilePicture } = req.body;

  const updatedUser = await updateUserById(req.user.id, {
    firstName,
    middleName,
    lastName,
    sex,
    birthDate,
    course,
    yearLevel,
    section,
    college,
    profilePicture
  });

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  // Exclude sensitive data like password
  const { password, ...userData } = updatedUser.toObject();
  res.status(200).json(userData);
});

//Uploading profile picture
const uploadProfilePicture = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  const updatedUser = await updateUserById(req.user.id, {
    profilePicture: `/uploads/profile-pictures/${req.file.filename}`
  });

  res.status(200).json({
    status: 'success',
    data: {
      profilePicture: updatedUser.profilePicture
    }
  });
});

module.exports = { getProfile, updateProfile, uploadProfilePicture };