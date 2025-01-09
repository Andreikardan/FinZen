import { useEffect } from "react";
import { getAllTransactionsThunk } from "@/entities/budget/api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { OperationsCard } from "./OperationsCard";
import { ITransactionR } from "@/entities/transactionR";

export function OperationsList() {
  const dispatch = useAppDispatch();
  const allTransactions = useAppSelector(
    (state) => state.budget.allTransactionsArray
  );
  useEffect(() => {
    dispatch(getAllTransactionsThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>Все транзакции</h1>
      {allTransactions.length > 0 ? (
        allTransactions.map((el: ITransactionR) => (
          <OperationsCard transaction={el} key={el.id} />
        ))
      ) : (
        <h1>Бюджетов пока нет</h1>
      )}
    </div>
  );
}
