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

const authorizeRole = (role) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id).populate("roles");
    if (!user.roles.some((r) => r.name === role)) {
      return res.status(403).json({ message: "Permission denied" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
