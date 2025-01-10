class GoalTransactionValidator {
    static validate(data) {
      const { sumGoal } = data;
     
      if (!sumGoal || !isFinite(sumGoal)) {
        return {
          isValid: false,
          error: "sum is required and must be a number.",
        };
      }
      return {
        isValid: true,
        error: null,
      };
    }
  }
  module.exports = GoalTransactionValidator;