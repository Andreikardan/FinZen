import styles from './StartPage.module.css';
import React, { useState } from 'react';
import AuthForm from '@/features/auth/ui/AuthForm';

export function StartPage(): React.ReactElement {
  const [state, setState] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src='/../../public/LOGO.png' alt="Логотип" />
      {!state && (
        <button className={styles.enterButton} onClick={() => setState((prev) => !prev)}>
          <span className={styles.enterButtonText}>ВХОД</span>
        </button>
      )}
      {state && <AuthForm />}
    </div>
  );
}