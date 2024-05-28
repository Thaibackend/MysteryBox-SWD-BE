"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MysteryBox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MysteryBox.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      priceAvarage: DataTypes.STRING,
      description: DataTypes.STRING,
      qrCode: DataTypes.STRING,
      quantityProInBox: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "MysteryBox",
    }
  );
  return MysteryBox;
};
