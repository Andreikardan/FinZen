'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Goals', [
      {
        title: 'Машина',
        user_id:1,
        goal: 500000000,
        accumulator: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Квартира в Дубаях',
        user_id:1,
        goal: 500000000000,
        accumulator: 5000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Шоколадка',
        user_id:1,
        goal: 89,
        accumulator: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Goals', null, {});
  }
};
