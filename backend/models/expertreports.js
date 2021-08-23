'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpertReports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers,Experts}) {
      this.belongsTo(Experts,{foreignKey:'expertId'});
      this.belongsTo(Farmers,{foreignKey:'farmerId'});

      // define association here
    }
  };
  ExpertReports.init({
    expertId: DataTypes.INTEGER,
    farmerId: DataTypes.INTEGER, 
    reportDescription: DataTypes.STRING,
    reportStatus: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ExpertReports',
  });
  return ExpertReports;
};