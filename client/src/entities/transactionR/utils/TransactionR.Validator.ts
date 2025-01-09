import type { IRawTransactionRData } from "../model";

type IValidationResult = {
  isValid: boolean;
  error: string | null;
  field: string | null;
};

export class TransactionRValidator {
  static validateTransactionR(data: IRawTransactionRData): IValidationResult {
    const { sum, description } = data;
    if (!sum || typeof sum !== "number" || sum > 0) {
      return {
        isValid: false,
        error:
          "Сумма транзакции обязательна и должна быть больше нуля",
        field: "sum",
      };
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
      return {
        isValid: false,
        error: "Описание транзакции обязательно и не должно быть пустой строкой",
        field: "description",
      };
    }
    return { isValid: true, error: null, field: null };
  }
}
