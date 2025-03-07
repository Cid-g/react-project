const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");
const dotenv = require("dotenv");

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Seed admin account
    const admin = {
      username: "admin",
      password: await bcrypt.hash("admin123", 12), // Hash the password
      userType: "Admin"
    };

    await Admin.create(admin);
    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error seeding admin:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.connection.close();
  }
};

seedAdmin();