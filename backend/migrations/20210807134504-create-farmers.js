'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('farmers', {
      id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:nanoid(10),
        unique:true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      userName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      }, 
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        
      },
      phoneNumber: {
        type: Sequelize.STRING(12),
        
      },
      farmingType: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      city:{
        type:Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      profileImage: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
      },
      rankId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('farmers');
  }
};