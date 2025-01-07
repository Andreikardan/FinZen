const { CategoryD, Budget } = require("../db/models");

class CategoryDService {
  static async get() {
    return await CategoryD.findAll();
  }

  static async getById(id) {
    return await CategoryD.findOne({
      where: { id },
      include: [{ model: Budget }],  //! убрать include?
    });
  }

  static async create(data) {
    return await CategoryD.create(data);
  }
  static async update(id, data) {
    const categoryD = await this.getById(id);
    if (categoryD) {
      categoryD.name = data.name;
      categoryD.icon = data.icon;
      categoryD.borderColor = data.borderColor;
      await categoryD.save();
    }
    return categoryD;
  }
  static async delete(id) {
    const categoryD = await this.getById(id);
    if (categoryD) {
      await categoryD.destroy();
    }
    return categoryD;
  }
}
module.exports = CategoryDService;
