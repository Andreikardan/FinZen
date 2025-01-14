'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GoalTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      budget_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Budgets",
          key:"id"
        },
        onDelete: 'CASCADE'
      },
      goal_id: {
        type: Sequelize.INTEGER,
        references: {
          model:"Goals",
          key:"id"
        },
        onDelete: 'CASCADE'
      },
      sumGoal: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GoalTransactions');
  }
};