'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farms extends Model {
  
    static associate({Farmers}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  Farms.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:()=>nanoid(10),
      unique: true
      },
    farmName: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    farmSize: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    numberOfCattle:
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    startDate:
    {
      type:DataTypes.DATE,
      allowNull:false
    },
    farmLocation: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    farmingType: 
    {
      type:DataTypes.STRING,
      defaultValue: "Cattle",
      allowNull:false
    },
    image: 
    {
      type:DataTypes.STRING,
    },
    farmerId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'farms',
    modelName: 'Farms',
  });
  return Farms;
};