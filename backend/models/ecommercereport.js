'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ecommerceReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ecommerceReport.init({
    postId: DataTypes.INTEGER,
    reporterId: DataTypes.INTEGER,
    reportDescription: DataTypes.STRING,
    reportStatus: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ecommerceReport',
  });
  return ecommerceReport;
};