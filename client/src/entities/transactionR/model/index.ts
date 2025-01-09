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
  
  export type ArrayTransactionRsType = Array<ITransactionR>