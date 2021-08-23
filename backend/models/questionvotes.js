'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionVotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Questions,Farmer,Experts}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmer,{foreignKey:'voterId'});
      this.belongsTo(Experts,{foreignKey:'voterId'});
    }
  };
  QuestionVotes.init({
    voteType: DataTypes.STRING,
    voterType:DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    voterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionVotes',
  });
  return QuestionVotes;
};