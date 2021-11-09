'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionReacts extends Model {
    /*
    Only "Farmers" can React on Question.
     */
    static associate({Questions,Farmers}) {
      // define association here 
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmers,{foreignKey:'commiterId'});
    }
  };
  QuestionReacts.init({
    questionId:  //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    commitType: 
    {
      type:DataTypes.STRING(4),
      allowNull:false,
      validate:
      {
        isIn:
        {
          args:[["UP","DOWN"]],
          msg:"Must be UP or DOWN."
        }
      }
    },
    commiterId:
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'questionreacts',
    modelName: 'QuestionReacts',
  });
  return QuestionReacts;
};