import React, { useState } from 'react';
import { Button, Form, FormInstance, Input } from 'antd';
import { signInThunk, signUpThunk} from '@/entities/user';
import { useAppDispatch, ROUTES } from '@/shared';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { ISignInData, ISignUpData } from '@/entities/user/model/types';

export default function AuthForm(): React.ReactElement {
  const [type, setType] = useState<boolean>(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [form] = Form.useForm<FormInstance<{email: string; pasword:string; repeat:string; username:string}>>();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const submit = async (values: ISignInData | ISignUpData)=>{
    const normalizedEmail = values.email.toLowerCase();
      let result
    if (type){
      const payload = { email: normalizedEmail, password: values.password, } as ISignInData;
      result = await dispatch(signInThunk(payload));
    } else {
      const payload = { email: normalizedEmail, password: values.password, username: values.username, } as ISignUpData;
      result = await dispatch(signUpThunk(payload))
    }
    unwrapResult(result);
    Toast.show({
      content: "Успешно",
      position: "bottom",
    });
    navigate(ROUTES.BUDGETS);
  }

  const handleFormChange = (changedFields: any[]) => {
    if(!type){
      const errors = changedFields.some(({ errors }) => errors.length > 0)
      setIsButtonDisabled(errors)
    } else {
      const errors = changedFields.slice(0,2).some(({ errors }) => errors.length > 0)
      setIsButtonDisabled(errors)
    }
  };

  return (
    <Form style={{ maxWidth: '400px' }} onFinish={submit} onFieldsChange={(_, changedFields) => handleFormChange(changedFields)}>
      <Form.Item name='email' required hasFeedback rules={[{ required: true, message: 'Пожалуйста, укажите ваш email' },{
        validator: async (_,value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            return Promise.reject('Поле не может быть пустым');
          }
          if (!emailRegex.test(value)) {
            return Promise.reject('Введите корректный email');
          }
          return Promise.resolve();
        }}]}>
        <Input placeholder="email"/>
      </Form.Item>
      <Form.Item name="password" required hasFeedback rules={[{ required: true, message: 'Пожалуйста, укажите ваш пароль' },{ 
        validator: async (_, value) => {
          const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;
          if (!value) {
            return Promise.reject('Поле не может быть пустым');
          }
          if (!passwordRegex.test(value)) {
            return Promise.reject('Пароль должен быть минимум 8 символов. Должен содержать спецсимвол, заглавную букву, и только английские буквы');
          }
          return Promise.resolve();
      }}]}>
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>
      {!type && (<>
        <Form.Item name="repeat" hasFeedback dependencies={['password']} rules={[{ required: true, message: 'Пожалуйста, повторите пароль'},
          ({ getFieldValue }) => ({
            validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject('Пароли не совпадают');
        }})]}>
          <Input.Password placeholder="Повторите пароль" />
      </Form.Item>
      <Form.Item name="username" required hasFeedback rules={[{ required: true, message: 'Пожалуйста, укажите имя пользователя' },{
        validator: async (_, value) => {
          const usernameRegex = /^[a-zA-Z0-9]{4,}$/
          if (!value) {
            return Promise.reject('Поле не может быть пустым');
          }
          if (!usernameRegex.test(value)) {
            return Promise.reject('Имя пользователя может содержать только английские буквы, цифры, и иметь длинну 4 символа');
          }
          return Promise.resolve();
      }}]}>
        <Input placeholder="Введите имя пользователя" />
      </Form.Item>
      </>)}
        <Button type="primary" disabled={isButtonDisabled} htmlType="submit" style={{ width: '100%' }}>
          {type? 'Войти':'Зарегистрироваться'}
        </Button>
        <br/>
        <br/>
        <Button type='dashed' onClick={() => { setType((prev) => !prev)}} style={{ width: '100%' }}>
          {type ? 'Я здесь впервые' : 'Уже есть аккаунт'}
        </Button>
    </Form>
  );
}