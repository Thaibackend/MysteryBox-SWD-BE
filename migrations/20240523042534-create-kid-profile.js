"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("KidProfiles", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.fn("UUID"),
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },

      fullName: {
        type: Sequelize.STRING,
      },
      descriptionHobby: {
        type: Sequelize.STRING,
        required: true,
      },
      gender: {
        type: Sequelize.ENUM(["MALE", "FEMALE", "OTHER"]),
        defaultValue: "MALE",
      },
      yob: {
        type: Sequelize.STRING,
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
      toyOrigin: {
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
    await queryInterface.dropTable("KidProfiles");
  },
};
