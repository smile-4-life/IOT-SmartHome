// commands/lightCommands.js
const BaseCommand = require("./baseCommand");
const USER = process.env.MQTT_USERNAME || "MrBean";
const TOPIC = `${USER}/feeds/V1`; // lamp topic

class TurnLightOnCommand extends BaseCommand {
  constructor() {
    super(TOPIC, "1");
  }
}

class TurnLightOffCommand extends BaseCommand {
  constructor() {
    super(TOPIC, "0");
  }
}

module.exports = { TurnLightOnCommand, TurnLightOffCommand };
