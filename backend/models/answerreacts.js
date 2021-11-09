'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerReacts extends Model {
    /* Both can React on any Answer.
     */
    static associate({Answers,Farmers,Experts}) {
      // define association here
      this.belongsTo(Answers,{foreignKey:'answerId'});
      this.belongsTo(Experts,{foreignKey:'commiterId',constraints:false});
      this.belongsTo(Farmers,{foreignKey:'commiterId',constraints:false});
    }
   
  };
  AnswerReacts.init({
    
    commitType: {
      type:DataTypes.STRING,
      allowNull:false,

     validate:
     { 
        isIn: 
        {
          args: [['like', 'dislike']],
          msg: "Answer React must be like or dislike"
        }
      }
    },
   
    commiterId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    commiterType:
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
      }
      
    },
    answerId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'answerreacts',
    modelName: 'AnswerReacts',
  });
  return AnswerReacts;
};