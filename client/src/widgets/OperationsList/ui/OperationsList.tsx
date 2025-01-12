import { useEffect } from "react";
import { getAllTransactionsThunk } from "@/entities/budget/api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { OperationsCard } from "./OperationsCard";
import { IAllTransaction } from "@/entities/transactionR";
import styles from "./OperationsList.module.css"; 

export function OperationsList() {
  const dispatch = useAppDispatch();
  const allTransactions = useAppSelector(
    (state) => state.budget.allTransactionsArray
  );

  useEffect(() => {
    dispatch(getAllTransactionsThunk());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Все транзакции</h1>

      <div className={styles.list}>
        {allTransactions.length > 0 ? (
          allTransactions.map((el: IAllTransaction) => (
            <OperationsCard transaction={el} key={el.id} />
          ))
        ) : (
          <p className={styles.emptyMessage}>Транзакций пока нет</p>
        )}
      </div>
    </div>
  );
}