'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmerBookmarks extends Model { 
    
    static associate({Farmers}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
    }
    
  };
  FarmerBookmarks.init({
    contentType:
    { 
      type:DataTypes.STRING,
      allowNull:false
    },
    farmerId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    contentURL: 
    {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'farmerbookmarks',
    modelName: 'FarmerBookmarks',
  });
  return FarmerBookmarks;
};