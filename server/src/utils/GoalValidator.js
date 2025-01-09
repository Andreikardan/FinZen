class GoalValidator {
    static validate(data) {
      const { title, goal, accumulator} = data;
      if (!title || typeof title !== "string" || title.trim() === "") {
        return {
          isValid: false,
          error: "Title is required and must be a non-empty string.",
        };
      }
      if (!goal || !isFinite(goal)) {
        return {
          isValid: false,
          error: "goal is required and must be a number.",
        };
      }

      if (!accumulator || !isFinite(goal)) {
        return {
          isValid: false,
          error: "Accumulator is required and must be a number.",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }
  module.exports = GoalValidator;