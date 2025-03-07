const mongoose = require("mongoose");
const { ROLES } = require("../UserType");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, default: ROLES.ADMIN, enum: Object.values(ROLES) },
});

module.exports = mongoose.model("Admin", adminSchema);