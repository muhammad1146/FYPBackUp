'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionReport extends Model { 
    static associate({Questions,Experts}) {
      // Only "Experts" can report a Question.
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Experts,{foreignKey:'reporterId'});
    }
  };
  QuestionReport.init({
    questionId: 
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
      type:DataTypes.STRING,
      allowNull:false
  },
    reportStatus:   // report status = seen || unseen
    {
      type:DataTypes.STRING(6),
      allowNull:false,
      validate:
      {
        isIn: 
        {
          args:[["S","US"]],
          msg:"Must be S or US."
        }
      }
    },       
    reportType:{
      type:DataTypes.STRING,
      allowNull:false
    }
    
  }, {
    sequelize,
    tableName:'questionreport',
    modelName: 'QuestionReport',
  });
  return QuestionReport;
};