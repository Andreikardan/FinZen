export { transactionRReducer } from "./slice";
export type { ITransactionR, IAllTransaction,AllTransactionArray } from "./model";
export {
  createTransactionRThunk,
  getAllTransactionRsThunk,
  deleteTransactionRThunk,
  updateTransactionRThunk,
  getTransactionRByIdThunk,
} from "./api";
