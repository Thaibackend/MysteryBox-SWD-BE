"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      themeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Themes",
          key: "id",
        },
      },
      productCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      quantity: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      gender: {
        type: Sequelize.ENUM(["MALE", "FEMALE", "OTHER"]),
        defaultValue: "all",
      },
      color: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
