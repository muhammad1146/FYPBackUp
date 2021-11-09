'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertReports extends Model {
    static associate({Farmers,Experts}) {
      this.belongsTo(Experts,{foreignKey:'expertId'});
      this.belongsTo(Experts,{foreignKey:'reporterId',constraints:false});
      this.belongsTo(Farmers,{foreignKey:'reporterId',constraints:false});
      // define association here
    }
    };
  ExpertReports.init({
    expertId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reporterId: //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }, 
    reporterType: 
    {
      type:DataTypes.STRING(2),
      allowNull:false,
      validate: 
      {
        isIn : 
        {
          args:[["F","E"]],
          msg:"reporterType can be only F or E."
        }
      }},
    reportType: 
    {
      type:DataTypes.STRING(20),
      allowNull:false,
    },
    reportDescription: 
    {
      type:DataTypes.STRING
    },
    reportStatus: 
    {
      type:DataTypes.STRING(2),
      allowNull:false,
      defaultValue:"US",
      validate:
      {
        isIn:
        {
          args: [["S","US"]],
          msg: "reportStatus must be S or US."
        }
      }
    },
    
  }, {
    sequelize,
    tableName:'expertreports',
    modelName: 'ExpertReports',
  });
  return ExpertReports;
};