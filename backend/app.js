const express = require("express");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/mongo-db");
const { seedRoles, seedSuperAdmin } = require("./config/dbSeed");

const app = express();
app.use(express.json());

connectDB();

// Seed roles
seedRoles();
seedSuperAdmin();

// Existing routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

// Add user routes
app.use("/api/users", userRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

module.exports = app;
