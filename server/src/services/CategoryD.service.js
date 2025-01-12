const { CategoryD, User, Budget } = require("../db/models");

class CategoryDService {

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
