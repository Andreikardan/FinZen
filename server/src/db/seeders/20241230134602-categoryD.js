"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CategoryDs",
      [
        {
          name: "Зарплата",
          icon: "зарплата.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Инвестиции",
          icon: "инвестиции.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Перевод",
          icon: "перевод.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Подарок",
          icon: "подарок.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Халтура",
          icon: "халтура.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Шальной доход",
          icon: "шальнойДоход.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Кэшбек",
          icon: "кэшбек.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CategoryDs", null, {});
  },
};
