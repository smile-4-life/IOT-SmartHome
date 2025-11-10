// routes/log.js
const express = require("express");
const router = express.Router();
const { Log, User } = require("../models");
const { protect } = require("../middleware/auth");

// get logs (filter optional)
router.get("/", protect, async (req, res) => {
  const { device, limit = 50 } = req.query;
  const where = {};
  if (device) where.device = device;

  try {
    const logs = await Log.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      include: [{ model: User, attributes: ["id", "username", "fullName"] }],
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
