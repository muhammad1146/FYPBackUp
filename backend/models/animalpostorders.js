'use strict';
const { nanoid } = require('nanoid');
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnimalPostOrders extends Model {
    static associate({Posts,Farmers}) {
      // define association here
      this.belongsTo(Posts,{foreignKey:'postId'});
      this.belongsTo(Farmers,{foreignKey:'farmerId'});
    }
    // toJSON(){
    //   return {...this.get(), id:undefined}
    // }
  }; 
  AnimalPostOrders.init({
    uuid: {
      type:DataTypes.STRING,
      defaultValue: nanoid(10),
      unique:true
    },
    postId: //fk
    {
      type: DataTypes.INTEGER,
      allowNull:false
    },
   farmerId: //fk
   {
     type: DataTypes.INTEGER,
     allowNull:false
    },
    message:  // any message the buyer want to send here
    {
      type: DataTypes.STRING
    },
  status:
  {
    type: DataTypes.STRING, // status means whether Accepted, pending or rejected
    defaultValue:"Pending",
    allowNull:false,
   validate: 
   {
     isIn: 
     { 
       args: [['Accepted', 'Rejected','Pending']],
      msg:"status must be Accepted, Rejected or Pending."
      }
  },
    defaultValue: 'Pending',
    allowNull:false
  }
  }, {
    sequelize,
    tableName: 'animalpostorders',
    modelName: 'AnimalPostOrders',
  });
  return AnimalPostOrders;
};