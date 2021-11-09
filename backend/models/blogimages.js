'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Blogs}) {
      // define association here
      this.belongsTo(Blogs,{foreignKey:'blogId'})
    }
   
  };
  BlogImages.init({
    blogId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    image:
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    positionInBlog: 
    {
    type:DataTypes.INTEGER,
    allowNull:false
  }
  }, {
    sequelize,
    tableName:'blogimages',
    modelName: 'BlogImages',
  });
  return BlogImages;
};