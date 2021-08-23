'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionReacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions,Farmers,Experts}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmers,{foreignKey:'commiterId'});
      this.belongsTo(Experts,{foreignKey:'commiterId'});
    }
  };
  QuestionReacts.init({
    questionId: DataTypes.INTEGER,
    commitType: DataTypes.STRING,
    commiterType: DataTypes.STRING,
    commiterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionReacts',
  });
  return QuestionReacts;
};