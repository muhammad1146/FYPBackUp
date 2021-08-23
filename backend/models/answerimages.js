'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Answers}) {
      // define association here
      this.belongsTo(Answers,{foreignKey:'answerId'});
    }
  };
  AnswerImages.init({
    image: DataTypes.STRING,
    answerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnswerImages',
  });
  return AnswerImages;
};