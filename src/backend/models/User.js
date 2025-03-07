const mongoose = require("mongoose");
const { ROLES } = require("../UserType");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false }, // Optional
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String,
              enum: Object.values(ROLES),
              required: true },
  sex: {type: String, enum: ['male', 'male'], default: null},            
  birthDate: {type: Date, default: null},
  yearLevel: {type: String,
              default: null},
  section: {type: String, default: null},
  course: {type: String, default: null}
  

});

module.exports = mongoose.model("User", userSchema);