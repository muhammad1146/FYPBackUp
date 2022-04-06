'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmerReports extends Model {
    /*
    Both can Report Farmers here.     
    */
    static associate({Farmers,Experts}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.belongsTo(Experts,{foreignKey:'reporterId',constraints:false});
      this.belongsTo(Farmers,{foreignKey:'reporterId',constraints:false});

    }
    
  };
  FarmerReports.init({
    farmerId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reporterType:
    {
      type:DataTypes.STRING,
      allowNull:false,
      validate:
      {
        isIn:
        {
          args:[["F","E"]],
          msg:"Must be F or E."
        }
      }
    },
    reporterId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reportType: 
    {
      type:DataTypes.STRING(2),
      allowNull:false,
     
    },
    reportDescription: 
    {
      type:DataTypes.STRING
    },
    reportStatus: 
    {
      type:DataTypes.STRING,
      defaultValue:"US"
    },
    
  }, {
    sequelize,
    tableName:'farmerreports',
    modelName: 'FarmerReports',
  });
  return FarmerReports;
};