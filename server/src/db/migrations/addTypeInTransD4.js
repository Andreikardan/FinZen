'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('TransactionDs', 'type', {
      type: Sequelize.STRING,
      allowNull: false, 
      defaultValue: 'доход',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('TransactionDs', 'type');

  },
};