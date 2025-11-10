// models/log.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Log",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      device: { type: DataTypes.STRING },
      action: { type: DataTypes.STRING },
      value: { type: DataTypes.STRING },
      userId: { type: DataTypes.UUID, allowNull: true },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "logs", timestamps: false }
  );
