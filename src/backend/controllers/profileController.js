const { findUserById, updateUserById } = require("../dataAccess/userDAL");

// Fetch profile data
const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive data like password
    const { password, ...userData } = user.toObject();
    console.log("Profile data fetched:", userData); // Debugging line
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching profile:", error); // Debugging line
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Update profile data
const updateProfile = async (req, res) => {
  try {
    const { firstName, middleName, lastName, sex, birthDate, course, yearLevel, section } = req.body;

    const updatedUser = await updateUserById(req.user.id, {
      firstName,
      middleName,
      lastName,
      sex,
      birthDate,
      course,
      yearLevel,
      section,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive data like password
    const { password, ...userData } = updatedUser.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

module.exports = { getProfile, updateProfile };