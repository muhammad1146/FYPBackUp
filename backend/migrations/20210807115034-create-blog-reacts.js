'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blogreacts', {
      id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      blogId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      commitType: {
        type: Sequelize.STRING(10),
        allowNull:false
      },
      commiterType: {
        type: Sequelize.STRING(10),
        allowNull:false
      },
      commiterId: {
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
    await queryInterface.dropTable('blogreacts');
  }
};