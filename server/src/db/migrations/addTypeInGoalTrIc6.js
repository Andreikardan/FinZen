'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('GoalTransactions', 'icon', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'перевод.svg',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('GoalTransactions', 'icon');
  
  },
};