
const GoalController = require('../controllers/Goal.controller');
const verifyRefreshToken = require("../middleware/verifeRefreshToken");

const router = require("express").Router();

router
.get('/', verifyRefreshToken, GoalController.getGoals)
.post('/', verifyRefreshToken,GoalController.createGoals)
.delete('/:id', GoalController.deleteGoals)
.put('/:id', GoalController.updateGoals)

module.exports = router;