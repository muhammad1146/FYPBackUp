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
      postId: {
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
      validate:
      { isIn:
        {
          args:[["S","US"]],
          msg:"Must be S or US."
      }
      }
      },
      reportType:
    {
      type:Sequelize.STRING(4),
      allowNull:false,
      validate:
      {
        isIn:
        {
          args:[["spam","fake"]]
        }
      }
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