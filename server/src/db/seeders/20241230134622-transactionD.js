"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionDs",
      [
        {
          category_id: 1,
          sum: 40000,
          description: "Пришла зп",
        },
        {
          category_id: 2,
          sum: 5000,
          description: "Фиксируем прибыль",
        },
        {
          category_id: 3,
          sum: 4000,
          description: "Вернули долг",
        },
        {
          category_id: 4,
          sum: 6000,
          description: "Подарок от команды",
        },
        {
          category_id: 5,
          sum: 6000,
          description: "Потаксовал",
        },
        {
          category_id: 6,
          sum: 3000,
          description: "Нашел на улице",
        },
        {
          category_id: 7,
          sum: 1000,
          description: "Кэшбек прилетел",
        }
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionDs", null, {});
  },
};
