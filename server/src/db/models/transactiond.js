'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionD extends Model {
   
    static associate({CategoryD}) {
      this.belongsTo(CategoryD,{foreignKey:'category_id'})
    }
  }
  TransactionD.init({
    category_id: DataTypes.INTEGER,
    sum: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionD',
  });
  return TransactionD;
};