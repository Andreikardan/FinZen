import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { getAllBudgetsThunk } from "@/entities/budget";
import { deleteBudgetThunk, updateBudgetThunk } from "@/entities/budget/api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";

export const useBudgetList = () => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state) => state.budget.budgets);

  const deleteBudget = useCallback(
    async (id: number) => {
      
      const result = dispatch(deleteBudgetThunk(id)).unwrap()
      
      return result

    },
    [dispatch]
  );

  const updateBudget = useCallback(
    async (id: number, updatedBudget: {sum:number}) => {
      const result = await dispatch(updateBudgetThunk({ id, updatedBudget }));
      unwrapResult(result);
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllBudgetsThunk());
  }, [dispatch]);

  return { budgets, deleteBudget, updateBudget };
};
