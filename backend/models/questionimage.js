'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'}); 
    }
  };
  QuestionImage.init({
    image: DataTypes.STRING,
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionImage',
  });
  return QuestionImage;
};