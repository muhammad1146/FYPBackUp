'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RankFarmers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers}) {
      // define association here
      this.hasOne(Farmer,{foreignKey:'rankId', as:'rank'});

    }
  };
  RankFarmers.init({
    rankname: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RankFarmers',
  });
  return RankFarmers;
};