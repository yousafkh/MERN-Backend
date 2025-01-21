const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validate roles and get their IDs
    const roleDocs = await Role.find({ _id: { $in: roles } });
    if (roleDocs.length !== roles.length) {
      return res.status(400).json({ message: "Some roles are invalid" });
    }

    // Create the user
    const user = new User({ name, email, password: hashedPassword, roles });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("roles", "name"); // Populate role names
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("roles", "name");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateUserRoles = async (req, res) => {
  try {
    const { userId, roles } = req.body;

    // Validate roles
    const roleDocs = await Role.find({ _id: { $in: roles } });
    if (roleDocs.length !== roles.length) {
      return res.status(400).json({ message: "Some roles are invalid" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update roles
    user.roles = roles;
    await user.save();

    res.status(200).json({ message: "User roles updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
