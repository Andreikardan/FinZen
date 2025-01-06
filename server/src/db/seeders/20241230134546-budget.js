'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Budgets', [{
        name: 'Бюджет Админа',
        sum:50000,
        user_id:1
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Budgets', null, {});
     
  }
};
