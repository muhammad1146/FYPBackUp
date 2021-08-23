'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      numberOfCattle: {
        type: Sequelize.INTEGER
      },
      startDate: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      farmingType: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.INTEGER
      },
      farmerId: {
        type: Sequelize.INTEGER
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