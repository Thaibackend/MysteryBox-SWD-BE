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
      age: DataTypes.STRING,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      priceAvarage: DataTypes.STRING,
      description: DataTypes.STRING,
      qrCode: DataTypes.STRING,
      quantityProInBox: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      productsId: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("productsId");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(array) {
          this.setDataValue("productsId", JSON.stringify(array));
        },
      },
    },
    {
      sequelize,
      modelName: "MysteryBox",
    }
  );
  return MysteryBox;
};
