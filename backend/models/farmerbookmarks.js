'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class farmerBookmarks extends Model {
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
  farmerBookmarks.init({
    contentType: DataTypes.STRING,
    farmerId: DataTypes.INTEGER,
    contentURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'farmerBookmarks',
  });
  return farmerBookmarks;
};