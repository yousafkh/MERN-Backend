const Role = require("../models/Role");
const User = require("../models/User");
require("dotenv").config();

exports.seedRoles = async () => {
  try {
    const roles = ["user", "admin", "superadmin", "moderator"];
    const existingRoles = await Role.find({ name: { $in: roles } });
    const existingRoleNames = existingRoles.map((role) => role.name);

    for (const roleName of roles) {
      if (!existingRoleNames.includes(roleName)) {
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' created.`);
      }
    }
  } catch (err) {
    console.error("Error initializing roles:", err.message);
  }
};

exports.seedSuperAdmin = async () => {
  try {
    const superAdminExists = await User.findOne({ email: "superadmin" });
    let superAdminRole = await Role.findOne({ name: "superadmin" });

    if (!superAdminExists) {
      if (typeof process.env.SUPERADMIN_PASSWORD === "undefined")
        throw Error(
          "SUPERADMIN_PASSWORD is not defined in .env file for seeding."
        );
      const superAdmin = new User({
        name: "Super Admin",
        email: "superadmin",
        password: process.env.SUPERADMIN_PASSWORD,
        roles: [superAdminRole._id],
      });
      await superAdmin.save();
      console.log("Superadmin created.");
    }
  } catch (err) {
    console.error("Error initializing superadmin:", err.message);
  }
};
