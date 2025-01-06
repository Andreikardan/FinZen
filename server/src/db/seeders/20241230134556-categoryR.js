"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CategoryRs",
      [
        {
          name: "Бензин",
          icon: "benzUrl",
          budget_id: 1,
        },
        { name: "Продукты", 
          icon: "ProduktUrl", 
          budget_id: 1 
        },
        { name: "Кредиты", 
          icon: "CreditUrl", 
          budget_id: 1 
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CategoryRs", null, {});
  },
};
