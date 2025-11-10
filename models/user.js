// models/user.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "member", // or admin
      },
    },
    {
      tableName: "users",
    }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.matchPassword = async function (entered) {
    return bcrypt.compare(entered, this.password);
  };

  return User;
};
