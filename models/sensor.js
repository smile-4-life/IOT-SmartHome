// models/sensor.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Sensor",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      type: { type: DataTypes.STRING },
      roomId: { type: DataTypes.STRING },
    },
    { tableName: "sensors" }
  );
