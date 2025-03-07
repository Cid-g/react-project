const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle specific error types
  if (err.name === "ValidationError") {
    // Mongoose validation error
    statusCode = 400;
    message = "Validation Error";
  } else if (err.name === "CastError") {
    // Mongoose cast error (e.g., invalid ObjectId)
    statusCode = 400;
    message = "Invalid ID";
  } else if (err.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // Send the error response
  res.status(statusCode).json({
    status: "error",
    message,
  });
};

module.exports = errorHandler;