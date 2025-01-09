const { where } = require("sequelize");
const {
  Budget,
  CategoryD,
  CategoryR,
  TransactionD,
  TransactionR,
} = require("../db/models");

class BudgetService {
  static async get(id) {
    return await Budget.findAll({ where: { user_id: id } });
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
  static async getAllTransactions(id) {
    const allData = await Budget.findAll({
      where: { user_id: id },
      include: [
        { model: CategoryD, include: [{ model: TransactionD }] },
        { model: CategoryR, include: [{ model: TransactionR }] },
      ],
    });
    const plainAllData = allData.map((el) => el.get({ plain: true }));

    return plainAllData;
  }
}
module.exports = BudgetService;
