"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PackageOrders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      kidId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "KidProfiles",
          key: "id",
        },
      },
      packageId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Packages",
          key: "id",
        },
      },
      totalPrice: {
        type: Sequelize.STRING,
      },
      nameOfAdult: {
        type: Sequelize.STRING,
      },
      nameOfKid: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      additionalNotes: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(["Pending", "Cancel", "Finished"]),
        defaultValue: "Pending",
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
    await queryInterface.dropTable("PackageOrders");
  },
};
