const User = require("../models/User");
const Admin = require("../models/Admin")

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Find a user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Find a user by ID
const findUserById = async (id) => {
  return await User.findById(id);
};

// Fetch all users (excluding passwords)
const getAllUsers = async () => {
  return await User.find({}, { password: 0 });
};

// Update a user by ID
const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Find admin by username
const findAdminByUsername = async (username) => {
  return await Admin.findOne({ username });
};

module.exports = { createUser, findUserByEmail, findUserById, getAllUsers, updateUserById, findAdminByUsername };