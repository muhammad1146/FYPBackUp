'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questionReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions,Farmers,Experts}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmers,{foreignKey:'reporterId'});
      this.belongsTo(Experts,{foreignKey:'reporterId'});

    }
  };
  questionReport.init({
    questionId: DataTypes.INTEGER,
    reporterId: DataTypes.INTEGER,
    reportDescription: DataTypes.STRING,
    reportStatus: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'questionReport',
  });
  return questionReport;
};