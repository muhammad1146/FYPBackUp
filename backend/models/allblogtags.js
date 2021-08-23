'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllBlogTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({BlogTags}) {
      // define association here
      this.hasMany(BlogTags, { foreignKey: 'TagId', as:'tag'});
    }
  };
  AllBlogTags.init({
    tag: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AllBlogTags',
  });
  return AllBlogTags;
};