// config/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Please set DATABASE_URL in .env");
  process.exit(1);
}

const sequelize = new Sequelize(connectionString, {
  logging: false,
  dialectOptions: {
    // add ssl: { rejectUnauthorized: false } if needed for remote DB
  },
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Postgres connected.");
  } catch (err) {
    console.error("Unable to connect to DB:", err);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
