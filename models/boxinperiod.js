"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoxInPeriod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BoxInPeriod.init(
    {
      periodId: DataTypes.UUID,
      boxId: DataTypes.UUID,
      quantity: DataTypes.STRING,
      used: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BoxInPeriod",
    }
  );
  return BoxInPeriod;
};
