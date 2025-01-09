const TransactionRService = require("../services/TransactionR.service");
const TransactionRValidator = require("../utils/TransactionRValidator");
const formatResponse = require("../utils/formatResponse");

class TransactionRController {
  static async getAllTransactionRs(req, res) {
    try {
      const transactionRs = await TransactionRService.get();
      if (transactionRs.length === 0 || !transactionRs) {
        return res
          .status(200)
          .json(formatResponse(200, "No categories found", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "success", transactionRs));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getTransactionRById(req, res) {
    const { id } = req.params;

    try {
      const transactionR = await TransactionRService.getById(+id);

      if (!transactionR) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", transactionR));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createTransactionR(req, res) {
    const { sum, description, category_id } = req.body; //!
console.log(sum);

    const { isValid, error } = TransactionRValidator.validate({
      sum,
      description,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newTransactionR = await TransactionRService.create({
        sum,
        description,
        category_id, //!
      });
      if (!newTransactionR) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new transaction`));
      }
      res.status(201).json(formatResponse(201, "success", newTransactionR));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateTransactionR(req, res) {
    const { id } = req.params;
    const { sum, description, category_id } = req.body; //!

    const { isValid, error } = TransactionRValidator.validate({
      sum,
      description,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      //!   const transactionRToUpdate = await TransactionRService.getById(+id);
      //   if (transactionRToUpdate.budget_id !== budget.id) {
      //
      //     return res
      //       .status(400)
      //       .json(
      //         formatResponse(
      //           400,
      //           `No rights to update transaction with id ${id}`,
      //           null,
      //           `No rights to update transaction with id ${id}`
      //         )
      //       );
      //!   }

      const updatedTransactionR = await TransactionRService.update(+id, {
        sum,
        description,
        category_id,
      });

      if (!updatedTransactionR) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedTransactionR));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteTransactionR(req, res) {
    const { id } = req.params;

    try {
      //!    const transactionRToDelete = await TransactionRService.getById(+id);

      //   if (transactionRToDelete.budget_id !== budget.id) {
      //     return res
      //       .status(400)
      //       .json(
      //         formatResponse(
      //           400,
      //           `No rights to delete transaction with id ${id}`,
      //           null,
      //           `No rights to delete transaction with id ${id}`
      //         )
      //       );
      //!   }

      const deletedTransactionR = await TransactionRService.delete(+id);

      if (!deletedTransactionR) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200);
      res
        .status(200)
        .json(
          formatResponse(
            200,
            `Category with id ${id} successfully deleted`,
            deletedTransactionR
          )
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}
module.exports = TransactionRController;
