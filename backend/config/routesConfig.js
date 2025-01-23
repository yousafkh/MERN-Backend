const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");

const userRoutesPrefix = "/api/users";
const authRoutesPrefix = "/api/auth";

const routes = [
  {
    name: "signup",
    path: `${authRoutesPrefix}/signup`,
    method: "post",
    middlewares: [],
    controller: authController.signup,
  },
  {
    name: "login",
    path: `${authRoutesPrefix}/login`,
    method: "post",
    middlewares: [],
    controller: authController.login,
  },
  {
    name: "Get all users",
    path: `${userRoutesPrefix}/api/users/`,
    method: "get",
    middlewares: [
      authenticateToken,
      authorizeRole(["admin", "superadmin", "user"]),
    ],
    controller: userController.getAllUsers,
  },
  {
    path: `${userRoutesPrefix}/api/users/:id`,
    method: "get",
    middlewares: [
      authenticateToken,
      authorizeRole(["admin", "superadmin", "moderator"]),
    ],
    controller: userController.getUserById,
  },
  {
    path: `${userRoutesPrefix}/api/users/:id/update-roles`,
    method: "put",
    middlewares: [authenticateToken, authorizeRole(["admin", "superadmin"])],
    controller: userController.updateUserRoles,
  },
  {
    path: "/api/roles",
    method: "get",
    middlewares: [authenticateToken, authorizeRole(["admin", "superadmin"])],
    controller: roleController.getAllRoles,
  },
  {
    path: "/api/roles/create",
    method: "post",
    middlewares: [authenticateToken, authorizeRole(["admin", "superadmin"])],
    controller: roleController.createRole,
  },
];

module.exports = routes;
