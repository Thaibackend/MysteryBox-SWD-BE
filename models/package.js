"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Package.init(
    {
      fromAge: DataTypes.FLOAT,
      toAge: DataTypes.FLOAT,
      image: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      numberOfSend: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },

    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};
