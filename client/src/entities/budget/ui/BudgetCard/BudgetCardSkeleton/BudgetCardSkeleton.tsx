import styles from "../BudgetCardSkeleton/BudgetCard.module.css";

export const BudgetCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonListItem}>
        <div className={styles.skeletonListItemContent}>
          <div className={styles.skeletonName}></div>
          <div className={styles.skeletonSum}></div>
        </div>
      </div>
    </div>
  );
};