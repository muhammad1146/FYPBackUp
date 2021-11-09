'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertsRank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Experts}) {
      // define association here
      this.hasOne(Experts,{foreignKey:'rankId'});
    }
  };
  ExpertsRank.init({
  
    rankname: 
    {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    description:
    {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'expertsrank',
    modelName: 'ExpertsRank',
  });
  return ExpertsRank;
};