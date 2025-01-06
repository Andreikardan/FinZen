"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionRPhotos",
      [
        {
          url: "Фото1",
          transactionR_id: 1,
        },
        {
          url: "Фото2",
          transactionR_id: 1,
        },
        {
          url: "Фото1",
          transactionR_id: 2,
        },
        {
          url: "Фото2",
          transactionR_id: 2,
        },
        {
          url: "Фото1",
          transactionR_id: 3,
        },
        {
          url: "Фото2",
          transactionR_id: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionRPhotos", null, {});
  },
};
