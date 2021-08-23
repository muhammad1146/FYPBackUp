'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogReacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Blogs,Experts}) {
      // define association here
      this.belongsTo(Blogs,{foreignKey:'blogId'});
      this.belongsTo(Experts,{foreignKey:'commiterId'});
    }
  };
  BlogReacts.init({
    blogId: {
      type:DataTypes.INTEGER,
    allowNull:false
    },
    commitType: {
      allowNull:false,
      type:DataTypes.STRING,
    validate:{isIn: [['like', 'dislike']],}},
    commiterId: 
    {
      type: DataTypes.STRING,
      allowNull:false}
  }, {
    sequelize,
    modelName: 'BlogReacts',
  });
  return BlogReacts;
};