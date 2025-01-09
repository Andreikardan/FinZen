const GoalService = require("../services/Goal.service");
const formatResponse = require("../utils/formatResponse");

class GoalController {
  static async getGoals(req, res) {
    try {
      const goals = await GoalService.get();
      if (goals.length === 0) {
        return res.status(200).json(formatResponse(200, "No goals found", []));
      }

      return res.status(200).json(formatResponse(200, "success", goals));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createGoals(req, res) {
    const { title, goal, accumulator} = req.body;

    try {
      const newGoal = await GoalService.create({
        title,
        goal,
        accumulator
      });

      if (!newGoal) {
        return res.status(400).json(formatResponse(400, "Failed to create new goal"));
      }

      res.status(201).json(formatResponse(201, "success", newGoal));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteGoals(req, res) {
    const { id } = req.params;

    try {
      const deletedGoal = await GoalService.delete(id);
      if (!deletedGoal) {
        return res.status(404).json(formatResponse(404, "Goal not found"));
      }

      res.status(200).json(formatResponse(200, "success deleted", deletedGoal));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateGoals(req, res) {
    const { id } = req.params;
    const { title, goal, accumulator } = req.body;

    try {
      const updatedGoal = await GoalService.update(id, { title, goal, accumulator });
  
      
      if (!updatedGoal) {
        return res.status(404).json(formatResponse(404, "Goal not found"));
      }
      return res.status(200).json(formatResponse(200, "Success updated", updatedGoal));
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = GoalController;