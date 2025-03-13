// controllers/classController.js
const catchAsync = require("../utils/catchAsync");
const classDAL = require("../dataAccess/classDAL");

exports.getClass = catchAsync(async (req, res, next) => {
  const classroom = await classDAL.findClassById(req.params.id);
  res.status(200).json({
    status: "success",
    data: classroom
  });
});

exports.createClass = catchAsync(async (req, res, next) => {
    if (!req.body.className) {
      throw new AppError("Class name is required", 400);
    }
    
    const newClass = await classDAL.createClass({
      className: req.body.className,
      teacher: req.user._id
    });
    
    res.status(201).json({
      status: "success",
      data: newClass
    });
  });