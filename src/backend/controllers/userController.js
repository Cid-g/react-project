const { getAllUsers: fetchAllUsers } = require("../dataAccess/userDAL");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await fetchAllUsers();
  res.status(200).json(users);
});

module.exports = { getAllUsers };