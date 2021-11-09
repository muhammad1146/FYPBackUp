'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionComments extends Model {
    /*
    Both "Farmer" and "Experts" can comment on Question.
     
     */
    static associate({Questions,Farmers,Experts}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmers,{foreignKey:'commenterId' ,constraints: false});
      this.belongsTo(Experts,{foreignKey:'commenterId',constraints: false});
    }
    toJSON( ){
      return {...this.get(),id: undefined}
    }
  };
  QuestionComments.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(8),
      unique: true
      },
    body: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    questionId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    commenterType:
    {
      type:DataTypes.STRING(2),
      allowNull:false,
      validate:
      {
        isIn: 
        {
          args: [["E", "F"]],
          msg: "Must be E (experts) or F (farmers)."
        }
      }
    },
    commenterId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'questioncomments',
    modelName: 'QuestionComments',
  });
  return QuestionComments;
}; 