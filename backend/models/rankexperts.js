'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RankExperts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Experts}) {
      // define association here
      this.hasOne(Experts,{foreignKey:'rankId'});
      
    }
  };
  RankExperts.init({
    rankname: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RankExperts',
  });
  return RankExperts;
};