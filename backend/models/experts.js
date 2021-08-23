  'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experts extends Model {
    
    static associate({BlogComments,BlogReacts,QuestionComments,QuestionReacts,
      AnswerReacts,QuestionVotes,farmerFollows,
      Answers,RankExperts,blogReport,answerReport,questionReport}) {
      this.belongsTo(RankExperts,{foreignKey:'rankId'})
      this.hasMany(BlogComments, { foreignKey: 'commenterId', as:'expertComment'});
      this.hasMany(BlogReacts,{foreignKey:'commiterId'});
      this.hasMany(QuestionComments,{foreignKey:'commenterId'});
      this.hasMany(QuestionReacts,{foreignKey:'commiterId'});
      this.hasMany(Answers,{foreignKey:'expertId'});
      this.hasMany(AnswerReacts,{foreignKey:'commiterId'});
      this.hasMany(QuestionVotes,{foreignKey:'voterId'});
      this.hasMany(farmerFollows,{foreignKey:'expertId'});
      this.hasMany(expertExperience,{foreignKey:'expertId'});
      this.hasMany(expertQualification,{foreignKey:'expertId'});
      this.hasMany(blogReport,{foreignKey:'reporterId'});
      this.hasMany(answerReport,{foreignKey:'reporterId'});
      this.hasMany(questionReport,{foreignKey:'reporterId'});
      this.hasMany(ExpertReports,{foreignKey:'expertId'});

    }
  };
  Experts.init({
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    date: DataTypes.DATE,
    profileImage: DataTypes.STRING,
    description: DataTypes.STRING,
    rankId: DataTypes.INTEGER,
    experties: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Experts',
  });
  return Experts;
};