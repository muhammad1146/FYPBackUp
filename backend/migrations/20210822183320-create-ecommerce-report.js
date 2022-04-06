'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ecommercereport', {
      id: {
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: { //fk
        type: Sequelize.INTEGER,
        allowNull:false
      },
      farmerId: { //fk reporterId
        type: Sequelize.INTEGER,
        allowNull:false

      },
      reportDescription: {
        type: Sequelize.STRING

      },
      reportStatus: {
        type: Sequelize.STRING,
        allowNull:false, 
        defaultValue:"UnSeen"
      },
      reportType:
    {
      type:Sequelize.STRING,
      allowNull:false,
      
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
    await queryInterface.dropTable('ecommercereport');
  }
};