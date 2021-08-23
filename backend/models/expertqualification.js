'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expertQualification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Experts}) {
      // define association here
      this.belongsTo(Experts,{foreignKey:'expertId'}); 
    }
  };
  expertQualification.init({
    qualification: DataTypes.STRING,
    duration: DataTypes.STRING,
    percentage: DataTypes.STRING,
    institution: DataTypes.STRING,
    expertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expertQualification',
  });
  return expertQualification;
};