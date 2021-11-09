'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogComments extends Model {
    /*
    Both Farmers and Experts can comment on Blog*/
    static associate({Blogs,Farmers,Experts}) {
      // define association here
      this.belongsTo(Blogs,{foreignKey:'blogId'});
      this.belongsTo(Farmers, { foreignKey: 'commenterId',constraints:false});
      this.belongsTo(Experts, { foreignKey: 'commenterId',constraints:false});
    }
    toJSON(){
      return {...this.get(), id:undefined}
    }
  };
  BlogComments.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(8),
      unique: true
      },
    blogId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    body: 
    {
      type:DataTypes.STRING,
      allowNull:false
    }, 
    commenterType: 
    {
      type:DataTypes.STRING(10),
      allowNull:false
    }, 
    commenterId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'blogcomments',
    modelName: 'BlogComments',
  });
  return BlogComments;
};