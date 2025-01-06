const { Budget } = require("../db/models");

class BudgetService {
  static async get(){
    return await Budget.findAll()
    
  }
  static async create(data) {
    return await Budget.create(data);
  }
}
module.exports = BudgetService;
