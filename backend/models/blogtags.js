'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */ 
    static associate({AllBlogTags,Blogs}) {
      // define association here
      this.belongsTo(Blogs, { foreignKey: 'blogId', as:'blog'});
      this.belongsTo(AllBlogTags, { foreignKey: 'TagId', as:'tag'});
    }
  };
  BlogTags.init({
    blogId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BlogTags',
  });
  return BlogTags;
};