'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experienceFarmers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      
    }
  };
  experienceFarmers.init({
    farmType: DataTypes.STRING,
    position: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    farmerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'experienceFarmers',
  });
  return experienceFarmers;
};