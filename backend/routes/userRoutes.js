const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserRoles,
} = require("../controllers/userController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");
const router = express.Router();

// Route to create a user with specific roles (Admin-only)
router.post("/create", authenticateToken, authorizeRole(["admin"]), createUser);

// Route to get all users (Admin-only)
router.get(
  "/",
  authenticateToken,
  authorizeRole(["admin", "user"]),
  getAllUsers
);

// Route to get a user by ID (Admin-only)
router.get("/:id", authenticateToken, authorizeRole(["admin"]), getUserById);

// Route to update a user's roles (Admin-only)
router.put(
  "/update-roles",
  authenticateToken,
  authorizeRole("admin"),
  updateUserRoles
);

module.exports = router;
