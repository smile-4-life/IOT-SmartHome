// commands/fanCommands.js
const BaseCommand = require("./baseCommand");
const USER = process.env.MQTT_USERNAME || "MrBean";
const TOPIC = `${USER}/feeds/V2`; // fan topic

class TurnFanOnCommand extends BaseCommand {
  constructor(value = "100") {
    super(TOPIC, String(value));
  }
}

class TurnFanOffCommand extends BaseCommand {
  constructor() {
    super(TOPIC, "0");
  }
}

module.exports = { TurnFanOnCommand, TurnFanOffCommand };
