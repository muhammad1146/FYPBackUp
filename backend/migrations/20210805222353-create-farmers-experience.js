'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('farmersexperience', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:nanoid(6),
        unique:true
      },
      farmingType: {
        type: Sequelize.STRING(10),
        allowNull: false,

      },
      position: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      from: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      to: {
        type: Sequelize.DATE,
        allowNull:false
      },
      farmerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('farmersexperience');
  }
};