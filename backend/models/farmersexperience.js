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
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  FarmersExperience.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(6),
      unique:true
    }, 
    farmingType: {
      type:DataTypes.STRING(10),
    allowNull:false
  },
    position: 
    {
      type:DataTypes.STRING(10),
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


