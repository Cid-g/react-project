// dataAccess/classDAL.js
const Class = require("../models/Class");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");

// Create new class
const createClass = async (classData) => {
  try {
    const classroom = new Class({
      ...classData,
      classCode: generateClassCode()
    });
    return await classroom.save();
  } catch (err) {
    // Handle duplicate class code
    if (err.code === 11000) {
      throw new AppError("Class code already exists", 400);
    }
    // Handle validation errors
    throw new AppError(`Class validation failed: ${err.message}`, 400);
  }
};

// Find class by ID with error handling
const findClassById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid class ID format", 400);
  }

  const classroom = await Class.findById(id)
    .populate("teacher", "firstName lastName")
    .populate("students", "firstName email");

  if (!classroom) {
    throw new AppError("Class not found", 404);
  }
  return classroom;
};

// Get all classes with error handling
const getAllClasses = async () => {
  try {
    return await Class.find().lean();
  } catch (err) {
    throw new AppError("Failed to retrieve classes", 500);
  }
};

// Utility function (should be in utils/ but included here for completeness)
const generateClassCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

module.exports = {
  createClass,
  findClassById,
  getAllClasses
};