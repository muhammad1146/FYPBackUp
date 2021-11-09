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
      type:DataTypes.STRING,
      allowNull:false,
      validate:
      { 
        isIn: 
        {
          args: [['Farmers', 'Experts']],
          msg: "Must be Farmers or Experts"
        }
      }},
      reportType: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:
        { 
          isIn: 
          {
            args: [['Wrong Information', 'Not Clear',"Misleading"]],
            msg: "Review Answer Report Types"
          }
        } 
      },
    reportDescription: 
    {
      type:DataTypes.STRING,
      allowNull:false
  },
    reportStatus: 
    {
      type:DataTypes.STRING,
      allowNull:false  
    },
  }, {
    sequelize,
    tableName:'answerreport',
    modelName: 'AnswerReport',
  });
  return AnswerReport;
};