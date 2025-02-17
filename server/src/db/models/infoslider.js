'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class infoSlider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  infoSlider.init({
    backgroundColor:DataTypes.STRING,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'infoSlider',
  });
  return infoSlider;
};