'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    static associate({Farmers,QuestionImage,QuestionReacts,Answers,
      QuestionComments,QuestionTags,QuestionReport}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.hasMany(QuestionImage,{foreignKey:'questionId'});
      this.hasMany(QuestionReacts,{foreignKey:'questionId'});
      this.hasMany(Answers,{foreignKey:'questionId'});
      this.hasMany(QuestionComments,{foreignKey:'questionId'});
      this.hasMany(QuestionTags,{foreignKey:'questionId'});
      this.hasMany(QuestionReport,{foreignKey:'questionId'});
    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  Questions.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(10),
      unique: true
      },
    body: 
    {
      type:DataTypes.TEXT,
    allowNull:false
  },
    farmerId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    farmingType: 
    {
      type:DataTypes.STRING(20),
      defaultValue:"cattle",
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'questions',
    modelName: 'Questions',
  });
  return Questions;
};