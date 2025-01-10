export interface IRawTransactionDData {
    sum: number | null;
    description: string;
    category_id: number | null;
  }
  export interface ITransactionD extends IRawTransactionDData {
    id: number;
   
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ArrayTransactionDsType = Array<ITransactionD>