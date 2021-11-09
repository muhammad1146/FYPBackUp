'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questiontagbox', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      description: {
        type:Sequelize.STRING,
        allowNull:false
      },
      expertId: {
        type:Sequelize.INTEGER,
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
    await queryInterface.dropTable('questiontagbox');
  }
};