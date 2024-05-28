"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BoxInPeriods", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("UUID"),
      },
      periodId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Periods",
          key: "id",
        },
      },
      boxId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "MysteryBoxes",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.STRING,
      },
      used: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("BoxInPeriods");
  },
};
