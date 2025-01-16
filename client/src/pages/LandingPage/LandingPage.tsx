import styles from "./LandingPage.module.css";

export function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src="/LOGO.svg" alt="лого" />
      </div>

      <div className={styles.welcomeText}>
        Добро пожаловать! Здесь Вы сможете легко отслеживать свои доходы и
        расходы, планировать бюджет и достигать финансовых целей.
      </div>

      <div className={styles.warning}>
        Наше приложение создано специально для мобильных устройств. Пожалуйста,
        откройте сайт на Вашем телефоне, чтобы получить лучший опыт
        использования.
        <strong>Спасибо за понимание!</strong>
      </div>

      <div className={styles.instructions}>
        <div>Инструкция по установке</div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.number}>1</div>
            <div className={styles.text}>
              В браузере на телефоне откройте страницу www.finzen.ru
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.number}>2</div>
            <div className={styles.text}>
              Нажмите на кнопку Поделиться:
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.number}>3</div>
            <div className={styles.text}>
              Выберите «На экран Домой»
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
       По всем вопросам: finzen@info.ru
      </div>
    </div>
  );
}