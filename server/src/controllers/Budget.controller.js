const BudgetService = require("../services/Budget.service");
const BudgetValidator = require("../utils/BudgetValidator");
const formatResponse = require("../utils/formatResponse");

class BudgetController {
  static async get(req, res) {
    const { user } = res.locals;
    try {
      const budgets = await BudgetService.get(user.id);
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

  static async getBudgetById(req, res) {
    const { id } = req.params;

    try {
      const budget = await BudgetService.getById(+id);

      if (!budget) {
        return res
          .status(404)
          .json(formatResponse(404, `Budget with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", budget));
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
        user_id: user.id,
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
  static async delete(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    try {
      // const budgetToDelete = await BudgetService.getById(id);
      // if (budgetToDelete.user_id !== user.id) {
      //   return res
      //     .status(400)
      //     .json(
      //       formatResponse(
      //         400,
      //         "No rights to delete this budget",
      //         null,
      //         "No rights to delete this budget"
      //       )
      //     );
      // }
      const deleteBudget = await BudgetService.delete(id);
      if (!deleteBudget) {
        return res.status(404).json(formatResponse(404, "Budget not found"));
      }

      res
        .status(200)
        .json(formatResponse(200, "success deleted", deleteBudget));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async update(req, res) {
    const { id } = req.params;
    const { name, sum } = req.body;
    const { isValid, error } = BudgetValidator.validate({ name, sum });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const updateBudget = await BudgetService.update(id, { name, sum });
      if (!updateBudget) {
        return res.status(404).json(formatResponse(404, "Budget not found"));
      }
      return res
        .status(200)
        .json(formatResponse(200, "Success updated", updateBudget));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async getAllTransaction(req, res) {
    const { user } = res.locals;
    try {
      const allTransactions = await BudgetService.getAllTransactions(1);
      if (allTransactions.length === 0 || !allTransactions) {
        return res
          .status(200)
          .json(formatResponse(200, "No transactions found", []));
      }

      let clearAllTransactions = [];

      allTransactions.forEach((budget) => {
        budget.CategoryDs.forEach((categoryD) => {
          categoryD.TransactionDs.forEach((transaction) => {
            transaction.icon = categoryD.icon;
            transaction.borderColor=categoryD.borderColor
            clearAllTransactions.push(transaction);
          });
        });

        budget.CategoryRs.forEach((categoryR) => {
          categoryR.TransactionRs.forEach((transaction) => {
            transaction.icon = categoryR.icon;
            clearAllTransactions.push(transaction);
          });
        });
      });

      const sortTransaction = clearAllTransactions.toSorted(
        (a, b) => b.createdAt - a.createdAt
      );

      return res
        .status(200)
        .json(formatResponse(200, "success", sortTransaction));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = BudgetController;
