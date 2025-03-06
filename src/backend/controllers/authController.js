const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, findUserById } = require("../dataAccess/userDAL");

// Signup
const signup = async (req, res) => {
  const { firstName, middleName, lastName, userType, email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser({ firstName, middleName, lastName, userType, email, password: hashedPassword });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ user: { id: newUser._id, firstName, lastName, email, userType }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ user: { id: existingUser._id, firstName: existingUser.firstName, lastName: existingUser.lastName, email, userType: existingUser.userType }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Fetch logged-in user's data
const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user.toObject();
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, login, getUser };