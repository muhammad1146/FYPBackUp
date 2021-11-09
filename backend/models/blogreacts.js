'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogReacts extends Model {
    /*
    Both "Farmers" and "Experts" can React on Blogs */
    static associate({Blogs,Experts,Farmers}) {
      // define association here
      this.belongsTo(Blogs,{foreignKey:'blogId'});
      this.belongsTo(Experts,{foreignKey:'commiterId',constraints:false});
      this.belongsTo(Farmers,{foreignKey:'commiterId',constraints:false});
    }
    
  };
  BlogReacts.init({
    blogId: {
      type:DataTypes.INTEGER,
    allowNull:false
    },
    commiterType: {
      allowNull:false,
      type:DataTypes.STRING(10)
    },
    commitType: {
      allowNull:false,
      type:DataTypes.STRING(10),
    validate:{isIn: [['like', 'dislike']],}
  },
    commiterId: 
    {
      type: DataTypes.INTEGER,
      allowNull:false}
      
    },
  {
    sequelize,
    tableName:'blogreacts',
    modelName: 'BlogReacts',
  });
  return BlogReacts;
};