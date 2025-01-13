export { categoryDReducer } from "./categoryD/slice";
export {
    createCategoryDThunk,
    getAllCategoryDThunk,
    deleteCategoryDThunk,
    updateCategoryDThunk,
  } from "./categoryD/api";


export { categoryRReducer } from "./categoryR/slice";
export {
    createCategoryRThunk,
    getAllCategoryRThunk,
    deleteCategoryRThunk,
    updateCategoryRThunk,
  } from "./categoryR/api";


export interface ICategory {
    id: number;
    name: string;
    icon: string;
    budget_id: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CreateCategory = Omit<ICategory, 'id' | 'createdAt' | 'updatedAt'>
  
  export type UpdateCategory = Partial<Pick<ICategory, 'id' | 'name' | 'icon' | 'budget_id'>>;
  
  export type CategoryList = ICategory[];