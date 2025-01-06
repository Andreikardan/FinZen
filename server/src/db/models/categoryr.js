'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryR extends Model {

    static associate({Budget,TransactionR}) {
      this.belongsTo(Budget,{foreignKey:'budget_id'})
      this.hasMany(TransactionR,{foreignKey:'category_id'})
    }
  }
  CategoryR.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    budget_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryR',
  });
  return CategoryR;
};