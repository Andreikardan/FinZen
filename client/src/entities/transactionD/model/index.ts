export interface IRawTransactionDData {
    sum: number;
    description: string;
  }
  export interface ITransactionD extends IRawTransactionDData {
    id: number;
    category_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ArrayTransactionDsType = Array<ITransactionD>