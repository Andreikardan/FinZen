class CategoryValidator {
  static validateCreate(data) {
    const keys = ['name', 'icon', 'budget_id'];
    const missingKeys = keys.filter(key => !Object.hasOwn(data, key));
    if (missingKeys.length > 0) {
      return { valid: false, error: `Отсутствуют обязательные поля: ${missingKeys.join(', ')}.` };
    }
    const invalidKeys = Object.keys(data).filter(key => !keys.includes(key));
    if (invalidKeys.length > 0) {
      return { valid: false, error: `Используются недопустимые поля: ${invalidKeys.join(', ')}.` };
    }
    for (const key of keys) {
      if (data[key] === '' || data[key] === null || data[key] === undefined) {
        return { valid: false, error: `Поле "${key}" не может быть пустым.` };
      }
    }
    if (typeof data.budget_id !== 'number' || data.budget_id <= 0) {
      return { valid: false, error: 'Поле "budget_id" должно быть положительным числом.' };
    }
    for (const key of ['name', 'icon']) {
      if (typeof data[key] !== 'string') {
        return { valid: false, error: `Поле "${key}" должно быть строкой.` };
      }
    }

    return { valid: true, error: 'Прошло валидацию.' };
  }

  static validateUpdate(data) {
    const clearData = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        if (value === "" || value === null || value === undefined) {
          continue; // Пропускаем пустые значения
        }

        if (key === "budget_id" && typeof value !== "number") {
          continue; // Пропускаем, если budget_id не число
        }

        clearData[key] = value; // Добавляем только валидные данные
      }
    }

    if (Object.keys(clearData).length === 0) {
      return { valid: false, error: "Нет допустимых данных для обновления.", clearData };
    }

    return { valid: true, error: null, clearData };
  }
  
}

module.exports = CategoryValidator;