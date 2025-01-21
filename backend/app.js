const express = require("express");
const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/mongo-db");
const { seedRoles } = require("./config/dbSeed");

const app = express();
app.use(express.json());

connectDB();

// Seed roles
seedRoles();

// Existing routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);

// Add user routes
app.use("/api/users", userRoutes);

module.exports = app;
