const { CategoryR, TransactionR } = require("../db/models");

class CategoryRService {
  static async get() {
    return await CategoryR.findAll();
  }

  static async getById(id) {
    return await CategoryR.findOne({
      where: { id },
      include: [{ model: TransactionR}], 
    });
  }

  static async create(data) {
    return await CategoryR.create(data);
  }
  static async update(id, data) {
    const categoryR = await this.getById(id);
    if (categoryR) {
      categoryR.name = data.name;
      categoryR.icon = data.icon;
      categoryR.borderColor = data.borderColor;
      await categoryR.save();
    }
    return categoryR;
  }
  static async delete(id) {
    const categoryR = await this.getById(id);
    if (categoryR) {
      await categoryR.destroy();
    }
    return categoryR;
  }
}
module.exports = CategoryRService;
