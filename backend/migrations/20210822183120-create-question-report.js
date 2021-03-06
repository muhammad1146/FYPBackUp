'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questionreport', {
      id: 
      {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questionId: 
      {
        type: Sequelize.INTEGER,
        allowNull:false

      }, 
      reporterId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      reportDescription: {
        type: Sequelize.STRING,
      allowNull:false

      },
      reportStatus: {
        type: Sequelize.STRING(2),
      allowNull:false,
      validate:
      {
        isIn: 
        {
          args:[["S","US"]],
          msg:"Must be seen or unseen."
        }
      }

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
    await queryInterface.dropTable('questionreport');
  }
};