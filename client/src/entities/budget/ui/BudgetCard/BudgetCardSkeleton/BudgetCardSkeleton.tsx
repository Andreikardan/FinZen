import React from "react";
import styles from "../BudgetCardSkeleton/BudgetCard.module.css";

export const BudgetCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonListItem}>
        <div className={styles.skeletonListItemContent}>
          {/* Название бюджета */}
          <div className={styles.skeletonName}></div>
          {/* Сумма бюджета */}
          <div className={styles.skeletonSum}></div>
        </div>
      </div>
    </div>
  );
};