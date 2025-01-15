import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback, useEffect } from "react";
import { deleteGoalThunk, getAllGoalsThunk, IRawGoalData, updateGoalThunk } from "@/entities/goal";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";


  
  export const useGoalList = () => {
    const dispatch = useAppDispatch();
    const goals = useAppSelector((state) => state.goal.goals);

  
    const deleteGoal = useCallback(
      async (id: number) => {
        const result = await dispatch(deleteGoalThunk(id)).unwrap();
        return result

      },
      [dispatch]
    );
  
    const updateGoal = useCallback(
      async (id: number, updatedGoal: IRawGoalData) => {
        const result = await dispatch(updateGoalThunk({ id, updatedGoal }));
        
        unwrapResult(result);
      },
      [dispatch]
    );
  
    useEffect(() => {
      dispatch(getAllGoalsThunk());
    }, [dispatch]);
  
    return {
      goals,
      deleteGoal,
      updateGoal,
    };
  };
  