'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostReacts extends Model {
    /**
    Only Farmers can react on Post.
    */
    static associate({Posts, Farmers}) {
      // define association here
      this.belongsTo(Posts,{foreignKey:'postId'});
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
    }
  };
  PostReacts.init({
    commitType: 
    {
      type:DataTypes.STRING(2),
      allowNull:false,
      validate:
      {
        isIn:
        {
          args:[["L","DL"]],
          msg:"Must be L (like) or DL (dislike)."
        }
      }
    },
    farmerId:  //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    postId: //FK
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'postreacts',
    modelName: 'PostReacts',
  });
  return PostReacts;
};