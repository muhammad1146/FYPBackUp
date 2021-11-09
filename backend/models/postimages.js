'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostImages extends Model {
   
    static associate({Posts}) {
      // define association here
      this.belongsTo (Posts,{foreignKey:'postId'});
    }
    toJSON( ) {
      return { ...this.get(), id:undefined}
    }
  };
  PostImages.init({
    uuid:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      unique: true
      },
    image:  
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    postId: //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'postimages',
    modelName: 'PostImages',
  });
  return PostImages;
};