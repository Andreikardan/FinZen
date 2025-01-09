'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {

  }
  Goal.init({
    title: DataTypes.STRING,
    goal: DataTypes.FLOAT,
    accumulator: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};