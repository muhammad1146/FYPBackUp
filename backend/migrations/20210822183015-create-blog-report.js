'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blogreport', {
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
      reporterId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      reportDescription: {
        type: Sequelize.STRING
      },
      reportStatus: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:"US"
      },
      reportType:{
        type:Sequelize.STRING,
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
    await queryInterface.dropTable('blogreport');
  }
};