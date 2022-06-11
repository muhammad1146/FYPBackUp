'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blogcomments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:()=>nanoid(8),
        unique: true
      },
      blogId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      body: {
        type: Sequelize.STRING,
        allowNull:false
      },
      commenterType: {
        type: Sequelize.STRING(10),
        allowNull:false 
      },
      commenterId: {
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
    await queryInterface.dropTable('blogcomments');
  }
};