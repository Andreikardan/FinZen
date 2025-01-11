'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('GoalTransactions', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'перевод',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('GoalTransactions', 'type');
  
  },
};