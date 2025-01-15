import {  useAppSelector } from "@/shared/hooks/reduxHooks";
import { OperationsCard } from "./OperationsCard";
import {  IAllTransaction } from "@/entities/transactionR";
import styles from "./OperationsList.module.css";
import { TransactionSkeleton } from "@/pages/OperationsPage/TransactionSkeleton";

export function OperationsList() {
  const { loading, allTransactionsArray } = useAppSelector(
    (state) => state.budget
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Все транзакции</h1>

      <div className={styles.list}>
        {/* {loading ? (
          <>
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
          </>
        ) : allTransactionsArray.length === 0 ? (
          <div className={styles.emptyMessage}>Здесь пока пусто</div>
        ) : (
          allTransactionsArray.map((el: IAllTransaction) => (
            <OperationsCard transaction={el} key={el.id} />
          ))
        )} */}
        {loading ? (
          <>
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
          </>
        ) : allTransactionsArray.length < 0 ? (
          <div className={styles.emptyMessage}>Здесь пока пусто</div>
        ) : (
          allTransactionsArray.map((el: IAllTransaction) => (
            <OperationsCard transaction={el} key={el.id} />
          ))
        )}
      </div>
    </div>
  );
}
