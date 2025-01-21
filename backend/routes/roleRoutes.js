const express = require("express");
const { createRole, assignRole } = require("../controllers/roleController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticateToken, authorizeRole("admin"), createRole);
router.post("/assign", authenticateToken, authorizeRole("admin"), assignRole);

module.exports = router;
