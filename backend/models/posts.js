'use strict';
const { nanoid } = require('nanoid');
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
    static associate({Farmers,PostComments,PostImages,PostReacts,AnimalPostOrders,
      EcommerceReport}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});  
      this.hasMany(PostComments,{foreignKey:'postId'});
      this.hasMany(PostImages,{foreignKey:'postId'});
      this.hasMany(PostReacts,{foreignKey:'postId'});
      this.hasMany(AnimalPostOrders,{foreignKey:'postId'});
      this.hasMany(EcommerceReport,{foreignKey:'postId'});
    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  Posts.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(10),
      unique: true
      },
    price: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    cattleType: 
    {
      type:DataTypes.STRING,
      allowNull:false 
    },
    name: 
    {
      type:DataTypes.STRING,
      allowNull:false 
    },
    description: 
    {
      type:DataTypes.STRING,
      allowNull:false
      
    },
    city:{
      type:DataTypes.STRING,
      allowNull:false
    },
    availability: 
    {
      type:DataTypes.STRING(2),
      defaultValue:"A",
      allowNull:false,
      
    },
    weight: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    
    farmerId: //FK
    {
      type:DataTypes.INTEGER, 
      allowNull:false
    }
  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Posts',
  });
  return Posts;
};