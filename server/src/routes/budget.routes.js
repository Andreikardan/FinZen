const BudgetController = require("../controllers/Budget.controller");
const verifyRefreshToken = require("../middleware/verifeRefreshToken");

const router = require("express").Router();

router
  .get("/", BudgetController.get)
  .post("/", verifyRefreshToken, BudgetController.create);

module.exports = router;
