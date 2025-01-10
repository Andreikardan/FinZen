import { getBudgetByIdThunk } from "@/entities/budget/api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect } from "react";

export function useOneBudgetTransactionsList() {
  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.budget.currentBudget);
console.log(budget);

  useEffect(() => {
    dispatch(getBudgetByIdThunk(1));
  }, [dispatch]);
  return  {budget}
}
