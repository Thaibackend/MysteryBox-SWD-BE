"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Period extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Period.init(
    {
      season: {
        type: DataTypes.ENUM,
        values: ["Spring", "Summer", "Fall", "Winter"],
      },
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Period",
    }
  );
  return Period;
};
