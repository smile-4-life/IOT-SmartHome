// commands/baseCommand.js
class BaseCommand {
  constructor(topic, payload, options = {}) {
    this.topic = topic;
    this.payload = payload;
    this.options = options;
  }
  execute(client) {
    if (!client || !client.publish) throw new Error("MQTT client missing");
    client.publish(this.topic, this.payload, this.options, (err) => {
      if (err) console.error("Publish error:", err.message);
    });
  }
}
module.exports = BaseCommand;
