"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CategoryDs",
      [
        {
          name: "Зарплата",
          icon: "ЗарплатаУРЛ",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Подработка",
          icon: "ПодработкаУРЛ",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        {
          name: "Возврат долга",
          icon: "ДолгУРЛ",
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
