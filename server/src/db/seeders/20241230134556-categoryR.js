"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CategoryRs",
      [
        {
          name: "Кафе",
          icon: "кафе.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        { name: "Кредиты", 
          icon: "кредиты.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },
        { name: "Образование", 
          icon: "образование.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },

        {
          name: "Девчачьи штучки",
          icon: "девчачьиШтучки.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        { name: "Пацанячьи штучки", 
          icon: "пацанячьиШтучки.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },
        { name: "Перевод", 
          icon: "перевод.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },
        {
          name: "Продукты",
          icon: "продукты.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        { name: "Путешествия", 
          icon: "путешествия.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },
        { name: "Развлечения", 
          icon: "развлечения.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },
        {
          name: "Ремонт",
          icon: "ремонт.svg",
          borderColor: 'dfsdfs',
          budget_id: 1,
        },
        { name: "Спорттовары", 
          icon: "спорттовары.svg", 
          borderColor: 'dfsdfs',
          budget_id: 1 
        },
        {
          name: "Кафе",
          icon: "кафе.svg",
          borderColor: 'dfsdfs',
          budget_id: 2,
        },
        { name: "Кредиты", 
          icon: "кредиты.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },
        { name: "Образование", 
          icon: "образование.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },

        {
          name: "Девчачьи штучки",
          icon: "девчачьиШтучки.svg",
          borderColor: 'dfsdfs',
          budget_id: 2,
        },
        { name: "Пацанячьи штучки", 
          icon: "пацанячьиШтучки.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },
        { name: "Перевод", 
          icon: "перевод.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },
        {
          name: "Продукты",
          icon: "продукты.svg",
          borderColor: 'dfsdfs',
          budget_id: 2,
        },
        { name: "Путешествия", 
          icon: "путешествия.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },
        { name: "Развлечения", 
          icon: "развлечения.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },
        {
          name: "Ремонт",
          icon: "ремонт.svg",
          borderColor: 'dfsdfs',
          budget_id: 2,
        },
        { name: "Спорттовары", 
          icon: "спорттовары.svg", 
          borderColor: 'dfsdfs',
          budget_id: 2 
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CategoryRs", null, {});
  },
};
