export { transactionRReducer } from "./slice";
export type { ITransactionR } from "./model";
export {
  createTransactionRThunk,
  getAllTransactionRsThunk,
  deleteTransactionRThunk,
  updateTransactionRThunk,
  getTransactionRByIdThunk,
} from "./api";
