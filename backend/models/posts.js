'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers,PostComments,PostImages,PostReacts}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.hasMany(PostComments,{foreignKey:'postId'});
      this.hasMany(PostImages,{foreignKey:'postId'});
      this.hasMany(PostReacts,{foreignKey:'postId'});
      this.hasMany(AnimalPostOrders,{foreignKey:'postId'});
    }
  };
  Posts.init({
    price: DataTypes.STRING,
    cattleType: DataTypes.STRING,
    description: DataTypes.STRING,
    availability: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    date: DataTypes.DATE,
    farmerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};