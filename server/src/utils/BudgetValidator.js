class BudgetValidator {
  static validate(data) {
    const { name, sum } = data;
    if(name){
      if (!name || typeof name !== "string" || name.trim() === "") {
        return {
          isValid: false,
          error: "Name is required and must be a non-empty string.",
        };
      }
    }
    
    if (!sum || !isFinite(sum)) {
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
module.exports = BudgetValidator;
