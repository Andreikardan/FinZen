"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TransactionRs",
      [
        {
          category_id: 1,
          sum: 500,
          description: "Поел в Маке",
        },
        {
          category_id: 2,
          sum: 10000,
          description: "За машину",
        },
        {
          category_id: 3,
          sum: 6000,
          description: "Курсы верстки",
        },
        {
          category_id: 4,
          sum: 3000,
          description: "Купил духи",
        },
        {
          category_id: 5,
          sum: 2000,
          description: "ФСОшки поставил",
        },
        {
          category_id: 6,
          sum: 200,
          description: "От Арсена на дошик",
        },
        {
          category_id: 7,
          sum: 300,
          description: "Закупка в магазине",
        },
        {
          category_id: 8,
          sum: 500,
          description: "Съездил в Пушкин",
        },
        {
          category_id: 9,
          sum: 3000,
          description: "Отметил выпускной",
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TransactionRs", null, {});
  },
};
