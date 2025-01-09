const { CategoryR,  TransactionR } = require("../db/models");

class TransactionRService {
  static async get() {
    return await TransactionR.findAll();
  }

  static async getById(id) {
    return await TransactionR.findOne({
      where: { id },
      include: [{ model: CategoryR }],  
    });
  }

  static async create(data) {
    return await TransactionR.create(data);
  }
  static async update(id, data) {
    const transactionR = await this.getById(id);
    if (transactionR) {
        transactionR.sum = data.sum;
        transactionR.description = data.description;
      await transactionR.save();
    }
    return transactionR;
  }
  static async delete(id) {
    const transactionR = await this.getById(id);
    if (transactionR) {
      await transactionR.destroy();
    }
    return transactionR;
  }
}
module.exports = TransactionRService;