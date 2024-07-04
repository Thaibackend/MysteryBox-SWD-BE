"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PackageInPeriod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PackageInPeriod.init(
    {
      boxId: DataTypes.INTEGER,
      packageOrderId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      nameOfAdult: DataTypes.STRING,
      openingDate: DataTypes.DATE,
      packagingDate: DataTypes.DATE,
      deliveryDate: DataTypes.DATE,
      confirmDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: ["OPEN", "DELIVERY", "PACK", "CONFIRM"],
      },
    },
    {
      sequelize,
      modelName: "PackageInPeriod",
    }
  );
  return PackageInPeriod;
};
