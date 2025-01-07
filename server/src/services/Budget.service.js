const { raw } = require("express");
const { Budget } = require("../db/models");

class BudgetService {
  static async get() {
    return await Budget.findAll();
  }
  static async getById(id) {
    return await Budget.findByPk(id);
  }
  static async create(data) {
    return await Budget.create(data);
  }
  static async update(id, data) {
    const budget = await this.getById(id);
    if (budget) {
      budget.name = data.name;
      budget.sum = data.sum;
      await budget.save();
    }
    return budget;
  }
  static async delete(id) {
    const deletedBudget = await this.getById(id);
    if (deletedBudget) {
      await deletedBudget.destroy();
    }
    return deletedBudget;
  }
}
module.exports = BudgetService;
