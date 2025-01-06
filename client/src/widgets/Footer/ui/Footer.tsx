import styles from './Footer.module.css';
import React from 'react';

export function Footer(): React.ReactElement {
  return (
    <footer className={styles.container}>
      <p>© Ваще пропсдриллинг полнейший</p>
    </footer>
  );
}
