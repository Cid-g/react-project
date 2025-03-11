const { getAllUsers: fetchAllUsers } = require("../dataAccess/userDAL");

const getAllUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers(); 
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = { getAllUsers };