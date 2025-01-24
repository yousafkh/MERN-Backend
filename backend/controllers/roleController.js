const Role = require("../models/Role");
const User = require("../models/User");

exports.getAllRoles = async (req, res) => {
  try {
    const users = await Role.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = new Role({ name });
    await role.save();
    res.status(201).json({ message: "Role created successfully" });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
};

exports.assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const role = await Role.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });

    user.roles.push(role._id);
    await user.save();
    res.status(200).json({ message: "Role assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
