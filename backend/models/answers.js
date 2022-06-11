'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /*
    "Experts" can "Answer" any "Question" they want.  */
    static associate({Questions,Experts,
      AnswerImages,AnswerReport,AnswerReacts}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Experts,{foreignKey:'expertId'});
      this.hasMany(AnswerReacts,{foreignKey:'answerId'});
      this.hasMany(AnswerImages,{foreignKey:'answerId'});
      this.hasMany(AnswerReport,{foreignKey:'answerId'});

    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  };
  Answers.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:()=>nanoid(8),
      unique: true
      },
    body: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    questionId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    expertId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'answers',
    modelName: 'Answers',
  });
  return Answers;
};