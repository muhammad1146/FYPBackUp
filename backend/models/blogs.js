'use strict';
const {Model} = require('sequelize');
const  {nanoid} = require('nanoid');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */ 
    static associate({BlogTags,BlogImages,BlogReacts,BlogComments,BlogReport,Experts}) {
      // define association here
      this.belongsTo(Experts,{foreignKey:"expertId"});
      this.hasMany(BlogTags, { foreignKey: 'blogId'});
      this.hasMany(BlogImages, { foreignKey: 'blogId'});
      this.hasMany(BlogReacts,{foreignKey:'blogId'});
      this.hasMany(BlogComments,{foreignKey:'blogId'});
      this.hasMany(BlogReport,{foreignKey:'blogId'});    
    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  Blogs.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(8),
      unique: true
      },
    expertId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    } , //FK
    body: 
    {type:DataTypes.TEXT,
      allowNull:false
    },
    description: 
    {type:DataTypes.STRING,
      allowNull:false
    },
    title: 
    {type:DataTypes.STRING(30),
      allowNull:false
    },
    topic: 
    {type:DataTypes.STRING(30),
      allowNull:false
    }
  }, { 
    sequelize,
    tableName:'blogs',
    modelName: 'Blogs',
  });
  return Blogs;
};