"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productCode: DataTypes.STRING,
      themeId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      age: DataTypes.STRING,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("images");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(arrayImages) {
          this.setDataValue("images", JSON.stringify(arrayImages));
        },
      },
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
      gender: {
        type: DataTypes.ENUM,
        values: ["MALE", "FEMALE", "OTHER"],
      },
      color: DataTypes.STRING,
      type: DataTypes.STRING,
      material: DataTypes.STRING,
      origin: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
