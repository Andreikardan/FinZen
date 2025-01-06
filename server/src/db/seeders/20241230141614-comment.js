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
          text: "Нормас",
          transaction_id: 2,
        },
        {
          text: "Ваще круто",
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
