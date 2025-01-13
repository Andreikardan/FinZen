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
    const keys = ['name', 'icon', 'budget_id'];
    const invalidKeys = Object.keys(data).filter(key => !keys.includes(key));
    if (invalidKeys.length > 0) {
      return { valid: false, error: `Недопустимые поля: ${invalidKeys.join(', ')}.` };
    }
    if (Object.keys(data).length === 0) {
      return { valid: true, error: 'Нет данных для обновления.' };
    }
    for (const key of Object.keys(data)) {
      if (data[key] === '' || data[key] === null || data[key] === undefined) {
        return { valid: false, error: `Поле "${key}" не может быть пустым.` };
      }
      if (key === 'budget_id') {
        if (typeof data[key] !== 'number' || data[key] <= 0) {
          return { valid: false, error: 'Поле "budget_id" должно быть положительным числом.' };
        }
      } else {
        if (typeof data[key] !== 'string') {
          return { valid: false, error: `Поле "${key}" должно быть строкой.` };
        }
      }
    }
  
    return { valid: true, error: 'Прошло валидацию.' };
  }
}

module.exports = CategoryValidator;