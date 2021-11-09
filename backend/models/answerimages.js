'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerImages extends Model {
    static associate({Answers}) {
      // define association here
      this.belongsTo(Answers,{foreignKey:'answerId'});
    }
   
  };
  AnswerImages.init({
    positionInAnswer:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    image: 
    {
     type: DataTypes.STRING,
     allowNull:false
    },
    answerId: 
    {
      type: DataTypes.INTEGER,
      allowNull:false
     }
  }, {
    sequelize,
    tableName:'answerimages',
    modelName: 'AnswerImages',
  });
  return AnswerImages;
};