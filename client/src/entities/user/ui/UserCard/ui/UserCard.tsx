import React from 'react';
import styles from './UserCard.module.css'


export function UserCard():React.ReactElement {
  return (
    <div className={styles.container}>
    <div className={styles.avatarContainer}>
      <img src={"/userAvatar.jpeg"} alt={`asd`}/>
    </div>
  </div>
  );
}

