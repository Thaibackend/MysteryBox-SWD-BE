"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PackageInPeriods", {
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
      packageOrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PackageOrders",
          key: "id",
        },
      },

      endBy: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(["PENDING", "FINISHED"]),
        defaultValue: "PENDING",
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
