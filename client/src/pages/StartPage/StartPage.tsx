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
          <>
          <img className='img' src='/Pornhub-logo.svg.png'   style={{
    width: '300px',
    height: '100px',
    objectFit: 'cover'
  }} />
            <AuthForm/>
            </>
        )}
    </>
  );
}
