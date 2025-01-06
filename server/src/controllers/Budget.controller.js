const BudgetService = require("../services/Budget.service");
const BudgetValidator = require("../utils/BudgetValidator");
const formatResponse = require("../utils/formatResponse");

class BudgetController {
  static async get(req, res) {
    try {
      const budgets = await  BudgetService.get();
      if (budgets.length === 0 || !budgets) {
        return res
          .status(200)
          .json(formatResponse(200, "No budgets found", []));
      }
      
      return res.status(200).json(formatResponse(200, "success", budgets));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async create(req, res) {
    const { name, sum } = req.body;
    
    const { user } = res.locals;
    
    const { isValid, error } = BudgetValidator.validate({ name, sum });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newBudget = await BudgetService.create({
        name,
        sum,
        user_id:user.id,
      });
      if (!newBudget) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new budget`));
      }
      res.status(201).json(formatResponse(201, "success", newBudget));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = BudgetController;
