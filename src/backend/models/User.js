const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false }, // Optional
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String,
              enum: ['Admin', 'Manager'],
              required: true },
  sex: {type: String, enum: ['male', 'male'], default: null},            
  birthDate: {type: Date, default: null},
  yearLevel: {type: String,
              enum: ['firstYear', 'secondYear', 'thirdYear', 'fourthYear', 'fifthYear' ],
              default: null},
  section: {type: String, default: null},
  course: {type: String, default: null}
  

});

module.exports = mongoose.model("User", userSchema);