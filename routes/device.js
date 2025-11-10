// routes/device.js
const express = require("express");
const router = express.Router();
const mqttClient = require("../mqtt/client");
const { Log, Device } = require("../models");
const { protect } = require("../middleware/auth");
const {
  TurnLightOnCommand,
  TurnLightOffCommand,
} = require("../commands/lightCommands");
const {
  TurnFanOnCommand,
  TurnFanOffCommand,
} = require("../commands/fanCommands");
const { v4: uuidv4 } = require("uuid");

// send command to device
router.post("/:device/action", protect, async (req, res) => {
  const deviceParam = req.params.device; // e.g., lamp, fan or device id
  const { action, value } = req.body;
  try {
    let commandObj = null;

    if (deviceParam === "lamp") {
      if (action === "on") commandObj = new TurnLightOnCommand();
      else if (action === "off") commandObj = new TurnLightOffCommand();
    } else if (deviceParam === "fan") {
      if (action === "on") commandObj = new TurnFanOnCommand(value || "100");
      else if (action === "off") commandObj = new TurnFanOffCommand();
      else if (action === "value") commandObj = new TurnFanOnCommand(value);
    } else {
      // allow direct device id control by mapping device.type or topic (extendable)
      const device = await Device.findByPk(deviceParam);
      if (!device) return res.status(400).json({ error: "Invalid device" });
      // sample: if type === 'light' map...
      if (device.type === "light") {
        commandObj =
          action === "on"
            ? new TurnLightOnCommand()
            : new TurnLightOffCommand();
      } else if (device.type === "fan") {
        commandObj =
          action === "on"
            ? new TurnFanOnCommand(value || "100")
            : new TurnFanOffCommand();
      }
    }

    if (!commandObj) return res.status(400).json({ error: "Invalid action" });

    // execute command
    commandObj.execute(mqttClient);

    // save log
    await Log.create({
      id: uuidv4(),
      device: deviceParam,
      action,
      value: commandObj.payload,
      userId: req.user.id,
    });

    res.json({ ok: true, message: "Command sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get device states (from DB)
router.get("/status/all", protect, async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
