'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogTags extends Model {
    static associate ({BlogTagBox,Blogs}) {
      // define association here
      this.belongsTo(BlogTagBox,{foreignKey:'tagId'});
       this.belongsTo(Blogs,{foreignKey:'blogId'});  
    }  
  };
  BlogTags.init({                  
    blogId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }, //FK
    tagId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }, //FK
  }, {
    sequelize,
    tableName:'blogtags',
    modelName: 'BlogTags',
  });
  return BlogTags;
};