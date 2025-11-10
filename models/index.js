// models/index.js
const { sequelize } = require("../config/db");
const User = require("./user");
const Room = require("./room");
const Device = require("./device");
const Sensor = require("./sensor");
const SensorDataLog = require("./sensor_data_log");
const SensorValue = require("./sensor_value");
const Log = require("./log");

// Initialize models (they receive sequelize inside their files)
const models = {
  User: User(sequelize),
  Room: Room(sequelize),
  Device: Device(sequelize),
  Sensor: Sensor(sequelize),
  SensorDataLog: SensorDataLog(sequelize),
  SensorValue: SensorValue(sequelize),
  Log: Log(sequelize),
};

// Associations
models.User.hasMany(models.Room, { foreignKey: "userId" });
models.Room.belongsTo(models.User, { foreignKey: "userId" });

models.Room.hasMany(models.Device, { foreignKey: "roomId" });
models.Device.belongsTo(models.Room, { foreignKey: "roomId" });

models.Sensor.belongsTo(models.Room, { foreignKey: "roomId" });
models.Room.hasMany(models.Sensor, { foreignKey: "roomId" });

models.SensorDataLog.belongsTo(models.Sensor, { foreignKey: "sensorId" });
models.Sensor.hasMany(models.SensorDataLog, { foreignKey: "sensorId" });

models.SensorValue.belongsTo(models.SensorDataLog, { foreignKey: "logId" });
models.SensorDataLog.hasMany(models.SensorValue, { foreignKey: "logId" });

models.Log.belongsTo(models.User, { foreignKey: "userId" });

// Export
module.exports = { sequelize, ...models };
