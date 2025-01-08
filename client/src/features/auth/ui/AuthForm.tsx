import type { SyntheticEvent } from 'react';
import React, { useState } from 'react';
import { message as antMessage, Input } from 'antd';
import { signInThunk, signUpThunk, UserValidator} from '@/entities/user';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
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
  const [repeat, setRepeat] = useState<string>('')
  const [type, setType] = useState<boolean>(true)
  const dispatch = useAppDispatch()
    const navigate = useNavigate();

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleRepeatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeat(event.target.value);
  };

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
      
      if (inputs.password !== repeat){
        antMessage.error('пароли не совпадают')
        return
      }

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
      <Input
        value={inputs.email}
        name="email"
        placeholder="email"
        onChange={onChangeHandler}
        type="email"
        required
      />
      <br />
      <br />
      <Input.Password
        value={inputs.password}
        name="password"
        placeholder="password"
        onChange={onChangeHandler}
        required
      />
      {!type && (
        <>
        <br />
        <br />
        <Input.Password
          value={repeat}
          name="password"
          placeholder="repeat password"
          onChange={handleRepeatChange}
          required
        />
        <br />
        <br />
        <Input
          value={inputs.username}
          name="username"
          placeholder="username"
          onChange={onChangeHandler}
          type="text"
        />
        </>
      )}
      <br />
      <br/>
      <button type='submit'>{type? 'Войти':'Зарегистрироваться'}</button>
      <br/>
      <br/>
      <button onClick={()=>setType((prev)=>!prev)}>{type? 'Я здесь впервые':'Уже есть аккаунт'}</button>
      <div style={{ maxWidth: '300px', margin: '20px auto' }}>
    </div>
    </form>
  );
}
