'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('expertreports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      expertId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      reporterId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      reporterType: 
      {
        type:Sequelize.STRING(1),
        allowNull:false,
        validate: 
        {
          isIn : 
          {
            args:[["F","E"]],
            msg:"reporterType can be only F or E."
          }
        }},
    reportType: 
    {
      type:Sequelize.STRING,
      allowNull:false,
    },
    reportDescription: {
        type: Sequelize.STRING
      },
      reportStatus: {
        type: Sequelize.STRING(2),
        allowNull:false,
        defaultValue:"US",
        validate:
        {
          isIn:
          {
            args: [["S","US"]],
            msg: "reportStatus must be S or US."
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
    await queryInterface.dropTable('expertreports');
  }
};