import { ITransactionR } from "@/entities/transactionR";

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
