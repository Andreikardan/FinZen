const TransactionDController = require("../controllers/TransactionD.controller");

const router = require("express").Router();

router
  .get("/", TransactionDController.getAllTransactionDs)
  .get("/:id", TransactionDController.getTransactionDById)
  .post("/", TransactionDController.createTransactionD)
  .put("/:id", TransactionDController.updateTransactionD)
  .delete("/:id", TransactionDController.deleteTransactionD);

module.exports = router;