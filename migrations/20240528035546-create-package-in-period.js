"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PackageInPeriods", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      boxId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "MysteryBoxes",
          key: "id",
        },
      },
      packageOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PackageOrders",
          key: "id",
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameOfAdult: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      openingDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      packagingDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      confirmDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(["OPEN", "DELIVERY", "PACK", "CONFIRM"]),
        defaultValue: "OPEN",
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
    await queryInterface.dropTable("PackageInPeriods");
  },
};
