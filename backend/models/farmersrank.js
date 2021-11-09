'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmersRank extends Model {
    static associate({Farmers}) {
      // define association here
      this.hasOne(Farmers,{foreignKey:'rankId'});
    } 
  };
  FarmersRank.init({   
    rankname: 
    {
      type:DataTypes.STRING,
    allowNull:false
  },
    description: 
    {
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    tableName:'farmersrank',
    modelName: 'FarmersRank',
  });
  return FarmersRank;
};