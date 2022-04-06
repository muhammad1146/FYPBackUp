'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostComments extends Model {
    
    static associate({Posts,Farmers }) {
      // define association here
      this.belongsTo(Posts,{foreignKey:'postId'});
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
    }
    // toJSON() {
    //   return {...this.get(),id:undefined}
    // }
  };
  PostComments.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(8),
      unique: true
      },
    commentBody: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    
    farmerId: //FK 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    postId:  //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'postcomments',
    modelName: 'PostComments',
  });
  return PostComments;
};