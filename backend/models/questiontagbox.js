'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionTagBox extends Model {
    static associate({QuestionTags,Experts}) {
      // define association here
      this.hasMany(QuestionTags,{foreignKey:'tagId'});
      this.belongsTo(Experts,{foreignKey:'expertId'});
    }    
  };
  QuestionTagBox.init({
    tag: 
    {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    expertId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
  }
  }, {
    sequelize,
    tableName: 'questiontagbox',
    modelName: 'QuestionTagBox',
  });
  return QuestionTagBox;
};