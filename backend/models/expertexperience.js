'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expertExperience extends Model {
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
  expertExperience.init({
    institute: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    position: DataTypes.STRING,
    expertId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'expertExperience',
  });
  return expertExperience;
};