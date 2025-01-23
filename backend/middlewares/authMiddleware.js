const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

const authorizeRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Ensure the roles parameter is an array
      if (!Array.isArray(allowedRoles)) {
        return res
          .status(500)
          .json({ message: "Allowed roles must be an array" });
      }

      // Get user from request (populated in the authentication middleware)
      const user = await User.findById(req.user.id).populate("roles");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if the user's roles match any allowed role
      const userRoles = user.roles.map((role) => role.name);
      const isAuthorized = allowedRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!isAuthorized) {
        return res
          .status(403)
          .json({ message: "Access denied (Unauthorized)" });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  };
};

module.exports = { authenticateToken, authorizeRole };
