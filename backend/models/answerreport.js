'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerReport extends Model {
    /**
    Both Farmer and Experts can report any "Answer".
    */
    static associate({Answers,Farmers,Experts}) {
      // define association here
      this.belongsTo(Answers,{foreignKey:'answerId'});
      this.belongsTo(Farmers,{foreignKey:'reporterId', constraints: false});
      this.belongsTo(Experts,{foreignKey:'reporterId', constraints: false});
    }
  
  };

  AnswerReport.init({
    answerId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reporterId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reporterType: 
    { 
      type:DataTypes.STRING(1),
      allowNull:false,
      validate:
      { 
        isIn: 
        {
          args: [['F', 'E']],
          msg: "Must be F or E"
        }
      }},
      reportType: {
        type:DataTypes.STRING,
        allowNull:false, 
      },
    reportDescription: 
    {
      type:DataTypes.STRING,
      allowNull:false
  },
    reportStatus: 
    {
      type:DataTypes.STRING(2),
      allowNull:false,
      defaultValue:"US"
    },
  }, {
    sequelize,
    tableName:'answerreport',
    modelName: 'AnswerReport',
  });
  return AnswerReport;
};