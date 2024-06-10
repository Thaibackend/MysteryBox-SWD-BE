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

      productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Products",
          key: "id",
        },
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
