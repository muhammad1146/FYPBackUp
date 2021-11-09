'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expertqualification', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      qualification: {
        type: Sequelize.STRING(20),
        allowNull:false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      percentage: {
        type: Sequelize.FLOAT,
        allowNull:false
      },
      institution: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('expertqualification');
  }
};