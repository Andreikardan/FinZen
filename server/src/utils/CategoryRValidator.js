class CategoryRValidator {
    static validate(data) {
      const { name, icon } = data;
      if (!name || typeof name !== "string" || name.trim() === "") {
        return {
          isValid: false,
          error: "Name is required and must be a non-empty string.",
        };
      }

      if (!icon || typeof icon !== "string" || icon.trim() === "") {
        return {
          isValid: false,
          error: "Icon is required and must be a non-empty string.",
        };
      }

      return {
        isValid: true,
        error: null,
      };
    }
  }
  module.exports = CategoryRValidator;