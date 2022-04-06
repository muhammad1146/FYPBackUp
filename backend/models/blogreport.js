'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogReport extends Model {
    /**
     ONLY EXPERTS CAN REPORT ANY BLOG
     */
    static associate({Questions,Farmers,Experts,Blogs}) {
      // define association here
      this.belongsTo(Questions,{foreignKey:'questionId'});
      this.belongsTo(Farmers,{foreignKey:'reporterId'});
      this.belongsTo(Experts,{foreignKey:'reporterId'});
      this.belongsTo(Blogs,{foreignKey:'blogId'});
    }
    
  };  
  BlogReport.init({
    blogId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reporterId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    reportDescription: 
    {
      type:DataTypes.STRING,
      allowNull:false
    },
    reportStatus: 
    {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:"US",
      validate:
      {
        isIn:
        {
        args:[["S", "US"]],
        msg:"reportStatus must be seen or unseen"
        }
      }
    },
    reportType:{
      type:DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'blogreport',
    modelName: 'BlogReport',
  });
  return BlogReport;
};