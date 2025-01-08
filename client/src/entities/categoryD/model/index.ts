export interface IRawCategoryDData {
    name: string;
    icon: string;
    borderColor:string;
  }
  export interface ICategoryD extends IRawCategoryDData {
    id: number;
    budget_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type ArrayCategoryDsType = Array<ICategoryD>