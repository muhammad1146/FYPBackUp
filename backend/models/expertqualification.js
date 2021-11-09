'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertQualification extends Model {
    static associate({Experts}) {
      // define association here
      this.belongsTo(Experts,{foreignKey:'expertId'}); 
    }
    
  };
  ExpertQualification.init({
    qualification: 
    {
      type:DataTypes.STRING, 
      allowNull:false
    },
    duration: 
    {
      type:DataTypes.INTEGER,  //Months
      allowNull:false
    },
    percentage: 
    {
      type:DataTypes.FLOAT, 
      allowNull:false
    },
    institution: 
    {
      type:DataTypes.STRING(50), 
      allowNull:false
    },
    expertId: 
    {
      type:DataTypes.INTEGER, 
      allowNull:false
    },
  }, {
    sequelize,
    tableName: 'expertqualification',
    modelName: 'ExpertQualification',
  });
  return ExpertQualification;
};