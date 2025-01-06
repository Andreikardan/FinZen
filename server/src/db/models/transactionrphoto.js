'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class TransactionRPhoto extends Model {
   
    static associate({TransactionR}) {
      this.belongsTo(TransactionR,{foreignKey:'transactionR_id'})
    }
  }
  TransactionRPhoto.init({
    url: DataTypes.STRING,
    transactionR_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionRPhoto',
  });
  return TransactionRPhoto;
};