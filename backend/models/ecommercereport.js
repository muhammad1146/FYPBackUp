'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EcommerceReport extends Model {
    /**
    Only "Farmers" can Report any "EcommercePost". */
    static associate({Farmers,Posts}) {
      this.belongsTo(Farmers,{foreignKey:'reporterId'});
      this.belongsTo(Posts,{foreignKey:'postId'});
    } 
  };
  EcommerceReport.init({
    postId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reporterId: 
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
      type:DataTypes.STRING(2) ,
      allowNull:false, 
      validate:
      { isIn:
        {
          args:[["S","US"]],
          msg:"Must be S or US."
      }
      }
    },
    
    reportType:
    {
      type:DataTypes.STRING(4),
      allowNull:false,
      validate:
      {
        isIn:
        {
          args:[["spam","fake"]]
        }
      }
    }
  }, {
    sequelize,
    tableName: 'ecommercereport',
    modelName: 'EcommerceReport',
  });
  return EcommerceReport;
};