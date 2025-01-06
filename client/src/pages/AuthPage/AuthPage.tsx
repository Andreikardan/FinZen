import React from 'react';
import AuthForm from '@/features/auth/ui/AuthForm';
import { useParams } from 'react-router-dom';

export function AuthPage(): React.ReactElement {
  const { type } = useParams();
  if (!type) {
    return <div>Неверный параметр</div>;
  }

  return (
    <>
      <AuthForm type={type} />
    </>
  );
}
