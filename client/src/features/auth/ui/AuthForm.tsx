import type { SyntheticEvent } from 'react';
import React, { useState } from 'react';
import { message as antMessage } from 'antd';
import { signInThunk, signUpThunk, UserValidator} from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/enums/routes';

type InputsType = {
  email: string;
  username: string;
  password: string;
};

const inputsInitialState = {
  email: '',
  username: '',
  password: '',
};

export default function AuthForm(): React.ReactElement {
  const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
  const [type, setType] = useState<boolean>(true)
  const loading = useAppSelector((state)=>state.user.loading)
  const dispatch = useAppDispatch()
    const navigate = useNavigate();

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function submitHandler(event: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> {
    event.preventDefault();
    const { email } = inputs;
    const normalizedEmail = email.toLowerCase();

    if (type) {
      const { isValid, error: validationError } = UserValidator.validateSignIn(inputs);

      if (!isValid) {
        antMessage.error(validationError);
        return;
      }
      const resultAction = await dispatch(signInThunk({...inputs,email:normalizedEmail}))
      unwrapResult(resultAction)
      setInputs(inputsInitialState)
      navigate(ROUTES.BUDGETS)

    } else {
      const { isValid, error: validationError } = UserValidator.validateSignUp(inputs);

      if (!isValid) {
        antMessage.error(validationError);
        return;
      }

     const resultAction = await dispatch(signUpThunk({...inputs,email:normalizedEmail}))
     unwrapResult(resultAction)
     setInputs(inputsInitialState)
     navigate(ROUTES.BUDGETS)

    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        value={inputs.email}
        name="email"
        placeholder="email"
        onChange={onChangeHandler}
        type="email"
        required
        autoFocus
      />
      <input
        value={inputs.password}
        name="password"
        placeholder="password"
        onChange={onChangeHandler}
        type="password"
        required
        autoFocus
      />
      {!type && (
        <input
          value={inputs.username}
          name="username"
          placeholder="username"
          onChange={onChangeHandler}
          type="username"
          autoFocus
        />
      )}
      <button onClick={()=>setType((prev)=>!prev)}>{type? 'Я здесь впервые':'А, нет, уже бывал'}</button>
      <button type='submit'>{type? 'Войти':'Зарегистрироваться'} </button>
    </form>
  );
}
