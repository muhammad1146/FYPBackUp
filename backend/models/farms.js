'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class farms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers}) {
      // define association here
      this.hasMany(Farmers,{foreignKey:'farmerId'});
    }
  };
  farms.init({
    farmName: DataTypes.STRING,
    farmSize: DataTypes.STRING,
    numberOfCattle: DataTypes.INTEGER,
    startDate: DataTypes.STRING,
    farmLocation: DataTypes.STRING,
    farmType: DataTypes.STRING,
    images: DataTypes.STRING,
    farmerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'farms',
  });
  return farms;
};