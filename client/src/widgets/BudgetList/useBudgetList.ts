import { useCallback, useEffect } from "react";
import { getAllBudgetsThunk } from "@/entities/budget";
import { deleteBudgetThunk, updateBudgetThunk } from "@/entities/budget/api";
import { IRawBudgetData } from "@/entities/budget/model/type";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { unwrapResult } from "@reduxjs/toolkit";

export const useBudgetList = () => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state) => state.budget.budgets);

  const deleteBudget = useCallback(
    async (id: number) => {
      dispatch(deleteBudgetThunk(id));
    },
    [dispatch]
  );

  const updateBudget = useCallback(
    async (id: number, updatedBudget: IRawBudgetData) => {
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
