const { CategoryD, CategoryR, User, Budget } = require("../db/models");

class CategoryDService {

  static async getIcons(){
    const user = await User.findByPk(1, {
      include: [{model: Budget,include: [{ model: CategoryD, attributes: ["icon"] },{ model: CategoryR, attributes: ["icon"] }]}]});
    const icons = [];
    user.Budgets.forEach((budget) => {
      budget.CategoryDs.forEach((categoryD) => {
        if (categoryD.icon) {
          icons.push({ icon: categoryD.icon });
        }
      });
      budget.CategoryRs.forEach((categoryR) => {
        if (categoryR.icon) {
          icons.push({ icon: categoryR.icon });
        }
      });
    });

    return icons;
  }
  

  static async getAll(id) {
    const data = await User.findByPk(id,{include:[{model:Budget, include:[{model: CategoryD}]}]});
    return data.Budgets.flatMap(el => el.CategoryDs);
  }

  static async getById(id) {
    return await CategoryD.findByPk(id)
  }

  static async create(data) {
    return await CategoryD.create(data);
  }

  static async update(categoryD, data) {
    return await categoryD.update(data)
  }
  static async delete(categoryD) {
    return await categoryD.destroy();
  }
}
module.exports = CategoryDService;
