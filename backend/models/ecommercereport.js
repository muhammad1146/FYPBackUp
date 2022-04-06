'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EcommerceReport extends Model {
    /**
    Only "Farmers" can Report any "EcommercePost". */
    static associate({Farmers,Posts}) {
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.belongsTo(Posts,{foreignKey:'postId'});
    } 
  };
  EcommerceReport.init({
    postId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    farmerId:  //reporterId
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reportDescription: 
    {
      type:DataTypes.STRING
    },
    reportStatus: 
    {
      type:DataTypes.STRING,
      allowNull:false, 
      defaultValue:"UnSeen"
    },
    
    reportType:
    {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'ecommercereport',
    modelName: 'EcommerceReport',
  });
  return EcommerceReport;
};