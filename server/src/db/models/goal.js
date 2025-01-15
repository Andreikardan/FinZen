'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    static associate({GoalTransaction}) {
      this.hasMany(GoalTransaction,{foreignKey:'goal_id',
         onDelete: 'CASCADE'
      })
    }
  }
  Goal.init({
    user_id:DataTypes.INTEGER,
    title: DataTypes.STRING,
    goal: DataTypes.FLOAT,
    accumulator: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};