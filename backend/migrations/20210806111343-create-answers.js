'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:()=>nanoid(8),
        allowNull:false,
        unique:true
      },
      body: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('answers');
  }
};