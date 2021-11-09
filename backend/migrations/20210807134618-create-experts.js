'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('experts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:nanoid(10),
        allowNull:false,
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
      isAdmin: {
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      phoneNumber: {
        type: Sequelize.STRING(15)
      },
      address: {
        type: Sequelize.STRING(100)
      },
      profileImage: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      rankId: { 
        type: Sequelize.INTEGER
      },
      experties: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('experts');
  }
};