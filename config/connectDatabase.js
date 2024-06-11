require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    port: 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect DB successful");
  } catch (error) {
    console.error("Unable to connect to the database:", {
      message: error.message,
      stack: error.stack,
      original: error.original,
    });
  }
};

module.exports = connectDatabase;
