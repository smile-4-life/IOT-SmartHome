// routes/sensor.js
const express = require("express");
const router = express.Router();
const { Sensor, SensorDataLog, SensorValue } = require("../models");
const { protect } = require("../middleware/auth");

// list sensors
router.get("/", protect, async (req, res) => {
  try {
    const sensors = await Sensor.findAll();
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get sensor history
router.get("/:id/data", protect, async (req, res) => {
  const id = req.params.id;
  const limit = parseInt(req.query.limit || "50");
  try {
    const logs = await SensorDataLog.findAll({
      where: { sensorId: id },
      order: [["createdAt", "DESC"]],
      limit,
      include: [{ model: SensorValue }],
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
