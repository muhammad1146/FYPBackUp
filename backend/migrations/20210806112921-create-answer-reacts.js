'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('answerreacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      commitType: {
        type:Sequelize.STRING,
        allowNull:false,
       validate:
       { 
          isIn: 
          {
            args: [['like', 'dislike']],
            msg: "Answer React must be like or dislike"
          }
        }
      },
      commiterType: {
        type: Sequelize.STRING,
        allowNull:false
      },
      commiterId: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      answerId: {
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
    await queryInterface.dropTable('answerreacts');
  }
};