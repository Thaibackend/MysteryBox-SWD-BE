const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Mysterybox", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connect DB successful");
  } catch (error) {
    console.log("Connect DB fail " + error.message);
  }
};

module.exports = connectDatabase;
