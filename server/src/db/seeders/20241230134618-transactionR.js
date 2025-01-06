"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionRs",
      [
        {
          category_id: 1,
          sum: 5000,
          description: "На топливо",
        },
        {
          category_id: 2,
          sum: 10000,
          description: "На продукты",
        },
        {
          category_id: 3,
          sum: 6000,
          description: "На кредит",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionRs", null, {});
  },
};
