const { CategoryD,  TransactionD } = require("../db/models");

class TransactionDService {
  static async get() {
    return await TransactionD.findAll();
  }

  static async getById(id) {
    return await TransactionD.findOne({
      where: { id },
      include: [{ model: CategoryD }],  
    });
  }

  static async create(data) {
    return await TransactionD.create(data);
  }
  static async update(id, data) {
    const transactionD = await this.getById(id);
    if (transactionD) {
        transactionD.sum = data.sum;
        transactionD.description = data.description;
      await transactionD.save();
    }
    return transactionD;
  }
  static async delete(id) {
    const transactionD = await this.getById(id);
    if (transactionD) {
      await transactionD.destroy();
    }
    return transactionD;
  }
}
module.exports = TransactionDService;