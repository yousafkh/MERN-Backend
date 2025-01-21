const Role = require("../models/Role");

exports.seedRoles = async () => {
  try {
    const roles = ["user", "admin"];
    for (const roleName of roles) {
      const roleExists = await Role.findOne({ name: roleName });
      if (!roleExists) {
        await Role.create({ name: roleName });
        console.log(`Role '${roleName}' created.`);
      }
    }
  } catch (err) {
    console.error("Error initializing roles:", err.message);
  }
};
