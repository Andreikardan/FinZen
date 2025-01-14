import { useEffect, useState } from "react";
import { getAllTransactionsThunk } from "@/entities/budget/api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { OperationsCard } from "./OperationsCard";
import { IAllTransaction } from "@/entities/transactionR";
import styles from "./OperationsList.module.css";
import { TransactionSkeleton } from "@/pages/OperationsPage/TransactionSkeleton";

export function OperationsList() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true); 
  const allTransactions = useAppSelector(
    (state) => state.budget.allTransactionsArray
  );

  useEffect(() => {
    dispatch(getAllTransactionsThunk()); 
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2500);

    return () => clearTimeout(timer); 
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Все транзакции</h1>

      <div className={styles.list}>
        {isLoading ? (
         <>
         <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />
          <TransactionSkeleton />

         </> 
        ) : 
        allTransactions.length === 0 ? (
          <div className={styles.emptyMessage}>Здесь пока пусто</div>
        ) : (
          allTransactions.map((el: IAllTransaction) => (
            <OperationsCard transaction={el} key={el.id} />
          ))
        )}
      </div>
    </div>
  );
}