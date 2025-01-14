const BudgetController = require("../controllers/Budget.controller");
const verifyRefreshToken = require("../middleware/verifeRefreshToken");

const router = require("express").Router();

router
.get("/allTransactions",verifyRefreshToken, BudgetController.getAllTransaction)
.get("/", verifyRefreshToken, BudgetController.get)
.get("/:id", BudgetController.getBudgetById)
  .post("/", verifyRefreshToken, BudgetController.create)
  .delete("/:id", BudgetController.delete)
  .put("/:id", BudgetController.update);

module.exports = router;
