const TransactionRController = require("../controllers/TransactionR.controller");

const router = require("express").Router();

router
  .get("/", TransactionRController.getAllTransactionRs)
  .get("/:id", TransactionRController.getTransactionRById)
  .post("/", TransactionRController.createTransactionR)
  .put("/:id", TransactionRController.updateTransactionR)
  .delete("/:id", TransactionRController.deleteTransactionR);

module.exports = router;