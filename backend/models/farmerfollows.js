'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmerFollows extends Model {
    static associate({Farmers,Experts}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.belongsTo(Experts,{foreignKey:'expertId'});
    }
    
  };
  FarmerFollows.init({
    
    expertId: 
    {
      type:DataTypes.INTEGER,
    allowNull:false
  },
    farmerId: 
    {
      type:DataTypes.INTEGER,
    allowNull:false
  }
  }, {
    sequelize,
    tableName:'farmerfollows',
    modelName: 'FarmerFollows',
  });
  return FarmerFollows;
};