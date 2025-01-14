"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionComments",
      [
        {
          text: "Дороговато вышло",
          transaction_id: 1,
        },
        {
          text: "Пересчитать проценты",
          transaction_id: 2,
        },
        {
          text: "Научился делать дивы",
          transaction_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionComments", null, {});
  },
};
