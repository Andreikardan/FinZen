'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoalTransaction extends Model {
    static associate({Budget, Goal}) {
      this.belongsTo(Budget,{foreignKey:'budget_id'})
      this.belongsTo(Goal,{foreignKey:'goal_id'})
    }
  }
  GoalTransaction.init({
    budget_id: DataTypes.INTEGER,
    icon:DataTypes.STRING,
    goal_id: DataTypes.INTEGER,
    sumGoal: DataTypes.FLOAT,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GoalTransaction',
  });
  return GoalTransaction;
};