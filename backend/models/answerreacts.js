'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerReacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Answers,Farmers,Experts}) {
      // define association here
      this.belongsTo(Answers,{foreignKey:'answerId'});
      this.belongsTo(Experts,{foreignKey:'commiterId'});
    }
  };
  AnswerReacts.init({
    commitType: {
      type:DataTypes.STRING,
      allowNull:false,

     validate:{ isIn: [['like', 'dislike']]}
    },
    commiterType: DataTypes.STRING,
    commiterId: DataTypes.INTEGER,
    answerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnswerReacts',
  });
  return AnswerReacts;
};