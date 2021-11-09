'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionTags extends Model {
   
    static associate({Questions,QuestionTagBox}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(QuestionTagBox,{foreignKey:'tagId'});
    } 
  };
  QuestionTags.init({
   
    tagId:  //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }, 
    questionId:  //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'questiontags',
    modelName: 'QuestionTags',
  });
  return QuestionTags;
};