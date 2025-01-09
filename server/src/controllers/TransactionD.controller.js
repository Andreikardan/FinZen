const TransactionDService = require("../services/TransactionD.service");
const TransactionDValidator = require("../utils/TransactionDValidator");
const formatResponse = require("../utils/formatResponse");

class TransactionDController {
  static async getAllTransactionDs(req, res) {
    try {
      const transactionDs = await TransactionDService.get();
      if (transactionDs.length === 0 || !transactionDs) {
        return res
          .status(200)
          .json(formatResponse(200, "No categories found", []));
      }

      return res
        .status(200)
        .json(formatResponse(200, "success", transactionDs));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getTransactionDById(req, res) {
    const { id } = req.params;

    try {
      const transactionD = await TransactionDService.getById(+id);

      if (!transactionD) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", transactionD));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createTransactionD(req, res) {
    const { sum, description, category_id } = req.body; //!

    const { isValid, error } = TransactionDValidator.validate({
      sum,
      description,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newTransactionD = await TransactionDService.create({
        sum,
        description,
        category_id, //!
      });
      if (!newTransactionD) {
        return res
          .status(400)
          .json(formatResponse(400, `Failed to create new transaction`));
      }
      res.status(201).json(formatResponse(201, "success", newTransactionD));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateTransactionD(req, res) {
    const { id } = req.params;
    const { sum, description, category_id } = req.body; //!

    const { isValid, error } = TransactionDValidator.validate({
      sum,
      description,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      //!   const transactionDToUpdate = await TransactionDService.getById(+id);
      //   if (transactionDToUpdate.budget_id !== budget.id) {
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

      const updatedTransactionD = await TransactionDService.update(+id, {
        sum,
        description,
        category_id,
      });

      if (!updatedTransactionD) {
        return res
          .status(404)
          .json(formatResponse(404, `Category with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", updatedTransactionD));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteTransactionD(req, res) {
    const { id } = req.params;

    try {
      //!    const transactionDToDelete = await TransactionDService.getById(+id);

      //   if (transactionDToDelete.budget_id !== budget.id) {
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

      const deletedTransactionD = await TransactionDService.delete(+id);

      if (!deletedTransactionD) {
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
            deletedTransactionD
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
module.exports = TransactionDController;
