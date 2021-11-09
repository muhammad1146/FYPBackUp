'use strict';
const {nanoid} = require('nanoid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expertexperience', {
      id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:nanoid(8),
        unique:true,
        allowNull:false
      },
      institute: {
        type: Sequelize.STRING,
        allowNull:false
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      expertId: {
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
    await queryInterface.dropTable('expertexperience');
  }
};