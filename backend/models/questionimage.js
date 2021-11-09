'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionImage extends Model {
   
    static associate({Questions}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'}); 
    }
    
  };
  QuestionImage.init({
    positionInQuestion:{
      type:DataTypes.INTEGER,
    
    },
    image:
    {
      type: DataTypes.STRING,
      allowNull:false
    },
    questionId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'questionimage',
    modelName: 'QuestionImage',
  });
  return QuestionImage;
};