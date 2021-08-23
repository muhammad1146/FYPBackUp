'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Blogs,Farmers,Experts}) {
      // define association here
      this.belongsTo(Blogs,{foreignKey:'blogId'});
      this.belongsTo(Farmers, { foreignKey: 'commenterId', as:'farmerComment'});
      this.belongsTo(Experts, { foreignKey: 'commenterId', as:'expertComment'});
    }
  };
  BlogComments.init({
    blogId: DataTypes.INTEGER,
    body: DataTypes.STRING, 
    commenterType: DataTypes.STRING, 
    commenterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BlogComments',
  });
  return BlogComments;
};