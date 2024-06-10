require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Mysterybox", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  port: 3306,
  dialectOptions: {
    connectTimeout: 20000, // Adjust the timeout as needed
  },
});

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
