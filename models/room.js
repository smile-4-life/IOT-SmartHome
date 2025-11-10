// models/room.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "Room",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, unique: true, allowNull: false },
      userId: { type: DataTypes.UUID, allowNull: true },
    },
    { tableName: "rooms" }
  );
