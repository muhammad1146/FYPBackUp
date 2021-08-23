'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmerReports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers,Experts}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'})
      this.belongsTo(Experts,{foreignKey:'reporterId'})

    }
  };
  FarmerReports.init({
    farmerId: DataTypes.INTEGER,
    reporterId: DataTypes.INTEGER,
    reportDescription: DataTypes.STRING,
    reportStatus: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FarmerReports',
  });
  return FarmerReports;
};