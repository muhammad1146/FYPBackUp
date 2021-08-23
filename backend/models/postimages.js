'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts}) {
      // define association here
      this.hasMany(Posts,{foreignKey:'postId'});
    }
  };
  PostImages.init({
    image: DataTypes.STRING,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostImages',
  });
  return PostImages;
};