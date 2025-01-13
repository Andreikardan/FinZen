'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('TransactionRs', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'трата', 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('TransactionRs', 'type');
   
  },
};