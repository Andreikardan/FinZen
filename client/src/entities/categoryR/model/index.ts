export interface IRawCategoryRData {
    name: string;
    icon: string;
    borderColor:string;
  }
  export interface ICategoryR extends IRawCategoryRData {
    id: number;
    budget_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ArrayCategoryRsType = Array<ICategoryR>