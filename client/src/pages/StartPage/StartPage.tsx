import styles from "./StartPage.module.css";
import React, { useState } from "react";
import AuthForm from "@/features/auth/ui/AuthForm";

export function StartPage(): React.ReactElement {
  const [state, setState] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <img className={styles.logo} src="/LOGO.svg" alt="Логотип" />

      {/* <div className={styles.credo}>
        Ваши деньги у нас в кармане
      </div> */}

      <div className={styles.bottomSection}>
        {!state && (
          <button
            className={styles.enterButton}
            onClick={() => setState((prev) => !prev)}
          >
            <span className={styles.enterButtonText}>ДОБРО ПОЖАЛОВАТЬ</span>
          </button>
        )}
        {state && <AuthForm />}

        <p className={styles.termsText}>
          Продолжая, Вы соглашаетесь с{" "}
          <u>Условиями оказания сервиса</u>,{" "}
          <u>Политикой конфиденциальности</u>{" "}
          и подтверждаете, что Вам исполнилось 18 лет.
        </p>
      </div>
    </div>
  );
}