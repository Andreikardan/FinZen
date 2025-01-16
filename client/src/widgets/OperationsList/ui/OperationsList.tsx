import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { OperationsCard } from "./OperationsCard";
import { IAllTransaction } from "@/entities/transactionR";
import styles from "./OperationsList.module.css";
import { TransactionSkeleton } from "@/pages/OperationsPage/TransactionSkeleton";
import { useState } from "react";
import { PopupTransactionPage } from "./PopupTransactionPage/PopupTransactionPage";

export function OperationsList() {
  const { loading, allTransactionsArray } = useAppSelector(
    (state) => state.budget
  );
  const [visible, setVisible] = useState<boolean>(false);

  const [currentTransaction, setCurrentTransaction] =
    useState<IAllTransaction | null>(null);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Все транзакции</h1>

      <div className={styles.list}>
        {loading && (
          <>
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
            <TransactionSkeleton />
          </>
        )}
        {!loading &&
          allTransactionsArray &&
          allTransactionsArray.map((el: IAllTransaction) => (
            <OperationsCard
              transaction={el}
              key={el.id}
              setCurrentTransaction={setCurrentTransaction}
              setVisible={setVisible}
            />
          ))}
        {!loading &&
          allTransactionsArray &&
          allTransactionsArray.length === 0 && (
            <div className={styles.emptyMessage}>Здесь пока пусто</div>
          )}
      </div>

      <PopupTransactionPage
        transaction={currentTransaction}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
}
