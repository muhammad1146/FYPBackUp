'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllQuestionTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({QuestionTags}) {
      // define association here
      this.hasOne(QuestionTags,{foreignKey:'tagId'});
 
    }
  };
  AllQuestionTags.init({
    tag: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AllQuestionTags',
  });
  return AllQuestionTags;
};