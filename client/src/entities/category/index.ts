export { categoryDReducer } from "./categoryD/slice";
export {useCategoryDList} from './categoryD/useCategoryD'
export {useCategoryRList} from './categoryR/useCategoryR'
export {
  createCategoryDThunk,
  getAllCategoryDThunk,
  deleteCategoryDThunk,
  updateCategoryDThunk,
} from "./categoryD/api";

export { categoryRReducer } from "./categoryR/slice";
export {
  createCategoryRThunk,
  getAllCategoryRThunk,
  deleteCategoryRThunk,
  updateCategoryRThunk,
} from "./categoryR/api";

export interface ICategory {
  id: number;
  name: string;
  icon: string;
  borderColor:string;
  budget_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCategory = Omit<ICategory, "id"| 'borderColor' | "createdAt" | "updatedAt">;

export type UpdateCategory = Partial<
Pick<ICategory, "id" | "name" | "icon" | "budget_id">
>;

export type CategoryList = ICategory[];

//=====================================================================
//=====================================================================

import { ITransactionD } from "../transactionD";
import { ITransactionR } from "../transactionR";

export interface IRawCategoryDData {
  name: string;
  icon: string;
  borderColor: string;
}
export interface ICategoryD extends IRawCategoryDData {
  id: number;
  budget_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICategoryDWithTransactions extends ICategoryD {
  TransactionDs: Array<ITransactionD>;
}

export type ArrayCategoryDsWithTransactions = Array<ICategoryDWithTransactions>;
export type ArrayCategoryDsType = Array<ICategoryD>;

export interface IRawCategoryRData {
  name: string;
  icon: string;
  borderColor: string;
}
export interface ICategoryR extends IRawCategoryRData {
  id: number;
  budget_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategoryRWithTransactions extends ICategoryR {
  TransactionRs: Array<ITransactionR>;
}

export type ArrayCategoryRsWithTransactions = Array<ICategoryRWithTransactions>;
export type ArrayCategoryRsType = Array<ICategoryR>;

