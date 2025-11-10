// models/sensor_data_log.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "SensorDataLog",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      sensorId: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "sensor_data_logs", timestamps: false }
  );
