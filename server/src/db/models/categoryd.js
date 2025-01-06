'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryD extends Model {
  
    static associate({Budget,TransactionD}) {
      this.hasMany(TransactionD,{foreignKey:'category_id'})
      this.belongsTo(Budget,{foreignKey:'budget_id'})
    }
  }
  CategoryD.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    budget_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CategoryD',
  });
  return CategoryD;
};