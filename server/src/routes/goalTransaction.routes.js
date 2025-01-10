const GoalTransactionController = require("../controllers/GoalTransaction.controller")

const router = require("express").Router()

router
.get("/", GoalTransactionController.getAllGoalTransaction)
.get("/:id", GoalTransactionController.getGoalTransactionById)
.post("/", GoalTransactionController.createGoalTransaction)

module.exports = router;