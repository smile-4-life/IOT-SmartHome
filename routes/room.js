// routes/room.js
const express = require("express");
const router = express.Router();
const { Room } = require("../models");
const { protect } = require("../middleware/auth");

// get rooms for user
router.get("/", protect, async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: { userId: req.user.id } });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create room
router.post("/", protect, async (req, res) => {
  const { name, id } = req.body;
  try {
    const room = await Room.create({ id, name, userId: req.user.id });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
