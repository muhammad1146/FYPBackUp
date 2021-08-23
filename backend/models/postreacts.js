'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostReacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts, Farmers}) {
      // define association here
      this.belongsTo(Posts,{foreignKey:'postId'});
      this.belongsTo(Farmers,{foreignKey:'commiterId'});
    }
  };
  PostReacts.init({
    commitType: DataTypes.STRING,
    date: DataTypes.DATE,
    farmerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostReacts',
  });
  return PostReacts;
};