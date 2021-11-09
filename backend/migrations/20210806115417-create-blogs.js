'use strict';
const {nanoid} = require('nanoid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blogs', {
      id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        unique:true,
        defaultValue:nanoid(8),
        unique:true
      },
      expertId: 
      {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      body: 
      {
        type: Sequelize.TEXT,
        allowNull:false
      },
      description: 
      {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      title: 
      {
        type: Sequelize.STRING,
        allowNull:false
      },
      topic:
      { 
        type: Sequelize.STRING(30),
        allowNull:false

      },
      createdAt: 
      {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: 
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blogs');
  }
};