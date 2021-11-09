'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      // Add seed commands here.
     
    //  * Example:
     return (await queryInterface.bulkInsert('People', [{
        tag: "",
        description: "",
        expertId: 1,
        createdAt: new Date(),
        updatedAt : new Date()
      }], {}));
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
