import { CategoryList } from "@/entities/category";

export interface IRawBudgetData {
  name: string;
  sum: number | null;
}
export interface IBudget extends IRawBudgetData {
  id: number;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOneBudgetTransactions extends IBudget {
  CategoryDs: CategoryList
  CategoryRs: CategoryList
}

export type ArrayBudgetsType = Array<IBudget>;
