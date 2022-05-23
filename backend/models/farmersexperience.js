'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmersExperience extends Model {
    static associate({Farmers}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      
    }
    
  };
  FarmersExperience.init({
    
    farmingType: {
      type:DataTypes.STRING,
    allowNull:false
  },
    position: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    from: {
      type:DataTypes.DATE,
    allowNull:false
  },
    to: {
      type:DataTypes.DATE,
    allowNull:false
  },
    farmerId: {
      type:DataTypes.INTEGER,
    allowNull:false}
  }, {
    sequelize,
    tableName:'farmersexperience',
    modelName: 'FarmersExperience',
  });
  return FarmersExperience;
};


