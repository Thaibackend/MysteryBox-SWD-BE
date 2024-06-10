"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserThird extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserThird.init(
    {
      email: DataTypes.STRING,
      role: DataTypes.STRING,
      typeLogin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserThird",
    }
  );
  return UserThird;
};
