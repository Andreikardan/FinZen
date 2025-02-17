import { ArrayCommentsType } from "@/entities/comments";
import { ArrayPhotoType } from "@/entities/photo";

export interface IRawTransactionRData {
  sum: number;
  description: string;
  category_id: number | null;
}
export interface ITransactionR extends IRawTransactionRData {
  id: number;
  category_id: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAllTransaction extends ITransactionR {
  goal_id?:number; 
  budget_id:number;
  type: string;
  icon: string;
  borderColor: string;
  TransactionComments: ArrayCommentsType;
  TransactionRPhotos: ArrayPhotoType;
  budgetName:string | null,
  goalTitle:string | null,
  sumGoal:string | null,
}
export type AllTransactionArray = Array<IAllTransaction>;
export type ArrayTransactionRsType = Array<ITransactionR>;

