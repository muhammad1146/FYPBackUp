'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogTagBox extends Model {
    static associate ({Experts,BlogTags}) {
      // define association here
        this.hasMany(BlogTags,{foreignKey:'tagId'});
         this.belongsTo(Experts,{foreignKey:'expertId'});
    }
  };
  BlogTagBox.init({
    tag: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    expertId:DataTypes.INTEGER
  }, {
    sequelize,
    tableName:'blogtagbox',
    modelName: 'BlogTagBox',
  });
  return BlogTagBox;
};