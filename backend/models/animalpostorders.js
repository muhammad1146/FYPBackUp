'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimalPostOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Posts,Farmers}) {
      // define association here
      this.belongsTo(Posts,{foreignKey:'postId'});
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
    }
  };
  AnimalPostOrders.init({
    postId: 
    {type: DataTypes.INTEGER,
      allowNull:false},
   farmerId:{
     type: DataTypes.INTEGER,
     allowNull:false},
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AnimalPostOrders',
  });
  return AnimalPostOrders;
};