import styles from "./AuthForm.module.css";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { Toast } from "antd-mobile";
import { useAppDispatch, ROUTES, isEmailExistsChecker } from "@/shared";
import { ISignInData, ISignUpData, signInThunk, signUpThunk } from "@/entities/user";

export default function AuthForm(): React.ReactElement {
  const [type, setType] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (values: ISignInData | ISignUpData) => {
    const normalizedEmail = values.email.toLowerCase();
    let result;

    if (type) {
      const payload = {
        email: normalizedEmail,
        password: values.password,
      } as ISignInData;
      
      result = await dispatch(signInThunk(payload));
      
    } else {
      
      const isEmailExistsData = await isEmailExistsChecker(normalizedEmail);
      
      if (!isEmailExistsData.data?.exists) {
        Toast.show({ content: isEmailExistsData.message, position: "bottom" });
        return;
      }
      const payload = {
        email: normalizedEmail,
        password: values.password,
        username: values.username,
      } as ISignUpData;
      result = await dispatch(signUpThunk(payload));
    }

    unwrapResult(result);
    Toast.show({
      content: "Успешно",
      position: "bottom",
    });
    navigate(ROUTES.OPERATIONS);
  };

  const handleFormChange = (allFields: any[]) => {
    const hasErrors = allFields.some(({ errors }) => errors && errors.length > 0);

    if (!type) {
      const passwordField = allFields.find((field) => field.name[0] === 'password');
      const repeatField = allFields.find((field) => field.name[0] === 'repeat');

      const password = passwordField?.value;
      const repeat = repeatField?.value;

      if (password && repeat && password !== repeat) {
        setIsButtonDisabled(true);
        return;
      }
    }

    setIsButtonDisabled(hasErrors);
  };

  return (
    <Form
      style={{ maxWidth: '350px', minWidth: '350px' }}
      onFinish={submit}
      onFieldsChange={(_, changedFields) => handleFormChange(changedFields)}
    >
      <Form.Item
        name="email"
        required
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, укажите ваш email' },
          {
            validator: async (_, value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!value) {
                return Promise.reject('Поле не может быть пустым');
              }
              if (!emailRegex.test(value)) {
                return Promise.reject('Введите корректный email');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input placeholder="email" />
      </Form.Item>

      <Form.Item
        name="password"
        required
        hasFeedback
        rules={[
          { required: true, message: 'Пожалуйста, укажите ваш пароль' },
          {
            validator: async (_, value) => {
              const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;
              if (!value) {
                return Promise.reject('Поле не может быть пустым');
              }
              if (!passwordRegex.test(value)) {
                return Promise.reject('От 8 символов. Содержит спецсимвол, заглавную букву, цифры, и английские буквы');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input.Password placeholder="Введите пароль" />
      </Form.Item>


      {!type && (
        <>
          <Form.Item
            name="repeat"
            hasFeedback
            dependencies={['password']}
            rules={[
              { required: true, message: 'Пожалуйста, повторите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль" />
          </Form.Item>

          <Form.Item
            name="username"
            required
            hasFeedback
            rules={[
              { required: true, message: 'Пожалуйста, укажите имя пользователя' },
              {
                validator: async (_, value) => {
                  const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
                  if (!value) {
                    return Promise.reject('Поле не может быть пустым');
                  }
                  if (!usernameRegex.test(value)) {
                    return Promise.reject('Имя пользователя может содержать только английские буквы, цифры, и иметь длину 4 символа');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Введите имя пользователя" />
          </Form.Item>
        </>
      )}

      <Button
        type="primary"
        disabled={isButtonDisabled}
        htmlType="submit"
        style={{ width: "100%", fontFamily: "Comfortaa", backgroundColor: "purple" }}
        className={styles.enterButton}
      >
        {type ? "Войти" : "Зарегистрироваться"}
      </Button>

      <br />
      <br />

      <Button
        type="dashed"
        onClick={() => setType((prev) => !prev)}
        style={{ width: "100%", fontFamily: "Comfortaa" }}
      >
        {type ? "Я здесь впервые" : "Уже есть аккаунт"}
      </Button>
    </Form>
  );
}

