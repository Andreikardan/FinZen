import type { IRawCategoryDData } from "../model";

type IValidationResult = {
  isValid: boolean;
  error: string | null;
  field: string | null;
};

export class CategoryDValidator {
  static validateSignUp(data: IRawCategoryDData): IValidationResult {
    const { name, icon } = data;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return {
        isValid: false,
        error:
          "Название категории обязательно, и не должно быть пустой строкой",
        field: "name",
      };
    }
    if (!icon || typeof icon !== "string" || icon.trim() === "") {
      return {
        isValid: false,
        error: "Выберите иконку",
        field: "icon",
      };
    }
    return { isValid: true, error: null, field: null };
  }
}
