import type { ISignInData, ISignUpData } from './types';

type IValidationResult = {
  isValid: boolean;
  error: string | null;
  field: string | null;
};

export class UserValidator {
  static validateSignUp(data: ISignUpData): IValidationResult {
    const { username, password, email } = data;
    if (!username || typeof username !== 'string' || username.trim() === '') {
      return {
        isValid: false,
        error: 'Имя пользователя обязательно, и не должно быть пустой строкой',
        field:'username'
      };
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
      return {
        isValid: false,
        error: 'Пароль обязателен, и не должен быть пустой строкой',
        field:'password'
      };
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return {
        isValid: false,
        error: 'Email обязателен, и не должен быть пустой строкой',
        field:'email'
      };
    }
    return { isValid: true, error: null, field:null };
  }

  static validateSignIn(data: ISignInData): IValidationResult {
    const { email, password } = data;
    if (!password || typeof password !== 'string' || password.trim() === '') {
      return {
        isValid: false,
        error: 'Пароль обязателен, и не должен быть пустой строкой',
        field:'password'
      };
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return {
        isValid: false,
        error: 'Email обязателен, и не должен быть пустой строкой',
        field:'email'
      };
    }
    return { isValid: true, error: null, field:null };
  }
}
