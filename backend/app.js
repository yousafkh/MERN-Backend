const express = require("express");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/mongo-db");
const { seedRoles, seedSuperAdmin } = require("./config/dbSeed");
const routes = require("./config/routesConfig");

const app = express();
const router = express.Router();
app.use(express.json());

connectDB();

// Seed roles
seedRoles();
seedSuperAdmin();

// Dynamically register routes
routes.forEach((route) => {
  const middlewares = route.middlewares || [];
  app[route.method](route.path, ...middlewares, route.controller);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

module.exports = app;
