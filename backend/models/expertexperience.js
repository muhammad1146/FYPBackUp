'use strict';
const { nanoid } = require('nanoid');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertExperience extends Model {
    
    static associate({Experts}) {
      // define association here
      this.belongsTo(Experts,{foreignKey:'expertId'});
    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  ExpertExperience.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(8),
      unique:true,
      allowNull:false
    },
    institute: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    startDate: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    endDate: 
    {
      type:DataTypes.STRING,
      allowNull:false
    }, 
    position: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    expertId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }, //FK
  }, {
    sequelize,
    tableName: 'expertexperience',
    modelName: 'ExpertExperience',
  });
  return ExpertExperience;
};