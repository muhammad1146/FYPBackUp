'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animalpostorders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:()=>nanoid(10),
        unique:true
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      farmerId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      message: 
      {
        type: Sequelize.STRING
      },
      
      status:
    {
      type: Sequelize.STRING, // status means whether Accepted, pending or rejected
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
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animalpostorders');
  }
};