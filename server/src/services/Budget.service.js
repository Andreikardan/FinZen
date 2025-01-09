const {
  Budget,
  CategoryD,
  CategoryR,
  TransactionD,
  TransactionR,
} = require("../db/models");

class BudgetService {
  static async get() {
    return await Budget.findAll();
  }
  static async getById(id) {
    return await Budget.findOne({
      where: { id },
      include: [
        { model: CategoryD, include: [{ model: TransactionD }] },
        { model: CategoryR, include: [{ model: TransactionR }] },
      ],
    });
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
