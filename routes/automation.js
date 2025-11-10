// routes/automation.js
const express = require("express");
const router = express.Router();
const mqttClient = require("../mqtt/client");
const {
  TurnLightOnCommand,
  TurnLightOffCommand,
} = require("../commands/lightCommands");
const {
  TurnFanOnCommand,
  TurnFanOffCommand,
} = require("../commands/fanCommands");
const { protect } = require("../middleware/auth");

// run a scene
router.post("/run/:scene", protect, async (req, res) => {
  const scene = req.params.scene;
  try {
    if (scene === "goodmorning") {
      new TurnLightOnCommand().execute(mqttClient);
      new TurnFanOnCommand("50").execute(mqttClient);
      return res.json({ ok: true, scene });
    } else if (scene === "movie") {
      new TurnLightOffCommand().execute(mqttClient);
      new TurnFanOffCommand().execute(mqttClient);
      return res.json({ ok: true, scene });
    } else {
      return res.status(400).json({ error: "Unknown scene" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
