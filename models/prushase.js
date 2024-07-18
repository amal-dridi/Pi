"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {

    static associate(models) {
      // define association here
    }
  }
  Purchase.init({
    totalcost: DataTypes.FLOAT,
    dop: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    productname: DataTypes.STRING,
    transactionid: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Purshase"
  });
  return Purchase;
};