'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answerReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Answers,Farmers,Experts}) {
      // define association here
      this.belongsTo(Answers,{foreignKey:'answerId'});
      this.belongsTo(Farmers,{foreignKey:'reporterId'});
      this.belongsTo(Experts,{foreignKey:'reporterId'});



    }
  };
  answerReport.init({
    answerId: DataTypes.INTEGER,
    reporterId: DataTypes.INTEGER,
    reportDescription: DataTypes.STRING,
    reportStatus: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'answerReport',
  });
  return answerReport;
};