import styles from "./OperationsPage.module.css";

export function TransactionSkeleton() {
  return (
    <div className={styles.skeletonTransaction}>
      <div className={styles.skeletonLine} style={{ width: "70%" }} />
      <div className={styles.skeletonLine} style={{ width: "50%" }} />
      <div className={styles.skeletonLine} style={{ width: "30%" }} />
    </div>
  );
}