  'use strict';
const { nanoid } = require('nanoid');
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Experts extends Model {

    static associate({BlogComments,BlogReacts,QuestionComments,
      AnswerReacts,FarmerFollows,
      Answers,ExpertsRank,BlogReport,AnswerReport,QuestionReport,
      ExpertQualification,ExpertReports,Blogs,FarmerReports,
      ExpertExperience,BlogTagBox,QuestionTagBox })
      {
      this.hasMany(BlogTagBox,{foreignKey:'expertId'});
      this.belongsTo(ExpertsRank,{foreignKey:'rankId'})
      this.hasMany(BlogComments,
        {
          foreignKey: 'commenterId',
          constraints:false,
          scope:
          {
            commenterType:"Experts"
          }
        });
      this.hasMany(BlogReacts,
        {
          foreignKey:'commiterId',
          constraints:false,
          scope:
          {
            commiterType:"Experts"
          }
        });
      this.hasMany(QuestionComments,{
        foreignKey:'commenterId',
        constraints:false,
        scope: {
          commenterType: 'Experts'
        }});

      this.hasMany(Blogs, { foreignKey: 'expertId'});
      this.hasMany(Answers,{foreignKey:'expertId'});
      this.hasMany(AnswerReacts,{foreignKey:'commiterId'});

      this.hasMany(FarmerFollows,{foreignKey:'expertId'});
      this.hasMany(ExpertExperience,{foreignKey:'expertId'});
      this.hasMany(ExpertQualification,{foreignKey:'expertId'});
      this.hasMany(BlogReport,{foreignKey:'reporterId'});
      this.hasMany(AnswerReport,
        {
          foreignKey:'reporterId',
          constraints: false,
          scope:
          {
            reporterType: 'Experts'
          }
        });
      this.hasMany(QuestionReport,{foreignKey:'reporterId'});
      this.hasMany(ExpertReports,
        {
          foreignKey:'reporterId',
          constraints:false,
          scope:
          {
            reporterType:"Experts"
          }
        });
        this.hasMany(ExpertReports,
          {foreignKey:'expertId'});
      this.hasMany(FarmerReports,
        {
          foreignKey:'reporterId',
          constraints:false,
          scope:
          {
            reporterType:"Experts"
          }
        });
      this.hasMany(QuestionTagBox,{foreignKey:'expertId'});

    }
    toJSON() {
      return {...this.get(),id:undefined}
    }
  };
  Experts.init({
    uuid:{
      type:DataTypes.STRING,
      defaultValue:nanoid(10),
      allowNull:false,
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
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    phoneNumber:
    {
      type:DataTypes.STRING(15)
    },
    isAdmin: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    },
    address: {type:DataTypes.STRING(100)},
    profileImage: {type:DataTypes.STRING},
    description: {type:DataTypes.STRING},
    rankId:
    {
      type:DataTypes.INTEGER,
    }, //FK
    experties: {type:DataTypes.STRING}
  }, {
    sequelize,
    tableName:'experts',
    modelName: 'Experts',
  });
  return Experts; 
};