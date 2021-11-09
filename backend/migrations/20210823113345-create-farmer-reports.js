'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('farmerreports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      farmerId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      reporterType:
      {
        type:Sequelize.STRING(10),
        allowNull:false
      },
      reporterId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      reportDescription: {
        type: Sequelize.STRING
      },
      reportStatus: 
      {
        type: Sequelize.STRING(10),
        allowNull:false,
      },
      reportType: 
    {
      type:Sequelize.STRING(2),
      allowNull:false,
      validate:
      {
        isIn:
        {
          args:[["F","E"]],
          msg:"Must be F or E."
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
    await queryInterface.dropTable('farmerreports');
  }
};