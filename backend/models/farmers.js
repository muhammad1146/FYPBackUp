'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farmers extends Model {
    static associate({BlogComments,RankFarmers,Questions,
      QuestionComments,QuestionReacts,Farms,farmerFollows,
      QuestionVotes,farmerBookmarks,Posts,PostReacts,
      PostComments,answerReport,blogReport.questionReport}) {
      // define association here
      this.belongsTo(RankFarmers,{foreignKey:'rankId', as:'rank'});
      this.hasMany(BlogComments,{foreignKey:'commenterId', as:'farmerComment'})
      this.hasMany(Questions,{foreignKey:'farmerId'});
      this.hasMany(QuestionComments,{foreignKey:'commenterId'});
      this.hasMany(QuestionReacts,{foreignKey:'commiterId'});
      this.hasMany(QuestionVotes,{foreignKey:'voterId'});
      this.hasMany(Farms,{foreignKey:'farmerId'});
      this.hasMany(farmerFollows,{foreignKey:'farmerId'});
      this.hasMany(farmerBookmarks,{foreignKey:'farmerId'});
      this.hasMany(Posts,{foreignKey:'farmerId'});
      this.hasMany(PostComments,{foreignKey:'commenterId'});
      this.hasMany(PostReacts,{foreignKey:'commiterId'});
      this.hasMany(experienceFarmers,{foreignKey:'farmerId'});
      this.hasMany(AnimalPostOrders,{foreignKey:'farmerId'});
      this.hasMany(answerReport,{foreignKey:'reporterId'});
      this.hasMany(blogReport,{foreignKey:'reporterId'});
      this.hasMany(questionReport,{foreignKey:'reporterId'});



      
    }
  };
  Farmers.init({
    name: DataTypes.STRING,
    userName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    Date: DataTypes.DATE,
    farmingType: DataTypes.STRING,
    address: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    description: DataTypes.STRING,
    rankId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Farmers',
  });
  return Farmers;
};