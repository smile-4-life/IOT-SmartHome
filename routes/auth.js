// routes/auth.js
const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { generateToken } = require("../middleware/auth");

// register
router.post("/register", async (req, res) => {
  const { username, password, fullName } = req.body;
  try {
    const exists = await User.findOne({ where: { username } });
    if (exists) return res.status(400).json({ message: "User exists" });
    const user = await User.create({ username, password, fullName });
    res.status(201).json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(401).json({ message: "Invalid creds" });
    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid creds" });
    res.json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
