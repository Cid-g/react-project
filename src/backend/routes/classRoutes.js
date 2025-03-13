// routes/classRoutes.js
const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const { verifyToken, verifyRole } = require("../middleware/auth");
const catchAsync = require("../utils/catchAsync");
const { ROLES } = require("../UserType");

// Apply token verification to all class routes
router.use(verifyToken);

// Teacher-only routes
router.post(
  "/",
  verifyRole([ROLES.TEACHER]),
  catchAsync(classController.createClass)
);

router.get(
  "/my-classes",
  verifyRole([ROLES.TEACHER]),
  catchAsync(classController.getTeacherClasses)
);

// Student-only routes
router.post(
  "/:classId/enroll",
  verifyRole([ROLES.STUDENT]),
  catchAsync(classController.enrollStudent)
);

// Shared routes (Teacher + Student)
router.get(
  "/:id",
  verifyRole([ROLES.TEACHER, ROLES.STUDENT]),
  catchAsync(classController.getClass)
);

router.get(
  "/",
  verifyRole([ROLES.TEACHER, ROLES.STUDENT]),
  catchAsync(classController.getAllClasses)
);

module.exports = router;