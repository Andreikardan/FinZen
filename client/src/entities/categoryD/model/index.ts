import { ITransactionD } from "@/entities/transactionD";

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
