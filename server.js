// server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");
const models = require("./models"); // triggers model init
const mqttClient = require("./mqtt/client");

// routes
const authRoutes = require("./routes/auth");
const deviceRoutes = require("./routes/device");
const roomRoutes = require("./routes/room");
const sensorRoutes = require("./routes/sensor");
const logRoutes = require("./routes/log");
const automationRoutes = require("./routes/automation");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// sync DB and start
(async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log("Database synced");
})();

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/automation", automationRoutes);

// simple status endpoint
app.get("/api/status", (req, res) => {
  res.json({ mqttConnected: mqttClient.connected, uptime: process.uptime() });
});

// MQTT message handler (update DB when incoming messages)
const { Sensor, SensorDataLog, SensorValue, Device } = require("./models");
const { v4: uuidv4 } = require("uuid");

mqttClient.on("message", async (topic, message) => {
  const payload = message.toString();
  console.log("MQTT message:", topic, payload);

  // Example: parse known topics, store logs
  // if topic matches `${USERNAME}/feeds/V3` (temp), V4 (humid), V1 (lamp state), V2 (fan state)
  try {
    // naive mapping by suffix
    if (topic.endsWith("/V3") || topic.endsWith("/V4")) {
      // save sensor log
      const sensorId = topic.split("/").pop() === "V3" ? "S001" : "S002";
      const logId = uuidv4();
      await SensorDataLog.create({ id: logId, sensorId });
      await SensorValue.create({
        logId,
        value: parseFloat(payload),
        unit: topic.endsWith("/V3") ? "°C" : "%",
      });
    } else if (topic.endsWith("/V1") || topic.endsWith("/V2")) {
      // device state update
      const deviceKey = topic.endsWith("/V1") ? "D001" : "D002";
      const state = payload;
      await Device.upsert({ id: deviceKey, currentState: state });
    }
  } catch (err) {
    console.error("Error handling mqtt message:", err.message);
  }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
