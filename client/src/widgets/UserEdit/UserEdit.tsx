import { updateThunk } from '@/entities/user/api';
import { ISignUpData } from '@/entities/user/model';
import { isEmailExistsChecker, useAppDispatch } from '@/shared';
import { useAppSelector } from '@/shared/hooks/reduxHooks';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd';
import { Toast } from 'antd-mobile';
import { useState } from 'react';

export function UserEdit() {
    const [pass, setPass] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const user = useAppSelector((state)=>state.user.user)

    const submit = async (values: ISignUpData )=>{
        for( const key in values){
            if(values[key]===undefined){
                delete values[key]
            }
        }
        if (Object.keys(values).length===0){
            return Toast.show({ content: "Все поля пустые", position: "bottom" });
        }
        if(values.email){
            const isEmailExistsData = await isEmailExistsChecker(values.email);
            if (!isEmailExistsData.data?.exists) {
                Toast.show({ content: isEmailExistsData.message, position: "bottom" });
                return;
            }
            values.email = values.email.toLowerCase()
        }
        const result = await dispatch(updateThunk(values));
        unwrapResult(result);
        Toast.show({
            content: "Успешно",
            position: "bottom",
        });
    }

    const handleFormChange = (changedFields: any[]) => {
        const errors = changedFields.some(({ errors }) => errors.length > 0)
        setIsButtonDisabled(errors)
    };

    return (
        <>
            <Form style={{ maxWidth: '306px', minWidth: '306px' }} onFinish={submit} onFieldsChange={(_, changedFields) => handleFormChange(changedFields)} initialValues={{username: user!.username,email: user!.email}}>
            <Form.Item name='email' hasFeedback rules={[{
                validator: async (_,value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (value && !emailRegex.test(value)) {
                            return Promise.reject('Введите корректный email');
                        }
                        return Promise.resolve();
            }}]}>
                <Input placeholder="email"/>
            </Form.Item>
            <Form.Item name="password" hasFeedback rules={[{ 
                validator: async (_, value) => {
                    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*]{8,}$/;
                if (value && !passwordRegex.test(value)) {
                    return Promise.reject('От 8 символов. Содержит спецсимвол, заглавную букву, цифры, и английские буквы');
                }
                return Promise.resolve();
            }}]}>
                <Input.Password placeholder="Введите пароль" />
            </Form.Item>
            <Form.Item name="repeat" hasFeedback dependencies={['password']} rules={[{ required: pass, message: 'Пожалуйста, повторите пароль' },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value) {
                    setPass(()=>false)
                    return Promise.resolve();
                } else {
                    setPass(()=>true)
                }
                if (getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('Пароли не совпадают');
            }})]}>
            <Input.Password placeholder="Повторите пароль" />
            </Form.Item>
            <Form.Item name="username" hasFeedback rules={[{
                validator: async (_, value) => {
                    const usernameRegex = /^[a-zA-Z0-9]{4,}$/
                if (value && !usernameRegex.test(value)) {
                    return Promise.reject('Цифры, английские буквы, и длинна 4 символа');
                }
                return Promise.resolve();
            }}]}>
                <Input placeholder="Введите имя пользователя" />
            </Form.Item>
            <Button type="primary" disabled={isButtonDisabled} htmlType="submit" style={{ width: '100%' }}>
                Изменить
            </Button>
            </Form>
        </>
    );
}