import { useCallback, useEffect } from "react";
import { createCategoryDThunk, getAllCategoryDThunk, deleteCategoryDThunk, updateCategoryDThunk } from "./api";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";

export const useCategoryDList = () => {
  const dispatch = useAppDispatch();
  const categoryD = useAppSelector((state) => state.categoryD.categoryD);

  const deleteCategoryD = useCallback(
    async (id: number) => {
      try {
        const result = await dispatch(deleteCategoryDThunk({ id })).unwrap();
        dispatch(getAllCategoryDThunk());
        return result;
      } catch (error) {
        console.error("Ошибка при удалении категории:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const updateCategoryD = useCallback(
    async (id: number, name: string, icon: string, borderColor: string) => {
      try {
        const updatedCategory = { id, name, icon, borderColor};
        const result = await dispatch(updateCategoryDThunk(updatedCategory)).unwrap();
        dispatch(getAllCategoryDThunk());
        return result;
      } catch (error) {
        console.error("Ошибка при обновлении категории:", error);
        throw error;
      }
    },
    [dispatch]
  );

  const createCategoryD = useCallback(
    async (name: string, icon: string, borderColor: string, budget_id: number) => {
      try {
        const newCategory = { name, icon, borderColor, budget_id };
        const result = await dispatch(createCategoryDThunk(newCategory)).unwrap();
        dispatch(getAllCategoryDThunk());
        return result;
      } catch (error) {
        console.error("Ошибка при создании категории:", error);
        throw error;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(getAllCategoryDThunk());
  }, [dispatch]);

  return { categoryD, deleteCategoryD, updateCategoryD, createCategoryD };
};