import { useCallback, useEffect } from "react";
import { createCategoryRThunk, getAllCategoryRThunk, deleteCategoryRThunk, updateCategoryRThunk } from "./api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";

export const useCategoryRList = () => {
  const dispatch = useAppDispatch();
  const categoryR = useAppSelector((state) => state.categoryR.categoryR);

  const deleteCategoryR = useCallback(
    async (id: number) => {
      try {
        const result = await dispatch(deleteCategoryRThunk({ id })).unwrap();
        dispatch(getAllCategoryRThunk());
        return result;
      } catch (error) {
        console.error("Ошибка при удалении категории:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const updateCategoryR = useCallback(
    async (id: number, name: string, icon: string) => {
      try {
        const updatedCategory = { id, name, icon};
        const result = await dispatch(updateCategoryRThunk(updatedCategory)).unwrap();
        dispatch(getAllCategoryRThunk());
        return result;
      } catch (error) {
        console.error("Ошибка при обновлении категории:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const createCategoryR = useCallback(
    async (name: string, icon: string, borderColor: string, budget_id: number) => {
      try {
        const newCategory = { name, icon, borderColor, budget_id };
        const result = await dispatch(createCategoryRThunk(newCategory)).unwrap();
        dispatch(getAllCategoryRThunk());
        return result;
      } catch (error) {
        console.error("Ошибка при создании категории:", error);
        throw error;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllCategoryRThunk());
  }, [dispatch]);

  return { categoryR, deleteCategoryR, updateCategoryR, createCategoryR };
};