"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
   
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    des: DataTypes.STRING,
    category: DataTypes.STRING,
    actualPrice: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    avail: DataTypes.STRING,
    imagepath: DataTypes.STRING
  }, 
  {
    sequelize,
    modelName: "Product",
  });
  return Product;
};

