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
          budget_id: 1,
        },
        {
          name: "Подработка",
          icon: "ПодработкаУРЛ",
          budget_id: 1,
        },
        {
          name: "Возврат долга",
          icon: "ДолгУРЛ",
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
