'use strict';
const { nanoid } = require('nanoid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farmers extends Model {
    static associate({BlogComments,FarmersRank,Questions,EcommerceReport,
      QuestionComments,QuestionReacts,Farms,FarmerFollows,
      QuestionVotes,FarmerBookmarks,Posts,PostReacts,
      PostComments,AnswerReport,BlogReport,FarmersExperience,AnimalPostOrders,
      AnswerReacts,BlogReacts,ExpertReports,FarmerReports}) {
      // define association here
      this.belongsTo(FarmersRank,{foreignKey:'rankId'});
      this.hasMany(BlogComments, 
        {
          foreignKey:'commenterId',
          constraints:false,
          scope:
          {
            commenterType:"Farmers"
          }
        });
      this.hasMany(BlogReacts,
        {
          foreignKey:'commiterId',
          constraints:false,
          scope:
          {
          commiterType:"Farmers"
          } 
        });
      this.hasMany(Questions,{foreignKey:'farmerId'});
      this.hasMany(QuestionComments,
        {
          foreignKey:'commenterId',
          constraints: false,
          scope: 
          {
            commenterType: 'Farmers'
        }});
      this.hasMany(QuestionReacts,{foreignKey:'commiterId'}); 
     
      this.hasMany(Farms,{foreignKey:'farmerId'});
      this.hasMany(FarmerFollows,{foreignKey:'farmerId'});
      this.hasMany(FarmerBookmarks,{foreignKey:'farmerId'});
      this.hasMany(Posts,{foreignKey:'farmerId'});
      this.hasMany(PostComments,{foreignKey:'commenterId'});
      this.hasMany(PostReacts,{foreignKey:'commiterId'});
      this.hasMany(FarmersExperience,{foreignKey:'farmerId'});
      this.hasMany(AnimalPostOrders,{foreignKey:'farmerId'});
      this.hasMany(AnswerReport,
        {
          foreignKey:'reporterId',
          constraints: false,
          scope: 
          {
            reporterType: 'Farmers'
          }
        });
      this.hasMany(BlogReport,{foreignKey:'reporterId'});
      this.hasMany(EcommerceReport,{foreignKey:'reporterId'});
      this.hasMany(AnswerReacts,
        {
          foreignKey:'commiterId',
          constraints:false,
          scope:
          {
            commiterType: "Farmers"
          }
        });
        this.hasMany(ExpertReports,
          {
            foreignKey:'reporterId',
            constraints:false,
            scope:
            {
              reporterType: "Farmers"
            }
          });
          this.hasMany(FarmerReports,
            {
              foreignKey:'reporterId',
              constraints:false,
              scope:
              {
                reporterType: "Farmers"
              }
            }); 
    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  Farmers.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(10),
      unique:true
    },
    name: 
    {
      type:DataTypes.STRING(100),
      allowNull:false
    },
    userName: 
    {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      
    },
    phoneNumber: DataTypes.STRING(12),
    farmingType: DataTypes.STRING(20),
    address: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    description: DataTypes.STRING,
    rankId: 
    {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    tableName:'farmers',
    modelName: 'Farmers',
  });
  return Farmers;
};