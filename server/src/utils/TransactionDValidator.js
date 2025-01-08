class TransactionDValidator {
    static validate(data) {
      const { sum, description } = data;
      if (!sum || typeof sum !== "number" || sum > 0) {
        return {
          isValid: false,
          error: "Sum is required and must be a positive number.",
        };
      }

      if (!description || typeof description !== "string" || description.trim() === "") {
        return {
          isValid: false,
          error: "Description is required and must be a non-empty string.",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }
  module.exports = TransactionDValidator;