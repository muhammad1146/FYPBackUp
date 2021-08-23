'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */ 
    static associate({BlogTags,BlogImages,BlogReacts,BlogComments}) {
      // define association here
      this.hasMany(BlogTags, { foreignKey: 'TagId', as:'tag'});
      this.hasMany(BlogImages, { foreignKey: 'blogId'});
      this.hasMany(BlogReacts,{foreignKey:'blogId'});
      this.hasMany(BlogComments,{foreignKey:'blogId'});
      
    
    }
  };
  Blogs.init({
    expertId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    description: DataTypes.STRING,
    title: DataTypes.STRING,
    topic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blogs',
  });
  return Blogs;
};