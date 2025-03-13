const mongoose = require("mongoose");
const { ROLES } = require("../UserType");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: false }, 
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String,
              enum: Object.values(ROLES),
              required: true },
  sex: {type: String, default: null},            
  birthDate: {type: Date, default: null},
  yearLevel: {type: String,
              default: null},
  section: {type: String, default: null},
  course: {type: String, default: null},
  profilePicture: { type: String, default: null },
  college: {type: String, default: null},
  refreshTokens: [{
    token: String,
    expiresAt: Date,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  classes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }],
  enrollments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment'}],
  
});
userSchema.index({ "refreshTokens.token": 1 });
userSchema.index({ "refreshTokens.expiresAt": 1 }, { expireAfterSeconds: 0 });
userSchema.pre('save', function(next) {
  this.refreshTokens = this.refreshTokens.filter(
    rt => rt.expiresAt > Date.now()
  );
  if (this.refreshTokens.length > 5) {
    this.refreshTokens = this.refreshTokens
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);