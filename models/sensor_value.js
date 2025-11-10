// models/sensor_value.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "SensorValue",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      logId: { type: DataTypes.STRING },
      value: { type: DataTypes.FLOAT },
      unit: { type: DataTypes.STRING },
    },
    { tableName: "sensor_values", timestamps: false }
  );
