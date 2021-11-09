'use strict';
const {nanoid} = require('nanoid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:nanoid(10),
        unique: true
        },
      farmName: 
      {
        type:Sequelize.STRING(20),
        allowNull:false
      }, 
      farmSize: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      numberOfCattle: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      farmLocation: {
        type: Sequelize.STRING,
        allowNull:false

      },
      farmingType: {
        type: Sequelize.STRING(20),
      allowNull:false
      },
      image: {
        type: Sequelize.STRING,
      },
      
      farmerId: {
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
    await queryInterface.dropTable('farms');
  }
};