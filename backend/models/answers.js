'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions,Experts,
      AnswerImages,answerReport}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Experts,{foreignKey:'expertId'});
      this.hasMany(AnswerImages,{foreignKey:'answerId'});
      this.hasMany(answerReport,{foreignKey:'answerId'});

    }
  };
  Answers.init({
    body: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    expertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answers',
  });
  return Answers;
};