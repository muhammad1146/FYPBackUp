'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers,QuestionImage,QuestionReacts,Answers,QuestionVotes,QuestionComments}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.hasMany(QuestionImage,{foreignKey:'questionId'});
      this.hasMany(QuestionReacts,{foreignKey:'questionId'});
      this.hasMany(Answers,{foreignKey:'questionId'});
      this.hasMany(QuestionComments,{foreignKey:'questionId'});
      this.hasMany(QuestionVotes,{foreignKey:'questionId'});

      

    }
  };
  Questions.init({
    body: DataTypes.STRING,
    farmerId: DataTypes.INTEGER,
    farmingType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};