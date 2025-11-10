// models/device.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Device",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING },
      currentState: { type: DataTypes.STRING },
      roomId: { type: DataTypes.STRING },
    },
    { tableName: "devices" }
  );
