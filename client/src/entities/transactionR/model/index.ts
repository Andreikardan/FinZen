import { ArrayCommentsType } from "@/entities/comments";
import { ArrayPhotoType } from "@/entities/photo";

export interface IRawTransactionRData {
  sum: number;
  description: string;
}
export interface ITransactionR extends IRawTransactionRData {
  id: number;
  category_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAllTransaction extends ITransactionR {
  type: string;
  icon: string;
  borderColor: string;
  comments: ArrayCommentsType;
  photos: ArrayPhotoType;
}
export type AllTransactionArray = Array<IAllTransaction>;
export type ArrayTransactionRsType = Array<ITransactionR>;
