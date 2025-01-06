"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionDs",
      [
        {
          category_id: 1,
          sum: 4000,
          description: "Пришла зп",
        },
        {
          category_id: 2,
          sum: 11000,
          description: "Натаксовал",
        },
        {
          category_id: 3,
          sum: 8000,
          description: "Вернули долг",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionDs", null, {});
  },
};
