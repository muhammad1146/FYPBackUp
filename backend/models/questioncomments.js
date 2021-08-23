'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions,Farmers,Experts}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmers,{foreignKey:'commenterId'});
      this.belongsTo(Experts,{foreignKey:'commenterId'});


    }
  };
  QuestionComments.init({
    body: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    commenterType:DataTypes.STRING,
    commenterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionComments',
  });
  return QuestionComments;
};