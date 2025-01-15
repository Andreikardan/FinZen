"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionRPhotos",
      [
        {
          url: "mac.png",
          transactionR_id: 1,
        },
        {
          url: "check.svg",
          transactionR_id: 1,
        },
        {
          url: "bank.jpg",
          transactionR_id: 2,
        },
        {
          url: "check.svg",
          transactionR_id: 2,
        },
        {
          url: "verstka.jpg",
          transactionR_id: 3,
        },
        {
          url: "check.svg",
          transactionR_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionRPhotos", null, {});
  },
};
