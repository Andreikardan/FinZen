'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('TransactionDs', 'type', {
      type: Sequelize.STRING,
      allowNull: false, // Обязательно значение
      defaultValue: 'доход', // Установим значение по умолчанию
    });
  },

  async down(queryInterface, Sequelize) {
    // Для отмены миграции сначала удаляем колонку
    await queryInterface.removeColumn('TransactionDs', 'type');
    // Удаляем ENUM-тип из базы данных
    // await queryInterface.sequelize.query(
      // 'DROP TYPE "string_CategoryRs_type";'
    // );
  },
};