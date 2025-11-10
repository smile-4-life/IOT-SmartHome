// mqtt/client.js
require("dotenv").config();
const mqtt = require("mqtt");

const BROKER = process.env.MQTT_BROKER;
const USERNAME = process.env.MQTT_USERNAME;
const PASSWORD = process.env.MQTT_PASSWORD || "";

if (!BROKER) {
  console.error("MQTT_BROKER not set");
  process.exit(1);
}

const client = mqtt.connect(BROKER, {
  username: USERNAME,
  password: PASSWORD,
  reconnectPeriod: 2000, // reconnect after 2s
});

client.on("connect", () => {
  console.log("MQTT connected to", BROKER);
  // subscribe default status topic
  if (USERNAME)
    client.subscribe(`${USERNAME}/feeds/#`, (err) => {
      if (err) console.error("MQTT subscribe error:", err.message);
    });
});

client.on("reconnect", () => console.log("MQTT reconnecting..."));
client.on("error", (err) => console.error("MQTT error:", err.message));

module.exports = client;
