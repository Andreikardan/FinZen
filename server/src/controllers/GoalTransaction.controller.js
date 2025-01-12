const GoalTransactionService = require("../services/GoalTransaction.service");
const formatResponse = require("../utils/formatResponse");

class GoalTransactionController {

    static async getAllGoalTransaction(req, res) {
        try {
            const goalTransaction = await GoalTransactionService.get();
            if (goalTransaction.length === 0 || !goalTransaction) {
              return res
                .status(200)
                .json(formatResponse(200, "No goal transaction found", []));
            }
      
            return res.status(200).json(formatResponse(200, "success", goalTransaction));
          } catch ({ message }) {
            console.error(message);
            res
              .status(500)
              .json(formatResponse(500, "Internal server error", null, message));
          }
    }

    static async getGoalTransactionById(req, res) {
        const { id } = req.params;
    
        try {
          const GoalTransaction = await GoalTransactionController.getById(+id);
    
          if (!GoalTransaction) {
            return res
              .status(404)
              .json(formatResponse(404, ` With id ${id} not found`));
          }
    
          res.status(200).json(formatResponse(200, "success", GoalTransaction));
        } catch ({ message }) {
          console.error(message);
          res
            .status(500)
            .json(formatResponse(500, "Internal server error", null, message));
        }
      }

    static async createGoalTransaction(req, res) {
        const {  budget_id, goal_id, sumGoal} = req.body; 
    console.log(req.body);
    
        try {
          const newGoalTransaction = await GoalTransactionService.create({
            sumGoal,
            goal_id,
            budget_id 
          });
          if (!newGoalTransaction) {
            return res
              .status(400)
              .json(formatResponse(400, `Failed to create new category`));
          }
          res.status(201).json(formatResponse(201, "success", newGoalTransaction));
        } catch ({ message }) {
          console.error(message);
          res
            .status(500)
            .json(formatResponse(500, "Internal server error", null, message));
        }
      }
}


module.exports = GoalTransactionController