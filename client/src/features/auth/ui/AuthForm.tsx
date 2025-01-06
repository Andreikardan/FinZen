import type { SyntheticEvent } from 'react';
import React, { useState } from 'react';
import { message as antMessage } from 'antd';
import { Button } from '@/shared/ui/Button';
import { signInThunk, signUpThunk, UserValidator} from '@/entities/user';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { unwrapResult } from '@reduxjs/toolkit';

type Props = {
  type: string;
};

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

export default function AuthForm({ type }: Props): React.ReactElement {
  const [inputs, setInputs] = useState<InputsType>(inputsInitialState);
  // const {setUser} = useUser()
  const loading = useAppSelector((state)=>state.user.loading)
  const dispatch = useAppDispatch()

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function submitHandler(event: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> {
    event.preventDefault();
    const { email } = inputs;
    const normalizedEmail = email.toLowerCase();

    if (type === 'signin') {
      const { isValid, error: validationError } = UserValidator.validateSignIn(inputs);

      if (!isValid) {
        antMessage.error(validationError);
        return;
      }
      const resultAction = await dispatch(signInThunk({...inputs,email:normalizedEmail}))
      unwrapResult(resultAction)
      setInputs(inputsInitialState)

    } else {
      const { isValid, error: validationError } = UserValidator.validateSignUp(inputs);

      if (!isValid) {
        antMessage.error(validationError);
        return;
      }

     const resultAction = await dispatch(signUpThunk({...inputs,email:normalizedEmail}))
     unwrapResult(resultAction)
     setInputs(inputsInitialState)

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
      {type === 'signup' && (
        <input
          value={inputs.username}
          name="username"
          placeholder="username"
          onChange={onChangeHandler}
          type="username"
          autoFocus
        />
      )}
      <Button
        disabled={loading}
        color="green"
        type="submit"
        text={type === 'signup' ? 'Регистрация' : 'Вход'}
      />
    </form>
  );
}
