'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionComment extends Model {

    static associate({TransactionR}) {
      this.belongsTo(TransactionR,{foreignKey:'transaction_id'})
    }
  }
  TransactionComment.init({
    text: DataTypes.STRING,
    transaction_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionComment',
  });
  return TransactionComment;
};