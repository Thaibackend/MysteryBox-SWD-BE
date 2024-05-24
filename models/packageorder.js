"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackageOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PackageOrder.init(
    {
      kidId: DataTypes.UUID,
      packageId: DataTypes.UUID,
      totalPrice: DataTypes.STRING,
      nameOfAdult: DataTypes.STRING,
      nameOfKid: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      additionalNotes: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PackageOrder",
    }
  );
  return PackageOrder;
};
