import React, { useState } from 'react';
import AuthForm from '@/features/auth/ui/AuthForm';

export function StartPage(): React.ReactElement {

    const[state, setState] = useState<boolean>(false)

  return (
    <>
        {!state && (
            <button onClick={() => setState((prev) => !prev)}>
            <span>ВХОД</span>
            </button>
        )}
        {state && (
            <AuthForm/>
        )}
    </>
  );
}
