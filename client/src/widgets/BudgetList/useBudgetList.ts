import { getAllBudgetsThunk } from "@/entities/budget";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect } from "react";

export const useBudgetList = () => {
  const dispatch = useAppDispatch();
  const budgets = useAppSelector((state) => state.budget.budgets);
  useEffect(() => {
    dispatch(getAllBudgetsThunk());
  }, [dispatch]);
  return { budgets };
};
