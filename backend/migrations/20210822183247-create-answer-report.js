'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answerreport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      answerId: {
        type: Sequelize.INTEGER
      },
      reporterId: { 
        type: Sequelize.INTEGER
      },
      reporterType: 
      {
       type:Sequelize.STRING(1),
        allowNull:false,
        validate:
        { 
          isIn: 
          {
            args: [['F', 'E']],
            msg: "Must be F or E"
          }
        }},
      reportDescription: 
      {
        type: Sequelize.STRING
      },
      reportStatus: 
      {
        type: Sequelize.STRING(2),
        allowNull:false,
        defaultValue:"US"
      },
      reportType: 
      {
        type:Sequelize.STRING,
        allowNull:false,
        
      },
      createdAt: 
      {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: 
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('answerreport');
  }
};