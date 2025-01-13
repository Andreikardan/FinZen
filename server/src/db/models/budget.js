"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {

    static associate({ User, CategoryR,CategoryD, GoalTransaction}) {
      this.belongsTo(User, {
        foreignKey: "user_id",
      });
      this.hasMany(CategoryR,{foreignKey:'budget_id',
      })
      this.hasMany(CategoryD,{foreignKey:'budget_id',
      })
      this.hasMany(GoalTransaction, {foreignKey:'budget_id',
      })
    }
  }
  Budget.init(
    {
      name: DataTypes.STRING,
      sum: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Budget",
    }
  );
  return Budget;
};
