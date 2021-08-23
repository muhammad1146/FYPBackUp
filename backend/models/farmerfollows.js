'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class farmerFollows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Farmers,Experts}) {
      // define association here
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
      this.belongsTo(Experts,{foreignKey:'expertId'});
    }
  };
  farmerFollows.init({
    expertId: DataTypes.INTEGER,
    farmerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'farmerFollows',
  });
  return farmerFollows;
};