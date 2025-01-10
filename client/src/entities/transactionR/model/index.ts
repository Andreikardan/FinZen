export interface IRawTransactionRData {
    sum: number | null;
    description: string;
    category_id: number;
  }
  export interface ITransactionR extends IRawTransactionRData {
    id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ArrayTransactionRsType = Array<ITransactionR>