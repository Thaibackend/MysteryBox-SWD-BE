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
      kidId: DataTypes.INTEGER,
      packageId: DataTypes.INTEGER,
      totalPrice: DataTypes.STRING,
      nameOfAdult: DataTypes.STRING,
      nameOfKid: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      packageInPeriodIds: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("packageInPeriodIds");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(array) {
          this.setDataValue("packageInPeriodIds", JSON.stringify(array));
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Pending", "Cancel", "Finished"],
      },
    },
    {
      sequelize,
      modelName: "PackageOrder",
    }
  );
  return PackageOrder;
};
