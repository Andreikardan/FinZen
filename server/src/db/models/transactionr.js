'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionR extends Model {
 
    static associate({CategoryR,TransactionComment,TransactionRPhoto}) {
      this.belongsTo(CategoryR,{foreignKey:'category_id'})
      this.hasMany(TransactionComment,{foreignKey:'transaction_id'})
      this.hasMany(TransactionRPhoto,{foreignKey:'transactionR_id'})
    }

  }
  TransactionR.init({
    category_id: DataTypes.INTEGER,
    sum: DataTypes.INTEGER,
    description: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TransactionR',
  });
  return TransactionR;
};