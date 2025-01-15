const {
  Budget,
  CategoryD,
  CategoryR,
  TransactionD,
  TransactionR,
  TransactionRPhoto,
  TransactionComment,
  Goal,
  GoalTransaction,
} = require("../db/models");
const { mockCategoryR, mockCategoryD } = require("../utils/consts");

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
    const newBudget = await Budget.create(data);
    
    const allBudget = await this.get(data.user_id)
    if(allBudget.length <= 1){
      const newCategoryR = mockCategoryR.map((el) => ({
        ...el,
        budget_id: newBudget.id,
      }));
      const newCategoryD = mockCategoryD.map((el) => ({
        ...el,
        budget_id: newBudget.id,
      }));
      
      await CategoryD.bulkCreate(newCategoryD);
      await CategoryR.bulkCreate(newCategoryR);
    }
   
    return newBudget;
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
        {
          model: GoalTransaction,
          include: { model: Goal, attributes: ["title"] },
        },

        {
          model: CategoryR,
          include: [
            {
              model: TransactionR,
              include: [
                { model: TransactionComment },
                { model: TransactionRPhoto },
              ],
            },
          ],
        },
      ],
    });
    const plainAllData = allData.map((el) => el.get({ plain: true }));

    return plainAllData;
  }
}
module.exports = BudgetService;
