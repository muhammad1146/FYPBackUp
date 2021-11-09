'use strict';

const { nanoid } = require("nanoid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid:{
        type:Sequelize.STRING,
        defaultValue:nanoid(10),
        unique: true
        },
      price: {
        type: Sequelize.INTEGER,
        allowNull:false
      }, 
      cattleType: {
        type:Sequelize.STRING(10),
      allowNull:false
      },
      description: {
        type:Sequelize.STRING,
        allowNull:false
      },
      availability: {
        type:Sequelize.STRING(2),
      allowNull:false,
      validate:
      {
        isIn: 
        {
          args:[["A","NA"]],
          msg:"Must be A (available) or NA (not available)."
        }
      }
      },
      weight: {
        type:Sequelize.INTEGER,
        allowNull:false
      },
      date: 
    {
      type:Sequelize.DATE,
      allowNull:false
    },
      farmerId: {
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
    await queryInterface.dropTable('posts');
  }
};