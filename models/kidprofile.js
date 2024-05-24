"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KidProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KidProfile.init(
    {
      userId: DataTypes.UUID,
      fullName: DataTypes.STRING,
      descriptionHobby: DataTypes.STRING,
      yob: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE", "OTHER"],
      },
      color: DataTypes.STRING,
      type: DataTypes.STRING,
      material: DataTypes.STRING,
      toyOrigin: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "KidProfile",
    }
  );
  return KidProfile;
};
