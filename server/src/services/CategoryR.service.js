const { CategoryR, User, Budget } = require("../db/models");

class CategoryRService {

  static async getAll(id) {
    const data = await User.findByPk(id,{include:[{model:Budget, include:[{model: CategoryR}]}]});
    return data.Budgets.flatMap(el => el.CategoryRs);
  }

  static async getById(id) {
    return await CategoryR.findByPk(id)
  }

  static async create(data) {
    return await CategoryR.create(data);
  }

  static async update(categoryR, data) {
    return await categoryR.update(data)
  }
  static async delete(categoryR) {
    return await categoryR.destroy();
  }
}
module.exports = CategoryRService;
