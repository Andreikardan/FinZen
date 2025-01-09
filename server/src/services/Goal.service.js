const { Goal } = require("../db/models");

class GoalService {
  static async get() {
    return await Goal.findAll();
  }

  static async getById(id) {
    return await Goal.findByPk(id);
  }

  static async create(data) {
    return await Goal.create(data);
  }

  static async update(id, data) {
    const goal = await this.getById(id);
    if (goal) {
      goal.title = data.title;
      goal.goal = data.goal;
      goal.accumulator = data.accumulator;
      await goal.save();
    }
    return goal;
  }

  static async delete(id) {
    const deletedGoal = await this.getById(id);
    if (deletedGoal) {
      await deletedGoal.destroy();
    }
    return deletedGoal;
  }
}

module.exports = GoalService;