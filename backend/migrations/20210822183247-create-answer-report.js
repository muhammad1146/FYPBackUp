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
       type:Sequelize.STRING,
        allowNull:false,
        validate:
        { 
          isIn: 
          {
            args: [['Farmers', 'Experts']],
            msg: "Must be Farmers or Experts"
          }
        }},
      reportDescription: 
      {
        type: Sequelize.STRING
      },
      reportStatus: 
      {
        type: Sequelize.STRING,
        defaultValue:"US"
      },
      reportType: 
      {
        type:Sequelize.STRING,
        allowNull:false,
        validate:
        { 
          isIn: 
          {
            args: [['Wrong Information', 'Not Clear',"Misleading"]],
            msg: "Review Answer Report Types"
          }
        } 
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